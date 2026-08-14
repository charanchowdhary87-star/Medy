/* ==========================================================================
   MEDY — score-card.js
   Shows the confidence score returned by the (mock) analysis.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  Medy.scoreCard = {
    /**
     * @param {number} confidence Percent confidence (0-100).
     * @param {string} [label] Optional caption under the score.
     */
    render(confidence, label) {
      const value = Math.max(0, Math.min(100, Math.round(confidence || 0)));
      const caption = label || 'Demo confidence level based on the information provided.';

      return (
        '<section class="result-card" aria-label="Confidence score">' +
        '  <div class="result-card-label">' +
        '    ' + Medy.icons.badgeCheck + ' Confidence' +
        '  </div>' +
        '  <div class="score-display">' +
        '    <div class="score-ring" style="--p:' + value + '" role="img" aria-label="' + value + '% confidence">' +
        '      <span class="score-ring-inner">' + value + '%</span>' +
        '    </div>' +
        '    <div class="score-meta">' +
        '      <strong>' + (value >= 85 ? 'High match' : 'Moderate match') + '</strong>' +
        '      <p>' + caption + '</p>' +
        '    </div>' +
        '  </div>' +
        '</section>'
      );
    },
  };
})();
