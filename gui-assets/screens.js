'use strict';
(() => {
  const core = window.STORM_GUI_MANIFEST;
  const extra = window.STORM_CONTENT_MANIFEST;
  if (!core || !extra) { document.getElementById('menu-root').textContent = 'Keep manifest.js and content-manifest.js beside this preview.'; return; }
  const textures = { ...core.textures, ...extra.textures };
  const sprites = { ...core.sprites, ...extra.sprites };
  const screenList = [
    ['farm-loot', 'My Farm · Loot', '134221'], ['loot-index', 'My Farm · Index', '134230'],
    ['pets', 'Storm Pups · Pets', '134236'], ['eggs', 'Storm Pups · Eggs', '134240'],
    ['free-rewards', 'Free Rewards', '134214'], ['playtime-gifts', 'Playtime Gifts', '134245'],
    ['quests', 'Quests', '134251'], ['rebirth', 'My Farm · Rebirth', '134256'],
    ['decor', 'My Farm · Decor', '134300'], ['storm-pass', 'Storm Pass', '134305'], ['hud', 'Gameplay HUD', '134312'],
  ];
  const rarity = { common: ['#9aa8ba','#647082'], uncommon: ['#69e52d','#226a1f'], rare: ['#51bbff','#174e92'], epic: ['#b96cff','#5b247f'], legendary: ['#ffd038','#96570e'], mythic: ['#ff5fc8','#81245f'] };
  let activeScreen = 'farm-loot';
  let toastTimer;
  const el = (tag, cls = '', text) => { const node = document.createElement(tag); node.className = cls; if (text !== undefined) node.textContent = text; return node; };
  function art(name, cls = '') {
    const spec = sprites[name];
    if (!spec) throw new Error('Missing screen sprite ' + name);
    const texture = textures[spec.texture], [x,y,w,h] = spec.rect;
    const node = el('span', 'sprite '+cls); node.dataset.sprite = name; node.setAttribute('aria-hidden','true');
    node.style.backgroundImage = `url('${texture.file}')`;
    node.style.backgroundSize = `${texture.width/w*100}% ${texture.height/h*100}%`;
    node.style.backgroundPosition = `${texture.width===w?0:x/(texture.width-w)*100}% ${texture.height===h?0:y/(texture.height-h)*100}%`;
    if (spec.fillColor) node.style.backgroundColor = spec.fillColor;
    return node;
  }
  function toast(text) { const node=document.getElementById('preview-toast');node.textContent=text;node.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.hidden=true,3000); }
  function action(label, color='green', onClick, cls='') {
    const node=el('button','game-button '+cls,label);node.type='button';node.prepend(art('control.'+color,'sprite-bg'));
    node.addEventListener('click',onClick||(()=>toast('Visual preview only — no purchase or game progress has changed.')));return node;
  }
  function disc(icon, kind='common', cls='') {const n=el('div','icon-disc '+cls);const c=rarity[kind]||rarity.common;n.style.setProperty('--disc-light',c[0]);n.style.setProperty('--disc-dark',c[1]);n.append(art(icon));return n;}
  function progress(value,max,label,cls='') {const node=el('div','progress-track '+cls);node.setAttribute('role','progressbar');node.setAttribute('aria-valuenow',value);node.setAttribute('aria-valuemax',max);node.setAttribute('aria-valuemin',0);node.setAttribute('aria-label',label);const fill=el('i');fill.style.width=Math.min(100,value/max*100)+'%';node.append(fill,el('span','game-text',label));return node;}
  function section(title,color='') { return el('h2','section-heading '+color,title); }
  function summary(left,right,icon='icon.salvage') {const node=el('div','summary-strip');const a=el('span','game-text',left);a.prepend(art(icon));node.append(a,el('span','game-text green-text',right));return node;}
  function card({name,icon,kind='common',detail,income,button,buttonColor='green',badge=false}) {
    const n=el('article','collectible-card');const c=rarity[kind]||rarity.common;n.style.setProperty('--rarity-color',c[0]);n.style.setProperty('--rarity-wash',c[1]+'55');
    if(badge)n.append(el('span','rarity-label',badge===true?kind.toUpperCase():badge));
    if(icon)n.append(disc(icon,kind));else{const d=el('div','icon-disc');d.append(el('span','unknown','?'));n.append(d);}
    n.append(el('h3','item-name game-text',name));if(income)n.append(el('p','item-income game-text',income));if(detail)n.append(el('p','item-detail',detail));
    if(button)n.append(action(button,buttonColor));return n;
  }
  function farmTabs(selected) {return tabs([['farm-loot','LOOT','icon.salvage',''],['loot-index','INDEX','icon.quests','blue'],['rebirth','REBIRTH','icon.rebirth','purple'],['decor','DECOR','item.tulip','green']],selected);}
  function petTabs(selected) {return tabs([['pets','PETS','icon.pets','pink'],['eggs','EGGS','item.egg','purple']],selected);}
  function tabs(entries,selected) {const n=el('nav','tabs');n.setAttribute('aria-label','Menu tabs');for(const [id,label,icon,color] of entries){const b=el('button',`game-tab ${selected===id?'active '+color:''}`,label);b.type='button';b.setAttribute('aria-pressed',String(selected===id));b.prepend(art(icon));b.addEventListener('click',()=>navigate(id));n.append(b);}return n;}
  function modal(title,color,icon,content,id){const n=el('section','game-modal');n.setAttribute('aria-label',title);n.dataset.screen=id;const header=el('header','modal-header');header.style.backgroundColor=sprites['header.'+color].fillColor;header.append(art('header.'+color,'sprite-bg'));const badge=el('div','header-medallion');badge.append(art(icon));const close=el('button','close-button');close.type='button';close.setAttribute('aria-label','Close menu');close.append(art('icon.close'));close.addEventListener('click',()=>navigate('hud'));header.append(badge,el('h1','game-title',title),close);const body=el('div','menu-body');body.append(content);n.append(header,body);return n;}
  function loot() {
    const n=el('div');n.append(farmTabs('farm-loot'),summary('5 / 12 on your farm','+$76.65/s'));
    const grid=el('div','cards-grid loot-grid');
    const rows=[['Toilet','toilet','uncommon','+$35/s','SELL $1,575'],['Huge Pig','pig','common','+$26.25/s','SELL $1,181'],['Mailbox','mailbox','common','+$7/s','SELL $315'],['Duck','duck','common','+$4.20/s','SELL $189'],['Duck','duck','common','+$4.20/s','SELL $189']];
    rows.forEach(([name,icon,kind,income,button])=>grid.append(card({name,icon:'item.'+icon,kind,income,button,buttonColor:'orange',badge:true})));n.append(grid);return modal('MY FARM','base','icon.base',n,'farm-loot');
  }
  function index() {
    const n=el('div');n.append(farmTabs('loot-index'));const strip=el('div','index-progress');strip.append(el('strong','game-text','LOOT DISCOVERED'),progress(4,35,'4 / 35'),el('strong','gold-text','Discovery rewards'));n.append(strip);const milestones=el('div','milestones');[5,10,15,20,25,30].forEach(x=>milestones.append(el('div','milestone','🔒 4 / '+x)));n.append(milestones,section('ALL LOOT'));
    const grid=el('div','cards-grid index-grid');const found={1:['Duck','duck','+$1.20/s'],3:['Mailbox','mailbox','+$2/s'],4:['Pig','pig','+$2.50/s'],9:['Toilet','toilet','+$10/s']};
    for(let i=0;i<18;i++){const f=found[i];const kind=i<5?'common':i<10?'uncommon':i<15?'rare':'epic';grid.append(card({name:f?f[0]:'???',icon:f?'item.'+f[1]:null,kind,income:f?f[2]:null,detail:!f?kind.toUpperCase():null}));}n.append(grid);return modal('MY FARM','base','icon.base',n,'loot-index');
  }
  const pets=[
    ['Rainbow Owl','owl','legendary','+40% cash',true,false],['Hail Penguin','penguin','epic','+3 planks a trip',true,false],['Breezy Bunny','bunny','mythic','+20% speed',true,'RAINBOW'],['Thunder Hamster','hamster','legendary','+22% lift',false,'GOLDEN'],
    ['Puddle Pup','puppy','legendary','+1 plank a trip',false,'GOLDEN'],['Cloud Kitten','kitten','legendary','+15% cash',false,'GOLDEN'],['Puddle Pup','puppy','legendary','+1 plank a trip',false,'GOLDEN'],['Puddle Pup','puppy','legendary','+1 plank a trip',false,'GOLDEN'],
    ['Cloud Kitten','kitten','legendary','+15% cash',false,'GOLDEN'],['Thunder Hamster','hamster','rare','+10% lift',false,false],['Puddle Pup','puppy','common','+1 plank a trip',false,false],['Puddle Pup','puppy','common','+1 plank a trip',false,false],
  ];
  function petScreen() {
    const n=el('div');n.append(petTabs('pets'));const status=el('div','pet-overview');status.append(el('strong','game-text','🐾 OUT 3 / 3'),el('strong','muted','OWNED 16 / 60'),action('★ EQUIP BEST','gold'));n.append(status);const layout=el('div','pets-layout'),grid=el('div','cards-grid pets-grid');
    for(const [name,icon,kind,detail,out,badge] of pets)grid.append(card({name,icon:'item.'+icon,kind,detail,button:out?'✓ OUT':null,badge}));
    const details=el('aside','pet-summary');details.append(disc('icon.pets','mythic'),el('h3','game-text','Your pets out give you:'));const list=el('ul','bonus-list');[['icon.build','+3 planks a trip'],['item.rocket','+26% speed'],['icon.cash','+40% cash'],['icon.pass','+15% XP']].forEach(([icon,text])=>{const li=el('li','game-text',text);li.prepend(art(icon));list.append(li);});details.append(list,el('p','small-help','Bonuses from your equipped team'));layout.append(grid,details);n.append(layout);return modal('STORM PUPS','pets','icon.pets',n,'pets');
  }
  function eggs() {
    const n=el('div');n.append(petTabs('eggs'),el('p','description-line','Find eggs in tornado drops, gifts and quests, or buy them here or at the Hatchery!'));const grid=el('div','cards-grid eggs-grid');
    const data=[['STORM EGG','#4c9bd8','BUY $5K',[['puppy','Puddle Pup','40%'],['bunny','Breezy Bunny','34%'],['kitten','Cloud Kitten','20%'],['hamster','Thunder Hamster','6.0%']]],['THUNDER EGG','#6d43d0','BUY $250K',[['hamster','Thunder Hamster','34%'],['kitten','Cloud Kitten','28%'],['fox','Twister Fox','20%'],['penguin','Hail Penguin','15%'],['owl','Rainbow Owl','3.0%']]],['RAINBOW EGG','#ef3baf','99 ROBUX',[['owl','Rainbow Owl','30%'],['fox','Twister Fox','30%'],['penguin','Hail Penguin','28%'],['dragon','Storm Dragon','12%']]]];
    for(const [name,color,price,odds] of data){const c=el('article','egg-card');c.style.setProperty('--egg-color',color);c.append(disc('item.egg'),el('h3','game-text',name),el('p','','None in your basket'));const ul=el('ul','egg-odds');odds.forEach(([icon,label,chance])=>{const li=el('li','game-text');li.append(art('item.'+icon),el('span','',label),el('b','',chance));ul.append(li);});c.append(ul,el('div','egg-mutations game-text','✦ Golden 6.6%   🌈 Rainbow 1.3%'),action(price));grid.append(c);}n.append(grid);return modal('STORM PUPS','pets','icon.pets',n,'eggs');
  }
  function freeRewards() {
    const n=el('div');n.append(section('DAILY REWARD'));const grid=el('div','cards-grid rewards-grid');const values=['$500','$1,500','$4,000','$10,000','$25,000','$60,000','$150,000'];const icons=['icon.cash','icon.cash','item.moneybag','item.moneybag','item.diamond','item.diamond','item.crown'];
    values.forEach((value,i)=>{const c=el('article','daily-card');c.append(el('h3','game-text','DAY '+(i+1)));if(i===0){const d=el('div','icon-disc');d.append(el('span','check-symbol game-text','✓'));c.append(d);}else c.append(disc(icons[i]));c.append(el('strong','daily-value game-text',value));if(i===6)c.append(el('span','daily-extra game-text','+30m 2× strength'));if(i===0)c.append(el('span','small-help','CLAIMED'));grid.append(c);});n.append(grid,el('p','next-reward game-text','Next reward in 1070:58'),section('FREE STUFF','pink'));
    const socials=el('div','social-rewards');[['★','Favorite the game','+$500','FAVORITE'],['🔔','Turn on notifications','+$300','TURN ON']].forEach(([icon,title,value,label])=>{const row=el('div','social-row');const copy=el('div');copy.append(el('h3','game-text',title),el('p','game-text',value));row.append(el('span','social-icon',icon),copy,action(label,'pink'));socials.append(row);});n.append(socials);return modal('FREE REWARDS','pets','icon.freeRewards',n,'free-rewards');
  }
  function playtime() {
    const n=el('div');n.append(el('p','description-line','Play to open them all! New gifts in 18h 17m'));const grid=el('div','cards-grid gifts-grid');
    const rows=[['3 MIN','2 min of cash','icon.cash','#58d528','✓ OPENED'],['6 MIN','10 min 2× strength','icon.strength','#ff981b','✓ OPENED'],['10 MIN','5 min of cash','item.moneybag','#58d528','✓ OPENED'],['15 MIN','Storm Egg','item.egg','#73b4ed','✓ OPENED'],['20 MIN','10 min of cash','item.moneybag','#58d528','OPEN!'],['30 MIN','15 min 2× luck','icon.luck','#2abe86','9:45'],['45 MIN','Thunder Egg','item.egg','#8455d2','24:45'],['60 MIN','STORM CRATE!','item.crate','#ffcd35','39:45']];
    rows.forEach(([time,label,icon,color,state],i)=>{const c=el('article','gift-card');c.style.setProperty('--gift-color',color);c.append(disc(icon),el('h3','game-text',time),el('p','',label));if(i<5){const b=action(state,'green');if(i<4)b.disabled=true;c.append(b);}else c.append(el('strong','gift-timer game-text',state));grid.append(c);});n.append(grid);return modal('PLAYTIME GIFTS','gifts','icon.playtime',n,'playtime-gifts');
  }
  function quests() {
    const n=el('div');n.append(section('DAILY QUESTS','blue'),el('p','description-line','New quests in 18h 17m'));const list=el('div','quests-list');const rows=[['item.rocket','Get flung 200 studs in total',18,200],['item.egg','Hatch 1 egg',1,1],['item.hands','Make 1 sky catch',0,1]];
    rows.forEach(([icon,title,value,max])=>{const r=el('article','quest-row'),info=el('div','quest-info');info.append(el('h3','game-text',title),el('p','game-text','💵 2 min of cash  ·  ★ 60 XP'),progress(value,max,`${value} / ${max}`));r.append(disc(icon),info);if(value===max){const b=action('✓ DONE');b.disabled=true;r.append(b);}list.append(r);});n.append(list,section('WEEKLY QUEST','purple'));const week=el('article','quest-row weekly'),info=el('div','quest-info');info.append(el('h3','game-text','Hand in 800 planks'),el('p','','A new one in 4d 18h'),progress(0,800,'0 / 800'));week.append(disc('icon.build','epic'),info);n.append(week);return modal('QUESTS','quests','icon.quests',n,'quests');
  }
  function rebirth() {
    const n=el('div');n.append(farmTabs('rebirth'));const body=el('div','rebirth-content'),row=el('div','rebirth-explainer'),badge=el('div','rebirth-emblem');badge.append(art('icon.rebirth'));const copy=el('div','rebirth-copy');copy.append(el('h2','game-title','REBIRTH #4'),el('h3','rebirth-multiplier game-text','CASH ×2.5  »  ×3'),el('p','loss','You start again with no cash, an empty farm and no upgrades.'),el('p','keep','You keep your Strength, your Index, your passes and rewards.'));row.append(badge,copy);body.append(row,progress(200787,64000000,'$200,787 / $64M'));const b=action('REBIRTH','disabled');b.disabled=true;body.append(b,el('span','small-help','Reach the cash requirement to rebirth.'));n.append(body);return modal('MY FARM','base','icon.base',n,'rebirth');
  }
  function decor() {
    const n=el('div');n.append(farmTabs('decor'),summary('0 / 4 out on your farm',"Each gives a boost while it’s out!",'item.tulip'));const grid=el('div','cards-grid decor-grid');
    [['FLOWER CART','tulip','uncommon','+3% luck','BUY $25K'],['FOUNTAIN','fountain','legendary','+2% cash','BUY $75K'],['DUCK POND','duck','legendary','+3% cash','BUY $250K'],['BEE HIVES','bee','rare','+8% XP','BUY $750K'],['GAZEBO','gazebo','uncommon','+6% luck','VIEW'],['GOLDEN COW STATUE','goldenCow','legendary','+8% cash','VIEW']].forEach(([name,icon,kind,income,button])=>grid.append(card({name,icon:'item.'+icon,kind,income,button})));n.append(grid);return modal('MY FARM','base','icon.base',n,'decor');
  }
  function stormPass() {
    const n=el('div'),top=el('div','pass-top'),title=el('div','pass-title');title.append(el('h3','game-text','Season 1: Storm Chasers'),el('p','','Ends in 54 days · every bit of XP counts'),progress(105,400,'TIER 3 · 105/400 XP'));const key=el('div','track-key');key.append(el('span','', '🔵 FREE'),el('span','gold-text','★ PREMIUM'));top.append(title,key,action('⚡ GET PREMIUM','gold'));n.append(top);const grid=el('div','pass-grid');
    const free=[['icon.strength','10 min 2× strength'],['icon.cash','3 min of cash'],['item.egg','Storm Egg'],['icon.cash','4 min of cash'],['icon.luck','10 min 2× luck'],['icon.cash','5 min of cash'],['item.egg','Storm Egg'],['icon.cash','6 min of cash']];
    const premium=[['icon.cash','5 min of cash'],['icon.luck','15 min 2× luck'],['icon.freeRewards','Epic loot'],['item.egg','Thunder Egg'],['icon.cash','8 min of cash'],['icon.strength','20 min 2× strength'],['icon.freeRewards','Legendary loot'],['item.egg','Thunder Egg']];
    for(let i=0;i<8;i++){const col=el('div','pass-column '+(i<2?'unlocked':''));col.append(el('div','tier-number game-text',String(i+2)));for(const [data,isPremium] of [[free,false],[premium,true]]){const c=el('div','pass-card '+(isPremium?'premium':''));c.append(art(data[i][0]),el('p','game-text',data[i][1]));const label=isPremium?'PREMIUM':i<2?'CLAIM':'🔒 LOCKED';const b=action(label,isPremium?'gold':i<2?'green':'disabled',null,'small');if(!isPremium&&i>=2)b.disabled=true;c.append(b);col.append(c);}grid.append(col);}n.append(grid,el('div','pass-legend','FREE REWARDS  ·  PREMIUM REWARDS  ·  Earn XP to unlock the next tier'));return modal('STORM PASS','rebirth','icon.pass',n,'storm-pass');
  }
  function hud() {
    const root=document.getElementById('hud');root.replaceChildren();const left=el('aside','hud-left');const level=el('div','level-line');const track=el('div','level-track');track.append(el('i'),el('span','game-text','61 / 266 XP'));level.append(el('strong','level-badge game-text','LV 9'),track);left.append(level);
    [['icon.cash','$200,787','+$72.45/s · ×3.5'],['icon.strength','1.17K','Carry 11 planks · +2/plank'],['icon.salvage','4/12','Index 4/35'],['icon.tornado','2','Tornadoes survived']].forEach(([icon,value,label])=>{const row=el('div','hud-stat'),copy=el('div');copy.append(el('strong','stat-value',value),el('small','',label));row.append(art(icon),copy);left.append(row);});
    const top=el('div','hud-top');top.append(el('div','storm-lock game-text','🔒 DOORS SHUT! EF0 TORNADO!'),el('div','build-counter game-text','🌲 WOODEN 0 / 20'));const ups=el('div','build-ups');['+10%','+25%','+50%','FINISH!'].forEach(t=>{const b=el('button','mini-boost game-text',t);b.addEventListener('click',()=>toast('Boost button preview — no purchase was made.'));ups.append(b);});top.append(ups,el('div','mega-storm game-text','⚡ MEGA STORM IN 16:49'));
    const alert=el('div','hud-alert');alert.append(el('div','dazed game-text','😵 DAZED! Can’t lift for 29s'),el('div','get-inside game-text','⚠ GET INSIDE!'),el('div','distance game-text','156 studs'),el('div','direction game-text','⌄'));
    const right=el('aside','hud-right');[['SHOP',null,null],['2X STRENGTH','icon.strength','149'],['2X CASH','icon.cash','199'],['LUCKY CHARM','icon.luck','249']].forEach(([title,icon,price])=>{const b=el('button','shop-entry game-text');b.append(icon?art(icon):el('span','shop-emoji','🛒'),el('span','',title));if(price)b.append(el('span','price-tag game-text','R$ '+price));b.addEventListener('click',()=>toast('Shop preview — connect this button to your existing shop.'));right.append(b);});root.append(left,top,alert,right);
  }
  const navItems=[['free-rewards','FREE','freeRewards','#ff3e9d','#db0872'],['farm-loot','FARM','base','#ffad45','#f27400'],['pets','PETS','pets','#ff60bb','#e9178b'],['playtime-gifts','GIFTS','playtime','#ffd34d','#f4a200'],['quests','QUESTS','quests','#71b7ff','#1665e3'],['rebirth','REBIRTH','rebirth','#b778ff','#6c23e5'],['storm-pass','PASS','pass','#ac73ff','#6825df']];
  function navigation(){const nav=document.getElementById('bottom-navigation');nav.replaceChildren();for(const [id,label,icon,top,bottom] of navItems){const selected=id===activeScreen||(id==='farm-loot'&&['loot-index','decor'].includes(activeScreen))||(id==='pets'&&activeScreen==='eggs');const b=el('button','nav-button '+(selected?'selected':''));b.type='button';b.setAttribute('aria-label',label);b.setAttribute('aria-pressed',String(selected));b.style.background=`linear-gradient(${top},${bottom})`;b.append(art('icon.'+icon),el('span','nav-label',label));if(['free-rewards','playtime-gifts','storm-pass'].includes(id))b.append(el('span','nav-alert game-text','!'));if(id==='playtime-gifts')b.append(el('span','nav-ready game-text','READY!'));b.addEventListener('click',()=>navigate(id));nav.append(b);}const settings=el('button','nav-button settings');settings.style.background='linear-gradient(#67758f,#37435a)';settings.setAttribute('aria-label','Settings');settings.append(art('icon.settings'));settings.addEventListener('click',()=>toast('Settings icon preview. Existing game settings remain unchanged.'));nav.append(settings);}
  const renderers={'farm-loot':loot,'loot-index':index,pets:petScreen,eggs,'free-rewards':freeRewards,'playtime-gifts':playtime,quests,rebirth,decor,'storm-pass':stormPass};
  function navigate(id) {
    activeScreen=screenList.some(s=>s[0]===id)?id:'farm-loot';document.getElementById('menu-root').replaceChildren();document.getElementById('game-stage').classList.toggle('modal-shown',activeScreen!=='hud');if(activeScreen!=='hud')document.getElementById('menu-root').append(renderers[activeScreen]());navigation();document.getElementById('screen-picker').value=activeScreen;document.getElementById('download-screen').href='screens/'+activeScreen+'.png';document.title=screenList.find(s=>s[0]===activeScreen)[1]+' — Tornado GUI';history.replaceState(null,'','#'+activeScreen);document.getElementById('preview-toast').hidden=true;document.dispatchEvent(new CustomEvent('screenchange',{detail:activeScreen}));
  }
  function resize(){const view=document.getElementById('viewport');const scale=Math.min(view.clientWidth/1600,view.clientHeight/900);document.getElementById('game-stage').style.transform=`scale(${scale})`;}
  const params=new URLSearchParams(location.search);if(params.get('export')==='1')document.body.classList.add('screenshot-only');if(params.get('overlay')==='1')document.body.classList.add('standalone-overlay');
  const picker=document.getElementById('screen-picker');for(const [id,label] of screenList){const o=el('option','',label);o.value=id;picker.append(o);}picker.addEventListener('change',e=>navigate(e.target.value));document.getElementById('fullscreen-button').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.getElementById('viewport').requestFullscreen();}catch{toast('Use your browser’s full-screen command to enlarge the preview.');}});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&activeScreen!=='hud')navigate('hud');});window.addEventListener('resize',resize);document.addEventListener('fullscreenchange',resize);window.addEventListener('hashchange',()=>navigate(location.hash.slice(1)));hud();navigate(location.hash.slice(1));resize();window.TORNADO_SCREENS={navigate,list:screenList};
})();
