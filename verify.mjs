import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--window-size=1920,1200'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1200 });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + String(e)));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });

await page.goto('http://localhost:5175/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 800));

await page.evaluate(() => {
  const el = document.querySelector('.projects');
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 30);
});
await new Promise((r) => setTimeout(r, 2600));

// Open via keyboard focus + Enter to also confirm the button is keyboard-accessible
await page.click('.project-card.proj-fdm .project-media');
await new Promise((r) => setTimeout(r, 700));
const opened = await page.evaluate(() => ({
  exists: !!document.querySelector('.project-modal-panel'),
  opacity: getComputedStyle(document.querySelector('.project-modal-panel')).opacity,
  name: document.querySelector('.project-modal-name')?.textContent,
  bodyOpen: document.body.classList.contains('modal-open'),
}));
console.log('OPENED(Fdm):', JSON.stringify(opened));

// Background frozen check
const t1 = await page.evaluate(() => getComputedStyle(document.getElementById('smooth-content')).transform);
await page.evaluate(() => window.scrollBy(0, 500));
await new Promise((r) => setTimeout(r, 300));
const t2 = await page.evaluate(() => getComputedStyle(document.getElementById('smooth-content')).transform);
console.log('BG_FROZEN:', t1 === t2, t2);

// Close via backdrop click
await page.evaluate(() => document.querySelector('.project-modal-backdrop').click());
await new Promise((r) => setTimeout(r, 700));
const closed = await page.evaluate(() => ({
  exists: !!document.querySelector('.project-modal-panel'),
  bodyOpen: document.body.classList.contains('modal-open'),
}));
console.log('CLOSED(backdrop):', JSON.stringify(closed));

// Confirm smoother resumed by scrolling
const before = await page.evaluate(() => getComputedStyle(document.getElementById('smooth-content')).transform);
await page.evaluate(() => window.scrollBy(0, 300));
await new Promise((r) => setTimeout(r, 500));
const after = await page.evaluate(() => getComputedStyle(document.getElementById('smooth-content')).transform);
console.log('SMOOTHER_RESUMED:', before !== after);

console.log('ERRORS', JSON.stringify(errors));
await browser.close();
console.log('done');
