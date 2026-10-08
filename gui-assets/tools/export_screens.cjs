// Optional developer export: npm install --no-save playwright, then start the
// Python preview server documented in README.md before running this script.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
(async () => {
  const browser = await chromium.launch({ headless: true,
    ...(process.env.CHROMIUM_PATH ? {executablePath: process.env.CHROMIUM_PATH} : {}),
    args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: {width:1920,height:1080}, deviceScaleFactor:1 });
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    page.on('response', r => {if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);});
    await page.goto((process.env.GUI_PREVIEW_ORIGIN || 'http://127.0.0.1:8030') + '/screens.html?export=1');
    await page.waitForFunction(() => window.TORNADO_SCREENS);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...Object.values(STORM_GUI_MANIFEST.textures), ...Object.values(STORM_CONTENT_MANIFEST.textures), {file:'screens/storm-background.png'}].map(t => new Promise((resolve,reject) => {const i=new Image(); i.onload=resolve;i.onerror=()=>reject(new Error(t.file));i.src=t.file;})));
    });
    const screens = await page.evaluate(() => TORNADO_SCREENS.list);
    for (const [id] of screens) {
      await page.evaluate(id => TORNADO_SCREENS.navigate(id), id);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const geometry = await page.evaluate(() => {
        const body=document.querySelector('.menu-body'), header=document.querySelector('.modal-header'), modal=document.querySelector('.game-modal');
        return body ? {overflow:body.scrollHeight-body.clientHeight, horizontal:body.scrollWidth-body.clientWidth, headerGap:Math.abs(header.getBoundingClientRect().width-(modal.clientWidth*1.2))} : null;
      });
      assert(!geometry || geometry.overflow <= 2, `${id}: vertical clipping ${JSON.stringify(geometry)}`);
      assert(!geometry || geometry.horizontal === 0, `${id}: horizontal clipping`);
      assert(!geometry || geometry.headerGap < 1, `${id}: header does not fill modal`);
      await page.screenshot({path:path.join(root,'screens',id+'.png')});
      console.log(`PASS ${id}: 1920×1080 export, full-width header, no menu clipping`);
    }
    await page.evaluate(() => TORNADO_SCREENS.navigate('farm-loot'));
    await page.getByRole('button',{name:'INDEX',exact:true}).click();
    assert.equal(await page.locator('.game-modal').getAttribute('data-screen'),'loot-index');
    await page.getByRole('button',{name:'Close menu'}).click();
    assert.equal(await page.locator('.game-modal').count(),0);
    await page.getByRole('button',{name:'PETS',exact:true}).click();
    await page.getByRole('button',{name:'EGGS',exact:true}).click();
    assert.equal(await page.locator('.game-modal').getAttribute('data-screen'),'eggs');
    await page.getByRole('button',{name:'BUY $5K',exact:true}).click();
    assert(await page.locator('#preview-toast').isVisible());
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.game-modal').count(),0);
    await page.setViewportSize({width:390,height:844});
    await page.goto((process.env.GUI_PREVIEW_ORIGIN || 'http://127.0.0.1:8030')+'/screens.html#pets');
    await page.waitForFunction(() => window.TORNADO_SCREENS);
    await page.locator('#screen-picker').selectOption('decor');
    assert.equal(await page.locator('.game-modal').getAttribute('data-screen'),'decor');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors,[]);
    console.log('PASS tabs, bottom navigation, close/Escape, preview-only action, mobile picker, no JS/network errors');
  } finally { await browser.close(); }
})().catch(e => {console.error(e);process.exitCode=1;});
