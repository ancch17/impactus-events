const {chromium}=require('playwright');
const FILE='file:///home/claude/ev/claudemasterclass/index.html';
(async()=>{
  const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  for(const [w,y,tag] of [[390,0,'top'],[390,600,'s600'],[390,2500,'s2500'],[360,2500,'w360']]){
    const ctx=await br.newContext({viewport:{width:w,height:844},deviceScaleFactor:2});
    const p=await ctx.newPage();
    await p.route('**/*',r=>{const u=r.request().url();if(u.startsWith('file://'))return r.continue();return r.fulfill({status:200,contentType:'text/plain',body:''});});
    await p.goto(FILE,{waitUntil:'load'});
    await p.evaluate(()=>document.querySelectorAll('.rv,.reveal').forEach(e=>{e.classList.add('in');e.classList.add('is-in')}));
    await p.evaluate(yy=>window.scrollTo(0,yy),y);
    await p.waitForTimeout(900);
    await p.screenshot({path:`/home/claude/out/v_${tag}.png`,clip:{x:0,y:0,width:w,height:300}});
  }
  await br.close();
})();
