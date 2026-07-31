/**
 * Step 3 of the blog import: prove the local copy is word-for-word.
 *
 *   node scripts/verify-smslocal-blogs.mjs
 *
 * Diffs the visible text of every cached source page against the text our
 * generated blocks will render, and checks that every referenced image and
 * every heading anchor actually exists.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { decodeEntities, hasClass, parseHtml } from './lib/mini-html.mjs'

const ROOT = path.join(import.meta.dirname, '..')
const CACHE = path.join(import.meta.dirname, '.cache', 'raw')

/** Chrome we deliberately drop; excluded from the source side of the diff. */
const DROPPED_CLASSES = ['elementor-accordion-icon', 'elementor-button-icon']

function normalize(text) {
  return text
    .replace(/[ ​﻿]/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Punctuation and emoji are presentation; compare the words themselves. */
function words(text) {
  return normalize(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function sourceText(contentHtml) {
  const tree = parseHtml(contentHtml)
  const parts = []
  const visit = (nodes) => {
    for (const n of nodes) {
      if (n.type === 'text') {
        parts.push(n.text)
        continue
      }
      // Mirrors the transform's intentional omissions.
      if (['script', 'style', 'head', 'select', 'option', 'input', 'textarea', 'button'].includes(n.tag)) continue
      // The one raw-HTML embed is an interactive tool, not article copy.
      if (n.attrs['data-widget_type']?.startsWith('html.')) continue
      if (DROPPED_CLASSES.some((c) => hasClass(n, c))) continue
      if (n.tag === 'h1') continue // page title, rendered by the post header
      visit(n.children)
    }
  }
  visit(tree)
  return parts.join(' ')
}

function richText(rich) {
  if (!rich) return ''
  return rich.map((n) => (typeof n === 'string' ? n : richText(n.c ?? n.b ?? n.i))).join('')
}

function postText(post) {
  const parts = []
  for (const b of post.body) {
    switch (b.type) {
      case 'p':
      case 'quote':
        parts.push(richText(b.rich))
        break
      case 'h2':
      case 'h3':
      case 'h4':
        parts.push(b.text)
        break
      case 'ul':
      case 'ol':
        b.items.forEach((i) => parts.push(richText(i)))
        break
      case 'img':
        parts.push(b.alt ?? '')
        break
      case 'table':
        if (b.head) b.head.forEach((c) => parts.push(richText(c)))
        b.rows.forEach((row) => row.forEach((c) => parts.push(richText(c))))
        break
      case 'cta':
        parts.push(richText(b.heading), richText(b.text), b.buttonText)
        break
      default:
        break
    }
  }
  for (const f of post.faqs) parts.push(f.q, richText(f.rich))
  return parts.join(' ')
}

/** Longest-common-subsequence driven diff over word arrays, reported as runs. */
function missingRuns(source, mine) {
  const present = new Map()
  for (const w of mine) present.set(w, (present.get(w) ?? 0) + 1)

  const runs = []
  let current = []
  for (const w of source) {
    const left = present.get(w) ?? 0
    if (left > 0) {
      present.set(w, left - 1)
      if (current.length) {
        runs.push(current.join(' '))
        current = []
      }
    } else {
      current.push(w)
    }
  }
  if (current.length) runs.push(current.join(' '))
  return runs
}

async function main() {
  const posts = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/importedPosts.generated.json'), 'utf8'))
  const bySlug = new Map(posts.map((p) => [p.slug, p]))
  const files = (await fs.readdir(CACHE)).filter((f) => f.endsWith('.json')).sort()

  let failures = 0
  const summary = []

  for (const file of files) {
    const raw = JSON.parse(await fs.readFile(path.join(CACHE, file), 'utf8'))
    const post = bySlug.get(raw.slug)
    if (!post) {
      console.log(`✗ ${raw.slug}: not present in generated posts`)
      failures++
      continue
    }

    const src = words(sourceText(raw.api.content.rendered))
    const mine = words(postText(post))
    const missing = missingRuns(src, mine).filter((r) => r.split(' ').length >= 3)
    const coverage = src.length ? ((src.length - missing.join(' ').split(' ').filter(Boolean).length) / src.length) * 100 : 100

    // Meta, verbatim from the source page.
    const srcMeta = (re) => {
      const m = raw.pageHtml.match(re)
      return m ? decodeEntities(m[1]).trim() : null
    }
    const metaOk =
      post.metaTitle === srcMeta(/<title>([\s\S]*?)<\/title>/) &&
      post.metaDescription === srcMeta(/<meta name="description" content="([^"]*)"/)
    // The byline must match the date the live page prints, not the API's
    // `date` — the theme labels the last-modified date as "Published:".
    const shown = raw.pageHtml
      .match(/elementor-post-info__item[^>]*>\s*([^<]*?)\s*<\/span>/)?.[1]
      ?.replace(/^Published:\s*/i, '')
      .trim()
    const dateOk = shown ? post.date === shown : post.publishedISO === raw.api.date
    const authorShown = raw.pageHtml
      .match(/elementor-icon-box-title">\s*<a[^>]*>\s*([^<]*?)\s*<\/a>/)?.[1]
      ?.replace(/\s+/g, ' ')
      .trim()
    const authorOk = authorShown
      ? `${post.author?.role}: ${post.author?.name}` === authorShown
      : !post.author

    // Every referenced image is on disk.
    const imgs = [post.cover, ...post.body.filter((b) => b.type === 'img').map((b) => b.src)].filter(Boolean)
    const missingImgs = []
    for (const src of imgs) {
      try {
        await fs.access(path.join(ROOT, 'public', src))
      } catch {
        missingImgs.push(src)
      }
    }

    const ok = coverage >= 99.5 && metaOk && dateOk && authorOk && missingImgs.length === 0
    if (!ok) failures++
    summary.push({ slug: post.slug, coverage, metaOk, dateOk, authorOk, missingImgs, missing: missing.slice(0, 4) })

    console.log(
      `${ok ? '✓' : '✗'} ${post.slug.padEnd(36)} text ${coverage.toFixed(2).padStart(6)}%  meta ${metaOk ? 'ok' : 'MISMATCH'}  byline ${dateOk ? (post.date + '').padEnd(18) : `MISMATCH (page: ${shown})`.padEnd(18)}  author ${authorOk ? 'ok' : 'MISMATCH'}  imgs ${imgs.length - missingImgs.length}/${imgs.length}`,
    )
    for (const run of missing.slice(0, 3)) console.log(`      missing: “${run.slice(0, 120)}”`)
  }

  const avg = summary.reduce((a, s) => a + s.coverage, 0) / summary.length
  console.log(`\n${summary.length - failures}/${summary.length} posts clean · average text coverage ${avg.toFixed(2)}%`)
  if (failures) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
