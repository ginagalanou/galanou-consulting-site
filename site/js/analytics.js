(() => {
  'use strict';
  const config = window.GALANOU_ANALYTICS || {};
  const key = 'galanou-analytics-consent-v1';
  const paths = ['/', '/about/', '/services/', '/experience/', '/contact/'];
  const pagePath = paths.includes(location.pathname) ? location.pathname : null;
  const eligible = config.productionEnabled === true && config.enhancedMeasurementDisabled === true &&
    /^G-[A-Z0-9]{6,}$/.test(config.measurementId || '') &&
    ['galanouconsulting.com', 'www.galanouconsulting.com'].includes(location.hostname) &&
    (config.productionHosts || []).includes(location.hostname) && location.protocol === 'https:' && pagePath;
  function read() { try { const value = localStorage.getItem(key); return ['accepted','rejected'].includes(value) ? value : null; } catch { return null; } }
  let consent = read(), loaded = false, viewed = false;
  let selected = consent;
  const panel = document.createElement('section');
  panel.className = 'consent-panel'; panel.setAttribute('aria-labelledby','analytics-title');
  panel.innerHTML = `<h2 id="analytics-title">Analytics preferences</h2>
    <p>With your permission, Galanou Consulting uses Google Analytics to understand how visitors use this website, including the pages they visit and the links they select. You can use the site without allowing analytics.</p>
    <p class="consent-status" hidden></p><div class="consent-actions">
    <button type="button" data-choice="accepted">Accept analytics</button>
    <button type="button" data-choice="rejected">Reject analytics</button></div>
    <button type="button" class="save-preferences" hidden>Save preferences</button>`;
  const confirmation = document.createElement('div'); confirmation.className='consent-confirmation'; confirmation.setAttribute('role','status');
  document.body.append(panel, confirmation);
  panel.hidden = !!consent;
  try {
    if (sessionStorage.getItem(key + '-saved')) {
      sessionStorage.removeItem(key + '-saved');
      confirmation.textContent = 'Your analytics preference has been saved.';
      setTimeout(() => { confirmation.textContent = ''; }, 5000);
    }
  } catch {}
  let editing = false, returnFocus = null;
  function draw() {
    const status = panel.querySelector('.consent-status'); status.hidden = !editing;
    status.textContent = consent === 'accepted' ? 'Analytics is currently enabled.' : 'Analytics is currently disabled.';
    panel.querySelector('.save-preferences').hidden = !editing;
    panel.querySelectorAll('[data-choice]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.choice === selected)));
  }
  function clearCookies() {
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim(); if (!/^_ga(?:_|$)/.test(name)) return;
      for (const domain of ['', location.hostname, '.galanouconsulting.com']) {
        document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ' domain='+domain+';' : ''} SameSite=Lax`;
      }
    });
  }
  function disable() {
    window['ga-disable-' + config.measurementId] = true;
    // Basic consent: no denied-consent ping. Reload unloads all Google timers/listeners.
    window.dataLayer = [];
    clearCookies();
    if (loaded) location.reload();
  }
  function start() {
    if (!eligible || consent !== 'accepted' || loaded) return;
    loaded = true; window['ga-disable-' + config.measurementId] = false;
    window.dataLayer = [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    gtag('js',new Date());
    // Fixed page location, title and referrer omit query strings, fragments and arbitrary text.
    let referrer = '';
    try { const u = new URL(document.referrer); referrer = u.origin + (u.origin === location.origin && paths.includes(u.pathname) ? u.pathname : '/'); } catch {}
    gtag('config',config.measurementId,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,
      page_location:'https://galanouconsulting.com'+pagePath,page_title:pagePath,page_referrer:referrer});
    const script=document.createElement('script'); script.async=true; script.src='https://www.googletagmanager.com/gtag/js?id='+config.measurementId;
    document.head.append(script);
    if (!viewed) { viewed=true; gtag('event','page_view',{page_path:pagePath}); }
  }
  function save(value) {
    consent=value;
    try {localStorage.setItem(key,value);} catch {}
    panel.hidden=true;
    if (returnFocus) returnFocus.focus();
    confirmation.textContent='Your analytics preference has been saved.';
    setTimeout(() => {confirmation.textContent='';},5000);
    if (consent==='accepted') start(); else {
      if (loaded) { try { sessionStorage.setItem(key + '-saved', '1'); } catch {} }
      disable();
    }
  }
  panel.addEventListener('click', e => {
    const b=e.target.closest('[data-choice]');
    if (b) { selected=b.dataset.choice; if (editing) draw(); else save(selected); }
    if (e.target.closest('.save-preferences')) save(selected || 'rejected');
  });
  document.querySelectorAll('.analytics-preferences').forEach(b => b.addEventListener('click', () => {
    editing=true; selected=consent; returnFocus=b; panel.hidden=false; draw(); panel.querySelector('button').focus();
  }));
  panel.addEventListener('keydown',e => {if(e.key==='Escape' && editing){panel.hidden=true;returnFocus?.focus();}});
  window.addEventListener('storage', e => {
    if (e.key!==key && e.key!==null) return;
    consent=read(); selected=consent; draw();
    if (consent==='accepted') start(); else {
      if (loaded) { try { sessionStorage.setItem(key + '-saved', '1'); } catch {} }
      disable();
    }
  });
  const placements=['hero','closing','navigation','footer','schedule','contact_details','publications'];
  const destinations={contact_cta_click:['contact'],calendly_click:['introductory_call'],email_click:['email'],publication_click:['publication_1','publication_2','publication_3','publication_4','publication_5']};
  document.addEventListener('click', e => {
    if (!eligible || consent!=='accepted' || !loaded) return;
    const a=e.target.closest('a[data-event]'); if(!a) return;
    const {event,placement,destination}=a.dataset;
    if (!placements.includes(placement) || !destinations[event]?.includes(destination)) return;
    gtag('event',event,{page_path:pagePath,placement,destination_label:destination,transport_type:'beacon'});
  });
  draw(); start();
})();
