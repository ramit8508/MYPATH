import fs from 'fs';
import path from 'path';
import axios from 'axios';

const REPORT_FILE = path.resolve('./scraper_output/link_validation_report.json');
const HTML_DIR = path.resolve('./scraper_output/scraped_html');
const FIXED_REPORT = path.resolve('./scraper_output/fixed_urls_report.json');

if (!fs.existsSync(REPORT_FILE)) {
  console.error('Previous report not found. Run validateAndFetchLinks.js first.');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf-8'));
const failedUrls = report.results.filter(r => !r.ok).map(r => r.url);

console.log(`Found ${failedUrls.length} failed URLs from previous run. Attempting fixes...\n`);

function generateVariants(url) {
  const variants = [url];
  try {
    const u = new URL(url);
    const host = u.hostname;
    const proto = u.protocol;
    const path = u.pathname + u.search + u.hash;

    // Try opposite protocol
    const altProto = proto === 'https:' ? 'http:' : 'https:';
    variants.push(`${altProto}//${host}${path}`);

    // Try with/without www
    if (host.startsWith('www.')) {
      const noWww = host.slice(4);
      variants.push(`${proto}//${noWww}${path}`);
      variants.push(`${altProto}//${noWww}${path}`);
    } else {
      variants.push(`${proto}//www.${host}${path}`);
      variants.push(`${altProto}//www.${host}${path}`);
    }

    // Try with trailing slash if missing
    if (!path.endsWith('/') && !path.includes('?') && !path.includes('#')) {
      variants.push(`${proto}//${host}${path}/`);
      variants.push(`${altProto}//${host}${path}/`);
    }

    // Try root if path looks broken
    if (path.length > 50 || path.includes('//')) {
      variants.push(`${proto}//${host}/`);
      variants.push(`${altProto}//${host}/`);
    }
  } catch (e) {
    // If URL parsing fails, just return original
  }

  return [...new Set(variants)];
}

async function fetchUrl(url, timeout = 10000) {
  try {
    const resp = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MYPATH-Scraper/1.0)' },
      timeout,
      maxRedirects: 5,
      validateStatus: status => status >= 200 && status < 400
    });
    return { ok: true, status: resp.status, headers: resp.headers, data: resp.data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

(async function main() {
  const fixed = [];
  const stillFailed = [];

  for (let i = 0; i < failedUrls.length; i++) {
    const original = failedUrls[i];
    process.stdout.write(`\r[${i + 1}/${failedUrls.length}] Fixing ${original.slice(0, 60)}...`);

    const variants = generateVariants(original);
    let found = false;

    for (const variant of variants) {
      if (variant === original) continue; // Already tried
      const res = await fetchUrl(variant);
      if (res.ok) {
        const contentType = res.headers ? res.headers['content-type'] : '';
        if (contentType && contentType.includes('text/html')) {
          // Save HTML
          const safeName = variant.replace(/https?:\/\//, '').replace(/[\/:?&=#%]+/g, '_').slice(0, 250);
          const filePath = path.join(HTML_DIR, `${safeName}.html`);
          fs.writeFileSync(filePath, res.data, 'utf-8');
          fixed.push({ original, fixed: variant, status: res.status, htmlFile: filePath });
          found = true;
          break;
        } else {
          // Non-HTML (PDF, etc.)
          fixed.push({ original, fixed: variant, status: res.status, contentType });
          found = true;
          break;
        }
      }
    }

    if (!found) {
      stillFailed.push(original);
    }
  }

  console.log('\n\nFix attempt complete.\n');
  console.log(`✓ Fixed: ${fixed.length}`);
  console.log(`✗ Still failed: ${stillFailed.length}\n`);

  const fixReport = {
    timestamp: new Date().toISOString(),
    totalAttempted: failedUrls.length,
    fixed,
    stillFailed
  };

  fs.writeFileSync(FIXED_REPORT, JSON.stringify(fixReport, null, 2), 'utf-8');
  console.log(`Saved fix report to ${FIXED_REPORT}`);

  if (fixed.length > 0) {
    console.log('\nExamples of fixed URLs:');
    fixed.slice(0, 10).forEach(f => console.log(`  ${f.original} → ${f.fixed}`));
  }

  if (stillFailed.length > 0) {
    console.log('\nSample of still-failed URLs (top 20):');
    stillFailed.slice(0, 20).forEach(u => console.log(`  - ${u}`));
  }

  console.log('\nNext: Run Gemini extraction on all saved HTML files.');
  process.exit(0);
})();
