/* ==========================================================================
   MEDY — app.js
   Application entry point:
     - shared icon set (lucide-style inline SVGs, no external library)
     - tiny hash router with page transitions
     - toast helper
     - bootstraps navbar, footer and the first page
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  /* ------------------------------------------------------------------
     Icons (decorative SVG helpers)
     ------------------------------------------------------------------ */
  function svg(inner) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>'
    );
  }

  Medy.icons = {
    logo: '<svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">' +
      '  <rect width="32" height="32" rx="9" fill="#0ea87b"/>' +
      '  <path d="M16 8.5v15M8.5 16h15" stroke="#ffffff" stroke-width="3.6" stroke-linecap="round"/>' +
      '</svg>',

    arrowRight: svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
    badgeCheck: svg('<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>'),
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    shield: svg('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/>'),
    heartPulse: svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>'),
    scan: svg('<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/>'),
    bot: svg('<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>'),
    fileText: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
    accessibility: svg('<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>'),
    sparkles: svg('<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>'),
    info: svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
    alertTriangle: svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
    paperclip: svg('<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>'),
    upload: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>'),
    file: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>'),
    x: svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
    hand: svg('<path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 9V6a2 2 0 0 0-4 0v7"/><path d="M18 6V5a2 2 0 0 0-4 0v1"/><path d="M18 9a2 2 0 0 1 4 0v5a8 8 0 0 1-8 8h-1.5a6 6 0 0 1-4.5-2l-2-2.5a2 2 0 0 1 3-2.5l1.5 1.5"/>'),
    mic: svg('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>'),
    messageCircle: svg('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
  };

  /* ------------------------------------------------------------------
     Router (hash-based — works from any static server or file://)
     ------------------------------------------------------------------ */
  const ROUTES = {
    '/': 'home',
    '/home': 'home',
    '/about': 'about',
    '/analyze': 'analyze',
    // Legacy — the page was previously called "Verify".
    '/verify': 'analyze',
  };

  Medy.router = {
    currentPage() {
      const hash = (location.hash || '#/').replace(/^#/, '');
      return ROUTES[hash] || 'home';
    },

    navigate() {
      const page = this.currentPage();
      const root = document.getElementById('page-root');
      const firstLoad = root.dataset.init !== 'true';
      root.dataset.init = 'true';

      if (firstLoad) {
        this.render(page, root);
        return;
      }

      root.classList.add('page-leaving');
      setTimeout(() => {
        this.render(page, root);
      }, 180);
    },

    render(page, root) {
      root.innerHTML = Medy.pages[page].render();
      root.classList.remove('page-leaving');
      root.classList.add('page-entering');
      Medy.pages[page].mount(root);
      Medy.navbar.syncActive(page);
      document.title = 'MEDY — ' + page.charAt(0).toUpperCase() + page.slice(1);
      window.scrollTo(0, 0);
      setTimeout(() => root.classList.remove('page-entering'), 350);
    },
  };

  window.addEventListener('hashchange', function () {
    Medy.router.navigate();
  });

  /* ------------------------------------------------------------------
     Toast helper
     ------------------------------------------------------------------ */
  Medy.toast = function (message) {
    var root = document.getElementById('toast-root');
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = Medy.icons.check + '<span>' + message + '</span>';
    root.appendChild(el);
    setTimeout(function () {
      el.style.transition = 'opacity .3s ease, transform .3s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      setTimeout(function () {
        el.remove();
      }, 320);
    }, 2400);
  };

  /* ------------------------------------------------------------------
     Bootstrap
     ------------------------------------------------------------------ */
  function init() {
    Medy.navbar.mount(document.getElementById('navbar-root'));
    Medy.footer.mount(document.getElementById('footer-root'));
    Medy.router.navigate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
