/* ==========================================================================
   MEDY — footer.js
   Simple footer: brand, quick links and a short safety note.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  Medy.footer = {
    mount(container) {
      container.innerHTML =
        '<footer class="footer">' +
        '  <div class="container">' +
        '    <div class="footer-grid">' +
        '      <div class="footer-brand">' +
        '        <a class="nav-logo" href="#/home" aria-label="MEDY — go to home">' +
        '          ' + Medy.icons.logo + ' MEDY' +
        '        </a>' +
        '        <p>Smart Multimodal Healthcare Assistant — helping people understand health ' +
        'information through simple, accessible and intelligent interactions.</p>' +
        '      </div>' +
        '      <nav aria-label="Footer">' +
        '        <div class="footer-head">Explore</div>' +
        '        <div class="footer-links">' +
        '          <a href="#/home">' + Medy.icons.arrowRight + ' Home</a>' +
        '          <a href="#/about">' + Medy.icons.arrowRight + ' About</a>' +
        '          <a href="#/analyze">' + Medy.icons.arrowRight + ' Analyze</a>' +
        '        </div>' +
        '      </nav>' +
        '      <div>' +
        '        <div class="footer-head">Note</div>' +
        '        <p class="footer-note">Demo project. AI analysis is mocked and is not a medical ' +
        'diagnosis. Always consult a qualified healthcare professional for medical advice.</p>' +
        '      </div>' +
        '    </div>' +
        '    <div class="footer-bottom">' +
        '      <span>&copy; 2026 MEDY. All rights reserved.</span>' +
        '      <span>Built with HTML, CSS &amp; JavaScript.</span>' +
        '    </div>' +
        '  </div>' +
        '</footer>';
    },
  };
})();
