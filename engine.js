(function (root) {
  'use strict';
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const genres = {
    Action: [40, 48, 12, 10, 40, 50, 20, 55, 25],
    Adventure: [12, 35, 53, 48, 37, 15, 45, 35, 20],
    RPG: [20, 35, 45, 40, 40, 20, 40, 35, 25],
    Strategy: [45, 45, 10, 10, 38, 52, 35, 40, 25],
    Simulation: [48, 42, 10, 8, 46, 46, 50, 30, 20],
    Casual: [18, 62, 20, 12, 68, 20, 20, 45, 35]
  };
  const areas = ['Engine', 'Gameplay', 'Story', 'Dialogue', 'Level design', 'AI', 'World design', 'Graphics', 'Sound'];
  const stages = ['Prototype', 'Production', 'Presentation'];
  const designRatios = [.12, .65, .95, .95, .55, .12, .8, .5, .7];
  const topics = {
    Space: ['Action', 'Strategy', 'Simulation'], Mystery: ['Adventure', 'RPG'], Racing: ['Action', 'Simulation'], Fantasy: ['RPG', 'Adventure', 'Strategy'],
    Animals: ['Casual', 'Simulation'], Pirates: ['Adventure', 'RPG', 'Action'], City: ['Strategy', 'Simulation'], Sports: ['Action', 'Simulation', 'Casual'],
    Robots: ['Action', 'Strategy'], Cooking: ['Casual', 'Simulation'], History: ['Strategy', 'RPG'], Music: ['Casual', 'Simulation'],
    Wilderness: ['Adventure', 'Simulation'], Detective: ['Adventure', 'RPG'], Dreams: ['Adventure', 'Casual'], Industry: ['Strategy', 'Simulation']
  };
  // Fictional hardware parodies, ordered by industry generation. All hardware art is original.
  const platforms = [
    {id:'slate',name:'Slate Micro',maker:'Slate',kind:'Home computer',start:0,end:380,license:0,cost:1200,reach:.9,audience:'Adult',genres:['Strategy','Simulation','Adventure'],color:'#64b6bb',style:'computer',era:'Home-computer pioneers',inspiration:'Early keyboard-based home computers'},
    {id:'byte',name:'Comfy 64',maker:'Comfy',kind:'Home computer',start:0,end:260,license:3000,cost:1800,reach:1.05,audience:'Everyone',genres:['Action','Casual'],color:'#d0b88f',style:'keyboard',era:'Home-computer pioneers',inspiration:'The 64 KB home-computer era'},
    {id:'nova',name:'Ninbento 8',maker:'Ninbento',kind:'8-bit console',start:26,end:470,license:18000,cost:5500,reach:1.35,audience:'Young',genres:['Action','RPG','Casual'],color:'#c76860',style:'eightbit',era:'Cartridge revival',inspiration:'Boxy gray 8-bit cartridge consoles'},
    {id:'moss',name:'GamePal',maker:'Ninbento',kind:'Monochrome handheld',start:105,end:700,license:24000,cost:5000,reach:1.25,audience:'Young',genres:['Casual','RPG'],color:'#b3b987',style:'handheld',era:'Games in your pocket',inspiration:'Monochrome cartridge handhelds'},
    {id:'stride',name:'MegaStride 16',maker:'Sego',kind:'16-bit console',start:156,end:630,license:36000,cost:6500,reach:1.55,audience:'Everyone',genres:['Action','Simulation'],color:'#597a87',style:'sixteen',era:'The 16-bit rivalry',inspiration:'Black 16-bit consoles with bold arcade ambitions'},
    {id:'vector',name:'Vector PC',maker:'Open hardware',kind:'PC',start:184,end:3000,license:0,cost:8500,reach:1.6,audience:'Adult',genres:['Strategy','Simulation','Adventure'],color:'#7ab8cc',style:'computer',era:'The multimedia PC',inspiration:'An open PC ecosystem that keeps evolving'},
    {id:'super',name:'Super Ninbento',maker:'Ninbento',kind:'16-bit console',start:208,end:780,license:42000,cost:8000,reach:1.65,audience:'Young',genres:['RPG','Action','Casual'],color:'#a391bd',style:'super',era:'The 16-bit rivalry',inspiration:'Rounded 16-bit consoles and colorful controllers'},
    {id:'pulse',name:'PlayCrate',maker:'Soniq',kind:'Disc-based 3D console',start:312,end:900,license:80000,cost:14000,reach:2.1,audience:'Everyone',genres:['Action','RPG','Adventure'],color:'#9fa8a6',style:'disc',era:'The polygon revolution',inspiration:'Gray disc-based consoles that brought 3D to the mainstream'},
    {id:'n64',name:'Ninbento 64',maker:'Ninbento',kind:'64-bit cartridge console',start:364,end:820,license:95000,cost:16500,reach:1.9,audience:'Young',genres:['Action','RPG','Casual'],color:'#536960',style:'cartridge3d',era:'The polygon revolution',inspiration:'Dark cartridge consoles with analog controllers'},
    {id:'palcolor',name:'GamePal Colour',maker:'Ninbento',kind:'Color handheld',start:468,end:970,license:62000,cost:9500,reach:1.7,audience:'Young',genres:['Casual','RPG'],color:'#a59ac7',style:'handheldcolor',era:'A brighter pocket',inspiration:'Color-screen handhelds in translucent shells'},
    {id:'dream',name:'DreamDeck',maker:'Sego',kind:'Online-ready console',start:520,end:850,license:85000,cost:14000,reach:1.8,audience:'Everyone',genres:['Action','Simulation'],color:'#e0d5bd',style:'dream',era:'The online experiment',inspiration:'Compact pale consoles with a spiral-era online ambition'},
    {id:'prism',name:'PlayCrate 2',maker:'Soniq',kind:'DVD-era console',start:625,end:1190,license:150000,cost:24000,reach:2.9,audience:'Everyone',genres:['Action','RPG','Simulation'],color:'#526b94',style:'tower',era:'Living-room entertainment',inspiration:'Black ribbed towers and the DVD boom'},
    {id:'xcube',name:'X-Cube',maker:'Macrosoft',kind:'Hard-drive console',start:676,end:1150,license:160000,cost:25000,reach:2.3,audience:'Adult',genres:['Action','Simulation'],color:'#77a45a',style:'xconsole',era:'The online living room',inspiration:'Big dark consoles with built-in storage and a green identity'},
    {id:'lunchbox',name:'Ninbento Lunchbox',maker:'Ninbento',kind:'Mini-disc console',start:700,end:1150,license:125000,cost:22000,reach:2.1,audience:'Young',genres:['Action','RPG','Casual'],color:'#8070ad',style:'cube',era:'Small box, big ideas',inspiration:'Colorful cube-shaped consoles with a carrying handle'},
    {id:'dual',name:'Ninbento Twin',maker:'Ninbento',kind:'Dual-screen handheld',start:832,end:1400,license:150000,cost:23000,reach:2.9,audience:'Young',genres:['Casual','RPG','Simulation'],color:'#a6bdc8',style:'dual',era:'Touch changes the rules',inspiration:'Folding dual-screen touch handhelds'},
    {id:'portable',name:'PlayCrate Portable',maker:'Soniq',kind:'Widescreen handheld',start:884,end:1375,license:165000,cost:24000,reach:2.5,audience:'Adult',genres:['Action','RPG','Adventure'],color:'#4f6475',style:'portable',era:'Console games on the train',inspiration:'Glossy widescreen multimedia handhelds'},
    {id:'revolve',name:'X-Cube Revolve',maker:'Macrosoft',kind:'HD online console',start:936,end:1470,license:200000,cost:30000,reach:3.5,audience:'Adult',genres:['Action','Simulation'],color:'#a4b7a0',style:'revolve',era:'High definition, connected',inspiration:'White curved HD consoles with a strong online network'},
    {id:'wave',name:'Ninbento Wave',maker:'Ninbento',kind:'Motion-control console',start:988,end:1470,license:190000,cost:28000,reach:3.9,audience:'Everyone',genres:['Casual','Simulation','Action'],color:'#c2d8d9',style:'motion',era:'Everyone can play',inspiration:'Slim white consoles and motion-control remotes'},
    {id:'play3',name:'PlayCrate 3',maker:'Soniq',kind:'HD disc console',start:1014,end:1510,license:220000,cost:35000,reach:3.6,audience:'Adult',genres:['Action','RPG','Adventure'],color:'#606d7c',style:'sleek',era:'High definition, connected',inspiration:'Curved black high-definition disc consoles'},
    {id:'play4',name:'PlayCrate 4',maker:'Soniq',kind:'Social HD console',start:1222,end:1900,license:290000,cost:42000,reach:4.7,audience:'Adult',genres:['Action','RPG','Adventure'],color:'#607c9c',style:'slant',era:'Share the next generation',inspiration:'Angular black consoles with a glowing light strip'},
    {id:'oneup',name:'X-Cube OneUp',maker:'Macrosoft',kind:'Connected media console',start:1248,end:1900,license:280000,cost:42000,reach:4.1,audience:'Adult',genres:['Action','Simulation'],color:'#728f6d',style:'media',era:'The connected living room',inspiration:'Wide black media boxes and unified online services'},
    {id:'orbit',name:'Ninbento Flip',maker:'Ninbento',kind:'Hybrid console',start:1404,end:2300,license:320000,cost:45000,reach:5,audience:'Everyone',genres:['Casual','Adventure','RPG'],color:'#d19d74',style:'hybrid',era:'Play anywhere',inspiration:'Dockable tablets with detachable colorful controllers'},
    {id:'play5',name:'PlayCrate 5',maker:'Soniq',kind:'SSD-era console',start:1560,end:3000,license:400000,cost:60000,reach:6.1,audience:'Adult',genres:['Action','RPG','Adventure'],color:'#a6b8cf',style:'fins',era:'Instant worlds',inspiration:'Tall white-finned consoles built around fast storage'},
    {id:'series',name:'X-Cube Series Q',maker:'Macrosoft',kind:'SSD-era console',start:1586,end:3000,license:390000,cost:58000,reach:5.8,audience:'Adult',genres:['Action','Simulation'],color:'#5d8c68',style:'monolith',era:'Instant worlds',inspiration:'Minimal dark towers with a top ventilation grid'}
  ];
  const research = [
    {id:'enginekit', name:'Custom engine architecture', rp:20, cash:6000, weeks:3, games:1, desc:'Build named engines from researched features.'},
    {id:'pixel', name:'Layered pixel renderer', rp:18, cash:5000, weeks:2, games:1, area:7, power:1.2, complexity:12, desc:'Richer 2D visuals.'},
    {id:'save', name:'Persistent game worlds', rp:16, cash:4000, weeks:2, games:1, area:0, power:1, complexity:9, desc:'A save system for the games you develop.'},
    {id:'sound', name:'Studio audio mixer', rp:20, cash:6000, weeks:3, games:2, area:8, power:1.25, complexity:12, desc:'Layered music and sound effects.'},
    {id:'tutorial', name:'Interactive onboarding', rp:18, cash:5000, weeks:2, games:2, area:1, power:1.1, complexity:10, desc:'Teach players through play.'},
    {id:'audience', name:'Audience targeting', rp:22, cash:7000, weeks:3, games:2, desc:'Develop specifically for Young or Adult audiences.'},
    {id:'medium', name:'Medium game production', rp:28, cash:16000, weeks:3, games:3, desc:'More ambitious games with larger budgets.'},
    {id:'marketing', name:'Press & marketing', rp:24, cash:9000, weeks:3, games:3, desc:'Run a press campaign during development.'},
    {id:'story', name:'Reactive storytelling', rp:28, cash:14000, weeks:3, games:3, area:2, power:1.5, complexity:15, desc:'Stories respond to player choices.'},
    {id:'dialogue', name:'Character conversations', rp:26, cash:12000, weeks:3, games:3, area:3, power:1.4, complexity:14, desc:'Expressive dialogue tools.'},
    {id:'levels', name:'World-building editor', rp:30, cash:16000, weeks:3, games:4, area:4, power:1.5, complexity:16, desc:'A fast level editor for your team.'},
    {id:'ai', name:'Behavior graphs', rp:30, cash:16000, weeks:3, games:4, area:5, power:1.5, complexity:15, desc:'More interesting opponents and companions.'},
    {id:'physics', name:'Physics playground', rp:36, cash:20000, weeks:4, games:5, area:0, power:1.8, complexity:19, desc:'A more flexible simulation foundation.'},
    {id:'world', name:'Living environments', rp:35, cash:20000, weeks:3, games:5, area:6, power:1.6, complexity:18, desc:'A world with weather and daily rhythms.'},
    {id:'sequel', name:'Franchise development', rp:35, cash:22000, weeks:3, games:5, desc:'Create sequels and build on an established audience.'},
    {id:'3d', name:'Polygon renderer', rp:48, cash:42000, weeks:5, games:6, area:7, power:2.3, complexity:25, desc:'Enter the polygon era.'},
    {id:'large', name:'Large game production', rp:55, cash:60000, weeks:4, games:7, office:1, desc:'Large games need a team with complementary skills.'},
    {id:'network', name:'Connected play', rp:50, cash:38000, weeks:4, games:7, area:1, power:2.2, complexity:25, desc:'Bring players together online.'},
    {id:'score', name:'Adaptive music score', rp:44, cash:32000, weeks:4, games:7, area:8, power:2, complexity:20, desc:'Music that follows the action.'},
    {id:'multi', name:'Multiplatform release', rp:65, cash:65000, weeks:4, games:9, desc:'Ship on two platforms at once.'},
    {id:'procedural', name:'Procedural worlds', rp:65, cash:85000, weeks:5, games:10, area:6, power:2.7, complexity:30, desc:'Build expansive, varied environments.'},
    {id:'aaa', name:'Flagship production', rp:100, cash:180000, weeks:6, games:14, office:2, desc:'Your biggest production yet. Requires five active creators.'},
    {id:'lab', name:'Advanced R&D lab', rp:120, cash:300000, weeks:8, games:16, office:3, desc:'A permanent lab generates insight and improves every game.'}
  ];
  const people = [
    ['Mira Chen','Engineer',32,76,54,66,1450,'#d5b58e'], ['Jules Okoro','Writer',81,27,62,58,1550,'#a6c2b3'],
    ['Tess Rivera','Artist',70,44,55,68,1600,'#c4add3'], ['Arlo Reed','Generalist',61,65,70,73,2000,'#9ebbd0'],
    ['Noor Ali','Engineer',39,91,72,78,2650,'#d4c18b'], ['Sage Park','Creative lead',94,53,84,76,3100,'#aab9a0'],
    ['Kit Morgan','Producer',77,79,88,90,3900,'#c99785']
  ].map((p,i)=>({id:'person'+i,name:p[0],role:p[1],design:p[2],tech:p[3],research:p[4],speed:p[5],salary:p[6],color:p[7],energy:100,level:1,xp:0,activity:null}));
  const offices = [
    {name:'Backroom workshop',cost:0,rent:450,desks:1,games:0},
    {name:'Brickworks studio',cost:125000,rent:1550,desks:4,games:3},
    {name:'Skyline floor',cost:550000,rent:3600,desks:6,games:8},
    {name:'Research campus',cost:1800000,rent:7800,desks:8,games:15}
  ];
  const sizes = {Small:{cost:5500,stage:4,units:1,price:14,need:null,team:1},Medium:{cost:36000,stage:6,units:2.5,price:22,need:'medium',team:1},Large:{cost:150000,stage:8,units:6,price:30,need:'large',team:3},Flagship:{cost:550000,stage:11,units:14,price:42,need:'aaa',team:5}};
  const events = [
    {title:'An early look?',text:'A new games magazine wants to see your unfinished build. A good preview could bring attention, but the team will lose a little development time.',a:'Send a playable build',b:'Wait for release',cash:0,hype:18,bugs:3,rp:0,energy:-4},
    {title:'The overnight patch',text:'A tool update has broken part of your asset importer. You can hire outside help or let the team work through it.',a:'Bring in a specialist · $4,000',b:'Solve it in-house',cash:-4000,hype:0,bugs:-5,rp:8,energy:2,altEnergy:-8},
    {title:'A very small convention',text:'A volunteer-run games convention has a last-minute booth opening. It is a modest room, but the people there care about games.',a:'Book the booth · $3,000',b:'Send a free demo',cash:-3000,hype:22,fans:180,rp:3,energy:0},
    {title:'The prototype weekend',text:'Your team has an idea that does not fit the current project. Give them time and equipment to experiment?',a:'Fund the experiment · $2,000',b:'Put it on the idea board',cash:-2000,hype:0,rp:14,energy:8},
    {title:'A translation collective',text:'A small group offers to localize your catalog. Their editor will need a budget to do it properly.',a:'Fund the edition · $5,000',b:'Share a community glossary',cash:-5000,hype:8,fans:550,rp:3,energy:0},
    {title:'A demanding sponsor',text:'A peripheral maker offers cash to place its logo in your next game. Some fans dislike the idea.',a:'Accept · +$12,000 / −120 fans',b:'Keep the game independent',cash:12000,hype:0,fans:-120,rp:0,energy:-3},
    {title:'The unexpected tournament',text:'Players have made a competitive event out of one of your old mechanics. They ask for a little official support.',a:'Support the tournament · $2,500',b:'Cheer them on',cash:-2500,hype:12,fans:260,rp:5,energy:3},
    {title:'The missing backup',text:'A failing hard drive has exposed a gap in your backup routine. You can pay for recovery and set up a safer process.',a:'Recover and improve · $3,500',b:'Rebuild from working copies',cash:-3500,hype:0,bugs:-3,rp:10,energy:0,altEnergy:-10},
    {title:'Player accessibility notes',text:'A local testing group has offered detailed suggestions about how more people could enjoy your games.',a:'Pay for a testing day · $2,000',b:'Read their public notes',cash:-2000,hype:7,rp:12,fans:100,energy:3},
    {title:'The publisher meeting',text:'A small publisher offers to fund a studio showcase. You will spend time preparing a polished demo.',a:'Stage the showcase · $6,000',b:'Keep developing',cash:-6000,hype:35,rp:5,energy:-4},
    {title:'Open studio afternoon',text:'Students at the nearby design school ask to visit. Talking through your work might help you see it differently.',a:'Host a workshop · $1,500',b:'Send a recorded tour',cash:-1500,hype:3,rp:15,energy:5},
    {title:'A catalog preservation grant',text:'An archive offers funding for a documented, preserved version of your early work.',a:'Prepare an edition · +$8,000',b:'Donate the current builds',cash:8000,hype:0,rp:7,fans:40,energy:-5}
  ];
  function fresh(seed=Date.now()) {
    return {version:2,seed:seed>>>0,name:'Afterlight',week:1,cash:65000,fans:0,rp:12,office:0,
      founder:{id:'founder',name:'Alex',role:'Founder',design:38,tech:38,research:45,speed:55,salary:0,color:'#dfae73',energy:100,level:1,xp:0,activity:null},
      staff:[],tech:[],buzz:0,topics:['Space','Mystery','Racing','Fantasy'],licenses:['slate'],engines:[{id:'starter',name:'Basic toolkit',features:[],week:1}],
      games:[],project:null,task:null,event:null,nextEvent:19,news:[],announced:[],trend:0,knowledge:{},areaXP:Array(9).fill(0),genreXP:{},
      log:[{week:1,text:'Your workshop is open. $65,000, a borrowed computer, and a blank notebook.'}],history:[65000],achievements:[],rescue:false,ended:false,campaign:false,review:null,lastGain:{d:0,t:0,r:0},contracts:0};
  }
  function rng(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;}
  function log(s,text){s.log.unshift({week:s.week,text});s.log=s.log.slice(0,80);}
  const team=s=>[s.founder,...s.staff];
  const active=s=>team(s).filter(x=>!x.activity);
  const upkeep=s=>offices[s.office].rent+s.staff.reduce((n,x)=>n+x.salary,0);
  const available=s=>platforms.filter(p=>s.week>=p.start&&s.week<p.end);
  function market(s){const a=available(s),vals=a.map(p=>Math.max(.15,Math.sin(clamp((s.week-p.start)/(p.end-p.start),.02,.98)*Math.PI))*p.reach);const total=vals.reduce((a,b)=>a+b,0);return a.map((p,i)=>({...p,share:Math.round(vals[i]/total*100)}));}
  const feature=id=>research.find(x=>x.id===id);
  const busy=s=>!!s.project||!!s.task||s.ended;
  function expected(s,size){return (25+s.week*.055)*({Small:1,Medium:1.65,Large:2.7,Flagship:4.2}[size]);}
  function estimate(s,d){const z=sizes[d.size]||sizes.Small;const ps=(d.platforms||['slate']).map(id=>platforms.find(p=>p.id===id)).filter(Boolean);return {cost:z.cost+ps.reduce((n,p)=>n+p.cost*(s.office+1),0),weeks:z.stage*3,weekly:upkeep(s),license:ps.filter(p=>!s.licenses.includes(p.id)).reduce((n,p)=>n+p.license,0)};}
  function start(s,d){
    if(busy(s))return 'Finish your current project first.';
    if(!has(genres,d.genre)||!has(topics,d.topic)||!s.topics.includes(d.topic)||!has(sizes,d.size))return 'Select an unlocked concept.';
    const z=sizes[d.size];if(z.need&&!s.tech.includes(z.need))return 'Research this game size first.';
    if(active(s).length<z.team)return `This scope needs ${z.team} active creators.`;
    if(!['Everyone','Young','Adult'].includes(d.audience)||d.audience!=='Everyone'&&!s.tech.includes('audience'))return 'Research audience targeting first.';
    if(!Array.isArray(d.platforms)||!d.platforms.length||d.platforms.length>(s.tech.includes('multi')?2:1)||new Set(d.platforms).size!==d.platforms.length)return 'Select a valid platform plan.';
    if(d.platforms.some(id=>!available(s).some(p=>p.id===id)))return 'One of those platforms is no longer on the market.';
    if(!s.engines.some(e=>e.id===d.engine))return 'Select an engine.';
    if(d.sequel&&(!s.tech.includes('sequel')||!s.games.some(g=>g.id===d.sequel)))return 'Research franchise development first.';
    const e=estimate(s,d);if(s.cash<e.cost+e.license)return 'Not enough funds for development and licenses.';
    s.cash-=e.cost+e.license;d.platforms.forEach(id=>{if(!s.licenses.includes(id))s.licenses.push(id);});
    s.project={title:String(d.title||'Untitled game').trim().slice(0,50)||'Untitled game',topic:d.topic,genre:d.genre,size:d.size,audience:d.audience,platforms:d.platforms.slice(),engine:d.engine,sequel:d.sequel||null,
      stage:0,pending:true,stageDone:0,stageWeeks:z.stage,plans:[],design:0,tech:0,bugs:0,hype:s.buzz||0,done:0,polish:0,fit:0,features:[],cost:e.cost+e.license,overhead:0,marketing:[],start:s.week};
    s.buzz=0;log(s,'Started '+s.project.title+'.');return null;
  }
  function planStage(s,d){
    const p=s.project;if(!p||!p.pending||p.stage>2)return 'No development stage is waiting.';
    if(!Array.isArray(d.weights)||d.weights.length!==3||d.weights.some(x=>!Number.isFinite(x)||x<0||x>100)||d.weights.reduce((a,b)=>a+b,0)<=0)return 'Give at least one area some development time.';
    const crew=active(s);if(!crew.length)return 'Your team is away. Advance time until someone returns.';
    if(!Array.isArray(d.assignments)||d.assignments.length!==3||d.assignments.some(id=>!crew.some(x=>x.id===id)))return 'Assign an active developer to each area.';
    const eng=s.engines.find(e=>e.id===p.engine),valid=(d.features||[]);
    if(!Array.isArray(valid)||valid.some(id=>!eng.features.includes(id)||Math.floor(feature(id).area/3)!==p.stage)||new Set(valid).size!==valid.length)return 'Select features from this engine for the current stage.';
    const total=d.weights.reduce((a,b)=>a+b,0),weights=d.weights.map(x=>x/total*100),target=genres[p.genre].slice(p.stage*3,p.stage*3+3);
    const fit=1-weights.reduce((n,x,i)=>n+Math.abs(x-target[i]),0)/200;
    const complexity=valid.reduce((n,id)=>n+feature(id).complexity,0),capacity=48+s.staff.length*13+(p.size==='Small'?0:15);
    p.plans.push({weights,assignments:d.assignments.slice(),features:valid.slice(),fit,load:complexity/capacity});p.fit+=fit;p.pending=false;p.stageDone=0;
    valid.forEach(id=>p.features.push(id));log(s,stages[p.stage]+' plan approved for '+p.title+'.');return null;
  }
  function locked(s,r){if(s.tech.includes(r.id))return 'Researched';if(s.games.length<r.games)return `${r.games} releases required`;if((r.office||0)>s.office)return offices[r.office].name+' required';return '';}
  function study(s,id){if(busy(s))return 'Finish your current project first.';const r=feature(id);if(!r)return 'Unknown research.';const lock=locked(s,r);if(lock)return lock;if(s.rp<r.rp||s.cash<r.cash)return 'Not enough research points or cash.';s.rp-=r.rp;s.cash-=r.cash;s.task={type:'research',id,total:r.weeks,left:r.weeks,name:r.name};return null;}
  function topicResearch(s,name){if(busy(s))return 'Finish your current project first.';if(!has(topics,name)||s.topics.includes(name))return 'Select a new topic.';if(s.rp<10||s.cash<2500)return 'Needs 10 research points and $2,500.';s.rp-=10;s.cash-=2500;s.task={type:'topic',id:name,total:2,left:2,name:'Topic: '+name};return null;}
  function buildEngine(s,name,ids){if(busy(s))return 'Finish your current project first.';if(!s.tech.includes('enginekit'))return 'Research custom engine architecture first.';if(!Array.isArray(ids)||!ids.length||ids.some(id=>!s.tech.includes(id)||!Number.isInteger(feature(id)?.area))||new Set(ids).size!==ids.length)return 'Select researched engine features.';const cost=6500+ids.reduce((n,id)=>n+feature(id).power*3500,0);if(s.cash<cost)return 'Not enough cash to create this engine.';s.cash-=cost;s.task={type:'engine',name:String(name||'Untitled engine').trim().slice(0,40)||'Untitled engine',features:ids.slice(),left:3+Math.ceil(ids.length/3),total:3+Math.ceil(ids.length/3)};return null;}
  function report(s,id){if(busy(s))return 'Finish your current project first.';const g=s.games.find(x=>x.id===id);if(!g||g.report)return 'This game already has a report.';s.task={type:'report',id,left:2,total:2,name:'Report: '+g.title};return null;}
  function contract(s,level){if(busy(s))return 'Finish your current project first.';if(![0,1,2].includes(level))return 'Choose a valid contract.';const total=[4,6,8][level],reward=[13500,32000,72000][level];s.task={type:'contract',name:['Interface prototype','Interactive exhibition','Simulation toolkit'][level],level,total,left:total,design:0,tech:0,need:[9,38,100][level],reward};return null;}
  function hire(s,id){if(s.ended)return 'This studio has closed.';if(s.office===0)return 'Move into a studio before hiring.';if(team(s).length>=offices[s.office].desks)return 'No spare desks. Upgrade your office.';const p=people.find(x=>x.id===id);if(!p||s.staff.some(x=>x.id===id))return 'This creator is already on the team.';if(s.cash<p.salary*5)return 'Recruitment requires five weeks of salary.';s.cash-=p.salary*5;s.staff.push({...p,activity:null});log(s,p.name+' joined the team.');return null;}
  function personAction(s,id,type){const p=team(s).find(x=>x.id===id);if(!p||p.activity||s.ended)return 'This creator is unavailable.';if(s.project)return 'Finish the current game before changing staff activities.';if(s.task)return 'Finish studio work first.';if(type==='vacation'){const cost=id==='founder'?1200:2200;if(s.cash<cost)return 'Not enough funds for time off.';s.cash-=cost;p.activity={type:'vacation',left:3,total:3};return null;}if(type==='train'){if(s.cash<5500||s.rp<8)return 'Workshop needs $5,500 and 8 research points.';s.cash-=5500;s.rp-=8;p.activity={type:'train',left:4,total:4};return null;}return 'Unknown activity.';}
  function dismiss(s,id){if(s.project||s.task)return 'Finish current work before changing the team.';if(id==='founder')return 'The founder cannot leave.';const i=s.staff.findIndex(x=>x.id===id);if(i<0)return 'Creator not found.';const cost=s.staff[i].salary*2;if(s.cash<cost)return 'Two weeks of severance pay are required.';s.cash-=cost;log(s,s.staff[i].name+' left the studio.');s.staff.splice(i,1);return null;}
  function upgrade(s){if(busy(s))return 'Finish your current project before moving.';const o=offices[s.office+1];if(!o)return 'Your campus is fully upgraded.';if(s.games.length<o.games)return `Release ${o.games} games before moving.`;if(s.cash<o.cost)return 'Not enough cash for the move.';s.cash-=o.cost;s.office++;log(s,'Moved into '+o.name+'.');s.news.push({title:'A new chapter',text:`The keys to ${o.name} are yours. You now have ${o.desks} creator desks. Weekly rent is $${o.rent.toLocaleString()}.`});return null;}
  function marketGame(s,tier){const p=s.project;if(!p||!s.tech.includes('marketing'))return 'Research marketing, then start a game.';const costs=[3000,12000,45000],gains=[12,30,65];if(![0,1,2].includes(tier))return 'Choose a campaign.';if(p.marketing.includes(tier))return 'This campaign is already running.';if(s.cash<costs[tier])return 'Not enough cash for that campaign.';s.cash-=costs[tier];p.cost+=costs[tier];p.hype+=gains[tier];p.marketing.push(tier);return null;}
  function choose(s,yes){if(s.event===null)return 'No event is waiting.';const e=events[s.event];if(yes&&s.cash+e.cash<0)return 'Not enough funds for that option.';if(yes){s.cash+=e.cash;s.fans=Math.max(0,s.fans+(e.fans||0));s.rp+=e.rp;team(s).forEach(p=>p.energy=clamp(p.energy+e.energy,10,100));if(s.project){s.project.hype+=e.hype;s.project.bugs=Math.max(0,s.project.bugs+(e.bugs||0));}else{s.buzz=(s.buzz||0)+e.hype;}}else{s.rp+=2;team(s).forEach(p=>p.energy=clamp(p.energy+(e.altEnergy||0),10,100));}log(s,e.title+': '+(yes?e.a:e.b)+'.');s.event=null;return null;}
  function workerPower(p){return (.55+p.speed/100)*(.4+p.energy/166);}
  function finishTask(s,t){
    if(t.type==='research'){s.tech.push(t.id);log(s,'Research complete: '+t.name+'.');}
    if(t.type==='topic'){s.topics.push(t.id);log(s,'New topic researched: '+t.id+'.');}
    if(t.type==='engine'){s.engines.push({id:'engine'+s.week+'-'+s.engines.length,name:t.name,features:t.features,week:s.week});log(s,'Engine complete: '+t.name+'.');}
    if(t.type==='report'){const g=s.games.find(x=>x.id===t.id);g.report=true;s.knowledge[g.topic+'|'+g.genre]={good:topics[g.topic].includes(g.genre),genre:g.genre};s.rp+=14;log(s,'Report complete: '+g.title+'. Genre priorities and topic fit are now visible.');}
    if(t.type==='contract'){const ratio=Math.min(t.design/t.need,t.tech/t.need);if(ratio>=1){s.cash+=t.reward;s.rp+=5;s.contracts++;log(s,'Contract delivered: +$'+t.reward.toLocaleString()+'.');}else{s.cash-=t.reward*.12;log(s,'Contract missed its deadline. Paid a 12% penalty. Train your team or choose a smaller job.');}}
    s.task=null;
  }
  function achievements(s){const tests=[['first','First release',s.games.length>=1],['report','Lessons learned',s.games.some(g=>g.report)],['engine','Toolmaker',s.engines.length>1],['team','A real team',s.staff.length>=3],['hit','Critics’ favorite',s.games.some(g=>g.score>=9)],['million','Millionaire',s.cash>=1000000],['catalog','A lasting catalog',s.games.length>=12],['fans','A hundred thousand fans',s.fans>=100000],['campus','Dream studio',s.office===3]];tests.forEach(([id,name,check])=>{if(check&&!s.achievements.includes(id)){s.achievements.push(id);log(s,'Achievement: '+name+'.');}});}
  function step(s){
    if(s.ended||s.event!==null||s.project?.pending)return false;
    s.week++;s.lastGain={d:0,t:0,r:0};let revenue=0;
    s.games.forEach(g=>{if(g.age<20){const curve=[.2,.15,.11,.08,.065,.055,.045,.04,.035,.03,.027,.024,.022,.02,.018,.017,.016,.015,.014,.019];const units=g.age===19?g.units-g.sold:Math.min(g.units-g.sold,Math.round(g.units*curve[g.age]));g.weekly.push(units);g.sold+=units;g.revenue+=units*g.price*.7;revenue+=units*g.price*.7;g.rank=clamp(Math.round(20000/Math.max(1,units)),1,99);s.fans+=Math.round(units*(g.score>=7?.035:.012));g.age++;}});
    s.cash+=revenue-upkeep(s);const crew=active(s);team(s).forEach(p=>{if(p.activity){p.activity.left--;if(p.activity.left<=0){if(p.activity.type==='vacation')p.energy=100;else{p.design+=5;p.tech+=5;p.speed+=3;p.research+=4;}log(s,p.name+' completed '+p.activity.type+'.');p.activity=null;}}});
    const p=s.project;
    if(p){p.overhead+=upkeep(s);p.done++;
      if(p.stage<3){const plan=p.plans[p.stage];const overload=Math.max(1,plan.load);let d=0,t=0;
        plan.weights.forEach((w,i)=>{const person=crew.find(x=>x.id===plan.assignments[i]);if(!person)return;const a=p.stage*3+i,power=workerPower(person),areaSkill=1+Math.sqrt(s.areaXP[a])*.025,points=(2+(person.design+person.tech)/50)*power*w/100*areaSkill;
          const boost=1+plan.features.filter(id=>feature(id).area===a).reduce((n,id)=>n+feature(id).power*.18,0);const dr=designRatios[a];d+=points*(.55+person.design/100)*dr*boost/overload;t+=points*(.55+person.tech/100)*(1-dr)*boost/overload;s.areaXP[a]+=points*.2;
        });
        // Unassigned creators contribute support work without replacing task specialists.
        const assigned=new Set(plan.assignments);crew.filter(x=>!assigned.has(x.id)).forEach(x=>{d+=x.design/140*workerPower(x);t+=x.tech/140*workerPower(x);});
        p.design+=d;p.tech+=t;s.lastGain.d=d;s.lastGain.t=t;p.bugs+=Math.max(0,Math.round((d+t)*(.10+rng(s)*.16)*overload));p.stageDone++;
        crew.forEach(x=>{x.energy=clamp(x.energy-.65,15,100);x.xp+=(d+t)/crew.length;});
        if(p.stageDone>=p.stageWeeks){p.stage++;p.stageDone=0;if(p.stage<3)p.pending=true;else log(s,p.title+' entered bug fixing.');}
      }else{p.polish++;const fixed=Math.max(2,Math.floor(crew.reduce((n,x)=>n+workerPower(x)*2,0)));p.bugs=Math.max(0,p.bugs-fixed);p.design+=crew.length*.15;p.tech+=crew.length*.15;s.lastGain.d=.15*crew.length;s.lastGain.t=.15*crew.length;}
      if(s.week%3===0){s.rp++;s.lastGain.r++;}
    }else if(s.task){const t=s.task;t.left--;if(t.type==='contract'){const d=crew.reduce((n,x)=>n+workerPower(x)*(1+x.design/25),0),tech=crew.reduce((n,x)=>n+workerPower(x)*(1+x.tech/25),0);t.design+=d;t.tech+=tech;s.lastGain.d=d;s.lastGain.t=tech;}if(t.left<=0)finishTask(s,t);}
    else crew.forEach(x=>x.energy=clamp(x.energy+1.7,0,100));
    team(s).forEach(x=>{const needed=x.level*65;if(x.xp>=needed){x.xp-=needed;x.level++;x.design+=2;x.tech+=2;log(s,x.name+' reached level '+x.level+'.');}});
    if(s.tech.includes('lab')){s.rp+=2;s.lastGain.r+=2;}
    if(s.week%26===0){s.trend=Math.floor(rng(s)*6);log(s,Object.keys(genres)[s.trend]+' games are trending.');}
    platforms.forEach(p=>{if(s.week===p.start&&!s.announced.includes(p.id)){s.announced.push(p.id);s.news.push({title:p.name+' launches',text:`A new ${p.kind.toLowerCase()} platform has arrived. Developers can license it for $${p.license.toLocaleString()}. ${p.audience} audiences are its early strength.`});log(s,p.name+' is now on sale.');}if(s.week===p.end){s.news.push({title:p.name+' is retired',text:'The manufacturer has ended production. Existing games continue selling, but new projects must target other platforms.'});log(s,p.name+' left the market.');}});
    if(s.week>=s.nextEvent){s.event=Math.floor(rng(s)*events.length);s.nextEvent=s.week+20+Math.floor(rng(s)*16);}
    if(s.cash<0){if(!s.rescue){s.rescue=true;s.cash+=35000;s.news.push({title:'A bridge loan',text:'Your credit union supplies a one-time $35,000 bridge loan. Cut costs and take reliable contracts to recover. There will not be a second loan.'});log(s,'Received a one-time $35,000 rescue.');}else{s.ended=true;s.event=null;log(s,'The studio has become insolvent.');}}
    if(s.week>=1665&&!s.campaign){s.campaign=true;s.news.push({title:'Thirty-two years of making games',text:`Your studio has released ${s.games.length} games and gained ${Math.round(s.fans).toLocaleString()} fans. Your campaign is complete. Keep playing to expand your legacy.`});}
    s.history.push(Math.round(s.cash));s.history=s.history.slice(-104);achievements(s);return true;
  }
  function launch(s){
    const p=s.project;if(!p||p.stage<3)return 'Complete all three development stages first.';
    const fit=p.fit/3,matching=topics[p.topic].includes(p.genre),points=p.design+p.tech,expect=expected(s,p.size),ratio=points/expect;
    const eng=s.engines.find(x=>x.id===p.engine),old=Math.max(0,(s.week-eng.week-90)/100),parent=s.games.find(g=>g.id===p.sequel),sequelBonus=parent?(parent.engine===p.engine?-5:4):0;
    const quality=clamp(18+fit*31+(matching?9:-3)+clamp(ratio,0,2)*15+Math.min(5,p.features.length*.8)+Math.min(4,p.polish*.4)-p.bugs*1.25-Math.min(8,old*2)+sequelBonus+(s.tech.includes('lab')?3:0),10,99);
    const base=clamp(quality/10,1,10);const reviews=['The Play Ledger','Quarterly Byte','Side Quest Review','Digital Dispatch'].map(name=>({name,score:clamp(Math.round(base+(rng(s)-.5)*1.2),1,10)}));const score=Math.round(reviews.reduce((n,r)=>n+r.score,0)/4*10)/10;
    const ps=p.platforms.map(id=>platforms.find(x=>x.id===id)),shares=market(s),reach=ps.reduce((n,x)=>n+x.reach*(.65+(shares.find(a=>a.id===x.id)?.share||3)/100*1.2),0)/(ps.length===2?1.25:1),aud=ps.some(x=>x.audience===p.audience)?1.15:p.audience==='Everyone'?1:.86,genreFit=ps.some(x=>x.genres.includes(p.genre))?1.1:.9;
    const trend=Object.keys(genres)[s.trend]===p.genre?1.25:1,repeat=s.games.slice(0,2).filter(g=>g.topic===p.topic&&g.genre===p.genre).length;
    const units=Math.max(200,Math.round((1900+quality*38+s.fans*.3)*Math.pow(score/7,2)*sizes[p.size].units*reach*aud*genreFit*trend*(1+p.hype/130)*(1-repeat*.13)*(parent?1.2:1)));
    const g={id:'game'+s.week+'-'+s.games.length,title:p.title,topic:p.topic,genre:p.genre,size:p.size,audience:p.audience,platforms:p.platforms,engine:p.engine,sequel:p.sequel,features:p.features.slice(),score,reviews,quality,design:Math.round(p.design),tech:Math.round(p.tech),bugs:p.bugs,fit:Math.round(fit*100),matching,ratio:Math.round(ratio*100),units,sold:0,revenue:0,age:0,weekly:[],price:sizes[p.size].price,cost:p.cost+p.overhead,week:s.week,report:false,rank:99};
    s.games.unshift(g);s.review=g.id;s.rp+=8+Math.round(points/9);s.genreXP[p.genre]=(s.genreXP[p.genre]||0)+1;s.project=null;team(s).forEach(x=>x.energy=clamp(x.energy+3,0,100));log(s,`${g.title} released. Average review: ${score}/10.`);achievements(s);return null;
  }
  function migrate(v){const s=fresh(v.seed);s.name=String(v.name||'Afterlight');s.week=v.week;s.cash=v.cash;s.fans=v.fans;s.rp=v.rp;s.office=Math.min(3,v.office);s.founder.energy=Number.isFinite(v.morale)?v.morale:100;const map={Cozy:'Casual',Tactics:'Strategy',Adventure:'Adventure',Arcade:'Action',Mystery:'Adventure',Sandbox:'Simulation'};s.games=(v.games||[]).map((g,i)=>({id:'legacy'+i,title:String(g.title),topic:'Space',genre:map[g.genre]||'Simulation',size:g.size==='Flagship'?'Large':g.size,audience:'Everyone',platforms:['slate'],engine:'starter',features:[],score:g.score,reviews:['The Play Ledger','Quarterly Byte','Side Quest Review','Digital Dispatch'].map(name=>({name,score:Math.round(g.score)})),quality:g.score*10,design:25,tech:25,bugs:g.bugs||0,fit:g.fit||50,matching:!!g.themeFit,ratio:100,units:g.units,sold:g.sold,revenue:g.revenue,age:20,weekly:[],price:g.price,cost:g.cost||0,week:g.week||1,report:false,rank:99}));s.staff=(v.staff||[]).slice(0,offices[s.office].desks-1).map((p,i)=>({...people[i],name:String(p.name),activity:null}));s.log=[{week:s.week,text:'Your version 1 studio has migrated. The catalog and finances are preserved; any unfinished work is closed.'}];return s;}
  function validate(v){
    const fail=()=>{throw Error('This save is damaged or incompatible.');},finite=x=>typeof x==='number'&&Number.isFinite(x),text=x=>typeof x==='string'&&x.length<1000;
    if(v?.version===1){if(!finite(v.cash)||!Number.isInteger(v.week)||!Array.isArray(v.games)||!Array.isArray(v.staff)||!finite(v.fans)||!finite(v.rp))fail();return validate(migrate(v));}
    if(!v||v.version!==2||!finite(v.seed)||!Number.isInteger(v.week)||v.week<1||!finite(v.cash)||!finite(v.fans)||v.fans<0||!finite(v.rp)||!Number.isInteger(v.office)||!offices[v.office]||!text(v.name))fail();
    for(const k of ['staff','tech','topics','licenses','engines','games','news','announced','log','history','achievements','areaXP'])if(!Array.isArray(v[k])||v[k].length>10000)fail();
    const validPerson=x=>x&&text(x.id)&&text(x.name)&&text(x.role)&&/^#[a-fA-F0-9]{6}$/.test(x.color)&&['design','tech','research','speed','salary','energy','level','xp'].every(k=>finite(x[k])&&x[k]>=0)&&(!x.activity||['train','vacation'].includes(x.activity.type)&&Number.isInteger(x.activity.left)&&x.activity.left>0);
    if(!validPerson(v.founder)||v.staff.length>7||v.staff.some(x=>!validPerson(x))||new Set(team(v).map(x=>x.id)).size!==team(v).length)fail();
    if(v.topics.some(x=>!has(topics,x))||v.tech.some(x=>!feature(x))||v.licenses.some(x=>!platforms.some(p=>p.id===x))||v.engines.some(x=>!text(x.id)||!text(x.name)||!finite(x.week)||!Array.isArray(x.features)||x.features.some(id=>!Number.isInteger(feature(id)?.area))))fail();
    if(!v.engines.length||!v.knowledge||typeof v.knowledge!=='object'||!v.genreXP||typeof v.genreXP!=='object'||v.areaXP.length!==9||v.areaXP.some(x=>!finite(x))||!Number.isInteger(v.trend)||v.trend<0||v.trend>5||!finite(v.nextEvent))fail();
    if(v.buzz!==undefined&&(!finite(v.buzz)||v.buzz<0))fail();if(v.event!==null&&(!Number.isInteger(v.event)||!events[v.event]))fail();
    if(v.games.some(g=>!g||!text(g.title)||!text(g.id)||!has(genres,g.genre)||!has(topics,g.topic)||!has(sizes,g.size)||['score','units','sold','revenue','cost','age','price','week','design','tech','fit','ratio'].some(k=>!finite(g[k]))||!Array.isArray(g.reviews)||g.reviews.length!==4||g.reviews.some(r=>!text(r.name)||!finite(r.score))||!Array.isArray(g.weekly)||g.weekly.some(x=>!finite(x))||!Array.isArray(g.platforms)||g.platforms.some(id=>!platforms.some(p=>p.id===id))))fail();
    if(v.project){const p=v.project;if(!text(p.title)||!has(genres,p.genre)||!has(topics,p.topic)||!has(sizes,p.size)||!Number.isInteger(p.stage)||p.stage<0||p.stage>3||!Array.isArray(p.plans)||!Array.isArray(p.features)||!Array.isArray(p.platforms)||!Array.isArray(p.marketing)||!v.engines.some(x=>x.id===p.engine)||['stageDone','stageWeeks','done','design','tech','bugs','hype','fit','cost','overhead','polish','start'].some(k=>!finite(p[k]))||p.stageWeeks<1)fail();if(p.plans.some(q=>!Array.isArray(q.weights)||q.weights.length!==3||q.weights.some(x=>!finite(x))||!Array.isArray(q.assignments)||q.assignments.length!==3||q.assignments.some(id=>!team(v).some(x=>x.id===id))||!finite(q.load)||!finite(q.fit)||!Array.isArray(q.features)||q.features.some(id=>!feature(id))))fail();if(p.plans.length!==p.stage+(p.pending?0:p.stage<3?1:0))fail();}
    if(v.task){const t=v.task;if(!['research','topic','engine','report','contract'].includes(t.type)||!finite(t.left)||!finite(t.total)||!text(t.name))fail();if(t.type==='research'&&!feature(t.id)||t.type==='topic'&&!has(topics,t.id)||t.type==='report'&&!v.games.some(x=>x.id===t.id))fail();if(t.type==='engine'&&(!Array.isArray(t.features)||t.features.some(id=>!Number.isInteger(feature(id)?.area))))fail();if(t.type==='contract'&&['design','tech','need','reward'].some(k=>!finite(t[k])))fail();}
    if(v.log.some(x=>!text(x.text)||!finite(x.week))||v.history.some(x=>!finite(x))||v.news.some(x=>!text(x.title)||!text(x.text)))fail();return v;
  }
  const api={genres,areas,stages,topics,platforms,research,people,offices,sizes,events,fresh,team,active,upkeep,available,market,estimate,expected,start,planStage,locked,study,topicResearch,buildEngine,report,contract,hire,personAction,dismiss,upgrade,marketGame,choose,step,launch,validate,log,feature,busy};
  if(typeof module!=='undefined')module.exports=api;root.Afterlight=api;
})(typeof globalThis!=='undefined'?globalThis:this);




