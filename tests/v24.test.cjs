const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../engine.js');

test('applicant pool is generated, refreshes each season and scales with the era',()=>{
  const s=E.fresh(31);assert.equal(s.applicants.length,3);
  const ids=s.applicants.map(a=>a.id);s.news=[];
  for(let i=0;i<E.seasonWeeks;i++){if(s.event!==null)E.choose(s,false);s.news=[];E.step(s);}
  assert.notDeepEqual(s.applicants.map(a=>a.id),ids);
  const late=E.fresh(31);late.week=48*30;E.refreshApplicants(late);
  const avg=x=>x.applicants.reduce((n,a)=>n+a.design+a.tech,0)/x.applicants.length;
  assert.ok(avg(late)>avg(s)+30);
});

test('applicants can be hired once and recruitment drives cost money',()=>{
  const s=E.fresh(32);s.office=1;s.cash=500000;assert.ok(E.recruitDrive(E.fresh(1)));
  const a=s.applicants[0];assert.equal(E.hire(s,a.id),null);assert.ok(s.staff.some(x=>x.id===a.id));assert.ok(!s.applicants.some(x=>x.id===a.id));assert.ok(E.hire(s,a.id));
  const before=s.cash;assert.equal(E.recruitDrive(s),null);assert.equal(s.cash,before-E.recruitCost(s));assert.equal(s.applicants.length,4);
  assert.doesNotThrow(()=>E.validate(JSON.parse(JSON.stringify(s))));
});

test('applicant generation does not change the simulation seed',()=>{
  const a=E.fresh(33),b=E.fresh(33);E.refreshApplicants(b);assert.equal(a.seed,b.seed);
});

test('yearly awards reward high-scoring releases from the previous year',()=>{
  const s=E.fresh(34),y=1990,w=E.calendar.weekOf(y,5,1);
  s.games=[{id:'g1',title:'Great One',genre:'RPG',score:9.3,week:w},{id:'g2',title:'Good One',genre:'Action',score:8.1,week:w+4},{id:'g3',title:'Meh',genre:'Casual',score:6,week:w+8}];
  const cash=s.cash,fans=s.fans;E.ceremony(s,y);
  const cats=s.awards.map(a=>a.category).sort();assert.deepEqual(cats,['Best Action game','Best RPG game','Game of the Year']);
  assert.ok(s.cash>cash);assert.ok(s.fans>fans);assert.ok(s.buzz>0);assert.ok(s.news.some(n=>n.title.includes('1990')));
  const t=E.fresh(35);t.games=[{id:'x',title:'Old',genre:'RPG',score:9.5,week:w}];E.ceremony(t,y+1);assert.equal(t.awards.length,0);
});

test('releases include critic notes and quotes; old saves without new fields still load',()=>{
  const s=E.fresh(36);
  assert.equal(E.start(s,{title:'Notes',topic:'Space',genre:'Strategy',size:'Small',audience:'Everyone',platforms:[E.available(s)[0].id],engine:'starter'}),null);
  while(s.project.stage<3){if(s.event!==null)E.choose(s,false);s.news=[];if(s.project.pending)E.planStage(s,{weights:E.genres.Strategy.slice(s.project.stage*3,s.project.stage*3+3),assignments:['founder','founder','founder'],features:[]});else E.step(s);}
  for(let i=0;i<20&&s.project.bugs;i++){if(s.event!==null)E.choose(s,false);s.news=[];E.step(s);}
  assert.equal(E.launch(s),null);const g=s.games[0];
  assert.ok(g.notes.length>=2);assert.ok(g.notes.some(n=>/natural pairing/.test(n.text)));assert.ok(g.reviews.every(r=>typeof r.quote==='string'&&r.quote.length));
  const old=JSON.parse(JSON.stringify(s));delete old.applicants;delete old.awards;delete old.hireSeed;delete old.nextApplicants;old.games.forEach(x=>delete x.notes);
  const v=E.validate(old);assert.deepEqual(v.applicants,[]);assert.deepEqual(v.awards,[]);assert.equal(E.step(v)||true,true);assert.ok(v.applicants.length>0);
});

test('new topics have genre fits and name ideas',()=>{
  const N=require('../names.js');assert.ok(Object.keys(E.topics).length>=32);
  for(const [t,gs] of Object.entries(E.topics)){assert.ok(gs.every(g=>E.genres[g]),t);assert.ok(!/\d$/.test(N.generate('game',{topic:t,genre:gs[0],rng:()=>.3})),t);}
});
