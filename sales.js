/* Sales presentation shared by the office HUD and full release report. */
(function(root){
  'use strict';
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const compact=x=>x>=1e9?(x/1e9).toFixed(1)+'B':x>=1e6?(x/1e6).toFixed(1)+'M':x>=1e3?(x/1e3).toFixed(x>=1e5?0:1)+'K':Math.round(x).toLocaleString('en-US');
  const cash=x=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(x);
  function rows(g,metric='units'){
    if(!['units','revenue'].includes(metric))throw Error('Unknown sales metric');
    return Array.from({length:20},(_,i)=>{const recorded=i<g.weekly.length,units=recorded?Math.max(0,Number(g.weekly[i])||0):0;return {week:i+1,recorded,units,value:metric==='revenue'?units*g.price*.7:units};});
  }
  function summary(g){const recent=g.weekly.at(-1)||0,previous=g.weekly.at(-2)||0;return {units:g.sold,revenue:g.revenue,profit:g.revenue-g.cost,lastWeek:recent,change:g.weekly.length>1&&previous>0?(recent-previous)/previous*100:null,peak:Math.max(0,...g.weekly),peakWeek:g.weekly.length?g.weekly.indexOf(Math.max(...g.weekly))+1:null};}
  function scaleMax(max){if(max<=0)return 1;const p=10**Math.floor(Math.log10(max)),n=max/p;return (n<=1?1:n<=2?2:n<=5?5:10)*p;}
  function render(g,{compact:small=false,metric='units'}={}){
    if(g.age>0&&g.weekly.length===0&&g.sold>0)return '<p class="help sales-legacy">This imported release has lifetime totals but no saved weekly breakdown.</p>';
    const data=rows(g,metric),width=small?220:720,height=small?123:285,left=small?33:65,right=small?5:18,top=small?10:24,bottom=small?25:44,plotW=width-left-right,plotH=height-top-bottom,max=scaleMax(Math.max(0,...data.map(r=>r.value))),slot=plotW/20,gap=small?2:5;
    const fmt=v=>(metric==='revenue'?'$':'')+compact(v),ticks=small||max<4?[0,1]:[0,.25,.5,.75,1];
    const grid=ticks.map(f=>{const y=top+(1-f)*plotH;return `<line x1="${left}" x2="${width-right}" y1="${y}" y2="${y}" stroke="#c7d4c2" stroke-width="1" ${f?'stroke-dasharray="3 4"':''}/><text x="${left-6}" y="${y+3}" text-anchor="end" class="sales-axis">${esc(fmt(max*f))}</text>`;}).join('');
    const bars=data.map((r,i)=>{const x=left+i*slot+gap/2,h=r.recorded?Math.max(r.value>0?2:0,r.value/max*plotH):plotH,y=top+plotH-h,label=r.recorded?`Week ${r.week}: ${r.units.toLocaleString('en-US')} copies; ${cash(r.units*g.price*.7)} net receipts`:`Week ${r.week}: not yet recorded`;
      return `<rect class="sales-bar ${r.recorded?'recorded':'future'} ${i===g.weekly.length-1?'latest':''}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${Math.max(1,slot-gap).toFixed(2)}" height="${h.toFixed(2)}" rx="${small?1:3}" tabindex="0" role="img" aria-label="${esc(label)}" data-week="${r.week}" data-units="${r.units}" data-value="${r.value}" data-recorded="${r.recorded}" data-tip="${esc(label)}"><title>${esc(label)}</title></rect>`;
    }).join('');
    const xs=(small?[1,10,20]:[1,5,10,15,20]).map(w=>`<text x="${left+(w-.5)*slot}" y="${height-bottom+17}" text-anchor="middle" class="sales-axis">${w}</text>`).join('');
    return `<div class="sales-chart ${small?'compact':''}" data-metric="${metric}"><svg viewBox="0 0 ${width} ${height}" role="group" aria-label="${metric==='units'?'Copies sold':'Net receipts'} by sales week for ${esc(g.title)}"><text x="${left}" y="${small?0:12}" class="sales-axis chart-caption">${small?'':metric==='units'?'COPIES PER WEEK':'NET RECEIPTS PER WEEK'}</text>${grid}${bars}${xs}${small?'':`<text x="${left+plotW/2}" y="${height-3}" text-anchor="middle" class="sales-axis">Sales week</text>`}</svg><div class="sales-tip" role="status" aria-live="polite">${g.weekly.length?'Hover or focus a bar to inspect its week.':'Sales begin when you advance one week.'}</div></div>`;
  }
  const api={rows,summary,render,scaleMax};if(typeof module!=='undefined')module.exports=api;root.Sales=api;
})(globalThis);
