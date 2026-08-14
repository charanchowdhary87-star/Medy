/* ==========================================================================
   MEDY — file-preview.js
   Renders a removable attachment preview. Images get a thumbnail,
   other files get a type badge, name and size.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  Medy.filePreview = {
    /**
     * Creates the preview element for a selected File.
     * @param {File} file
     * @param {(el: HTMLElement) => void} onRemove Called after removal.
     * @returns {HTMLElement} The preview element (already inserted after the input).
     */
    create(file, onRemove) {
      const el = document.createElement('div');
      el.className = 'file-preview';
      el.dataset.filename = file.name;

      const isImage = file.type.startsWith('image/');
      const thumbInner = isImage
        ? ''
        : Medy.icons.file;

      el.innerHTML =
        '<div class="file-preview-thumb" aria-hidden="true">' +
        '  ' + thumbInner +
        '</div>' +
        '<div class="file-preview-meta">' +
        '  <strong>' + file.name + '</strong>' +
        '  <span>' + file.type + ' · ' + Medy.filePreview.formatSize(file.size) + '</span>' +
        '</div>' +
        '<button type="button" class="file-preview-remove" aria-label="Remove attachment">' +
        Medy.icons.x +
        '</button>';

      if (isImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'Preview of ' + file.name;
          el.querySelector('.file-preview-thumb').appendChild(img);
        };
        reader.readAsDataURL(file);
      }

      el.querySelector('.file-preview-remove').addEventListener('click', function () {
        el.remove();
        onRemove && onRemove(el);
      });

      return el;
    },

    formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    },
  };
})();
