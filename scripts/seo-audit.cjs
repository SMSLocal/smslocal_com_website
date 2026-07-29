const fs = require('fs');
const path = require('path');
const glob = require('fs').readdirSync;

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full));
    else if (entry.name.endsWith('.jsx')) out.push(full);
  }
  return out;
}

const files = walk(path.join(__dirname, '..', 'src', 'pages'));

for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const m = t.match(/<Seo[\s\S]*?\/>/);
  if (!m) {
    console.log(f, '| NO <Seo> TAG');
    continue;
  }
  const block = m[0];
  const titleMatch = block.match(/title=\{?["'`]([^"'`}]*)["'`]\}?/);
  const descMatch = block.match(/description=\{?["'`]([^"'`}]*)["'`]\}?/);
  const title = titleMatch ? titleMatch[1] : null;
  const desc = descMatch ? descMatch[1] : null;
  const full = title ? title + ' | SMSLocal' : null;
  console.log(
    f.replace(/.*site[\\\/]/, ''),
    '| title:', full ? full.length : 'DYNAMIC/none',
    '| desc:', desc ? desc.length : 'DYNAMIC/none'
  );
}
