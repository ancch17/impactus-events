const {chromium}=require('playwright');
const FILE='file:///home/claude/ev/claudemasterclass/index.html';
(async()=>{
  const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const ctx=await br.newContext({viewport:{width:390,height:844},deviceScaleFactor:1});
  const p=await ctx.newPage();
  await p.route('**/*',r=>{const u=r.request().url();if(u.startsWith('file://'))return r.continue();return r.fulfill({status:200,contentType:'text/plain',body:''});});
  await p.goto(FILE,{waitUntil:'load'});
  await p.evaluate(()=>document.querySelectorAll('.rv,.reveal').forEach(e=>{e.classList.add('in');e.classList.add('is-in')}));
  await p.waitForTimeout(400);
  console.log(JSON.stringify(await p.evaluate(()=>{
    const out=[];
    document.querySelectorAll('#sessions *').forEach(el=>{
      const b=el.getBoundingClientRect();
      if(b.right>391||b.left<-1) out.push({tag:el.tagName,cls:String(el.className).slice(0,55),l:+b.left.toFixed(0),r:+b.right.toFixed(0),w:+b.width.toFixed(0),txt:(el.textContent||'').trim().slice(0,45)});
    });
    // chips hidden-state geometry
    const c=document.querySelector('.chips'), cb=c.getBoundingClientRect();
    return {sessOverflow:out.slice(0,15), chipsHidden:{t:+cb.top.toFixed(1),b:+cb.bottom.toFixed(1),h:+cb.height.toFixed(1)},
      hdrH:getComputedStyle(document.documentElement).getPropertyValue('--hdr-h'),
      hdrRect:document.querySelector('.hdr').getBoundingClientRect().height,
      isVis:c.classList.contains('is-vis'), tf:getComputedStyle(c).transform};
  }),null,1));
  await br.close();
})();
