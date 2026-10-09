
(function(){
const CAPES_APP_VERSION='3.9.1';
if(globalThis.__CAPES_AREA27_391__) return;
globalThis.__CAPES_AREA27_391__=true;
const DB=globalThis.CAPES_LATTES_UNIVERSAL_DATA||{journalCatalog:{}};

function dec(s){const t=document.createElement('textarea');t.innerHTML=String(s||'');return t.value;}

const VERIFIED_QUALIS_2017_2020={
  'revista da cgu':'A4',
  'revista da cgu online':'A4'
};
const VERIFIED_QUALIS_2021_2024={
  'international journal of business and management':'B2',
  'international journal of business and management online':'B2',
  'revista da cgu':'A4',
  'revista da cgu online':'A4',
  'revista administracao em dialogo':'A4',
  'revista administracao em dialogo rad':'A4',
  'administracao em dialogo':'A4',
  'reunir':'B1',
  'reunir revista de administracao ciencias contabeis e sustentabilidade':'B1',
  'reunir revista de administracao contabilidade e sustentabilidade':'B1',
  'revista de administracao ciencias contabeis e sustentabilidade':'B1',
  'pensar contabil':'B1',
  'pensar contabil online':'B1',
  'gestao e sociedade':'B1',
  'revista eletronica gestao e sociedade':'B1',
  'revista do tcu':'B3',
  'revista do tcu online':'B3',
  'revista do tribunal de contas da uniao':'B3',
  'contextus revista contemporanea de economia e gestao':'A4',
  'contextus revista contemporanea de economia e gestao fortaleza':'A4',
  'contextus fortaleza online':'A4',
  'boletim de conjuntura':'C',
  'boletim conjuntura':'C',
  'boletim de conjuntura boca':'C',
  'boletim de conjuntura universidade federal de roraima':'C',
  'revista de administracao e contabilidade da fat':'B3',
  'revista de administracao e contabilidade da unifat':'B3',
  'rgsa':'C',
  'revista de gestao social e ambiental':'C',
  'revista gestao social e ambiental':'C',
  'sociedade contabilidade e gestao':'A4',
  'revista sociedade contabilidade e gestao':'A4',
  'revista brasileira de gestao de negocios':'A2',
  'revista brasileira de gestao de negocios sao paulo impresso':'A2',
  'revista brasileira de gestao de negocios online':'A2',
  'rbgn':'A2',
  'bbr brazilian business review':'A2',
  'bbr brazilian business review english edition online':'A2',
  'bbr brazilian business review edicao em portugues online':'A2',
  'brazilian business review':'A2',
  'enfoque':'A3',
  'enfoque maringa online':'A3',
  'enfoque reflexao contabil':'A3',
  'ensaio fundacao cesgranrio impresso':'A1',
  'ensaio rio de janeiro online':'A1',
  'ensaio avaliacao e politicas publicas em educacao':'A1',
  "environmental science and pollution research":"A2",
  "environmental science and pollution research international":"A2",
  "environmental science and pollution research international internet":"A2",
  "custos e agronegocio online":"B1",
  "custos e @gronegocio online":"B1",
  "contabilidade vista revista":"B1",
  "contabilidade vista & revista":"B1",
  "avaliacao unicamp":"A1",
  "avaliacao campinas online":"A1",
  "avaliacao campinas":"A1",
  "revista producao online":"B3",
  "revista de informacao contabil":"B3",
  "revista de informacao contabil ufpe":"B3",
  "revista contabilidade financas":"A2",
  "revista contabilidade & financas":"A2",
  "revista contabilidade e financas":"A2",
  "revista economica do nordeste":"A3",
  "revista economica do nordeste online":"A3",
  "revista brasileira de informatica na educacao":"A3",
  "revista brasileira de informatica na educacao online":"A3",
  "outras palavras":"B1",
  "outras palavras online":"B1",
  "racef":"B1",
  "racef revista de administracao contabilidade e economia da fundace":"B1",
  "revista de administracao contabilidade e economia da fundace":"B1",
  "revista de contabilidade da ufba":"B3",
  "revista de educacao e pesquisa em contabilidade":"A4",
  "revista de educacao e pesquisa em contabilidade repec":"A4",
  "revista contemporanea de contabilidade":"A3",
  "revista contemporanea de contabilidade online":"A3",
  "contabilidade gestao e governanca":"A4",
  "contabilidade gestao & governanca":"A4",
  "social responsibility journal":"A1",
  "rbgn revista brasileira de gestao de negocios":"A2",
  "revista da fae":"B2",
};


const VERIFIED_QUALIS_2021_2024_BY_ISSN={
  '18082882':'B1',
  '18066356':'B2',
  '09441344':'A2',
  '18333850':'B2',
  '18338119':'B2',
  '19830807':'A2',
  '18064892':'A2',
  '18082386':'A2',
  '1984882X':'A3',
  '15179087':'A3',
  '18094465':'A1',
  '01044036':'A1'
};


const VERIFIED_NOT_EVALUATED_2021_2024=[
  "veredas favip",
  "veredas favip online"
];
function isVerifiedNotEvaluated2021_2024(text){
  const k=norm(text||'');
  return VERIFIED_NOT_EVALUATED_2021_2024.some(x=>k===x || k.includes(x));
}

function normalizeIssn(v){return String(v||'').toUpperCase().replace(/[^0-9X]/g,'');}
function verifiedQualis2021_2024ForIssn(issn){
  return VERIFIED_QUALIS_2021_2024_BY_ISSN[normalizeIssn(issn)]||'';
}

function verifiedQualis2021_2024ForJournal(journal){
  const k=norm(journal||'');
  if(VERIFIED_QUALIS_2021_2024[k]) return VERIFIED_QUALIS_2021_2024[k];
  const keys=Object.keys(VERIFIED_QUALIS_2021_2024).sort((a,b)=>b.length-a.length);
  for(const key of keys){
    if(key.length>=5 && (k===key || k.includes(key))) return VERIFIED_QUALIS_2021_2024[key];
  }
  return '';
}

function verifiedQualis2021_2024FromArticleText(text){
  const k=norm(text||'');
  const keys=Object.keys(VERIFIED_QUALIS_2021_2024).sort((a,b)=>b.length-a.length);
  for(const key of keys){
    if(key.length<5) continue;
    const idx=k.indexOf(key);
    if(idx>=0){
      return {qualis:VERIFIED_QUALIS_2021_2024[key],matchedTitle:key,source:'Qualis CAPES 2021–2024 — base consolidada por título/alias'};
    }
  }
  if(isVerifiedNotEvaluated2021_2024(text)){
    return {qualis:'ND',matchedTitle:'revista não avaliada',source:'Qualis CAPES 2021–2024 — revista não avaliada'};
  }
  return null;
}

function applyVerifiedHistoricalOverrides(journal,classification,issn=''){
  const key=norm(journal||'');
  const q1720=VERIFIED_QUALIS_2017_2020[key];
  const q2124=verifiedQualis2021_2024ForIssn(issn)||verifiedQualis2021_2024ForJournal(journal);
  if(q1720){
    classification.oldQualis=q1720;
    classification.oldQualisSource='Sucupira/CAPES — Quadriênio 2017–2020';
  }
  if(q2124){
    classification.qualis2021_2024=q2124;
    classification.qualis2021_2024Source='Qualis CAPES — Quadriênio 2021–2024 (base consolidada)';
  }
  return classification;
}

function norm(s){return dec(s).replace(/[\u2018\u2019\u201B\u2032\u00B4`]/g,"'").replace(/[\u201C\u201D\u201F\u2033]/g,'"').replace(/[\u2010-\u2014\u2212]/g,'-').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').replace(/\s+/g,' ').trim();}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}

const style=document.createElement('style');
style.textContent=`.capes-lattes-badge{display:inline-flex;margin:3px 8px 3px 0;padding:3px 8px;border-radius:999px;background:#1f5c94;color:#fff;font:700 11px system-ui;cursor:pointer}.capes-lattes-badge[data-result="NC"]{background:#64748b}.capes-lattes-badge[data-result="MB"]{background:#16754a}.capes-lattes-badge[data-result="R"]{background:#a16207}.capes-lattes-badge[data-result="F"]{background:#b42318}.capes-badge-pair{display:inline-flex;align-items:center;gap:5px;margin-right:6px;vertical-align:middle}.capes-oldqualis-badge{display:inline-flex;align-items:center;justify-content:center;padding:3px 8px;border-radius:999px;background:#5b6472;color:#fff;font:700 11px/1.35 system-ui;cursor:pointer;box-shadow:0 1px 2px #0002}.capes-oldqualis-badge[data-qualis^="A"]{background:#315f8c}.capes-oldqualis-badge[data-qualis^="B"]{background:#6b5b2a}.capes-oldqualis-badge[data-qualis="ND"]{background:#8a949f}.capes-lattes-detail{margin:6px 0 10px;padding:10px 12px;border:1px solid #d6e0e8;border-radius:7px;background:#fff;font:12px/1.45 system-ui}.capes-lattes-auto-note{position:fixed;right:14px;bottom:18px;z-index:2147483647;background:#173f67;color:#fff;padding:8px 12px;border-radius:18px;font:600 12px system-ui}
.capes-profile-launcher{position:absolute;right:18px;top:18px;z-index:50;display:flex;align-items:center;gap:12px;padding:11px 13px;border:1px solid #9fc2df;border-radius:12px;background:#f4f9fd;box-shadow:0 3px 12px #0002;font:14px system-ui;max-width:470px}.capes-profile-launcher.capes-floating-fallback{position:fixed;right:20px;top:120px;z-index:2147483645}.capes-profile-launcher .cpl-brand{font-weight:800;color:#173f67;font-size:16px}.capes-profile-launcher .cpl-meta{color:#52677c;font-size:12px;margin-top:2px}.capes-profile-launcher button{border:0;border-radius:8px;background:#2367a4;color:#fff;font-weight:700;padding:9px 13px;cursor:pointer;white-space:nowrap}.capes-modal-backdrop{position:fixed;inset:0;background:#0008;z-index:2147483646;display:flex;align-items:flex-start;justify-content:center;padding:28px;overflow:auto}.capes-modal{width:min(1180px,96vw);background:#f5f8fb;border-radius:16px;box-shadow:0 20px 70px #0007;overflow:hidden}.capes-modal header{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;background:#173f67;color:#fff}.capes-modal header h2{margin:0;font:800 24px system-ui}.capes-modal header p{margin:4px 0 0;font:13px system-ui;opacity:.9}.capes-modal .close{background:#ffffff20;border:1px solid #ffffff55;color:#fff;border-radius:8px;padding:7px 10px;font:700 15px system-ui;cursor:pointer}.capes-modal main{padding:20px}.capes-controls{background:#fff;border:1px solid #d9e3ec;border-radius:12px;padding:15px;margin-bottom:14px}.capes-controls .row{display:grid;grid-template-columns:1fr 1fr auto auto;gap:10px;align-items:end}.capes-controls label{font:600 12px system-ui;color:#64748b}.capes-controls select{width:100%;margin-top:5px;padding:9px 10px;border:1px solid #c5d3df;border-radius:8px;background:white}.capes-controls button{border:0;border-radius:8px;padding:9px 12px;font-weight:700;cursor:pointer}.capes-controls .primary{background:#2367a4;color:#fff}.capes-controls .secondary{background:#eef5fb;color:#173f67;border:1px solid #bfd1e3}.capes-area-status{margin-top:10px;padding:9px 11px;border-radius:8px;font:600 12px system-ui}.capes-area-status.ok{background:#eaf6ee;color:#24623b;border:1px solid #b8ddc4}.capes-area-status.pending{background:#fff7e6;color:#775500;border:1px solid #efd59a}.capes-area-tools{display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap}.capes-area-tools button{border:1px solid #bfd1e3;border-radius:8px;padding:8px 10px;background:#eef5fb;color:#173f67;font-weight:700;cursor:pointer}.capes-area-tools .loaded{font:600 12px system-ui;color:#24623b}.capes-area-tools .hint{font:12px system-ui;color:#64748b}.capes-summary{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px;margin-bottom:14px}.capes-metric{background:#fff;border:1px solid #d9e3ec;border-radius:11px;padding:12px}.capes-metric .label{font:700 11px system-ui;color:#64748b;text-transform:uppercase}.capes-metric .value{font:800 25px system-ui;color:#173f67;margin-top:3px}.capes-card{background:#fff;border:1px solid #d9e3ec;border-radius:12px;padding:16px;margin-bottom:14px}.capes-card h3{margin:0 0 4px;font:800 18px system-ui;color:#173f67}.capes-card p{margin:0 0 12px;color:#64748b;font:13px system-ui}.capes-card canvas{display:block;width:100%;height:auto;background:#fff;border-radius:8px}
.capes-article-list{display:flex;flex-direction:column;gap:9px;margin-top:8px}
.capes-article{display:grid;grid-template-columns:70px 1fr 90px;gap:10px;align-items:start;padding:10px 12px;border:1px solid #e1e8ef;border-radius:9px;background:#fbfdff}
.capes-article .year{font:700 12px system-ui;color:#64748b}
.capes-article .ref{font:13px/1.4 system-ui;color:#334155}
.capes-article .journal{display:block;margin-top:3px;color:#64748b;font-size:12px}
.capes-article .class{text-align:center;font:800 12px system-ui;padding:5px 7px;border-radius:999px;background:#e7eef6;color:#173f67}
.capes-article .class.MB{background:#dff3e8;color:#16623f}
.capes-article .class.B{background:#dfeefa;color:#1f5c94}
.capes-article .class.R{background:#f7ead0;color:#8a5a00}
.capes-article .class.F{background:#f8dddd;color:#9b1c1c}
.capes-article .class.NC{background:#e7ebef;color:#52606d}
.capes-article-toolbar{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}
.capes-article-toolbar .count{font:700 13px system-ui;color:#52677c}
@media(max-width:900px){.capes-controls .row{grid-template-columns:1fr 1fr}.capes-summary{grid-template-columns:repeat(2,1fr)}}`;
document.documentElement.appendChild(style);

function knownJournal(text){
  const nt=norm(text), hits=[];
  for(const [k,v] of Object.entries(DB.journalCatalog||{})) if(k.length>4 && nt.includes(k)) hits.push([k,v]);
  hits.sort((a,b)=>b[0].length-a[0].length);
  return hits[0]?.[1]||null;
}
function canonicalJournalName(name){return String(name||'').replace(/\s+\bONLINE\b\s*$/i,'').replace(/\s+\bIMPRESSO\b\s*$/i,'').replace(/\s+\bPRINT\b\s*$/i,'').replace(/\s*\((ONLINE|IMPRESSO|PRINT)\)\s*$/i,'').replace(/\s+/g,' ').trim();}

function parseJournal(text){
  // Primeiro, reconhece títulos explicitamente presentes na base Qualis 2021–2024.
  // Isso cobre referências sem volume, como Environmental Science and Pollution Research.
  const nt=norm(text||'');
  const qkeys=Object.keys(VERIFIED_QUALIS_2021_2024).sort((a,b)=>b.length-a.length);
  for(const key of qkeys){
    if(key.length>=5 && nt.includes(key)) return canonicalJournalName(key);
  }

  const k=knownJournal(text); if(k) return canonicalJournalName(k.journal);
  let s=String(text||'').replace(/\bJCR\b/gi,' ').replace(/\bCitações?:.*$/i,' ').replace(/\s+/g,' ');
  let ix=s.search(/,\s*v\.\s*[A-Za-z0-9]/i);
  if(ix>0){let p=s.slice(0,ix).split(/\.\s+/);let j=(p[p.length-1]||'').trim();if(j.length>2&&j.length<180)return canonicalJournalName(j);}
  ix=s.search(/,\s*n\.\s*[A-Za-z0-9]/i);
  if(ix>0){let p=s.slice(0,ix).split(/\.\s+/);let j=(p[p.length-1]||'').trim();if(j.length>2&&j.length<180)return canonicalJournalName(j);}
  return '';
}
function yearOf(t){const a=[...String(t).matchAll(/\b(?:199\d|20\d{2})\b/g)].map(x=>+x[0]);return a[a.length-1]||null;}

function yearOfArticleCitation(t){
  let clean=String(t||'');

  // Remove a anotação visual do QLattes, que contém "(2021–2024)"
  // mas não representa o ano de publicação do artigo.
  clean=clean.replace(
    /(?:A1|A2|A3|A4|B1|B2|B3|B4|C|Não\s+classificado|Nao\s+classificado)\s*,?\s*ISSN\s*[0-9Xx-]{8,9}(?:\s*,?\s*fonte\s*Qualis\s*\/?\s*CAPES\s*\(\s*2021\s*[–-]\s*2024\s*\))?/gi,
    ' '
  );
  clean=clean.replace(/fonte\s*Qualis\s*\/?\s*CAPES\s*\(\s*2021\s*[–-]\s*2024\s*\)/gi,' ');
  clean=clean.replace(/Qualis\s*\/?\s*CAPES\s*\(\s*2021\s*[–-]\s*2024\s*\)/gi,' ');

  const years=[...clean.matchAll(/\b(?:199\d|20\d{2})\b/g)].map(x=>+x[0]);
  return years.length ? years[years.length-1] : null;
}


function findArticlesSection(){
  const headings=[...document.querySelectorAll('h1,h2,h3,h4,h5,div,span,b,strong')];
  const head=headings.find(el=>{
    const t=(el.textContent||'').replace(/\s+/g,' ').trim();
    return /^Artigos completos publicados em peri[oó]dicos$/i.test(t);
  });
  if(!head) return null;

  // sobe até um contêiner que contenha a lista de artigos, mas evita pegar toda "Produção bibliográfica"
  let p=head.parentElement;
  for(let i=0;i<6 && p;i++,p=p.parentElement){
    const txt=(p.innerText||'');
    if(/Artigos completos publicados em peri[oó]dicos/i.test(txt) &&
       !/Cap[ií]tulos de livros publicados/i.test(txt) &&
       txt.length>200){
      return p;
    }
  }
  return head.parentElement || null;
}

function looksLikeJournalArticle(text){
  const t=String(text||'').replace(/\s+/g,' ').trim();
  if(t.length<55 || t.length>2200) return false;
  if(!/\b(?:199\d|20\d{2})\b/.test(t)) return false;

  // Exclusões explícitas de livros/capítulos.
  if(/\bIn:\s/i.test(t)) return false;
  if(/\bOrg\.?\)/i.test(t)) return false;
  if(/\bEditora\b/i.test(t)) return false;
  if(/\b1ed\.?\b/i.test(t)) return false;
  if(/\bISBN\b/i.test(t)) return false;
  if(/\bcap[ií]tulo\b/i.test(t)) return false;

  // Um artigo de periódico no Lattes normalmente tem volume ou indicação clara de periódico.
  const hasVolume=/,\s*v\.\s*[A-Za-z0-9]/i.test(t);
  const hasPages=/,\s*p\.\s*[A-Za-z0-9]/i.test(t);
  const hasDoi=/10\.\d{4,9}\//i.test(t);
  const hasJournalSignal=/\bRevista\b|\bJournal\b|\bReview\b|\bAnnals\b|\bInternational\b/i.test(t);

  return hasVolume || (hasPages && (hasDoi || hasJournalSignal));
}

function blocks(){
  const root=findArticlesSection();
  if(!root) return [];

  // Primeiro tenta itens numerados/listas dentro da seção específica.
  let nodes=[...root.querySelectorAll('li,div,p')].filter(el=>{
    const t=(el.innerText||'').trim();
    return looksLikeJournalArticle(t);
  });

  // Mantém apenas o menor bloco útil para evitar contêineres que agreguem vários artigos.
  nodes=nodes.filter(el=>{
    const children=[...el.querySelectorAll(':scope > li,:scope > div,:scope > p')];
    return !children.some(ch=>looksLikeJournalArticle((ch.innerText||'').trim()));
  });

  // Remove duplicatas.
  const seen=new Set(), out=[];
  for(const el of nodes){
    const fp=norm(el.innerText).slice(0,220);
    if(!fp || seen.has(fp)) continue;
    seen.add(fp);
    out.push(el);
  }
  return out;
}


function similarity(a,b){
  const aw=norm(canonicalJournalName(a)).split(' ').filter(w=>w.length>2);
  const bw=new Set(norm(canonicalJournalName(b)).split(' ').filter(w=>w.length>2));
  if(!aw.length) return 0;
  let hit=0;
  for(const w of aw) if(bw.has(w)) hit++;
  return hit/aw.length;
}

function parseClassificationText(t,journal,url){
  const cap1=(t.match(/Nova Classifica[cç][aã]o CAPES\s*:\s*(MB|B|R|F|I|NC)/i)||[])[1];
  const cap2=(t.match(/CAPES\s*:\s*(MB|B|R|F|I|NC)\b/i)||[])[1];
  const cap=(cap1||cap2||'').toUpperCase();

  const old=(t.match(/Qualis\s*\(2017\s*[–-]\s*2020\)\s*:\s*(A1|A2|A3|A4|B1|B2|B3|B4|C|-)/i)||[])[1]||'ND';
  const q2124=(t.match(/Qualis\s*\(2021\s*[–-]\s*2024\)\s*:\s*(A1|A2|A3|A4|B1|B2|B3|B4|C|-)/i)||[])[1]||'ND';

  const ev=[];
  let m=t.match(/ABDC\s*[:\-]?\s*([A-C]\*?)/i); if(m) ev.push('ABDC '+m[1]);
  m=t.match(/ABS\s*[:\-]?\s*(\d\*?)/i); if(m) ev.push('ABS '+m[1]);
  m=t.match(/JCR\s*[:\-]?\s*(Q[1-4])/i); if(m) ev.push('JCR '+m[1].toUpperCase());
  m=t.match(/SJR\s*[:\-]?\s*(Q[1-4])/i); if(m) ev.push('SJR '+m[1].toUpperCase());
  if(/\bSciELO\b/i.test(t)) ev.push('SciELO');
  if(/\bSPELL\b/i.test(t)) ev.push('SPELL');

  const result=cap==='I'?'NC':(cap||'NC');
  return {
    journal:canonicalJournalName(journal),
    result,
    points:{MB:8,B:4,R:2,F:1,NC:0}[result]||0,
    status:result==='NC'?'needs_metrics':'classified',
    evidence:ev.length?ev:[result==='NC'?'Sem evidência suficiente':'Classificação atual na fonte'],
    source:'Periódicos-ADM • '+url,
    date:new Date().toISOString().slice(0,10),
    oldQualis:(old==='-'?'ND':old.toUpperCase()),
    qualis2021_2024:(q2124==='-'?'ND':q2124.toUpperCase())
  };
}

function findBestDetailLink(html,journal){
  try{
    const d=new DOMParser().parseFromString(html,'text/html');
    const links=[...d.querySelectorAll('a[href*="/detalhes/"]')];
    const scored=[];
    for(const a of links){
      // Search the nearest card/container text because link text can be only title or "detalhes".
      let el=a;
      for(let i=0;i<4 && el.parentElement;i++,el=el.parentElement){
        const txt=(el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();
        if(txt.length>5){
          const sim=similarity(journal,txt);
          scored.push({sim,href:a.getAttribute('href'),txt});
        }
      }
    }
    scored.sort((a,b)=>b.sim-a.sim);
    return scored[0] && scored[0].sim>=0.58 ? scored[0] : null;
  }catch(e){ return null; }
}

function remoteClassSearch(html,journal,url){
  try{
    const d=new DOMParser().parseFromString(html,'text/html');
    const rows=[...d.querySelectorAll('article,div,li,tr,section')];
    const cand=[];
    for(const el of rows){
      const t=(el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();
      if(!/CAPES\s*:/i.test(t)) continue;
      const sim=similarity(journal,t);
      if(sim<0.58) continue;
      const item=parseClassificationText(t,journal,url);
      cand.push({sim,item});
    }
    cand.sort((a,b)=>b.sim-a.sim);
    return cand[0]?.item||null;
  }catch(e){return null;}
}

async function lookupRemote(journal){
  try{
    const r=await chrome.runtime.sendMessage({type:'LOOKUP_JOURNAL',journal:canonicalJournalName(journal)});
    if(!r?.ok) return null;

    // Search page provides current classification and, crucially, the link to the detail page.
    const searchItem=remoteClassSearch(r.html,journal,r.url);
    const link=findBestDetailLink(r.html,journal);

    if(link?.href){
      const dr=await chrome.runtime.sendMessage({type:'FETCH_DETAIL',url:link.href});
      if(dr?.ok){
        const d=new DOMParser().parseFromString(dr.html,'text/html');
        const t=(d.body?.innerText||d.body?.textContent||'').replace(/\s+/g,' ').trim();
        const detailItem=parseClassificationText(t,journal,dr.url);
        // Detail page is authoritative for historical Qualis; preserve search result if detail lacks current grade.
        if(detailItem){
          if(detailItem.result==='NC' && searchItem?.result && searchItem.result!=='NC'){
            detailItem.result=searchItem.result;
            detailItem.points=searchItem.points;
            detailItem.status=searchItem.status;
            detailItem.evidence=searchItem.evidence;
          }
          return detailItem;
        }
      }
    }
    return searchItem;
  }catch(e){ return null; }
}


// --- Integração QLattes estrita por artigo ---------------------------------
// Regra: o CAPES-Lattes só usa uma anotação QLattes se ela estiver dentro do
// MESMO bloco do artigo. Não usa ordem global, posição visual ou artigo vizinho.
const QUALIS_2124_SET=new Set(['A1','A2','A3','A4','B1','B2','B3','B4','C']);
function parseQLattesLine(raw){
  const original=String(raw||'').replace(/\s+/g,' ').trim();
  if(!original) return null;
  const issn=(original.match(/ISSN\s+([0-9]{4}-?[0-9X]{4})/i)||[])[1]||'';
  // "Não classificado" sempre prevalece.
  if(/N(?:Ã|A)O\s+CLASSIFICAD[OA]/i.test(original))
    return {q:'ND',issn,unclassified:true,text:original};
  if(/QUALIS\s*\/\s*CAPES|QUALIS\s*CAPES/i.test(original) && /2021\s*[–-]\s*2024/.test(original)){
    const q=(original.match(/(?:^|\s)(A1|A2|A3|A4|B1|B2|B3|B4|C)\s*,?\s*ISSN/i)||[])[1];
    if(q) return {q:q.toUpperCase(),issn,unclassified:false,text:original};
  }
  return null;
}
function qlattesFromSameArticle(el,articleText){
  // 1) O texto já capturado do próprio bloco do artigo é a fonte preferida.
  const direct=parseQLattesLine(articleText);
  if(direct) return direct;

  // 2) Procura somente descendentes do próprio bloco; nunca irmãos ou pais.
  for(const n of el.querySelectorAll('*')){
    if(n.closest?.('.capes-badge-pair,.capes-lattes-detail,#capes-lattes-dashboard,.capes-profile-launcher')) continue;
    const txt=(n.innerText||n.textContent||'').replace(/\s+/g,' ').trim();
    if(!txt || txt.length>320) continue;
    const parsed=parseQLattesLine(txt);
    if(parsed) return parsed;
  }
  return null;
}
function applyQLattesParsed(ext,c){
  if(!ext) return c;
  c.qualis2021_2024=ext.unclassified?'ND':ext.q;
  c.qualis2021_2024Issn=ext.issn||'';
  c.qualis2021_2024Source=ext.unclassified
    ? `QLattes / Qualis-CAPES 2021–2024 — Não classificado (ISSN ${ext.issn||'não informado'})`
    : `QLattes / Qualis-CAPES 2021–2024 — ${ext.q} (ISSN ${ext.issn||'não informado'})`;
  c.qualis2021_2024Confidence='qlattes-same-article';
  return c;
}


async function classify(journal){
  journal=canonicalJournalName(journal);
  const key=norm(journal);
  const local=DB.journalCatalog[key]||null;
  const remote=await lookupRemote(journal);

  if(local && local.result && local.result!=='NC'){
    return applyVerifiedHistoricalOverrides(journal,{
      ...local,
      journal,
      oldQualis:remote?.oldQualis||'ND',
      qualis2021_2024:remote?.qualis2021_2024||'ND',
      sourceCurrent:local.source||'Base local auditada',
      sourceOld:remote?.source||'Não localizado',
      confidenceCurrent:1
    });
  }
  if(remote){
    return applyVerifiedHistoricalOverrides(journal,{...remote,journal,sourceCurrent:remote.source,sourceOld:remote.source});
  }
  if(local){
    return applyVerifiedHistoricalOverrides(journal,{...local,journal,oldQualis:'ND',qualis2021_2024:'ND',sourceCurrent:local.source||'Base local',sourceOld:'Não localizado'});
  }
  return applyVerifiedHistoricalOverrides(journal,{
    journal,result:'NC',points:0,status:'needs_metrics',
    evidence:['Sem evidência suficiente para classificar com segurança'],
    source:'Base local/consulta online sem correspondência segura',
    sourceCurrent:'Base local/consulta online sem correspondência segura',
    sourceOld:'Não localizado',date:new Date().toISOString().slice(0,10),
    oldQualis:'ND',qualis2021_2024:'ND'
  });
}


function badge(x){
  const wrap=document.createElement('span');
  wrap.className='capes-badge-pair';
  wrap.dataset.capesOwner=CAPES_APP_VERSION;

  const current=document.createElement('span');
  current.className='capes-lattes-badge';
  current.dataset.result=x.result;
  current.textContent=x.result;
  current.title=`Classificação atual: ${x.result} • ${x.points||0} ponto(s) — clique para ver detalhes`;
  if(x.currentApplicable===false) current.style.display='none';

  const old=document.createElement('span');
  old.className='capes-oldqualis-badge';
  old.dataset.qualis=x.qualis2021_2024||'ND';
  old.textContent=`Q21–24 ${x.qualis2021_2024||'ND'}`;
  old.title=`Qualis Referência 2021–2024: ${x.qualis2021_2024||'ND'} • ${qualisPoints(x.qualis2021_2024||'ND')} ponto(s) — clique para ver detalhes`;

  const showDetail=(ev)=>{
    ev?.preventDefault?.();
    ev?.stopPropagation?.();

    const host=wrap.parentElement;
    if(!host) return;

    // Se já estiver aberta, apenas mantém a ficha visível.
    const existing=host.querySelector(':scope > .capes-lattes-detail');
    if(existing){
      existing.scrollIntoView({block:'nearest',behavior:'smooth'});
      return;
    }

    const source=x.source||x.sourceCurrent||'';
    const urlMatch=String(source).match(/https?:\/\/[^\s<]+/);
    const sourceHtml=urlMatch
      ? `${esc(String(source).replace(urlMatch[0],'').replace(/[•·-]\s*$/,''))} <a class="capes-detail-source" href="${esc(urlMatch[0])}" target="_blank" rel="noopener noreferrer">${esc(urlMatch[0])}</a>`
      : esc(source);

    const d=document.createElement('div');
    d.className='capes-lattes-detail';
    d.dataset.capesDetailOwner=CAPES_APP_VERSION;
    d.innerHTML=`
      <button type="button" class="capes-detail-close" title="Fechar">×</button>
      <div><b>Classificação atual:</b> ${x.currentApplicable===false?'Não aplicável antes de 2022':esc(x.result)} &nbsp; <b>Pontos atuais:</b> ${x.currentApplicable===false?0:(x.points||0)}</div>
      <div><b>Qualis Referência 2021–2024:</b> ${esc(x.qualis2021_2024||'ND')} &nbsp; <b>Pontos Qualis:</b> ${qualisPoints(x.qualis2021_2024||'ND')}</div>
      <div><b>Fonte Qualis:</b> ${esc(x.qualis2021_2024Source||'Qualis/CAPES 2021–2024 — não localizado por ISSN')}</div>
      <div><b>Periódico:</b> ${esc(x.journal)}</div>
      ${x.qualis2021_2024Issn?`<div><b>ISSN usado no Qualis:</b> ${esc(x.qualis2021_2024Issn)}</div>`:""}
      <div><b>Evidência:</b> ${esc((x.evidence||[]).join(' • '))}</div>
      <div><b>Fonte:</b> ${sourceHtml}</div>
      <div><b>Data da consulta:</b> ${esc(x.date||'')}</div>
    `;
    d.querySelector('.capes-detail-close').onclick=(e)=>{
      e.preventDefault();
      e.stopPropagation();
      d.remove();
    };
    wrap.after(d);
    d.scrollIntoView({block:'nearest',behavior:'smooth'});
  };

  current.onclick=showDetail;
  old.onclick=showDetail;
  wrap.append(current,old);
  return wrap;
}


const CAPES_AREAS=[
['ALIM','Ciência de Alimentos'],['AGR1','Ciências Agrárias I'],['VET','Medicina Veterinária'],['ZOO','Zootecnia / Recursos Pesqueiros'],
['BIO','Biodiversidade'],['CB1','Ciências Biológicas I'],['CB2','Ciências Biológicas II'],['CB3','Ciências Biológicas III'],
['EFIS','Educação Física, Fisioterapia, Fonoaudiologia e Terapia Ocupacional'],['ENF','Enfermagem'],['FAR','Farmácia'],
['MED1','Medicina I'],['MED2','Medicina II'],['MED3','Medicina III'],['NUT','Nutrição'],['ODO','Odontologia'],['SCOL','Saúde Coletiva'],
['ANT','Antropologia / Arqueologia'],['CPRI','Ciência Política e Relações Internacionais'],['CRT','Ciências da Religião e Teologia'],
['EDU','Educação'],['FIL','Filosofia'],['GEO','Geografia'],['HIS','História'],['PSI','Psicologia'],['SOC','Sociologia'],
['27','Administração Pública e de Empresas, Ciências Contábeis e Turismo'],['AUD','Arquitetura, Urbanismo e Design'],
['CIM','Comunicação, Informação e Museologia'],['DIR','Direito'],['ECO','Economia'],['PURD','Planejamento Urbano e Regional / Demografia'],
['SSO','Serviço Social'],['ART','Artes'],['LL','Linguística e Literatura'],['AF','Astronomia / Física'],['COMP','Computação'],
['GEOC','Geociências'],['MPE','Matemática / Probabilidade e Estatística'],['QUI','Química'],['ENG1','Engenharias I'],['ENG2','Engenharias II'],
['ENG3','Engenharias III'],['ENG4','Engenharias IV'],['BIOT','Biotecnologia'],['AMB','Ciências Ambientais'],['ENS','Ensino'],
['INT','Interdisciplinar'],['MAT','Materiais'],['CHEB','Ciências e Humanidades para a Educação Básica']
];

const AREA_CONFIGS={
  '27':{implemented:true,label:'Área 27 — Administração Pública e de Empresas, Ciências Contábeis e Turismo'}
};


function normAreaKey(s){
  return norm(canonicalJournalName(String(s||'')));
}

async function loadAreaBase(code){
  const key='capesAreaBase:'+code;
  const obj=await chrome.storage.local.get(key);
  return obj[key]||null;
}

async function saveAreaBase(code,base){
  const key='capesAreaBase:'+code;
  await chrome.storage.local.set({[key]:base});
}

function parseAreaCSV(text){
  const lines=String(text||'').split(/\r?\n/).filter(x=>x.trim());
  if(!lines.length) return {};
  const sep=(lines[0].split(';').length>lines[0].split(',').length)?';':',';
  const headers=lines[0].split(sep).map(x=>norm(x));
  const idx=(...names)=>{
    for(const name of names){
      const i=headers.indexOf(norm(name));
      if(i>=0) return i;
    }
    return -1;
  };
  const iJournal=idx('periodico','journal','titulo','nome do periodico');
  const i1720=idx('qualis_2017_2020','qualis 2017 2020','2017-2020','qualis1720');
  const i2124=idx('qualis_2021_2024','qualis 2021 2024','2021-2024','qualis2124');
  const i0712=idx('qualis_2007_2012','2007-2012');
  const i1316=idx('qualis_2013_2016','2013-2016');
  const out={};
  for(let n=1;n<lines.length;n++){
    const cols=lines[n].split(sep).map(x=>x.trim().replace(/^"|"$/g,''));
    const journal=iJournal>=0?cols[iJournal]:'';
    if(!journal) continue;
    out[normAreaKey(journal)]={
      journal,
      q1720:i1720>=0?(cols[i1720]||'ND').toUpperCase():'ND',
      q2124:i2124>=0?(cols[i2124]||'ND').toUpperCase():'ND',
      q0712:i0712>=0?(cols[i0712]||'ND').toUpperCase():'ND',
      q1316:i1316>=0?(cols[i1316]||'ND').toUpperCase():'ND'
    };
  }
  return out;
}

function areaQualisForArticle(r,base){
  if(!base) return {oldQualis:'ND',q2124:'ND',historical:{}};
  const hit=base[normAreaKey(r.journal||'')];
  if(!hit) return {oldQualis:'ND',q2124:'ND',historical:{}};
  return {
    oldQualis:hit.q1720||'ND',
    q2124:hit.q2124||'ND',
    historical:{
      '2007-2009':hit.q0712||'ND',
      '2010-2012':hit.q0712||'ND',
      '2013-2016':hit.q1316||'ND'
    }
  };
}

function areaConfig(code){
  return AREA_CONFIGS[code] || {
    implemented:false,
    label:(CAPES_AREAS.find(x=>x[0]===code)?.[1]||code)
  };
}

function qualisPoints(q){
  const map={A1:100,A2:80,A3:70,A4:60,B1:50,B2:40,B3:30,B4:10,C:0,ND:0,'-':0};
  return map[String(q||'ND').toUpperCase()] ?? 0;
}

function qualisLegacyPoints(q){
  const map={A1:100,A2:80,B1:60,B2:50,B3:30,B4:20,B5:10,C:0,ND:0,'-':0};
  return map[String(q||'ND').toUpperCase()] ?? 0;
}

function historicalPeriodForYear(year){
  year=Number(year);
  if(year>=2010 && year<=2012) return {key:'2010-2012',label:'Triênio 2010–2012',scheme:'A1/A2/B1/B2/B3/B4/B5/C'};
  if(year>=2013 && year<=2016) return {key:'2013-2016',label:'Quadriênio 2013–2016',scheme:'A1/A2/B1/B2/B3/B4/B5/C'};
  if(year>=2017 && year<=2020) return {key:'2017-2020',label:'Quadriênio 2017–2020',scheme:'A1/A2/A3/A4/B1/B2/B3/B4/C'};
  if(year>=2021 && year<=2024) return {key:'2021-2024',label:'Quadriênio 2021–2024',scheme:'A1/A2/A3/A4/B1/B2/B3/B4/C'};
  if(year>=2025) return {key:'2025+',label:'Ciclo 2025–2028',scheme:'Classificação atual MB/B/R/F/NC'};
  return {key:'pre-2010',label:'Anterior a 2010',scheme:'Fora dos eventos incorporados nesta versão'};
}


function fixedQualis1720ForArticle(r){
  const q=(r.classification?.oldQualis||'ND').toUpperCase();
  return {qualis:q,points:qualisPoints(q)};
}


function cycleCoverageStatus(r){
  const h=historicalQualisForArticle(r);
  const pending =
    (h.key==='2010-2012' || h.key==='2013-2016') &&
    (!h.qualis || h.qualis==='ND');

  return {
    ...h,
    pendingBase:pending,
    displayPoints:pending ? null : h.points
  };
}

function historicalQualisForArticle(r){
  const period=historicalPeriodForYear(r.year);
  let q='ND', points=0, note='', classificationType='Qualis';

  if(period.key==='2010-2012'){
    q=(r.classification?.historicalQualis?.['2010-2012']||'ND').toUpperCase();
    points=qualisLegacyPoints(q);
    if(q==='ND') note='Base do Triênio 2010–2012 ainda não incorporada para este periódico.';
  }else if(period.key==='2013-2016'){
    q=(r.classification?.historicalQualis?.['2013-2016']||'ND').toUpperCase();
    points=qualisLegacyPoints(q);
    if(q==='ND') note='Base do Quadriênio 2013–2016 ainda não incorporada para este periódico.';
  }else if(period.key==='2017-2020'){
    q=(r.classification?.oldQualis||'ND').toUpperCase();
    points=qualisPoints(q);
    if(q==='ND') note='Periódico não localizado no Qualis 2017–2020.';
  }else if(period.key==='2021-2024'){
    q=(r.classification?.qualis2021_2024||'ND').toUpperCase();
    points=qualisPoints(q);
    if(q==='ND') note='Periódico não localizado no Qualis 2021–2024.';
  }else if(period.key==='2025+'){
    classificationType='Atual';
    q=(r.classification?.result||'NC').toUpperCase();
    points=scoreOf(q);
    note='Classificação atual da Área 27 — MB/B/R/F/NC.';
  }else{
    classificationType='Sem ciclo';
    note='Publicação anterior a 2010; esta versão não atribui outro ciclo por substituição.';
  }

  return {...period,qualis:q,points,note,classificationType};
}


function cycleBadgeForArticle(r){
  const h=historicalQualisForArticle(r);
  if(h.key==='2025+'){
    return {
      label:`Atual ${h.qualis} • ${h.points} pts`,
      title:`${h.label}: ${h.qualis} • ${h.points} ponto(s)`
    };
  }
  if(h.key==='pre-2010'){
    return {
      label:'Ciclo ND • 0 pts',
      title:`${h.label}: sem classificação atribuída nesta versão`
    };
  }
  return {
    label:`${h.label.replace('Triênio ','').replace('Quadriênio ','')} ${h.qualis} • ${h.points} pts`,
    title:`${h.label}: ${h.qualis} • ${h.points} ponto(s)`
  };
}

function scoreOf(result){
  return ({MB:8,B:4,R:2,F:1,NC:0})[result]||0;
}

function currentClassificationApplies(year){
  return Number(year)>=2022;
}


function getProfileAnchor(){
  // Procura primeiro o cartão superior que contém simultaneamente ID Lattes e foto.
  const divs=[...document.querySelectorAll('div')];
  const candidates=[];
  for(const el of divs){
    const txt=(el.innerText||'');
    if(!/ID\s+Lattes:/i.test(txt)) continue;
    if(!el.querySelector('img')) continue;
    const r=el.getBoundingClientRect();
    if(r.width<600 || r.height<130 || r.top>850) continue;
    candidates.push({el,area:r.width*r.height,top:r.top});
  }
  candidates.sort((a,b)=>a.area-b.area || a.top-b.top);
  if(candidates.length) return candidates[0].el;

  // Fallback: parte da foto e sobe até um contêiner largo.
  const photos=[...document.images].filter(img=>{
    const r=img.getBoundingClientRect();
    return r.width>70 && r.height>90 && r.top<800;
  });
  for(const img of photos){
    let p=img.parentElement;
    for(let i=0;i<8 && p;i++,p=p.parentElement){
      const r=p.getBoundingClientRect();
      if(r.width>600 && r.height>140 && r.top<850) return p;
    }
  }
  return null;
}

function ensureProfileLauncher(payload=null){
  let box=document.querySelector('.capes-profile-launcher');
  const anchor=getProfileAnchor();

  if(!box){
    box=document.createElement('div');
    box.className='capes-profile-launcher';
    box.innerHTML=`
      <div style="flex:1;min-width:190px">
        <div class="cpl-brand">CAPES-Lattes ${CAPES_APP_VERSION}</div>
        <div class="cpl-meta">Analisando o currículo...</div>
      </div>
      <button type="button" disabled style="opacity:.60">Ver gráficos</button>
    `;
  }

  if(anchor){
    box.classList.remove('capes-floating-fallback');
    const pos=getComputedStyle(anchor).position;
    if(pos==='static') anchor.style.position='relative';
    if(box.parentElement!==anchor) anchor.appendChild(box);
  }else{
    // O cartão nunca desaparece: se o cabeçalho não for reconhecido, fica flutuando.
    box.classList.add('capes-floating-fallback');
    if(box.parentElement!==document.body) document.body.appendChild(box);
  }

  if(payload) updateProfileLauncher(payload);
  return box;
}

function updateProfileLauncher(payload){
  const box=ensureProfileLauncher();
  if(!box) return;

  const all=payload.articles||[];
  const currentRows=all.filter(r=>currentClassificationApplies(r.year));
  const total=currentRows.length;
  const points=currentRows.reduce((sum,r)=>sum+scoreOf(r.classification?.result||'NC'),0);
  const classified=currentRows.filter(r=>(r.classification?.result||'NC')!=='NC').length;

  box.querySelector('.cpl-brand').textContent=`CAPES-Lattes ${CAPES_APP_VERSION}`;
  box.querySelector('.cpl-meta').textContent=`Atual (2022+): ${classified}/${total} classificado(s) • ${points} ponto(s)`;

  const btn=box.querySelector('button');
  btn.disabled=false;
  btn.style.opacity='1';
  btn.onclick=()=>openInlineDashboard(payload);
}

function injectProfileLauncher(payload){
  updateProfileLauncher(payload);
}

function openInlineDashboard(payload){
  document.querySelectorAll('.capes-modal-backdrop').forEach(x=>x.remove());

  const rows=payload.articles||[];
  const articleYears=rows.map(r=>Number(r.year)).filter(Boolean);
  const maxArticleYear=articleYears.length?Math.max(...articleYears):new Date().getFullYear();
  const maxYear=Math.max(new Date().getFullYear(),maxArticleYear);
  const years=Array.from({length:maxYear-1990+1},(_,i)=>1990+i);

  const back=document.createElement('div');
  back.className='capes-modal-backdrop';
  back.innerHTML=`
    <div class="capes-modal">
      <header>
        <div>
          <h2>CAPES-Lattes — Área 27 | Gráficos e pontuação</h2>
          <p>${esc(payload.researcher||'Pesquisador(a)')}${payload.lattesId?' • Lattes '+esc(payload.lattesId):''}</p>
        </div>
        <button class="close" type="button">Fechar</button>
      </header>
      <main>
        <div class="capes-controls">
          <div class="row" style="grid-template-columns:1fr 1fr auto auto">
            <label>Ano inicial<select id="capesStart"></select></label>
            <label>Ano final<select id="capesEnd"></select></label>
            <button class="primary" id="capesApply" type="button">Aplicar</button>
            <button class="secondary" id="capesAll" type="button">Todo o período</button>
          </div>
          <div class="capes-area-status ok">
            Área 27 — Administração Pública e de Empresas, Ciências Contábeis e Turismo. Classificação atual MB/B/R/F/NC aplicada somente às publicações de 2022 em diante.
          </div>
          <div class="capes-area-status ok" style="margin-top:8px;background:#eef5fb;color:#173f67;border-color:#bfd1e3">
            Qualis de referência: Quadriênio 2021–2024 para todo o período. A classificação atual MB/B/R/F/NC é contabilizada somente a partir de 2022.
          </div>
        </div>
        <div class="capes-summary" id="capesSummary"></div>
        <div class="capes-card">
          <h3>Artigos por ano</h3>
          <p>Quantidade de artigos no período selecionado, desde 1990.</p>
          <canvas id="capesYear" width="1080" height="360"></canvas>
        </div>
        <div class="capes-card">
          <h3>Classificação atual</h3>
          <p>Distribuição da classificação atual da Área 27 — MB/B/R/F/NC — somente para artigos de 2022 em diante.</p>
          <canvas id="capesClass" width="1080" height="360"></canvas>
        </div>
        <div class="capes-card">
          <h3>Qualis Referência 2021–2024</h3>
          <p>Mostra a distribuição do Qualis do Quadriênio 2021–2024 para todos os artigos do período selecionado.</p>
          <canvas id="capesOldQualis" width="1080" height="360"></canvas>
        </div>
        
        <div class="capes-card">
          <h3>Pontuação por ano</h3>
          <p>MB=8, B=4, R=2, F=1, NC=0. Pontuação atual aplicada somente de 2022 em diante. O gráfico exibe apenas 2022+.</p>
          <canvas id="capesPoints" width="1080" height="360"></canvas>
        </div>
        <div class="capes-card">
          <div class="capes-article-toolbar">
            <div>
              <h3>Artigos do período</h3>
              <p>Referências usadas nos cálculos e nas classificações.</p>
            </div>
            <div class="count" id="capesArticleCount"></div>
          </div>
          <div class="capes-article-list" id="capesArticleList"></div>
          <p style="margin-top:12px;font-size:12px;color:#64748b">
            Nota metodológica: o Qualis de referência 2021–2024 é exibido para todo o período. A classificação atual MB/B/R/F/NC da Área 27 é aplicada e pontuada somente para publicações de 2022 em diante.
          </p>
        </div>
      </main>
    </div>`;
  document.body.appendChild(back);

  const close=()=>back.remove();
  back.querySelector('.close').onclick=close;
  back.onclick=e=>{if(e.target===back) close();};

  const start=back.querySelector('#capesStart');
  const end=back.querySelector('#capesEnd');
  start.innerHTML=years.map(y=>`<option value="${y}">${y}</option>`).join('');
  end.innerHTML=years.map(y=>`<option value="${y}">${y}</option>`).join('');
  start.value=String(years[0]);
  end.value=String(years[years.length-1]);

  function countClasses(rs){
    const c={MB:0,B:0,R:0,F:0,NC:0};
    rs.filter(r=>currentClassificationApplies(r.year)).forEach(r=>{
      const k=r.classification?.result||'NC'; c[k]=(c[k]||0)+1;
    });
    return c;
  }
  function prep(id){
    const c=back.querySelector('#'+id),ctx=c.getContext('2d');
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);
    return [c,ctx];
  }
  function niceMax(n){
    if(n<=5) return 5;
    const p=Math.pow(10,Math.floor(Math.log10(n)));
    return Math.ceil(n/p)*p;
  }
  function axes(ctx,w,h,ml,mt,mr,mb,maxY){
    ctx.strokeStyle='#cbd5e1';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(ml,mt);ctx.lineTo(ml,h-mb);ctx.lineTo(w-mr,h-mb);ctx.stroke();
    ctx.font='12px system-ui';ctx.fillStyle='#64748b';ctx.textAlign='right';
    for(let i=0;i<=5;i++){
      const y=h-mb-(h-mt-mb)*i/5;
      const v=Math.round(maxY*i/5);
      ctx.fillText(v,ml-8,y+4);
      ctx.strokeStyle='#eef2f7';ctx.beginPath();ctx.moveTo(ml,y);ctx.lineTo(w-mr,y);ctx.stroke();
    }
  }
  
function bars(id,labels,vals){
    const [c,ctx]=prep(id),w=c.width,h=c.height,ml=60,mt=24,mr=25,mb=55;
    const maxY=niceMax(Math.max(1,...vals));axes(ctx,w,h,ml,mt,mr,mb,maxY);
    const pw=w-ml-mr,ph=h-mt-mb,g=16,bw=(pw-g*(labels.length+1))/Math.max(1,labels.length);
    labels.forEach((lab,i)=>{
      const x=ml+g+i*(bw+g),bh=ph*(vals[i]/maxY),y=h-mb-bh;
      ctx.fillStyle='#2367a4';ctx.fillRect(x,y,bw,bh);
      ctx.fillStyle='#173f67';ctx.textAlign='center';ctx.font='700 13px system-ui';ctx.fillText(vals[i],x+bw/2,y-6);
      ctx.fillStyle='#475569';ctx.font='12px system-ui';ctx.fillText(lab,x+bw/2,h-mb+20);
    });
  }
  function render(){
    let a=Number(start.value),b=Number(end.value);
    if(a>b){const t=a;a=b;b=t;}
    const rs=rows.filter(r=>Number(r.year)>=a&&Number(r.year)<=b);
    const viewRows=rs;
    const cc=countClasses(viewRows);
    const currentRows=viewRows.filter(r=>currentClassificationApplies(r.year));
    const pts=currentRows.reduce((sum,r)=>sum+scoreOf(r.classification?.result||'NC'),0);
    back.querySelector('#capesSummary').innerHTML=[
      ['Período',`${a}–${b}`],['Artigos',viewRows.length],['Pontos atuais (2022+)',pts],
      ['Pontos Qualis 2021–2024',viewRows.reduce((z,r)=>z+qualisPoints(r.classification?.qualis2021_2024||'ND'),0)],
      ['MB',cc.MB],['B',cc.B],['R',cc.R],['F',cc.F],['NC',cc.NC]
    ].map(([l,v])=>`<div class="capes-metric"><div class="label">${l}</div><div class="value">${v}</div></div>`).join('');

    const ys=years.filter(y=>y>=a&&y<=b);
    bars('capesYear',ys.map(String),ys.map(y=>viewRows.filter(r=>Number(r.year)===y).length));
    bars('capesClass',['MB','B','R','F','NC'],['MB','B','R','F','NC'].map(k=>cc[k]||0));
    const oqLabels=['A1','A2','A3','A4','B1','B2','B3','B4','C','ND'];
    const oqCounts={A1:0,A2:0,A3:0,A4:0,B1:0,B2:0,B3:0,B4:0,C:0,ND:0};
    viewRows.forEach(r=>{const q=(r.classification?.qualis2021_2024||'ND').toUpperCase();oqCounts[oqLabels.includes(q)?q:'ND']++;});
    bars('capesOldQualis',oqLabels,oqLabels.map(k=>oqCounts[k]||0));


    const currentYs=ys.filter(y=>currentClassificationApplies(y));
    bars('capesPoints',currentYs.map(String),currentYs.map(y=>
      viewRows.filter(r=>Number(r.year)===y).reduce((sum,r)=>sum+scoreOf(r.classification?.result||'NC'),0)
    ));

    const articleList=back.querySelector('#capesArticleList');
    const articleCount=back.querySelector('#capesArticleCount');
    const ordered=[...viewRows].sort((x,y)=>Number(y.year)-Number(x.year));
    articleCount.textContent=`${ordered.length} artigo(s)`;
    articleList.innerHTML=ordered.map((r,i)=>{
      const result=(r.classification?.result||'NC');
      const currentApplicable=currentClassificationApplies(r.year);
      const pts=currentApplicable?scoreOf(result):0;
      const oq=(r.classification?.oldQualis||'ND');
      return `<div class="capes-article">
        <div class="year">${esc(r.year||'')}</div>
        <div class="ref">
          <strong>${i+1}. ${esc(r.title||'Sem título')}</strong>
          <span class="journal">${esc(r.journal||'Periódico não identificado')}${r.doi?' • DOI: '+esc(r.doi):''}</span>
        </div>
        <div>
          <div class="class ${currentApplicable?esc(result):'NC'}">${currentApplicable?(esc(result)+' • '+pts+' pt'+(pts===1?'':'s')):'Atual: n/a (antes de 2022)'}</div>
          <div style="margin-top:5px;text-align:center;font:700 11px system-ui;color:#52677c">Qualis Referência 2021–2024: ${esc(r.classification?.qualis2021_2024||'ND')} • ${qualisPoints(r.classification?.qualis2021_2024||'ND')} pts</div>
        </div>
      </div>`;
    }).join('');
  }


  back.querySelector('#capesApply').onclick=render;
  back.querySelector('#capesAll').onclick=()=>{
    start.value=String(years[0]);end.value=String(years[years.length-1]);render();
  };
  render();
}

function researcher(){
  const body=document.body.innerText||'';
  const id=(body.match(/ID\s+Lattes:\s*(\d{10,20})/i)||[])[1]||'';
  let name='Pesquisador(a)';

  const anchor=getProfileAnchor();
  if(anchor){
    const els=[...anchor.querySelectorAll('h1,h2,h3,h4,strong,b,span,div')];
    const candidates=[];
    for(const el of els){
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(t.length<6 || t.length>90) continue;
      if(/ID\s+Lattes|Endere[cç]o para acessar|Última atualiza[cç][aã]o|Bolsista|Curr[ií]culo|Texto informado|English|Atua[cç][aã]o|Identifica[cç][aã]o/i.test(t)) continue;
      if(!/^[A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-Za-zÀ-ÿ' .-]+$/.test(t)) continue;

      const r=el.getBoundingClientRect();
      let score=0;
      if(r.top<500) score+=6;
      if(el.tagName.match(/^H[1-4]$/)) score+=5;
      if(t.split(/\s+/).length>=2 && t.split(/\s+/).length<=7) score+=4;
      if(parseInt(getComputedStyle(el).fontWeight||'400',10)>=600) score+=2;
      if(r.left<1000) score+=1;
      candidates.push({t,score,top:r.top});
    }
    candidates.sort((a,b)=>b.score-a.score || a.top-b.top || a.t.length-b.t.length);
    if(candidates.length) name=candidates[0].t;
  }

  return {name,id};
}


function articleDedupKey(text,journal,year){
  const doi=(String(text||'').match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i)||[])[0];
  if(doi) return 'doi:'+doi.toLowerCase();
  let t=norm(String(text||''))
    .replace(/\bdoi\b/g,' ')
    .replace(/\bcitacoes?\b.*$/,' ')
    .replace(/^\d+\s*/,' ')
    .replace(/\s+/g,' ')
    .trim();
  return `txt:${year}|${norm(journal)}|${t.slice(0,180)}`;
}

function cleanupDuplicateCapesUI(){
  // Mantém somente um conjunto de selos por artigo, sem fechar fichas de detalhes.
  const pairs=[...document.querySelectorAll('.capes-badge-pair')];
  const groups=new Map();

  for(const pair of pairs){
    const host=pair.parentElement;
    if(!host) continue;
    if(!groups.has(host)) groups.set(host,[]);
    groups.get(host).push(pair);
  }

  for(const arr of groups.values()){
    const keep=arr.find(x=>x.dataset.capesOwner===CAPES_APP_VERSION) || arr[arr.length-1];
    for(const x of arr){
      if(x!==keep) x.remove();
    }
  }

  // Remove apenas selos órfãos antigos se já existe o par consolidado.
  document.querySelectorAll('.capes-lattes-badge,.capes-oldqualis-badge').forEach(x=>{
    if(x.closest('.capes-badge-pair')) return;
    const host=x.parentElement;
    if(host?.querySelector(':scope > .capes-badge-pair')) x.remove();
  });

  // Garante no máximo uma ficha de detalhe por artigo, preservando a mais recente.
  const details=[...document.querySelectorAll('.capes-lattes-detail')];
  const dgroups=new Map();
  for(const d of details){
    const host=d.parentElement;
    if(!host) continue;
    if(!dgroups.has(host)) dgroups.set(host,[]);
    dgroups.get(host).push(d);
  }
  for(const arr of dgroups.values()){
    if(arr.length<=1) continue;
    const keep=arr[arr.length-1];
    for(const d of arr) if(d!==keep) d.remove();
  }
}

function installDuplicateGuard(){
  if(document.documentElement.dataset.capesGuard301==='1') return;
  document.documentElement.dataset.capesGuard301='1';
  let timer=null;
  const obs=new MutationObserver(()=>{
    clearTimeout(timer);
    timer=setTimeout(cleanupDuplicateCapesUI,120);
  });
  obs.observe(document.body||document.documentElement,{subtree:true,childList:true});
}


function extractIssnFromArticleElement(el){
  try{
    // 1) Prefer the ISSN encoded by Lattes itself.
    for(const cv of el.querySelectorAll('span[cvuri],div[cvuri]')){
      const raw=String(cv.getAttribute('cvuri')||'').replace(/&amp;/g,'&');
      const m=raw.match(/(?:^|[?&])issn=([0-9Xx]{8})(?:&|$)/i);
      if(m){
        const x=m[1].toUpperCase();
        return `${x.slice(0,4)}-${x.slice(4,8)}`;
      }
    }

    // 2) Fallback: the Qualis/CAPES annotation rendered inside this SAME article.
    // We only accept a line that explicitly contains ISSN and either Qualis/CAPES
    // or "Não classificado"; this avoids reading arbitrary numbers from the citation.
    const txt=(el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();
    const q=txt.match(/(?:A1|A2|A3|A4|B1|B2|B3|B4|C|Não\s+classificado|Nao\s+classificado)\s*,?\s*ISSN\s+([0-9]{4}-?[0-9Xx]{4})/i);
    if(q){
      const x=normalizeIssn(q[1]);
      if(x.length===8) return `${x.slice(0,4)}-${x.slice(4,8)}`;
    }
    return '';
  }catch(e){return '';}
}

function buildQLattesIssnMap(){
  const out={};
  const walker=document.createTreeWalker(document.body||document.documentElement,NodeFilter.SHOW_ELEMENT);
  let n;
  while((n=walker.nextNode())){
    if(n.closest && n.closest('.capes-profile-launcher,.capes-modal-backdrop,.capes-lattes-detail,.capes-badge-pair')) continue;
    const txt=(n.innerText||'').trim();
    if(!txt || txt.length>240) continue;
    const mi=txt.match(/ISSN\s+([0-9]{4}-?[0-9Xx]{4})/i);
    if(!mi) continue;
    if(!/Qualis\/CAPES|Não classificado|Nao classificado/i.test(txt)) continue;
    const issn=normalizeIssn(mi[1]);
    if(!issn) continue;
    const unclassified=/Não classificado|Nao classificado/i.test(txt);
    let q='ND';
    if(!unclassified){
      const mq=txt.match(/(?:^|\s)(A1|A2|A3|A4|B1|B2|B3|B4|C)\s*,?\s*ISSN/i);
      if(mq) q=mq[1].toUpperCase();
    }
    // Prefer an explicit CAPES 2021–2024 annotation if there are duplicates.
    const score=/2021\s*[-–]\s*2024/i.test(txt)?2:1;
    const prev=out[issn];
    if(!prev || score>=prev.score){ out[issn]={q,unclassified,issn:mi[1],text:txt,score}; }
  }
  return out;
}

function applyQualisByExactIssn(c,issn,qlMap){
  const key=normalizeIssn(issn);

  // First priority: verified CAPES table bundled in this extension, keyed by exact ISSN.
  const local=key ? verifiedQualis2021_2024ForIssn(key) : '';
  if(local){
    c.qualis2021_2024=local;
    c.qualis2021_2024Issn=issn;
    c.qualis2021_2024Source=`Qualis/CAPES 2021–2024 — ISSN exato ${issn} (base incorporada)`;
    c.qualis2021_2024Confidence='issn-exact-local';
    return c;
  }
  // Second priority: QLattes' CAPES annotation with the SAME exact ISSN.
  const ext=qlMap && qlMap[key];
  if(ext){
    c.qualis2021_2024=ext.unclassified?'ND':ext.q;
    c.qualis2021_2024Issn=issn;
    c.qualis2021_2024Source=ext.unclassified
      ? `Qualis/CAPES 2021–2024 — Não classificado, ISSN ${issn}`
      : `Qualis/CAPES 2021–2024 — ${ext.q}, ISSN ${issn}`;
    c.qualis2021_2024Confidence='issn-exact-qlattes-capes';
  } else {
    // Fallback seguro: título/alias explicitamente incorporado na tabela Qualis 2021–2024.
    // Não usa similaridade difusa.
    const byTitle=verifiedQualis2021_2024ForJournal(c.journal||'');
    if(byTitle){
      c.qualis2021_2024=byTitle;
      c.qualis2021_2024Issn=issn||'';
      c.qualis2021_2024Source=`Qualis/CAPES 2021–2024 — correspondência exata de título/alias`;
      c.qualis2021_2024Confidence='verified-title-exact';
    }else{
      c.qualis2021_2024='ND';
      c.qualis2021_2024Issn=issn||'';
      c.qualis2021_2024Source=issn
        ? `Qualis/CAPES 2021–2024 — ISSN ${issn} não localizado na base incorporada`
        : `Qualis/CAPES 2021–2024 — ISSN não disponível e título não localizado na base incorporada`;
      c.qualis2021_2024Confidence='not-found';
    }
  }
  return c;
}


function injectVerifiedQualisRescueBadges(){
  const verified=[
    {
      title:'environmental science and pollution research',
      qualis:'A2',
      issn:'0944-1344',
      year:2018
    }
  ];

  for(const v of verified){
    const nodes=[...document.querySelectorAll('div,li,p')].filter(el=>{
      if(el.closest('.capes-modal-backdrop,.capes-profile-launcher,.capes-lattes-detail,.capes-badge-pair')) return false;
      const t=norm(el.innerText||el.textContent||'');
      return t.includes(v.title) && t.includes(String(v.year));
    });

    // Use the smallest matching citation container to avoid inserting at section/page level.
    nodes.sort((a,b)=>(a.innerText||'').length-(b.innerText||'').length);
    const host=nodes.find(el=>{
      const len=(el.innerText||'').length;
      return len>80 && len<2500;
    });
    if(!host) continue;

    // If our Qualis badge is already there, do nothing.
    const existing=[...host.querySelectorAll('.capes-oldqualis-badge')]
      .find(x=>(x.textContent||'').includes(`Q21–24 ${v.qualis}`));
    if(existing) continue;

    const c={
      result:'NC',
      points:0,
      currentApplicable:false,
      qualis2021_2024:v.qualis,
      qualis2021_2024Source:`Qualis/CAPES 2021–2024 — ISSN exato ${v.issn}`,
      qualis2021_2024Issn:v.issn,
      journal:'Environmental Science and Pollution Research',
      evidence:['ISSN 0944-1344'],
      source:'Qualis/CAPES 2021–2024',
      date:new Date().toISOString().slice(0,10)
    };
    const pair=badge(c);
    const current=pair.querySelector('.capes-lattes-badge');
    if(current) current.remove(); // current classification is not applicable before 2022
    host.insertBefore(pair,host.firstChild);
  }
}

async function run(){
  const p=await chrome.storage.sync.get({hideNc:false,autoApply:true});if(!p.autoApply)return;
  document.querySelectorAll('.capes-badge-pair,.capes-lattes-badge,.capes-oldqualis-badge,.capes-lattes-detail').forEach(x=>x.remove());
  const arts=[];let classified=0;
  const seenArticles=new Set();
  const rawArticleEls=blocks();
  const candidates=[];
  for(const el of rawArticleEls){
    const text=(el.innerText||'').trim(), year=yearOfArticleCitation(text); if(!year||year<1990)continue;
    const journal=parseJournal(text); if(!journal)continue;
    const articleKey=articleDedupKey(text,journal,year);
    if(seenArticles.has(articleKey)) continue;
    seenArticles.add(articleKey);
    candidates.push({el,text,year,journal,articleKey});
  }
  const qlattesIssnMap=buildQLattesIssnMap();
  for(let idx=0; idx<candidates.length; idx++){
    const {el,text,year,journal}=candidates[idx];
    const articleIssn=extractIssnFromArticleElement(el);
    let c=await classify(journal);

    // Fallback Qualis CAPES por texto exato da própria referência, antes do ISSN.
    // Útil quando o elemento Lattes não expõe cvuri/ISSN.
    const textQualis=verifiedQualis2021_2024FromArticleText(text);
    if(textQualis?.qualis){
      c.qualis2021_2024=textQualis.qualis;
      c.qualis2021_2024Source=textQualis.source;
      c.qualis2021_2024Confidence='verified-title-in-article';
    }

    // O ISSN exato continua tendo prioridade final.
    c=applyQualisByExactIssn(c,articleIssn,qlattesIssnMap);
    const currentApplicable=currentClassificationApplies(year);
    if(currentApplicable && c.result!=='NC') classified++;
    arts.push({year,title:text,journal,issn:articleIssn,doi:(text.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i)||[])[0]||'',classification:{result:c.result,points:currentApplicable?c.points:0,currentApplicable,status:c.status,evidence:c.evidence||[],oldQualis:c.oldQualis||'ND',qualis2021_2024:c.qualis2021_2024||'ND',qualis2021_2024Source:c.qualis2021_2024Source||'',qualis2021_2024Issn:articleIssn},metrics:{_source:c.source||c.sourceCurrent||'',_source_old:c.sourceOld||'',_observed_at:c.date||''}});
    {
      el.querySelectorAll(':scope > .capes-badge-pair,:scope > .capes-lattes-badge,:scope > .capes-oldqualis-badge,:scope > .capes-lattes-detail').forEach(x=>x.remove());
      const pair=badge({...c,year,currentApplicable});

      // The old option "hideNc" is now applied only to the CURRENT NC seal.
      // A valid Qualis 2021–2024 seal must remain visible.
      if(p.hideNc && currentApplicable && c.result==='NC'){
        const currentSeal=pair.querySelector('.capes-lattes-badge');
        if(currentSeal) currentSeal.remove();
      }

      // If both classifications are unavailable, do not add an empty pair.
      if(pair.children.length) el.insertBefore(pair,el.firstChild);
    }
  }
  injectVerifiedQualisRescueBadges();
  cleanupDuplicateCapesUI();
  const r=researcher(); const payload={version:CAPES_APP_VERSION,researcher:r.name,lattesId:r.id,analyzedAt:new Date().toISOString(),articles:arts};await chrome.storage.local.set({capesCurrentCV:payload});injectProfileLauncher(payload);
  let n=document.querySelector('.capes-lattes-auto-note');if(!n){n=document.createElement('div');n.className='capes-lattes-auto-note';document.body.appendChild(n);}n.textContent=`CAPES-Lattes: ${candidates.length} artigo(s) analisado(s) • ${classified} classificado(s)`;setTimeout(()=>n.remove(),4500);
}
let running=false;async function go(){if(running)return;running=true;try{await run();}finally{running=false;}}
let qlattesSyncTimer=null;
function installQLattesSyncObserver(){
  if(document.documentElement.dataset.capesQlattesObserver==='1') return;
  document.documentElement.dataset.capesQlattesObserver='1';
  const obs=new MutationObserver(muts=>{
    let relevant=false;
    for(const m of muts){
      for(const n of m.addedNodes||[]){
        const txt=(n.textContent||'');
        if(/Qualis\s*\/\s*CAPES|Não\s+classificado|Nao\s+classificado/i.test(txt)){ relevant=true; break; }
      }
      if(relevant) break;
    }
    if(relevant){ clearTimeout(qlattesSyncTimer); qlattesSyncTimer=setTimeout(go,500); }
  });
  obs.observe(document.body||document.documentElement,{subtree:true,childList:true,characterData:true});
}
function isActualLattesCVPage(){
  const txt=(document.body?.innerText||'');
  return /ID\s+Lattes\s*:/i.test(txt) || /Artigos\s+completos\s+publicados\s+em\s+per[ií]odicos/i.test(txt);
}
function boot(){
  if(!isActualLattesCVPage()){
    document.querySelectorAll('.capes-profile-launcher,.capes-modal-backdrop,.capes-lattes-auto-note').forEach(x=>x.remove());
    return;
  }
  installDuplicateGuard();
  installQLattesSyncObserver();
  ensureProfileLauncher();
  // Primeira análise e duas reconciliações tardias para capturar anotações do QLattes.
  setTimeout(go,1000);
  setTimeout(go,3000);
  setTimeout(go,6000);
  setTimeout(go,10000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
chrome.runtime.onMessage.addListener((m,s,send)=>{if(m?.type==='CAPES_REAPPLY'){go().then(()=>send({ok:true}));return true;}});
})();
