/* Original procedural office art. No external textures or sprites. */
(function(root){
  'use strict';
  let canvas,ctx,state,running=false,onDesk=()=>{},time=0,targets=[],raf;
  const W=1400,H=900;
  const P=(x,y,z=0)=>[700+(x-y)*.83,355+(x+y)*.39-z];
  function polygon(points,fill,stroke){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}}
  function face(points,fill){polygon(points.map(p=>P(...p)),fill);}
  function box(x,y,w,d,h,color,top,z=0){face([[x,y,z],[x+w,y,z],[x+w,y,z+h],[x,y,z+h]],color);face([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],shade(color,-14));face([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],top||shade(color,18));}
  function shade(hex,n){let c=parseInt(hex.slice(1),16);return '#'+[c>>16,c>>8&255,c&255].map(v=>Math.max(0,Math.min(255,v+n)).toString(16).padStart(2,'0')).join('');}
  function line(a,b,color,width=2){ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
  function ellipse(x,y,rx,ry,c){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=c;ctx.fill();}
  function plant(x,y,scale=1){const [a,b]=P(x,y);ellipse(a,b,22*scale,10*scale,'#263d3930');box(x-10*scale,y-10*scale,23*scale,23*scale,31*scale,'#be826c','#dca68a');const [u,v]=P(x,y,32*scale);line([u,v],[u,v-56*scale],'#658c64',5*scale);for(let i=0;i<5;i++){let k=i%2?1:-1;ellipse(u+k*13*scale,v-14*scale-i*10*scale,18*scale,8*scale,i%2?'#80a57a':'#52795a');}}
  function shelf(x,y){box(x,y,125,28,112,'#8b6854','#c79d73');for(let z=25;z<110;z+=38){face([[x-1,y+29,z],[x+126,y+29,z],[x+126,y+29,z+5],[x-1,y+29,z+5]],'#cba17a');for(let n=0;n<7;n++)box(x+8+n*14,y+20,9,10,26,['#6e8b8f','#c0a674','#9b8d9e','#adbd9b'][n%4],null,z+4);}}
  function windowPane(x,w,office){face([[x,0,105],[x+w,0,105],[x+w,0,255],[x,0,255]],'#526e76');face([[x+7,-1,113],[x+w-7,-1,113],[x+w-7,-1,247],[x+7,-1,247]],'#a6d2d5');for(let i=0;i<5;i++){const bx=x+8+i*(w-16)/5,h=25+(i*29%80);face([[bx,-2,113],[bx+20,-2,113],[bx+20,-2,113+h],[bx,-2,113+h]],office>1?'#7aabbd':'#b8cdb3');}line(P(x+w/2,-4,110),P(x+w/2,-4,250),'#e7e8d1',5);line(P(x,-4,181),P(x+w,-4,181),'#e7e8d1',5);}
  function creator(x,y,p,index){
    const isActive=!p.activity&&(state.project&&!state.project.pending||state.task),phase=time*3+index,typing=running&&isActive?Math.sin(phase)*2:0;
    const [sx,sy]=P(x+32,y+100);ellipse(sx,sy+18,51,18,'#26363720');box(x,y,112,56,8,'#b68562','#dbb38a',60);
    for(const [dx,dy]of[[5,5],[103,5],[5,47],[103,47]]){const a=P(x+dx,y+dy,0),b=P(x+dx,y+dy,63);line(a,b,'#556362',5);}
    // CRT monitor, keyboard, mouse and a coffee mug.
    box(x+41,y+9,40,22,33,'#aeb4a1','#d0d1bb',65);face([[x+43,y+32,70],[x+78,y+32,70],[x+78,y+32,95],[x+43,y+32,95]],'#29464e');
    face([[x+46,y+33,73],[x+75,y+33,73],[x+75,y+33,92],[x+46,y+33,92]],isActive?'#82c2b5':'#617b8b');
    for(let i=0;i<3;i++)line(P(x+49,y+34,88-i*5),P(x+67-i*3,y+34,88-i*5),'#d2edaf',1);
    face([[x+35,y+38,66],[x+76,y+38,66],[x+76,y+49,66],[x+35,y+49,66]],'#e7ddbf');box(x+91,y+24,8,8,12,'#8aab9d','#fff4ce',65);
    // Swivel chair and articulated developer.
    line(P(x+54,y+84,0),P(x+54,y+84,26),'#43545b',4);line(P(x+34,y+82,1),P(x+72,y+86,1),'#43545b',3);
    box(x+35,y+70,38,30,8,'#597c79','#72968e',28);
    const [cx,cy]=P(x+54,y+74,62);ctx.fillStyle=['#cc9a65','#7ca3b1','#b48caa','#829e76'][index%4];ctx.beginPath();ctx.roundRect(cx-13,cy-8,27,32,9);ctx.fill();
    const skin=['#d6aa83','#a77859','#c6946c','#e1b58b'][index%4];line([cx-10,cy+1],P(x+40,y+48,68+typing),skin,7);line([cx+10,cy+2],P(x+70,y+48,68-typing),skin,7);
    ellipse(cx,cy-20,13,15,skin);ellipse(cx-2,cy-28,14,9,['#50453b','#3e3938','#755440','#4b3e3a'][index%4]);
    const [tx,ty]=P(x+57,y+70,125);targets.push({id:p.id,x:tx,y:ty+40});
    if(p.activity){ctx.font='bold 15px Segoe UI';ctx.fillStyle='#456c70';ctx.textAlign='center';ctx.fillText(p.activity.type==='vacation'?'Z z z':'✧',tx,ty);}
    const energy=p.energy/100;ctx.fillStyle='#ffffffc0';ctx.fillRect(tx-21,ty+8,42,4);ctx.fillStyle=energy>.4?'#9ab975':'#db9276';ctx.fillRect(tx-21,ty+8,42*energy,4);
    if(running&&isActive){for(let j=0;j<2;j++){const k=((time*.4+j*.5+index*.14)%1),px=tx+Math.sin(k*5+index)*28,py=ty-15-k*85;ctx.globalAlpha=1-k;ellipse(px,py,10,10,j?'#70b5da':'#e5b16f');ctx.fillStyle='#fffdf0';ctx.font='bold 10px Segoe UI';ctx.fillText(j?'T':'D',px,py+3);ctx.globalAlpha=1;}}
  }
  function draw(){if(!canvas)return;time=performance.now()/1000;ctx.clearRect(0,0,W,H);targets=[];const office=state?.office||0,room=office===0?470:office===1?570:650;
    const bg=ctx.createRadialGradient(700,400,50,700,450,800);bg.addColorStop(0,'#b9cfbd');bg.addColorStop(1,'#83aaa8');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ellipse(710,660,500,115,'#36565920');face([[0,0,-12],[room,0,-12],[room,room,-12],[0,room,-12]],'#8f7968');face([[0,0,0],[room,0,0],[room,room,0],[0,room,0]],'#c4a888');
    for(let y=0;y<room;y+=38)for(let x=0;x<room;x+=95)face([[x,y,1],[Math.min(x+94,room),y,1],[Math.min(x+94,room),Math.min(y+37,room),1],[x,Math.min(y+37,room),1]],(x/95+y/38)%3===0?'#d2b797':'#cbb090');
    face([[0,0,0],[room,0,0],[room,0,300],[0,0,300]],office>1?'#dce4df':'#e5dfc7');face([[0,0,0],[0,room,0],[0,room,300],[0,0,300]],office===0?'#bbb9a4':'#b7c9be');
    // Window light and wall details establish a different studio each move.
    windowPane(80,145,office);if(office>0)windowPane(320,155,office);
    face([[0,room-120,80],[0,room-12,80],[0,room-12,260],[0,room-120,260]],office===0?'#859188':'#6b8b88');for(let z=95;z<260;z+=21)line(P(-1,room-120,z),P(-1,room-12,z),'#a9b1a1',2);
    const [ax,ay]=P(room-85,-2,230);ctx.save();ctx.translate(ax,ay);ctx.transform(.88,.4,0,1,0,0);ctx.fillStyle='#476a64';ctx.font='bold 20px Segoe UI';ctx.textAlign='center';ctx.fillText('AFTERLIGHT',0,0);ctx.font='10px Segoe UI';ctx.fillStyle='#869788';ctx.fillText('INDEPENDENT GAME DEVELOPMENT',0,19);ctx.restore();
    // Rug, shelving, boxes and the changing equipment corner.
    face([[125,100,2],[room-45,100,2],[room-45,room-65,2],[125,room-65,2]],office>1?'#a5aaa4':'#aaa88b');
    shelf(20,15);plant(room-35,35,.95);plant(35,room-45,.8);
    if(office===0){box(15,170,70,50,32,'#b39263','#d0ae79');box(30,180,40,30,56,'#7b8d87','#94a69a');box(20,235,50,50,24,'#ab8a64','#c2a275');}
    else {box(22,190,70,145,45,'#688d85','#86aaa0');box(20,190,14,145,90,'#537970','#6b9388');box(20,183,80,13,70,'#52776e','#72958c');box(20,328,80,13,70,'#52776e','#72958c');}
    if(office>1){box(room-145,30,88,58,65,'#748487','#9aaca7');box(room-140,35,35,20,96,'#a6baad','#d1dcc4');}
    const positions=office===0?[[205,190]]:office===1?[[170,150],[345,155],[170,325],[345,330]]:[[170,140],[350,140],[170,315],[350,315],[170,490],[350,490],[510,315],[510,490]];
    if(state){const crew=[state.founder,...state.staff];positions.slice(0,Math.min(positions.length,crew.length)).map((pos,i)=>({pos,p:crew[i],i})).sort((a,b)=>(a.pos[0]+a.pos[1])-(b.pos[0]+b.pos[1])).forEach(({pos,p,i})=>creator(...pos,p,i));
      // Empty desks appear as the office grows.
      if(office>0)positions.slice(crew.length,crew.length+1).forEach(pos=>{ctx.globalAlpha=.45;box(pos[0],pos[1],110,55,65,'#b68562','#dbb38a');ctx.globalAlpha=1;});
    }
    raf=requestAnimationFrame(draw);
  }
  function init(el,callback){canvas=el;ctx=canvas.getContext('2d');canvas.width=W;canvas.height=H;onDesk=callback;canvas.addEventListener('click',e=>{const b=canvas.getBoundingClientRect(),cover=getComputedStyle(canvas).objectFit==='cover',scale=cover?Math.max(b.width/W,b.height/H):Math.min(b.width/W,b.height/H),ox=(b.width-W*scale)*.5,oy=(b.height-H*scale)*(cover?.64:.5),x=(e.clientX-b.left-ox)/scale,y=(e.clientY-b.top-oy)/scale;const t=targets.find(t=>Math.hypot(x-t.x,y-t.y)<70);if(t)onDesk(t.id);});cancelAnimationFrame(raf);draw();}
  root.Office={init,update(s,play){state=s;running=play&&!matchMedia('(prefers-reduced-motion: reduce)').matches;}};
})(globalThis);
