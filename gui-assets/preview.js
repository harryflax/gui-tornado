'use strict';
(() => {
  const manifest = window.STORM_GUI_MANIFEST;
  if (!manifest) { document.getElementById('error').textContent = 'Manifest is missing. Keep manifest.js beside preview.html.'; return; }
  function el(tag, className = '', text) { const node = document.createElement(tag); node.className = className; if (text !== undefined) node.textContent = text; return node; }
  function sprite(name, className = '') {
    const spec = manifest.sprites[name];
    if (!spec) throw new Error(`Missing sprite: ${name}`);
    const texture = manifest.textures[spec.texture];
    const [x, y, w, h] = spec.rect;
    const node = el('span', `sprite ${className}`);
    node.setAttribute('aria-hidden', 'true');
    node.dataset.sprite = name;
    node.style.backgroundImage = `url('${texture.file}')`;
    node.style.backgroundSize = `${texture.width / w * 100}% ${texture.height / h * 100}%`;
    node.style.backgroundPosition = `${texture.width === w ? 0 : x / (texture.width - w) * 100}% ${texture.height === h ? 0 : y / (texture.height - h) * 100}%`;
    return node;
  }
  function face(text, color = 'green') { const node = el('div','art-button game-text',text); node.prepend(sprite(`control.${color}`)); return node; }
  function header(title, color, icon) { const node=el('div','sample-header');node.append(sprite(`header.${color}`),sprite(`icon.${icon}`,'header-icon'),el('h2','game-text',title),sprite('icon.close','close'));return node; }
  function card(rarity, icon, title, subtitle, button, buttonColor = 'green') {const node=el('div','sample-card');node.append(sprite(`card.${rarity}`,'card-background'),el('strong','rarity-name game-text',rarity),sprite(`icon.${icon}`,'card-item'),el('strong','item-name game-text',title),el('strong','rate game-text',subtitle),face(button,buttonColor));return node;}
  function render(screen) {
    const stage=document.getElementById('stage');stage.replaceChildren();
    if(screen==='hud') {
      const hud=el('div','hud-preview');const alert=el('div','hud-top game-text','TORNADO INCOMING');alert.prepend(sprite('header.warning'));hud.append(alert);
      const stats=el('div','hud-stats');
      [['cash','$200,787','+$72.45/s · ×3.5'],['strength','1.17K','Carry 11 planks'],['salvage','4 / 12','Storm loot collected']].forEach(([icon,title,desc])=>{const row=el('div','hud-stat');const labels=el('div');labels.append(el('strong','game-text',title),el('small','',desc));row.append(sprite('icon.'+icon),labels);stats.append(row);});hud.append(stats);
      const nav=el('div','nav-preview');[['freeRewards','FREE'],['base','FARM'],['pets','PETS'],['playtime','GIFTS'],['quests','QUESTS'],['rebirth','REBIRTH'],['pass','PASS'],['settings','SETTINGS']].forEach(([icon,title])=>{const tile=el('div','nav-tile');tile.append(sprite('icon.'+icon),el('span','game-text',title));nav.append(tile);});hud.append(nav);stage.append(hud);return;
    }
    const windowNode=el('div','sample-window');
    if(screen==='base') {
      windowNode.append(header('MY BASE','base','base'));const tabs=el('div','tabs');['LOOT','INDEX','REBIRTH','DECOR'].forEach((t,i)=>tabs.append(el('span',`tab game-text ${i===0?'active':''}`,t)));windowNode.append(tabs);
      const info=el('div','sample-info');info.append(el('strong','game-text','4 / 12 at your base'),el('strong','positive game-text','+$72.45/s'));windowNode.append(info);
      const cards=el('div','sample-cards');cards.append(card('uncommon','cash','Cash cache','+$4/s','SELL','orange'),card('rare','salvage','Storm crate','+$12/s','SELL','orange'),card('epic','shield','Storm relic','+$18/s','SELL','orange'),card('legendary','tornado','Tempest core','+$38/s','SELL','orange'));windowNode.append(cards);
    } else if(screen==='rewards') {
      windowNode.append(header('DAILY REWARDS','rewards','freeRewards'));const info=el('div','sample-info');info.append(el('strong','game-text','A little help for the next storm'),el('strong','positive game-text','EXAMPLE LAYOUT'));windowNode.append(info);
      const cards=el('div','sample-cards');cards.append(card('common','cash','Cash','DAY 1','CLAIMED','disabled'),card('rare','strength','Strength boost','DAY 2','CLAIM'),card('epic','luck','Lucky boost','DAY 3','LOCKED','disabled'),card('legendary','salvage','Storm crate','DAY 7','LOCKED','disabled'));windowNode.append(cards);
    } else {
      windowNode.append(header('QUESTS','quests','quests'));const rows=el('div','quest-rows');[['build','Help build your shelter','Keep the existing objective and reward values.'],['tornado','Survive the storm','Live progress comes from the game.'],['salvage','Bring the loot home','Original claim logic stays unchanged.']].forEach(([icon,title,desc],i)=>{const row=el('div','quest');const content=el('div','quest-content');content.append(el('strong','game-text',title),el('p','',desc));const track=el('div','quest-track');const fill=el('span');fill.style.width=[65,100,25][i]+'%';track.append(fill);content.append(track);row.append(sprite('icon.'+icon),content,face(i===1?'CLAIM':'IN PROGRESS',i===1?'green':'disabled'));rows.append(row);});windowNode.append(rows);
    }
    stage.append(windowNode);
  }
  for(const [name,spec] of Object.entries(manifest.sprites)) {
    const group=name.startsWith('icon.')?'icons':(name.startsWith('card.')||name.startsWith('panel.'))?'cards':'controls';
    const tile=el('div','asset-tile');const art=el('div','asset-art checker');const image=sprite(name);const ratio=spec.rect[2]/spec.rect[3];const height=Math.min(120,210/ratio);image.style.width=height*ratio+'px';image.style.height=height+'px';art.append(image);const meta=el('div','asset-meta');meta.append(el('strong','',name),el('span','',`${spec.rect[2]} × ${spec.rect[3]} · ${spec.scaleType}`));tile.append(art,meta);document.getElementById(group).append(tile);
  }
  for(const texture of Object.values(manifest.textures)) {const figure=el('figure');const a=el('a','checker');a.href=texture.file;a.download=texture.file.split('/').pop();const image=el('img');image.src=texture.file;image.alt=a.download;image.loading='lazy';a.append(image);figure.append(a,el('figcaption','',`${a.download} · ${texture.width} × ${texture.height}`));document.getElementById('atlases').append(figure);}
  for(const button of document.querySelectorAll('[data-screen]')) button.addEventListener('click',()=>{document.querySelectorAll('[data-screen]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render(button.dataset.screen);});
  render('base');
})();
