/* ==========================================================================
   MEDY — evidence-card.js
   Lists supporting evidence points returned by the (mock) analysis.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  Medy.evidenceCard = {
    /**
     * @param {Array<{label: string, source: string}>} items Evidence points.
     */
    render(items) {
      const rows = (items || [])
        .map(
          (item) =>
            '<li class="evidence-item">' +
            '  ' + Medy.icons.check + ' ' +
            '  <div>' +
            '    <span>' + item.label + '</span>' +
            (item.source
              ? ' <em style="font-style:normal;color:var(--muted)">(' + item.source + ')</em>'
              : '') +
            '  </div>' +
            '</li>'
        )
        .join('');

      return (
        '<section class="result-card" aria-label="Supporting evidence">' +
        '  <div class="result-card-label">' +
        '    ' + Medy.icons.shield + ' Evidence' +
        '  </div>' +
        '  <ul class="evidence-list">' + rows + '</ul>' +
        '</section>'
      );
    },
  };
})();
