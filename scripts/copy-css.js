const fs = require('fs');
const path = require('path');

const srcCss = path.join(__dirname, '../src/styles/seo-analysis.css');
const distCss = path.join(__dirname, '../dist/styles/seo-analysis.css');
const distStylesDir = path.join(__dirname, '../dist/styles');

if (!fs.existsSync(distStylesDir)) {
  fs.mkdirSync(distStylesDir, { recursive: true });
}

if (fs.existsSync(srcCss)) {
  fs.copyFileSync(srcCss, distCss);
  console.log('✓ CSS file copied to dist/styles/');
} else {
  console.error('✗ CSS file not found at:', srcCss);
  process.exit(1);
}


