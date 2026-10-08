// Run against the same local server and Playwright environment as export_screens.cjs.
const {chromium} = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname,'..');
(async () => {
  const browser = await chromium.launch({headless:true,
    ...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  try {
    const page = await browser.newPage({viewport:{width:1536,height:1408},deviceScaleFactor:1});
    await page.goto((process.env.GUI_PREVIEW_ORIGIN||'http://127.0.0.1:8030')+'/surface-kit.html');
    await page.waitForFunction(()=>window.STORM_SURFACE_SOURCE);
    const source = await page.evaluate(()=>window.STORM_SURFACE_SOURCE);
    const file = 'textures/polished-surfaces.png';
    await page.screenshot({path:path.join(root,file),omitBackground:true});
    const manifest = {version:source.version,
      notes:'Blank appearance layers only. Labels, icons and game data remain separate. Transparent shadow padding is included except on full-width header crops.',
      textures:{polishedSurfaces:{file,width:source.width,height:source.height,
        sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex')}},
      sprites:source.sprites};
    fs.writeFileSync(path.join(root,'surface-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
    fs.writeFileSync(path.join(root,'surface-manifest.js'),'window.STORM_SURFACE_MANIFEST = '+JSON.stringify(manifest,null,2)+';\n');
    const lua = ['-- Clean v2 surfaces. Upload polished-surfaces.png and set ImageId.',
      'local Assets = {}','Assets.ImageId = ""',
      `Assets.UploadedSize = Vector2.new(${source.width}, ${source.height})`,
      'Assets.Sprites = {'];
    for (const [name,s] of Object.entries(source.sprites)) {
      const [x,y,w,h]=s.rect;const [l,t,r,b]=s.sliceCenter;
      lua.push(`    ["${name}"] = { offset = Vector2.new(${x}, ${y}), size = Vector2.new(${w}, ${h}), slice = Rect.new(${l}, ${t}, ${r}, ${b})${s.fillColor?', fillColor = "'+s.fillColor+'"':''} },`);
    }
    lua.push('}',
      'function Assets.Apply(target, name)',
      '    local spec = assert(Assets.Sprites[name], "Unknown surface: " .. name)',
      '    assert(Assets.ImageId ~= "", "Upload polished-surfaces.png and set StormGuiSurfaces.ImageId")',
      `    local scale = Assets.UploadedSize / Vector2.new(${source.width}, ${source.height})`,
      '    target.Image = Assets.ImageId',
      '    target.ImageRectOffset = spec.offset * scale',
      '    target.ImageRectSize = spec.size * scale',
      '    target.ScaleType = Enum.ScaleType.Slice',
      '    target.SliceCenter = Rect.new(spec.slice.Min * scale, spec.slice.Max * scale)',
      '    target.BackgroundTransparency = if spec.fillColor then 0 else 1',
      '    if spec.fillColor then target.BackgroundColor3 = Color3.fromHex(spec.fillColor) end',
      'end','return Assets','');
    fs.writeFileSync(path.join(root,'roblox/StormGuiSurfaces.luau'),lua.join('\n'));
    console.log(`PASS exported ${Object.keys(source.sprites).length} blank surfaces, transparent atlas, measured metadata and Luau adapter`);
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
