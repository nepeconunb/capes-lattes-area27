
const CACHE_PREFIX='capesJournalLookup:v212:';

function normQuery(s){
  return String(s||'')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/\bONLINE\b/gi,' ')
    .replace(/\bIMPRESSO\b/gi,' ')
    .replace(/\bPRINT\b/gi,' ')
    .replace(/\(ONLINE\)|\(IMPRESSO\)|\(PRINT\)/gi,' ')
    .replace(/\s+/g,' ').trim();
}

async function fetchText(url){
  const res=await fetch(url,{cache:'no-store',credentials:'omit'});
  if(!res.ok) throw new Error('HTTP '+res.status);
  return await res.text();
}

chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
  if(msg?.type==='LOOKUP_JOURNAL'){
    (async()=>{
      const original=String(msg.journal||'').trim();
      const journal=normQuery(original);
      const key=CACHE_PREFIX+journal.toLowerCase();

      const cached=await chrome.storage.local.get(key);
      if(cached[key]?.html){
        sendResponse({ok:true,html:cached[key].html,url:cached[key].url,cached:true,query:journal});
        return;
      }

      const url='https://periodicos-adm.com/?search_term='+encodeURIComponent(journal);
      try{
        const html=await fetchText(url);
        await chrome.storage.local.set({[key]:{html,url,at:new Date().toISOString(),query:journal}});
        sendResponse({ok:true,html,url,cached:false,query:journal});
      }catch(e){
        sendResponse({ok:false,error:String(e),url,query:journal});
      }
    })();
    return true;
  }

  if(msg?.type==='FETCH_DETAIL'){
    (async()=>{
      let url=String(msg.url||'').trim();
      if(!url){sendResponse({ok:false,error:'empty_url'});return;}
      if(url.startsWith('/')) url='https://periodicos-adm.com'+url;
      if(!/^https:\/\/(www\.)?periodicos-adm\.com\//i.test(url)){
        sendResponse({ok:false,error:'invalid_host'});return;
      }
      try{
        const html=await fetchText(url);
        sendResponse({ok:true,html,url});
      }catch(e){
        sendResponse({ok:false,error:String(e),url});
      }
    })();
    return true;
  }
});
