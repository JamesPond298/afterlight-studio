const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../engine.js');
const concept=(s,extra={})=>({title:'Deal Test',topic:'Space',genre:'Strategy',size:'Small',audience:'Everyone',platforms:[E.available(s)[0].id],engine:'starter',...extra});
function clear(s){if(s.event!==null)E.choose(s,false);if(s.expo)E.attendExpo(s,0);s.news=[];s.review=null;}
function build(s,extra,beforeLaunch){clear(s);assert.equal(E.start(s,concept(s,extra)),null);while(s.project.stage<3){clear(s);if(s.project.pending)assert.equal(E.planStage(s,{weights:E.genres[s.project.genre].slice(s.project.stage*3,s.project.stage*3+3),assignments:['founder','founder','founder'],features:[]}),null);else E.step(s);}for(let i=0;i<30&&s.project.bugs;i++){clear(s);E.step(s);}clear(s);if(beforeLaunch)beforeLaunch(s);assert.equal(E.launch(s),null);clear(s);return s.games[0];}

test('publisher deals pay an advance, take a share of receipts and pay a target bonus',()=>{
  const s=E.fresh(41),offer=E.publisherOffers(s,concept(s)).find(p=>p.id==='bramble'),cash=s.cash,e=E.estimate(s,concept(s));
  assert.equal(E.start(s,concept(s,{publisher:'bramble'})),null);assert.equal(s.cash,cash-e.cost-e.license+offer.advance);assert.equal(s.project.hype,offer.hype);
  s.project=null;assert.ok(E.start(s,concept(s,{publisher:'northgate'})));assert.ok(E.start(s,concept(s,{publisher:'nobody'})));
  const t=E.fresh(42),g=build(t,{publisher:'bramble'});assert.equal(g.royalty,.5);assert.equal(g.publisher,'Bramble Publishing');assert.ok(g.notes.some(n=>/Bramble/.test(n.text)));
  clear(t);E.step(t);const units=g.weekly[0];assert.ok(Math.abs(g.revenue-units*g.price*.7*.5)<1e-6);
  assert.doesNotThrow(()=>E.validate(JSON.parse(JSON.stringify(t))));
});

test('the June games expo pauses time and rewards a booth',()=>{
  const s=E.fresh(43);s.games=[{id:'x',title:'X',genre:'RPG',score:7,week:1,age:20,units:0,sold:0}];s.week=E.calendar.weekOf(1982,6,1)-1;
  E.step(s);assert.deepEqual(s.expo,{year:1982});assert.equal(E.step(s),false);
  const fans=s.fans,cash=s.cash,o=E.expoOptions(s)[1];assert.ok(E.attendExpo(s,3));assert.equal(E.attendExpo(s,1),null);
  assert.equal(s.expo,null);assert.equal(s.fans,fans+o.fans);assert.equal(s.cash,cash-o.cost);assert.equal(s.buzz,o.hype);
});

test('expansions need research, a finished sales cycle and a 7+ score, then sell as a new release',()=>{
  const s=E.fresh(44),g=build(s);s.cash=500000;g.score=8;
  assert.match(E.startExpansion(s,g.id),/franchise/);s.tech.push('sequel');
  if(g.age<20)assert.match(E.startExpansion(s,g.id),/sales cycle/);
  for(let i=0;i<20;i++){clear(s);E.step(s);}clear(s);
  assert.equal(E.startExpansion(s,g.id),null);const weeks=s.task.left;for(let i=0;i<weeks;i++){clear(s);E.step(s);}clear(s);
  const x=s.games[0];assert.equal(x.expansion,g.id);assert.ok(g.expanded);assert.ok(x.units>0);assert.equal(x.age,0);
  assert.ok(E.startExpansion(s,g.id));assert.ok(E.startExpansion(s,x.id));
  assert.doesNotThrow(()=>E.validate(JSON.parse(JSON.stringify(s))));
});

test('rival studios release games; hits reduce same-genre sales and can win Game of the Year',()=>{
  const s=E.fresh(45);for(let i=0;i<12;i++){clear(s);E.step(s);}assert.equal(s.rivals.length,1);
  const a=E.fresh(46),b=E.fresh(46),hit={studio:'Pixel Orchard',title:'Iron Horizon',genre:'Strategy',score:9.4};
  const ga=build(a,{title:'A'},x=>{x.rivals=[];}),gb=build(b,{title:'B'},x=>{x.rivals=[{...hit,week:x.week-2}];});
  assert.ok(gb.notes.some(n=>/Iron Horizon/.test(n.text)));assert.ok(gb.units<ga.units);
  const c=E.fresh(47),w=E.calendar.weekOf(1990,3,1);c.games=[{id:'g',title:'Mine',genre:'RPG',score:9.1,week:w}];c.rivals=[{studio:'Gravity Well',title:'Final Quest',genre:'RPG',score:9.5,week:w+2}];
  E.ceremony(c,1990);assert.ok(!c.awards.some(x=>x.category==='Game of the Year'));assert.ok(c.awards.some(x=>x.category==='Best RPG game'));
});

test('older saves without v2.5 fields still load',()=>{
  const s=E.fresh(48);build(s);const old=JSON.parse(JSON.stringify(s));delete old.rivals;delete old.expo;old.games.forEach(g=>delete g.royalty);
  const v=E.validate(old);assert.deepEqual(v.rivals,[]);assert.equal(v.expo,null);clear(v);assert.equal(E.step(v),true);
});
