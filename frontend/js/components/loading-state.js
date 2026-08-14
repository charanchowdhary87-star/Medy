/* ==========================================================================
   MEDY — loading-state.js
   Reusable animated loading indicator.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  Medy.loadingState = {
    /**
     * Returns markup for a centered loading state.
     * @param {string} [text] Message shown under the spinner.
     */
    render(text) {
      const message = text || 'Analyzing your information…';
      return (
        '<div class="loading-state" role="status" aria-live="polite">' +
        '  <span class="spinner" aria-hidden="true"></span>' +
        '  <p>' + message + '</p>' +
        '</div>'
      );
    },
  };
})();
