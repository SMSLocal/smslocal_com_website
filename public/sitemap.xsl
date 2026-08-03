<?xml version="1.0" encoding="UTF-8"?>
<!--
  Styled view for the sitemaps. Browsers apply this via the <?xml-stylesheet?>
  instruction at the top of each .xml file; crawlers ignore it and read the raw
  XML, so this is presentation only and cannot affect indexing.

  One stylesheet serves both shapes: sitemapindex (the /sitemap.xml index) and
  urlset (each sub-sitemap). XSLT 1.0 only — that is all browsers implement.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template name="head">
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="robots" content="noindex"/>
    <link rel="icon" type="image/svg+xml" href="/icon.svg"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin"/>
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&amp;family=Instrument+Serif:ital@0;1&amp;display=swap" rel="stylesheet"/>
    <style>
      :root {
        --navy: #154989; --navy-dark: #113a6e; --ink: #0f172a;
        --brand-start: #4f5bd5; --brand-end: #ec4899;
        --text-secondary: #64748b; --border: #e5e7eb;
        --bg-subtle: #f8fafc; --radius: 12px; --container: 1280px;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0; background: var(--bg-subtle); color: var(--ink);
        font-family: 'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif;
        font-size: 15px; line-height: 1.55; -webkit-font-smoothing: antialiased;
      }
      .band {
        background: linear-gradient(128deg, var(--navy) 0%, var(--brand-start) 60%, var(--brand-end) 140%);
        color: #fff; padding: 44px 24px 52px;
      }
      .wrap { max-width: var(--container); margin: 0 auto; }
      .brand { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; }
      .brand img { height: 26px; width: auto; display: block; }
      .eyebrow {
        display: inline-block; font-size: 11px; font-weight: 600;
        letter-spacing: .14em; text-transform: uppercase;
        background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.25);
        padding: 5px 11px; border-radius: 999px; margin-bottom: 14px;
      }
      h1 { margin: 0 0 8px; font-size: 34px; font-weight: 600; letter-spacing: -.02em; }
      h1 em { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; }
      .sub { margin: 0; font-size: 15px; color: rgba(255,255,255,.82); }
      .sub a { color: #fff; text-decoration: underline; text-underline-offset: 3px; }
      .body { max-width: var(--container); margin: -26px auto 56px; padding: 0 24px; }
      .stats { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 22px; }
      .stat {
        background: #fff; border: 1px solid var(--border); border-radius: var(--radius);
        padding: 18px 24px; min-width: 168px;
        box-shadow: 0 1px 2px rgba(15,23,42,.05), 0 8px 24px -18px rgba(15,23,42,.35);
      }
      .stat .n { font-size: 30px; font-weight: 600; color: var(--navy); line-height: 1.1; }
      .stat .l {
        font-size: 11px; font-weight: 600; letter-spacing: .12em;
        text-transform: uppercase; color: var(--text-secondary); margin-top: 5px;
      }
      .card {
        background: #fff; border: 1px solid var(--border);
        border-radius: var(--radius); overflow: hidden;
        box-shadow: 0 1px 2px rgba(15,23,42,.05), 0 8px 24px -18px rgba(15,23,42,.35);
      }
      .scroll { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
      thead th {
        background: var(--navy); color: #fff; text-align: left;
        font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
        padding: 13px 20px; white-space: nowrap;
      }
      thead th.right, td.right { text-align: right; }
      tbody td { padding: 12px 20px; border-top: 1px solid var(--border); vertical-align: middle; }
      tbody tr:nth-child(even) { background: #fbfcfe; }
      tbody tr:hover { background: #f2f6fc; }
      td a { color: var(--navy); text-decoration: none; font-weight: 500; word-break: break-all; }
      td a:hover { color: var(--brand-end); text-decoration: underline; text-underline-offset: 3px; }
      td.num { color: var(--text-secondary); font-size: 13px; width: 56px; }
      td.date { color: var(--text-secondary); font-size: 13px; white-space: nowrap; }
      .foot { margin-top: 18px; font-size: 13px; color: var(--text-secondary); }
      .foot a { color: var(--navy); }
      @media (max-width: 640px) {
        h1 { font-size: 26px; }
        .band { padding: 32px 18px 44px; }
        .body { padding: 0 18px; }
        thead th, tbody td { padding: 11px 14px; }
      }
    </style>
  </xsl:template>

  <!-- ============ /sitemap.xml : the index ============ -->
  <xsl:template match="/s:sitemapindex">
    <html lang="en">
      <head>
        <title>XML Sitemap Index | SMSLocal</title>
        <xsl:call-template name="head"/>
      </head>
      <body>
        <div class="band">
          <div class="wrap">
            <div class="brand"><img src="/smslocal-logo-v2.svg" alt="SMSLocal"/></div>
            <span class="eyebrow">Sitemap Index</span>
            <h1>XML <em>Sitemap</em> Index</h1>
            <p class="sub">
              Generated for <a href="https://smslocal-com-website.vercel.app/">smslocal-com-website.vercel.app</a>
              — submit this URL to Google Search Console.
            </p>
          </div>
        </div>
        <div class="body">
          <div class="stats">
            <div class="stat">
              <div class="n"><xsl:value-of select="count(s:sitemap)"/></div>
              <div class="l">Sub-sitemaps</div>
            </div>
          </div>
          <div class="card">
            <div class="scroll">
              <table>
                <thead>
                  <tr><th>Sitemap URL</th><th class="right">Last Modified</th></tr>
                </thead>
                <tbody>
                  <xsl:for-each select="s:sitemap">
                    <tr>
                      <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                      <td class="date right"><xsl:value-of select="s:lastmod"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>
          <p class="foot">This page is a styled view of the raw XML. Search engines read the XML directly.</p>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- ============ each sub-sitemap ============ -->
  <xsl:template match="/s:urlset">
    <html lang="en">
      <head>
        <title>XML Sitemap | SMSLocal</title>
        <xsl:call-template name="head"/>
      </head>
      <body>
        <div class="band">
          <div class="wrap">
            <div class="brand"><img src="/smslocal-logo-v2.svg" alt="SMSLocal"/></div>
            <span class="eyebrow">Sitemap</span>
            <h1>XML <em>Sitemap</em></h1>
            <p class="sub">
              <xsl:value-of select="count(s:url)"/> URLs on this sitemap.
              <a href="/sitemap.xml">Back to the sitemap index</a>.
            </p>
          </div>
        </div>
        <div class="body">
          <div class="stats">
            <div class="stat">
              <div class="n"><xsl:value-of select="count(s:url)"/></div>
              <div class="l">URLs</div>
            </div>
          </div>
          <div class="card">
            <div class="scroll">
              <table>
                <thead>
                  <tr><th>#</th><th>URL</th><th class="right">Last Modified</th></tr>
                </thead>
                <tbody>
                  <xsl:for-each select="s:url">
                    <tr>
                      <td class="num"><xsl:value-of select="position()"/></td>
                      <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                      <td class="date right"><xsl:value-of select="s:lastmod"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>
          <p class="foot">This page is a styled view of the raw XML. Search engines read the XML directly.</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
