(() => {
  const trigger = document.querySelector('#toggle-main-menu-mobile');
  const menu = document.querySelector('#main-menu-mobile');
  if (!trigger || !menu) return;
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', menu.id);
  menu.inert = true;
  function setOpen(open, restoreFocus = false) {
    menu.classList.toggle('open', open);
    trigger.classList.toggle('is-active', open);
    document.body.classList.toggle('lock-scroll', open);
    trigger.setAttribute('aria-expanded', String(open));
    menu.inert = !open;
    if (open) menu.querySelector('a').focus();
    else if (restoreFocus) trigger.focus();
  }
  trigger.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', e => {
    if (!menu.classList.contains('open')) return;
    if (e.key === 'Escape') { setOpen(false, true); return; }
    if (e.key === 'Tab') {
      const controls = [...menu.querySelectorAll('a'), trigger];
      const i = controls.indexOf(document.activeElement);
      e.preventDefault(); controls[(i + (e.shiftKey ? -1 : 1) + controls.length) % controls.length].focus();
    }
  });
  matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
})();
