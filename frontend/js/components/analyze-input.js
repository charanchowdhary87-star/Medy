/* ==========================================================================
   MEDY — analyze-input.js
   Reusable text input block used on the Analyze page.
   Wires the character counter and exposes the current value.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  Medy.analyzeInput = {
    /**
     * Mounts the input into a container.
     * @param {HTMLElement} container Where to insert the input block.
     * @param {{ onChange?: (value: string) => void }} [opts]
     * @returns {HTMLElement} The <textarea> element.
     */
    mount(container, opts) {
      const onChange = (opts && opts.onChange) || function () {};

      container.innerHTML =
        '<div class="field-label">' +
        '  <label for="analyze-textarea">Enter your health information</label>' +
        '  <span class="char-count" id="analyze-char-count" aria-hidden="true">0 / 1000</span>' +
        '</div>' +
        '<textarea' +
        '  id="analyze-textarea"' +
        '  class="analyze-textarea"' +
        '  maxlength="1000"' +
        '  placeholder="e.g. My blood pressure readings this week were 135/85, 128/80 and 132/84…"' +
        '  aria-describedby="analyze-char-count analyze-help"' +
        '></textarea>' +
        '<p class="field-help" id="analyze-help">' +
        '  Describe any symptom, reading or report detail. You can also attach a file below.' +
        '</p>';

      const textarea = container.querySelector('#analyze-textarea');
      const counter = container.querySelector('#analyze-char-count');

      textarea.addEventListener('input', function () {
        counter.textContent = textarea.value.length + ' / 1000';
        onChange(textarea.value);
      });

      return textarea;
    },

    /**
     * Sets the textarea value programmatically (used by the sample option).
     */
    fill(textarea, value) {
      textarea.value = value;
      textarea.dispatchEvent(new Event('input'));
    },
  };
})();
