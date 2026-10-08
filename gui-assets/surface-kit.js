'use strict';
// Blank assets share exactly the same appearance classes as the full screens.
// Pixel rectangles include 12px of transparent padding for the edge shadows.
(() => {
  const root = document.getElementById('surface-kit');
  const sprites = {};
  function add(name, rect, classes, options = {}) {
    const [x,y,w,h] = rect;
    const slot = document.createElement('div');
    slot.className = 'surface-slot';
    Object.assign(slot.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});
    const face = document.createElement('div');
    face.className = 'surface-face '+classes;
    if (options.tone) face.dataset.tone = options.tone;
    if (options.rarity) face.style.setProperty('--rarity-color', options.rarity);
    if (options.header) {
      face.style.setProperty('--menu-color', options.header[0]);
      face.style.setProperty('--menu-deep', options.header[1]);
    }
    slot.append(face);root.append(slot);
    sprites[name] = {texture:'polishedSurfaces',rect,scaleType:'Slice',sliceCenter:[32,32,w-32,h-32],contentInset:[24,24,24,24]};
    if (options.header) {
      sprites[name].rect = [x+12,y+12,w-24,h-24];
      sprites[name].sliceCenter = [16,16,w-40,h-40];
      sprites[name].contentInset = [16,12,16,12];
      sprites[name].fillColor = options.header[1];
    }
  }
  ['green','gold','orange','pink','blue','disabled','greenHover','greenPressed'].forEach((tone,i) => {
    const variant = tone==='greenHover'?' is-hover':tone==='greenPressed'?' is-pressed':'';
    add('button.'+tone,[32+(i%4)*376,32+Math.floor(i/4)*120,336,88],'game-button'+variant,{tone:tone.startsWith('green')?'green':tone});
  });
  [['common','#9aa8ba'],['uncommon','#69e52d'],['rare','#51bbff'],['epic','#b96cff'],['legendary','#ffd038'],['mythic','#ff5fc8']].forEach(([kind,rarity],i) => {
    add('card.'+kind,[32+(i%3)*288,284+Math.floor(i/3)*292,232,260],'collectible-card',{rarity});
  });
  [['base','#ffb954','#da7524'],['pets','#fd8fd0','#bc438a'],['gifts','#ffe783','#c38e24'],['quests','#7fddff','#2277c2'],['pass','#c4a5ff','#7950d5']].forEach(([name,light,dark],i) => {
    add('header.'+name,[904,284+i*112,600,88],'modal-header',{header:[light,dark]});
  });
  add('panel.shell',[32,892,700,480],'game-modal');
  add('tab.normal',[792,910,320,72],'game-tab');
  add('tab.selected',[792,1018,320,72],'game-tab active');
  add('hud.stat',[792,1130,320,112],'hud-stat');
  window.STORM_SURFACE_SOURCE = {version:'2.0',width:1536,height:1408,sprites};
})();
