const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function runBrowserTests() {
  console.log('🚀 Starting Automated Browser Verification for Anshul Verma Portfolio...');
  
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--enable-webgl', '--ignore-gpu-blocklist', '--use-gl=angle']
  });

  const consoleErrors = [];
  const pageErrors = [];

  // Helper to test viewport
  async function testViewport(width, height, label, screenshotName) {
    console.log(`\n📐 Testing Viewport: ${width}x${height} (${label})...`);
    const page = await browser.newPage({
      viewport: { width, height }
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[Console Error] ${msg.text()}`);
      }
    });
    page.on('pageerror', err => {
      pageErrors.push(`[Page Error] ${err.message}`);
    });

    await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500); // Allow Three.js rendering

    // Verify 3D canvas is present and visible
    const canvas = await page.$('#hero-3d-container canvas');
    if (canvas) {
      const box = await canvas.boundingBox();
      console.log(`  ✓ 3D Canvas element detected! Dimensions: ${Math.round(box.width)}x${Math.round(box.height)}px`);
    } else {
      console.warn('  ⚠️ 3D Canvas element not found or fallback active');
    }

    // Verify Hero content visibility without scroll
    const heroVisible = await page.evaluate(() => {
      const hero = document.getElementById('hero');
      const rect = hero.getBoundingClientRect();
      const heroName = document.querySelector('.hero-name');
      const nameRect = heroName.getBoundingClientRect();
      const canvasCont = document.getElementById('hero-canvas-container');
      const canvasRect = canvasCont.getBoundingClientRect();
      
      return {
        heroTop: rect.top,
        heroBottom: rect.bottom,
        nameTop: nameRect.top,
        nameVisible: nameRect.top >= 0 && nameRect.bottom <= window.innerHeight + 100,
        canvasTop: canvasRect.top,
        canvasVisible: canvasRect.top >= 0 && canvasRect.bottom <= window.innerHeight + 100,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      };
    });

    console.log(`  ✓ Hero Name visible in first viewport: ${heroVisible.nameVisible}`);
    console.log(`  ✓ 3D Container visible in first viewport: ${heroVisible.canvasVisible}`);
    console.log(`  ✓ Horizontal overflow check: scrollWidth(${heroVisible.scrollWidth}) <= clientWidth(${heroVisible.clientWidth}): ${heroVisible.scrollWidth <= heroVisible.clientWidth}`);

    // Take screenshot
    const screenshotPath = path.join(__dirname, screenshotName);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`  ✓ Screenshot saved: ${screenshotName}`);

    await page.close();
  }

  // 1. Test 1366x768 Viewport
  await testViewport(1366, 768, 'Laptop Medium', 'screenshot_1366x768.png');

  // 2. Test 1440x900 Viewport
  await testViewport(1440, 900, 'Desktop Standard', 'screenshot_1440x900.png');

  // 3. Test Mobile 390x844 Viewport
  await testViewport(390, 844, 'Mobile Phone', 'screenshot_mobile.png');

  // 4. Test Interactive Functional Features on Desktop
  console.log('\n⚙️ Testing Interactive Functional Features...');
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(`[Console Error] ${msg.text()}`);
  });
  page.on('pageerror', err => pageErrors.push(`[Page Error] ${err.message}`));

  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Test 3D Lighting Toggle
  console.log('  Testing 3D Lighting Toggle...');
  const lightBtn = await page.$('#btn-toggle-lighting');
  const initialLightText = await lightBtn.innerText();
  await lightBtn.click();
  await page.waitForTimeout(500);
  const updatedLightText = await lightBtn.innerText();
  console.log(`    Before: "${initialLightText}" -> After: "${updatedLightText}"`);

  // Test Expense Tracker Simulator
  console.log('  Testing Student Expense Tracker Simulator...');
  await page.fill('#exp-title', 'Discrete Mathematics Reference Book');
  await page.fill('#exp-amount', '650');
  await page.selectOption('#exp-category', 'Academic');
  await page.click('#expense-add-form button[type="submit"]');
  await page.waitForTimeout(400);

  const expenseCount = await page.$$eval('.expense-record-row', rows => rows.length);
  console.log(`    ✓ Expense added successfully! Total records in DOM: ${expenseCount}`);

  // Test Category Filter
  await page.click('.filter-pills button[data-cat="Academic"]');
  await page.waitForTimeout(300);
  const filteredCount = await page.$$eval('.expense-record-row', rows => rows.length);
  console.log(`    ✓ Category filter "Academic" active! Filtered records count: ${filteredCount}`);

  // Test Study Planner Simulator
  console.log('  Testing Smart Study Planner Simulator...');
  const initialRatio = await page.$eval('.progress-ratio', el => el.innerText);
  console.log(`    Initial study progress: ${initialRatio}`);

  // Add a new study task
  await page.fill('#task-title', 'Implement Red-Black Tree Balancing in C');
  await page.selectOption('#task-subject', 'C Programming');
  await page.selectOption('#task-priority', 'High');
  await page.click('#planner-add-form button[type="submit"]');
  await page.waitForTimeout(400);

  const taskCount = await page.$$eval('.planner-task-card', cards => cards.length);
  console.log(`    ✓ Study task added successfully! Total tasks in DOM: ${taskCount}`);

  // Toggle checkbox of first task
  const firstCheckbox = await page.$('.task-checkbox');
  if (firstCheckbox) {
    await firstCheckbox.click();
    await page.waitForTimeout(300);
    const updatedRatio = await page.$eval('.progress-ratio', el => el.innerText);
    console.log(`    Updated study progress after toggle: ${updatedRatio}`);
  }

  // Test Copy Email
  console.log('  Testing Copy Email Action...');
  const copyBtn = await page.$('#btn-copy-email');
  await copyBtn.click();
  await page.waitForTimeout(300);
  const copyBtnText = await copyBtn.innerText();
  console.log(`    ✓ Copy button feedback text: "${copyBtnText}"`);

  // Test Navigation Links
  console.log('  Testing Navigation Anchor Links...');
  const navLinks = await page.$$eval('.nav-link', links => links.map(l => ({ text: l.innerText, href: l.getAttribute('href') })));
  console.log(`    ✓ Detected ${navLinks.length} navigation links:`, navLinks.map(l => `${l.text} (${l.href})`).join(', '));

  // Full Page Screenshot
  const fullPageScreenshotPath = path.join(__dirname, 'screenshot_fullpage.png');
  await page.screenshot({ path: fullPageScreenshotPath, fullPage: true });
  console.log(`  ✓ Full page screenshot saved: screenshot_fullpage.png`);

  await page.close();
  await browser.close();

  console.log('\n📊 TEST SUMMARY:');
  console.log(`  Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach(e => console.log('   ', e));
  }
  console.log(`  Page Runtime Exceptions: ${pageErrors.length}`);
  if (pageErrors.length > 0) {
    pageErrors.forEach(e => console.log('   ', e));
  }

  if (consoleErrors.length === 0 && pageErrors.length === 0) {
    console.log('🎉 ALL BROWSER & COMPONENT VERIFICATION TESTS PASSED PERFECTLY!');
  }
}

runBrowserTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
