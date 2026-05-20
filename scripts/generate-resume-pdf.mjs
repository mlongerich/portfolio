/**
 * Generates public/resume.pdf from resume.md using Chrome headless.
 * Run: node scripts/generate-resume-pdf.mjs
 */
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const md = readFileSync(join(root, 'resume.md'), 'utf8');

// Simple markdown → HTML (no external dep)
function mdToHtml(text) {
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^\*\*(.+?)\*\*$/gm, '<p><strong>$1</strong></p>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, (m) => `<ul>${m}</ul>`)
    .replace(/^\| (.+) \|$/gm, (_, row) => {
      const cells = row.split(' | ').map(c => c.trim());
      return '<tr>' + cells.map(c => `<td>${c.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, (m) => `<table>${m}</table>`)
    .replace(/^([^<\n].+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/\n{2,}/g, '\n');
}

const body = mdToHtml(md);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Michael Longerich — Resume</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 11px;
    line-height: 1.5;
    color: #1a1a1a;
    max-width: 780px;
    margin: 0 auto;
    padding: 36px 40px;
  }
  h1 { font-size: 20px; font-weight: 700; margin-bottom: 2px; }
  h2 { font-size: 13px; font-weight: 700; margin: 18px 0 6px; border-bottom: 1px solid #ddd; padding-bottom: 3px; text-transform: uppercase; letter-spacing: 0.04em; color: #333; }
  h3 { font-size: 12px; font-weight: 700; margin: 12px 0 2px; color: #1a1a1a; }
  p { margin: 4px 0; color: #333; }
  ul { margin: 4px 0 4px 16px; }
  li { margin: 2px 0; color: #333; }
  hr { border: none; border-top: 1px solid #ddd; margin: 14px 0; }
  a { color: #1a1a1a; text-decoration: underline; }
  code { font-family: 'SF Mono', Menlo, monospace; font-size: 10px; background: #f4f4f4; padding: 1px 3px; border-radius: 2px; }
  strong { color: #1a1a1a; }
  table { border-collapse: collapse; width: 100%; margin: 6px 0; font-size: 10.5px; }
  td { padding: 3px 8px 3px 0; vertical-align: top; color: #333; }
  td:first-child { white-space: nowrap; min-width: 140px; }
  @media print {
    body { padding: 20px 28px; }
    a { color: #1a1a1a; text-decoration: none; }
  }
</style>
</head>
<body>
${body}
</body>
</html>`;

const htmlPath = join(root, 'public', '_resume_tmp.html');
const pdfPath = join(root, 'public', 'resume.pdf');

writeFileSync(htmlPath, html);

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
execSync(`"${chrome}" --headless=new --no-sandbox --disable-gpu --print-to-pdf="${pdfPath}" --print-to-pdf-no-header "file://${htmlPath}"`, { stdio: 'inherit' });

unlinkSync(htmlPath);
console.log('Generated: public/resume.pdf');
