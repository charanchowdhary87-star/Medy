/* ==========================================================================
   MEDY — claim-card.js
   Displays the health information ("claim") that was analyzed.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  Medy.claimCard = {
    /**
     * @param {string} claim The text that was verified.
     */
    render(claim) {
      return (
        '<section class="result-card full" aria-label="Analyzed claim">' +
        '  <div class="result-card-label">' +
        '    ' + Medy.icons.fileText + ' Claim' +
        '  </div>' +
        '  <div class="result-claim">' + escapeHtml(claim) + '</div>' +
        '</section>'
      );
    },
  };
})();
