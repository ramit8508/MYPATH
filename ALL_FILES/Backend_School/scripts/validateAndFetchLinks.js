import fs from 'fs';
import path from 'path';
import axios from 'axios';
import XLSX from 'xlsx';
import dotenv from 'dotenv';

dotenv.config();

const INPUT_XLSX = process.argv[2] || path.resolve('../MYPATH EXAM LINKS.xlsx');
const OUTPUT_DIR = path.resolve('./scraper_output');
const HTML_DIR = path.join(OUTPUT_DIR, 'scraped_html');
const REPORT_FILE = path.join(OUTPUT_DIR, 'link_validation_report.json');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(HTML_DIR)) fs.mkdirSync(HTML_DIR, { recursive: true });

function splitPotentialUrls(text) {
  if (!text || typeof text !== 'string') return [];
  // Normalize whitespace
  let s = text.replace(/\r/g, ' ').replace(/\n/g, ' ').trim();

  // If multiple http/https occurrences concatenated, split them
  // Keep 'http' markers by splitting on '(?=http[s]?:\/\/)'
  const parts = s.split(/(?=https?:\/\/)/gi).map(p => p.trim()).filter(Boolean);

  // Also handle cases like 'domain.com/path' without scheme
  const results = [];
  for (let p of parts) {
    // Remove wrapping characters
    p = p.replace(/^\(|^\[|^\{|\)|\]|\}$/g, '').trim();
    // If it still contains multiple 'http' occurrences (rare), break further
    if ((p.match(/https?:\/\//gi) || []).length > 1) {
      const sub = p.split(/https?:\/\//gi).map(x => x.trim()).filter(Boolean);
      for (let i = 0; i < sub.length; i++) {
        let prefix = sub[i];
        if (!/^https?:\/\//i.test(prefix)) prefix = 'https://' + prefix;
        results.push(prefix);
      }
    } else {
      results.push(p);
    }
  }

  // Clean results
  return results.map(u => u.replace(/["' ,;]+$/g, '').trim()).filter(Boolean);
}

function normalizeUrl(u) {
  if (!u || typeof u !== 'string') return null;
  u = u.trim();
  // If it's just a domain without scheme, add https://
  if (!/^https?:\/\//i.test(u)) {
    // If it looks like 'www.' or contains a dot, consider it a host
    if (/^[\w.-]+\.[a-z]{2,6}(\/|$)?/i.test(u)) {
      u = 'https://' + u;
    } else {
      return null;
    }
  }
  // Remove duplicate slashes (but keep protocol)
  u = u.replace(/([^:]\/)\/+/g, '$1/');
  // Trim trailing punctuation
  u = u.replace(/[)\]\."'\s]+$/g, '');
  return u;
}

async function fetchUrl(url, timeout = 15000) {
  try {
    const resp = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MYPATH-Scraper/1.0)' },
      timeout,
      maxRedirects: 5,
      validateStatus: status => status >= 200 && status < 400
    });
    return { ok: true, status: resp.status, headers: resp.headers, data: resp.data };
  } catch (err) {
    return { ok: false, error: err.message, response: err.response ? { status: err.response.status, data: err.response.data } : null };
  }
}

function readSpreadsheet(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('Spreadsheet not found:', filePath);
    process.exit(1);
  }
  const wb = XLSX.readFile(filePath);
  const sheets = wb.SheetNames;
  const rows = [];
  sheets.forEach(name => {
    const sheet = wb.Sheets[name];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    data.forEach((row, rowIndex) => {
      rows.push({ sheet: name, rowIndex, row });
    });
  });
  return rows;
}

(async function main() {
  console.log('Reading spreadsheet:', INPUT_XLSX);
  const rows = readSpreadsheet(INPUT_XLSX);
  console.log(`Total rows read (all sheets): ${rows.length}`);

  const foundUrls = [];
  const mapping = []; // per row mapping

  for (const r of rows) {
    const { sheet, rowIndex, row } = r;
    // For each cell in row
    const cellUrls = [];
    for (let c = 0; c < row.length; c++) {
      const cell = row[c];
      if (!cell) continue;
      const parts = splitPotentialUrls(String(cell));
      for (const p of parts) {
        const norm = normalizeUrl(p);
        if (norm) cellUrls.push(norm);
      }
    }
    if (cellUrls.length) {
      const unique = [...new Set(cellUrls)];
      mapping.push({ sheet, rowIndex, originalRow: row, extracted: unique });
      for (const u of unique) {
        if (!foundUrls.includes(u)) foundUrls.push(u);
      }
    }
  }

  console.log(`
✓ Extracted ${foundUrls.length} unique candidate URLs from spreadsheet`);

  // Validate each URL by fetching header or page (lightweight GET)
  const results = [];
  let idx = 0;
  for (const url of foundUrls) {
    idx++;
    process.stdout.write(`\r[${idx}/${foundUrls.length}] Checking ${url} `);
    const res = await fetchUrl(url).catch(e => ({ ok: false, error: e.message }));
    const record = { url, ok: res.ok, status: res.status || null, contentType: res.headers ? res.headers['content-type'] : null };
    if (res.ok && res.headers && String(res.headers['content-type'] || '').includes('text/html')) {
      // Save HTML
      try {
        const safeName = url.replace(/https?:\/\//, '').replace(/[\/:?&=#%]+/g, '_').slice(0, 250);
        const filePath = path.join(HTML_DIR, `${safeName}.html`);
        fs.writeFileSync(filePath, res.data, 'utf-8');
        record.htmlFile = filePath;
      } catch (e) {
        record.saveError = e.message;
      }
    }
    results.push(record);
  }
  console.log('\n\nValidation complete. Preparing report...');

  const report = { timestamp: new Date().toISOString(), inputFile: INPUT_XLSX, totalCandidates: foundUrls.length, results, mapping };
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), 'utf-8');
  console.log('Saved report to', REPORT_FILE);
  console.log('Saved HTML pages (for valid HTML sites) to', HTML_DIR);

  // Summarize
  const validCount = results.filter(r => r.ok && r.contentType && r.contentType.includes('text/html')).length;
  const pdfCount = results.filter(r => r.ok && r.contentType && r.contentType.includes('pdf')).length;
  const failCount = results.filter(r => !r.ok).length;
  console.log(`\nSummary:\n  Valid HTML pages: ${validCount}\n  PDFs: ${pdfCount}\n  Failed/Unavailable: ${failCount}\n`);

  console.log('Next steps:');
  console.log(' - Review the report file and the scraped_html folder');
  console.log(' - If you want, I can now run AI extraction (Gemini) on the saved HTML files');
  console.log(' - Or I can attempt to auto-correct unresolved links using heuristics');

  process.exit(0);
})();
