(function () {
  'use strict';
  // Hide attribution/tracking parameters while preserving search and page state.
  const current = new URL(window.location.href);
  const trackingKeys = [...current.searchParams.keys()].filter(key =>
    /^utm_/i.test(key) || /^(fbclid|gclid|gclsrc|msclkid|dclid|yclid|mc_cid|mc_eid)$/i.test(key)
  );
  if (trackingKeys.length) {
    trackingKeys.forEach(key => current.searchParams.delete(key));
    history.replaceState(history.state, '', current.pathname + current.search + current.hash);
  }
  const header = document.querySelector('.bb-header');
  const toggle = header?.querySelector('.bb-menu-toggle');
  const links = header?.querySelector('.bb-nav-links');
  if (!header || !toggle || !links) return;
  header.classList.add('bb-ready');
  function close() { links.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', function () {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); if (header.contains(document.activeElement)) toggle.focus(); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 1000) close(); });
})();
