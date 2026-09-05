const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs'),path=require('path'),assert=require('assert');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});const results=[];
 for (const scenario of ['disabled','missing-id','preview','rejected','accepted']) {
  const context=await browser.newContext(); const page=await context.newPage(); let googleRequests=0;
  const host=scenario==='preview'?'review.pages.dev':'galanouconsulting.com';
  await context.route('**/*', async route=>{
   const u=new URL(route.request().url());
   if(/googletagmanager|google-analytics/.test(u.hostname)){googleRequests++;return route.fulfill({contentType:'text/javascript',body:'/* Offline Google stub: no vendor code or transmission. */'});}
   if(u.hostname!==host)return route.abort();
   let file=path.join(process.cwd(),'site',u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname);
   if(u.pathname==='/js/analytics-config.js') return route.fulfill({contentType:'text/javascript',body:'window.GALANOU_ANALYTICS='+JSON.stringify({measurementId:scenario==='missing-id'?'':'G-TEST123456',productionEnabled:scenario!=='disabled',enhancedMeasurementDisabled:true,productionHosts:['galanouconsulting.com']})});
   return route.fulfill({path:file});
  });
  await page.goto('https://'+host+'/?private=should-not-send#secret');
  assert.equal(googleRequests,0,'no load before consent');
  await page.getByRole('button',{name:scenario==='rejected'?'Reject analytics':'Accept analytics',exact:true}).click();
  await page.waitForTimeout(150);
  if(scenario==='accepted'){
   assert.equal(googleRequests,1);
   const events=()=>page.evaluate(()=>dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='event'));
   assert.equal((await events()).filter(x=>x[1]==='page_view').length,1);
   await page.locator('.home-button-primary').evaluate(a=>a.addEventListener('click',e=>e.preventDefault()));
   await page.locator('.home-button-primary').click();
   assert.equal((await events()).filter(x=>x[1]==='contact_cta_click').length,1);
   const data=await page.evaluate(()=>JSON.stringify(dataLayer));assert(!data.includes('should-not-send'));assert(!data.includes('secret'));
   await page.getByRole('button',{name:'Analytics preferences',exact:true}).click();await page.getByRole('button',{name:'Accept analytics',exact:true}).click();await page.getByRole('button',{name:'Save preferences',exact:true}).click();
   assert.equal((await events()).filter(x=>x[1]==='page_view').length,1);
   await page.getByRole('button',{name:'Analytics preferences',exact:true}).click();await page.getByRole('button',{name:'Reject analytics',exact:true}).click();
   await Promise.all([page.waitForEvent('load'),page.getByRole('button',{name:'Save preferences',exact:true}).click()]);assert.equal(googleRequests,1);
   assert.equal(await page.locator('.consent-confirmation').textContent(),'Your analytics preference has been saved.');
   results.push({scenario,pass:true,checks:'one page_view, one contact event, no URL query/hash, no duplicate on resave, withdrawal reload blocks further load'});
  }else{assert.equal(googleRequests,0);results.push({scenario,pass:true,googleRequests});}
  await context.close();
 }
 const active=await browser.newContext();
 await active.route('**/*',async r=>{const u=new URL(r.request().url());if(u.hostname!=='galanouconsulting.com')return r.fulfill({contentType:'text/javascript',body:''});if(u.pathname==='/js/analytics-config.js')return r.fulfill({contentType:'text/javascript',body:'window.GALANOU_ANALYTICS={measurementId:\'G-TEST123456\',productionEnabled:true,enhancedMeasurementDisabled:true,productionHosts:[\'galanouconsulting.com\']}'});return r.fulfill({path:path.join(process.cwd(),'site',u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname)});});
 await active.addInitScript(()=>localStorage.setItem('galanou-analytics-consent-v1','accepted'));
 const actions=await active.newPage();
 for(const [route,selector,event,count] of [['contact/','.schedule-button','calendly_click',1],['contact/','a[data-event=email_click]','email_click',2],['experience/','a[data-event=publication_click]','publication_click',5]]){
 await actions.goto('https://galanouconsulting.com/'+route);
 for(const link of await actions.locator(selector).all()){await link.evaluate(a=>a.addEventListener('click',e=>e.preventDefault()));await link.click();}
 const ev=await actions.evaluate(()=>dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='event'));assert.equal(ev.filter(x=>x[1]===event).length,count);results.push({event,count,pass:true});}
 await active.close();
 const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});const rp=await reduced.newPage();await rp.goto('http://127.0.0.1:8080/');await rp.getByRole('button',{name:'Reject analytics',exact:true}).click();await rp.locator('#toggle-main-menu-mobile').click();assert.equal(await rp.locator('#main-menu-mobile li').first().evaluate(e=>getComputedStyle(e).opacity),'1');results.push({reducedMotionMenuVisible:true});await reduced.close();
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();await page.goto('http://127.0.0.1:8080/');assert.equal(await page.locator('.proof-panel').count(),3); for(const p of await page.locator('.proof-panel').all())assert(await p.isVisible());results.push({noJavaScriptProof:true});await context.close();
 await browser.close();fs.writeFileSync('docs/analytics-results.json',JSON.stringify(results,null,2));console.log(results);
})();
