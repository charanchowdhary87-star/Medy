/* ==========================================================================
   MEDY — navbar.js
   Sticky navigation with:
     - active state (pill + underline indicator)
     - smooth hover transitions
     - animated mobile menu (hamburger)
   Active state re-syncs whenever the route (hash) changes.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  const LINKS = [
    { label: 'Home', href: '#/home' },
    { label: 'About', href: '#/about' },
    { label: 'Analyze', href: '#/analyze' },
  ];

  Medy.navbar = {
    _refs: null,

    mount(container) {
      const links = LINKS.map(
        (link) =>
          '<li><a class="nav-link" href="' + link.href + '">' + link.label + '</a></li>'
      ).join('');

      const mobileLinks = LINKS.map(
        (link) =>
          '<a class="nav-link" href="' + link.href + '">' + link.label + '</a>'
      ).join('');

      container.innerHTML =
        '<nav class="navbar" aria-label="Primary">' +
        '  <div class="container nav-inner">' +
        '    <a class="nav-logo" href="#/home" aria-label="MEDY — go to home">' +
        '      ' + Medy.icons.logo + ' MEDY' +
        '    </a>' +
        '    <ul class="nav-links">' + links + '</ul>' +
        '    <div class="nav-cta">' +
        '      <a class="btn btn-primary btn-sm" href="#/analyze">Get Started</a>' +
        '    </div>' +
        '    <button' +
        '      class="nav-toggle"' +
        '      type="button"' +
        '      aria-label="Toggle menu"' +
        '      aria-expanded="false"' +
        '      aria-controls="nav-mobile-panel"' +
        '    >' +
        '      <span class="bar"></span><span class="bar"></span><span class="bar"></span>' +
        '    </button>' +
        '  </div>' +
        '  <div id="nav-mobile-panel" class="nav-mobile">' +
        '    ' + mobileLinks +
        '    <a class="btn btn-primary" href="#/analyze">Get Started</a>' +
        '  </div>' +
        '</nav>';

      const toggle = container.querySelector('.nav-toggle');
      const panel = container.querySelector('.nav-mobile');

      function closeMenu() {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }

      function toggleMenu() {
        const isOpen = panel.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('no-scroll', isOpen);
      }

      toggle.addEventListener('click', toggleMenu);
      panel.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeMenu();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      this._refs = { container, toggle, panel, links: container.querySelectorAll('.nav-link') };
      this.syncActive();
    },

    /**
     * Marks the current route's link as active.
     * @param {string} [page] e.g. 'home' | 'about' | 'analyze'.
     */
    syncActive(page) {
      if (!this._refs) return;
      const current = page || Medy.router.currentPage();

      this._refs.links.forEach(function (link) {
        const href = link.getAttribute('href'); // e.g. #/home
        const isActive = href === '#/' + current || (href === '#/home' && current === 'home');
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    },
  };
})();
