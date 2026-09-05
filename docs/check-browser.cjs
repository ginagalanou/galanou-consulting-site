const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 const results=[];
 for(const width of [390,768,1024,1440]) {
  const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1});
  const page=await context.newPage(); const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('galanou-analytics-consent-v1','rejected'));
  for(const route of ['','services/','about/','experience/','contact/']) {
   await page.goto('http://127.0.0.1:8080/'+route); await page.evaluate(()=>document.fonts.ready);
   for (const im of await page.locator('img[loading=lazy]').all()) { await im.scrollIntoViewIfNeeded(); await im.evaluate(e=>e.decode()); }
   await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:`docs/screenshots/${route.replace('/','')||'home'}-${width}.png`,fullPage:true});
   results.push({route:'/'+route,width,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,heading:document.querySelector('h1')?.textContent,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)})),errors:[...errors]});
  }
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:390,height:844}}); const page=await context.newPage();
 const analytics=[]; page.on('request',r=>{if(/google-analytics|googletagmanager|analytics.google/.test(r.url()))analytics.push(r.url())});
 await page.goto('http://127.0.0.1:8080/'); await page.screenshot({path:'docs/screenshots/consent-mobile.png',fullPage:false});
 await page.getByRole('button',{name:'Reject analytics',exact:true}).click();
 await page.locator('#toggle-main-menu-mobile').click();
 results.push({menuOpen:await page.locator('#toggle-main-menu-mobile').getAttribute('aria-expanded'),menuFocus:await page.evaluate(()=>document.activeElement.textContent.trim())});
 await page.keyboard.press('Escape'); results.push({menuEscape:await page.locator('#toggle-main-menu-mobile').getAttribute('aria-expanded')});
 await page.getByRole('button',{name:'Analytics preferences',exact:true}).click();
 await page.getByRole('button',{name:'Accept analytics',exact:true}).click(); await page.getByRole('button',{name:'Save preferences',exact:true}).click();
 await page.goto('http://127.0.0.1:8080/services/');
 results.push({previewAnalyticsRequests:analytics});
 await page.getByRole('button',{name:'Analytics preferences',exact:true}).click(); await page.getByRole('button',{name:'Reject analytics',exact:true}).click(); await page.getByRole('button',{name:'Save preferences',exact:true}).click();
 await page.goto('http://127.0.0.1:8080/experience/#ai-digital-health');
 await page.waitForTimeout(800);
 results.push({anchorTop:await page.locator('#ai-digital-health').evaluate(e=>e.getBoundingClientRect().top),headerBottom:await page.locator('.header').evaluate(e=>e.getBoundingClientRect().bottom)});
 const rail=page.locator('.experience-card-rail').first(); await rail.focus(); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(500);results.push({railScroll:await rail.evaluate(e=>e.scrollLeft)});
 await context.close(); await browser.close(); fs.writeFileSync('docs/browser-results.json',JSON.stringify(results,null,2)); console.log(JSON.stringify(results,null,2));
})();
