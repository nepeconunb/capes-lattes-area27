
let DATA=[],META={researcher:'',lattesId:''};
const CLASS_ORDER=['MB','B','R','F','NC'];

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

let filtered=[];

function yearsFromData(){
  return [...new Set(DATA.map(r=>Number(r.year)).filter(Boolean))].sort((a,b)=>a-b);
}
function fillYearSelects(){
  const ys=yearsFromData();
  const s=$('#startYear'), e=$('#endYear');
  s.innerHTML=ys.map(y=>`<option value="${y}">${y}</option>`).join('');
  e.innerHTML=ys.map(y=>`<option value="${y}">${y}</option>`).join('');
  s.value=ys[0]||2022;
  e.value=ys[ys.length-1]||2028;
}
function setRange(a,b){
  const ys=yearsFromData();
  const min=Math.min(...ys), max=Math.max(...ys);
  $('#startYear').value=String(Math.max(min,Math.min(max,a)));
  $('#endYear').value=String(Math.max(min,Math.min(max,b)));
  apply();
}
function apply(){
  let a=Number($('#startYear').value), b=Number($('#endYear').value);
  if(a>b){ [a,b]=[b,a]; $('#startYear').value=a; $('#endYear').value=b; }
  filtered=DATA.filter(r=>Number(r.year)>=a && Number(r.year)<=b);
  renderSummary(a,b);
  renderTable();
  drawYearChart();
  drawClassChart();
  drawStackChart();
  drawJournalChart();
}
function countsByClass(rows){
  const c={MB:0,B:0,R:0,F:0,NC:0};
  rows.forEach(r=>{ const k=r.classification?.result||'NC'; c[k]=(c[k]||0)+1; });
  return c;
}
function renderSummary(a,b){
  const c=countsByClass(filtered);
  const blocks=[
    ['Período',`${a}–${b}`],
    ['Artigos',filtered.length],
    ['MB',c.MB],['B',c.B],['R',c.R],['NC',c.NC]
  ];
  $('#summary').innerHTML=blocks.map(([l,v])=>`<div class="metric"><div class="label">${l}</div><div class="value">${v}</div></div>`).join('');
}
function renderTable(){
  $('#tableBody').innerHTML=filtered
    .sort((a,b)=>b.year-a.year || a.title.localeCompare(b.title))
    .map(r=>`<tr>
      <td>${r.year}</td>
      <td>${esc(r.title)}</td>
      <td>${esc(r.journal)}</td>
      <td>${esc(r.issn)}</td>
      <td>${esc(r.doi)}</td>
      <td><strong>${esc(r.classification?.result||'NC')}</strong></td>
    </tr>`).join('');
}
function esc(s){ return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

function prepCanvas(id){
  const c=document.getElementById(id), ctx=c.getContext('2d');
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,c.width,c.height);
  ctx.font='16px system-ui'; ctx.fillStyle='#1c2a3a';
  return [c,ctx];
}
function niceMax(n){
  if(n<=5) return 5;
  const p=Math.pow(10,Math.floor(Math.log10(n)));
  return Math.ceil(n/p)*p;
}
function axis(ctx,w,h,ml,mt,mr,mb,maxY,steps=5){
  ctx.strokeStyle='#cbd5e1'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(ml,mt); ctx.lineTo(ml,h-mb); ctx.lineTo(w-mr,h-mb); ctx.stroke();
  ctx.font='13px system-ui'; ctx.fillStyle='#64748b'; ctx.textAlign='right';
  for(let i=0;i<=steps;i++){
    const y=h-mb-(h-mt-mb)*(i/steps), val=Math.round(maxY*i/steps);
    ctx.fillText(val,ml-10,y+4);
    ctx.strokeStyle='#eef2f7'; ctx.beginPath(); ctx.moveTo(ml,y); ctx.lineTo(w-mr,y); ctx.stroke();
  }
}
function drawBars(id, labels, values){
  const [c,ctx]=prepCanvas(id), w=c.width,h=c.height,ml=70,mt=28,mr=30,mb=70;
  const maxY=niceMax(Math.max(1,...values)); axis(ctx,w,h,ml,mt,mr,mb,maxY);
  const plotW=w-ml-mr, plotH=h-mt-mb, gap=18, bw=(plotW-gap*(labels.length+1))/Math.max(1,labels.length);
  ctx.textAlign='center'; ctx.font='13px system-ui';
  labels.forEach((lab,i)=>{
    const x=ml+gap+i*(bw+gap), bh=plotH*(values[i]/maxY), y=h-mb-bh;
    ctx.fillStyle='#2367a4'; ctx.fillRect(x,y,bw,bh);
    ctx.fillStyle='#173f67'; ctx.font='700 14px system-ui'; ctx.fillText(values[i],x+bw/2,y-7);
    ctx.fillStyle='#475569'; ctx.font='13px system-ui'; ctx.fillText(lab,x+bw/2,h-mb+24);
  });
}
function drawYearChart(){
  const ys=yearsFromData().filter(y=>filtered.some(r=>r.year===y));
  const vals=ys.map(y=>filtered.filter(r=>r.year===y).length);
  drawBars('chartYear',ys.map(String),vals);
}
function drawClassChart(){
  const c=countsByClass(filtered);
  drawBars('chartClass',CLASS_ORDER,CLASS_ORDER.map(k=>c[k]||0));
}
function drawStackChart(){
  const [c,ctx]=prepCanvas('chartStack'), w=c.width,h=c.height,ml=75,mt=45,mr=30,mb=85;
  const ys=yearsFromData().filter(y=>filtered.some(r=>r.year===y));
  const matrix=ys.map(y=>{
    const rs=filtered.filter(r=>r.year===y), cc=countsByClass(rs);
    return CLASS_ORDER.map(k=>cc[k]||0);
  });
  const totals=matrix.map(a=>a.reduce((x,y)=>x+y,0));
  const maxY=niceMax(Math.max(1,...totals)); axis(ctx,w,h,ml,mt,mr,mb,maxY);
  const plotW=w-ml-mr,plotH=h-mt-mb,gap=22,bw=(plotW-gap*(ys.length+1))/Math.max(1,ys.length);
  const fills=['#16754a','#2367a4','#a16207','#b42318','#64748b'];
  ys.forEach((y,i)=>{
    let acc=0;
    matrix[i].forEach((v,j)=>{
      const bh=plotH*(v/maxY), x=ml+gap+i*(bw+gap), yy=h-mb-plotH*(acc/maxY)-bh;
      ctx.fillStyle=fills[j]; ctx.fillRect(x,yy,bw,bh); acc+=v;
    });
    ctx.fillStyle='#475569'; ctx.textAlign='center'; ctx.font='13px system-ui'; ctx.fillText(y,ml+gap+i*(bw+gap)+bw/2,h-mb+24);
  });
  // legend
  ctx.font='13px system-ui'; ctx.textAlign='left';
  CLASS_ORDER.forEach((k,i)=>{
    const x=ml+i*120,y=18; ctx.fillStyle=fills[i]; ctx.fillRect(x,y,14,14);
    ctx.fillStyle='#334155'; ctx.fillText(k,x+20,y+12);
  });
}
function drawJournalChart(){
  const [c,ctx]=prepCanvas('chartJournals'), w=c.width,h=c.height;
  const counts={}; filtered.forEach(r=>{const j=r.journal||'Sem periódico'; counts[j]=(counts[j]||0)+1;});
  const items=Object.entries(counts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,10);
  const ml=360,mt=35,mr=70,mb=35,max=Math.max(1,...items.map(x=>x[1])), plotW=w-ml-mr;
  ctx.font='14px system-ui'; ctx.textBaseline='middle';
  items.forEach(([name,val],i)=>{
    const y=mt+i*52, bw=plotW*(val/max);
    ctx.fillStyle='#2367a4'; ctx.fillRect(ml,y,bw,30);
    ctx.fillStyle='#334155'; ctx.textAlign='right';
    let label=name.length>44?name.slice(0,42)+'…':name;
    ctx.fillText(label,ml-14,y+15);
    ctx.fillStyle='#173f67'; ctx.textAlign='left'; ctx.font='700 14px system-ui';
    ctx.fillText(String(val),ml+bw+10,y+15);
    ctx.font='14px system-ui';
  });
}
function downloadCanvas(id){
  const c=document.getElementById(id);
  const a=document.createElement('a');
  a.href=c.toDataURL('image/png');
  a.download=`CAPES-Lattes_${id}_${$('#startYear').value}-${$('#endYear').value}.png`;
  a.click();
}
function exportCsv(){
  const hdr=['Ano','Título','Periódico','ISSN','DOI','Classificação','Critério','Fonte','Data da fonte'];
  const lines=[hdr];
  filtered.forEach(r=>lines.push([
    r.year,r.title,r.journal,r.issn,r.doi,r.classification?.result||'NC',
    (r.classification?.evidence||[]).join(' • '),
    r.metrics?._source||'',
    r.metrics?._observed_at||''
  ]));
  const csv=lines.map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(';')).join('\n');
  const blob=new Blob(["\ufeff"+csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=`CAPES-Lattes_${$('#startYear').value}-${$('#endYear').value}.csv`; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

$('#applyPeriod').onclick=apply;
$('#allPeriod').onclick=()=>{const ys=yearsFromData();setRange(ys[0],ys[ys.length-1]);};
$$('[data-range]').forEach(b=>b.onclick=()=>{const [a,z]=b.dataset.range.split('-').map(Number);setRange(a,z);});
$('#last4').onclick=()=>{const ys=yearsFromData(); const z=ys[ys.length-1]; setRange(z-3,z);};
$$('.exportPng').forEach(b=>b.onclick=()=>downloadCanvas(b.dataset.target));
$('#exportCsv').onclick=exportCsv;


async function initUniversal(){
  const x=await chrome.storage.local.get('capesCurrentCV'),cv=x.capesCurrentCV;
  if(!cv?.articles?.length){document.querySelector('main').innerHTML='<section class="card"><h2>Nenhum CV analisado</h2><p>Abra um Currículo Lattes e depois volte aos gráficos.</p></section>';return;}
  DATA=cv.articles;META=cv;
  const hp=document.querySelector('header p');if(hp)hp.textContent=`${cv.researcher||'Pesquisador(a)'}${cv.lattesId?' • Lattes '+cv.lattesId:''} • versão 1.6.0 universal`;
  fillYearSelects();apply();
}
initUniversal();
