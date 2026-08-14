/* ==========================================================================
   MEDY — promotion-card.js
   Call-to-action card that invites the user toward the Analyze experience.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  Medy.promotionCard = {
    /**
     * @param {{title: string, text: string, actionLabel: string, href: string}} props
     */
    render(props) {
      return (
        '<section class="card feature-card">' +
        '  <div class="feature-icon">' + Medy.icons.sparkles + '</div>' +
        '  <h3>' + props.title + '</h3>' +
        '  <p>' + props.text + '</p>' +
        '  <div style="margin-top:1.1rem">' +
        '    <a class="btn btn-primary btn-sm" href="' + props.href + '">' +
        '      ' + props.actionLabel + ' ' + Medy.icons.arrowRight +
        '    </a>' +
        '  </div>' +
        '</section>'
      );
    },
  };
})();
