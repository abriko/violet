const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');
const html2pptx = require('./html2pptx');
const notesMap = require('./notes-map');

const META = {
  title: 'AIOps Platform Proposal',
  author: 'Hermes Agent / GPT-5.4',
  subject: 'Manulife HK DevOps & Platform executive proposal',
};
const OUT_FILE = 'aiops-visual-deck-manulife.pptx';

const args = process.argv.slice(2);
const LINT_ONLY = args.includes('--lint');
const STRICT = args.includes('--strict');

async function build() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = META.title;
  pptx.author = META.author;
  pptx.subject = META.subject;
  pptx.company = 'Manulife';
  pptx.lang = 'en-US';

  const slidesDir = path.join(__dirname, 'slides');
  const files = fs.readdirSync(slidesDir)
    .filter(f => /^slide\d+\.html$/.test(f))
    .sort();

  if (files.length === 0) throw new Error(`No slides found in ${slidesDir}`);

  const failures = [];

  for (const file of files) {
    const m = file.match(/^slide(\d+)\.html$/);
    const num = parseInt(m[1], 10);
    process.stdout.write(`Checking ${file}... `);
    try {
      const before = pptx.slides.length;
      await html2pptx(path.join(slidesDir, file), pptx);
      const after = pptx.slides.length;
      if (notesMap[num] && after > before) pptx.slides[after - 1].addNotes(notesMap[num]);
      console.log('ok');
    } catch (e) {
      console.log('FAIL');
      failures.push({ file, message: e.message });
      if (STRICT) break;
    }
  }

  if (failures.length > 0) {
    console.error(`\n${'='.repeat(60)}`);
    console.error(`${failures.length} / ${files.length} slide(s) failed validation:`);
    console.error('='.repeat(60));
    for (const { file, message } of failures) {
      console.error(`\n${file}`);
      const lines = message.split('\n').filter(Boolean);
      for (const line of lines) console.error(`  ${line.trim()}`);
    }
    console.error(`\n→ See references/html2pptx-contract.md for fixes.`);
    process.exit(1);
  }

  if (LINT_ONLY) {
    console.log(`\nLint OK. ${files.length} slide(s) would build. (--lint mode, skipping pptx write)`);
    return;
  }

  await pptx.writeFile({ fileName: path.join(__dirname, OUT_FILE) });
  console.log(`
Written: ${OUT_FILE}`);
}

build().catch(e => { console.error(e); process.exit(1); });
