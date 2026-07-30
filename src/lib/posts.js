
import importedRaw from "../data/importedPosts.generated.json";

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Flattens an inline rich-text run (string | {b} | {i} | {a,c}) to plain text. */
export function richToText(rich) {
  if (!rich) return "";
  return rich
    .map((node) =>
      typeof node === "string" ? node : richToText(node.c ?? node.b ?? node.i),
    )
    .join("");
}

function blockText(block) {
  switch (block.type) {
    case "p":
    case "quote":
      return block.text ?? richToText(block.rich);
    case "h2":
    case "h3":
    case "h4":
      return block.text;
    case "ul":
    case "ol":
      return block.items
        .map((item) => (typeof item === "string" ? item : richToText(item)))
        .join(" ");
    case "stats":
      return block.items.map((s) => s.label).join(" ");
    case "cta":
      return `${block.heading} ${block.text}`;
    case "img":
      return block.alt ?? "";
    case "table":
      return [...(block.head ? [block.head] : []), ...block.rows]
        .flat()
        .map(richToText)
        .join(" ");
    default:
      return "";
  }
}

/** Imported posts keep WordPress's own heading ids so old #anchors still work. */
export function headingId(block, index) {
  if (block.anchor) return block.anchor;
  return block.type === "h2" ? slugify(block.text) : `block-${index}`;
}

/** Finds the first body block that mentions `tag` and returns an anchor id
 * to jump straight to it — `h2` blocks reuse their TOC slug, everything
 * else gets a stable `block-{i}` id (see BodyBlocks.tsx). */
export function findTagAnchor(body, tag) {
  const needle = tag.toLowerCase();
  for (let i = 0; i < body.length; i++) {
    const block = body[i];
    if (blockText(block).toLowerCase().includes(needle)) {
      return headingId(block, i);
    }
  }
  return null;
}

/* ── Imported archive ──────────────────────────────────────────────────────
 * Posts migrated from the live smslocal.com WordPress blog. The copy, meta,
 * links, images and publish dates come across verbatim (see
 * scripts/transform-smslocal-blogs.mjs); only the presentation is ours.
 * These are the whole blog — the placeholder posts that used to be hand-
 * authored above them were removed once the real archive landed.
 */

/** Used only where the source page renders no author box of its own. */
const houseAuthor = {
  name: "SMSLocal",
  initials: "SL",
  role: "Editorial Team",
  bio: "This communications platform’s unmatched reach and effectiveness cannot be matched by any other form or technology on offer today.",
};

/** WordPress only categorised some posts, so fall back to the topic shape. */
function derivedCategory(post) {
  if (post.categories?.length) return post.categories[0];
  /* Short codes are not area codes — a `-short-code` slug falls through to
     the generic bucket rather than mislabelling itself "Area Code". */
  if (/area-code/.test(post.slug)) return "Area Code";
  if (/^what-does|meaning/.test(post.slug)) return "Text Meanings";
  return "SMS Insights";
}

/** The one post promoted to the hero card at the top of /blog. Change this
 * slug to change the featured story — it must match a slug in
 * importedPosts.generated.json. */
const FEATURED_SLUG = "22395-short-code";

/** Splits a post title into a Geist part and an Instrument Serif italic accent,
 * so a headline mixes the two families the way the homepage heroes do (see
 * `.grad-word` in styles/theme.css). Titles here are near-universally
 * "Topic: descriptive promise", and the accent takes the *shorter* half — which
 * lands on the topic ("The 22395 Short Code:") rather than the boilerplate tail,
 * and keeps the accent to the few words the sitewide pattern uses. Body
 * headings deliberately get none of this; only the h1 mixes families. */
export function titleParts(title) {
  const clean = (title ?? "").trim();
  // Prefer the first :?!— separator, which stays with the clause it closes.
  const punctuated = clean.match(/^(.*?[:?!—])\s+(.+)$/);
  // Otherwise an "&" join, where the ampersand belongs to the second clause.
  const conjoined = punctuated ? null : clean.match(/^(.+?)\s+(&\s+.+)$/);
  const match = punctuated ?? conjoined;

  if (match) {
    const lead = match[1].replace(/\s*\|\s*$/, "").trim();
    const tail = match[2].replace(/^\|\s*/, "").trim();
    const words = (s) => s.split(/\s+/).length;
    return words(lead) <= words(tail)
      ? { before: "", accent: lead, after: ` ${tail}` }
      : { before: `${lead} `, accent: tail, after: "" };
  }

  // No separator at all: accent the closing phrase, or nothing if the title is
  // too short to divide without reading as an arbitrary break.
  const words = clean.split(/\s+/);
  if (words.length < 5) return { before: clean, accent: "", after: "" };
  return {
    before: `${words.slice(0, -3).join(" ")} `,
    accent: words.slice(-3).join(" "),
    after: "",
  };
}

/** Each excerpt is lifted from the opening body text verbatim, so 22 of the 32
 * begin with the stray section heading "Introduction" and a couple repeat the
 * title straight back. Neither reads as a description on a card. */
function cleanExcerpt(excerpt, title) {
  let text = (excerpt ?? "").trim();
  text = text.replace(/^introduction\b[\s:—–-]*/i, "");
  if (title && text.toLowerCase().startsWith(title.toLowerCase())) {
    text = text.slice(title.length).replace(/^[\s:—–-]*/, "");
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const FAQ_HEADING = /^(faqs?|frequently asked questions?)$/i;

/** The importer lifts each post's Q&As out of the body into `faqs`, but leaves
 * the WordPress "FAQ" heading behind with nothing under it (31 of 32 posts end
 * on one). Rendered, that is an empty section plus a second, duplicate "FAQ"
 * row in the table of contents pointing at an anchor on the page you are
 * already reading. Drop any FAQ heading that heads an empty section; a real
 * one with content under it is left alone. */
function stripEmptyFaqHeading(body) {
  return body.filter((block, i) => {
    if (!/^h[234]$/.test(block.type) || !FAQ_HEADING.test((block.text ?? "").trim())) {
      return true;
    }
    const next = body[i + 1];
    return next !== undefined && !/^h[234]$/.test(next.type);
  });
}

export const importedPosts = importedRaw.map((post) => ({
  ...post,
  body: stripEmptyFaqHeading(post.body),
  excerpt: cleanExcerpt(post.excerpt, post.title),
  category: derivedCategory(post),
  // Each source page renders its own named byline; fall back only if it has none.
  author: post.author ?? houseAuthor,
  featured: post.slug === FEATURED_SLUG,
  imported: true,
}));

/** Orders by the date each post actually shows, so the list matches its labels. */
function sortKey(post) {
  return Date.parse(post.dateISO ?? post.date) || 0;
}

const allPosts = [...importedPosts].sort((a, b) => sortKey(b) - sortKey(a));

export function getAllPosts() {
  return allPosts;
}

export function getPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost() {
  return allPosts.find((p) => p.featured) ?? allPosts[0];
}

/** Same-category posts first, so an area-code piece suggests its neighbours. */
export function getRelatedPosts(slug, count = 3) {
  const post = getPostBySlug(slug);
  const others = allPosts.filter((p) => p.slug !== slug);
  if (!post) return others.slice(0, count);
  const sameCategory = others.filter((p) => p.category === post.category);
  return [...sameCategory, ...others.filter((p) => p.category !== post.category)].slice(0, count);
}

export const categories = [
  "All",
  ...[...new Set(allPosts.map((p) => p.category))].sort((a, b) => a.localeCompare(b)),
];
