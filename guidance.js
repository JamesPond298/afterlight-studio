(function(root){
 'use strict';
 function next(s,E){
  if(s.ended)return {title:'Your studio story is saved',text:'Open Options to export this career or start again.',action:'settings',label:'Open studio records'};
  if(s.project){const p=s.project;if(p.pending)return {title:'Choose this stage’s priorities',text:'The three sliders share one time budget. A balanced plan is a useful first experiment.',action:'stage',label:'Set stage priorities'};if(p.stage>=3&&!p.bugs)return {title:'Ready for release',text:'Your bugs are fixed. Release the game to see reviews and begin earning sales.',action:'release',label:'Release your game'};return {title:p.stage>=3?'Fix the remaining bugs':'Your team is ready to work',text:'Press Continue working to run time. We pause at the next decision or milestone.',action:'continue',label:'Continue working ▶'};}
  if(s.task)return {title:s.task.name,text:`${s.task.left} weeks left. Continue working; time pauses when this task is finished.`,action:'continue',label:'Continue working ▶'};
  if(!E.active(s).length)return {title:'Your creators are away',text:'Advance time until a creator returns. Weekly expenses still apply.',action:'continue',label:'Continue to their return ▶'};
  if(s.cash<E.upkeep(s)*12+7000)return {title:'Build a cash reserve',text:'A small contract earns cash and research. Keep enough money for rent and payroll.',action:'contracts',label:'Choose a contract'};
  if(!s.games.length)return {title:'Let’s make your first game',text:'Start with a small Fantasy RPG on your free computer platform. You can change every choice.',action:'starter',label:'Prepare a first game →'};
  const g=s.games.find(g=>!g.report);if(g)return {title:'Learn from your latest release',text:`Create a report on ${g.title}. It costs no cash beyond normal weekly expenses, takes 2 weeks, and awards 14 research points.`,action:'report',id:g.id,label:'Generate game report · +14 ✧'};
  if(!s.tech.includes('enginekit'))return {title:'Unlock your own game engines',text:'Research Custom engine architecture to create reusable tools for better games.',action:'research',label:'Explore research'};
  const features=s.tech.filter(id=>Number.isInteger(E.feature(id)?.area));
  if(!features.length)return {title:'Choose your first engine feature',text:'Research a renderer or persistent worlds, then build a custom engine containing that feature.',action:'research',label:'Choose an engine feature'};
  if(s.engines.length===1)return {title:'Turn research into usable tools',text:'Build an engine containing your researched features. Select it for the next game.',action:'engines',label:'Build your first engine'};
  if(E.team(s).some(p=>p.energy<55))return {title:'Give your team a breather',text:'Tired creators work more slowly. Manage vacations in Team before your next project.',action:'team',label:'Manage your team'};
  return {title:'You’re ready for another game',text:'Use a report’s insights, try a new topic, or improve your engine. Keep a reserve for weekly costs.',action:'new',label:'Develop your next game →'};
 }
 const api={next};if(typeof module!=='undefined')module.exports=api;root.StudioGuide=api;
})(globalThis);
