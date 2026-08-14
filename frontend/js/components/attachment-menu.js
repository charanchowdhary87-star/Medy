/* ==========================================================================
   MEDY — attachment-menu.js
   Dropdown menu for the "Attach" button: upload a file or use sample data.
   Closes on outside click and on Escape.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  Medy.attachmentMenu = {
    /**
     * Wires a button to a dropdown menu.
     * @param {HTMLElement} button  The trigger button.
     * @param {{ onUpload: (file: File) => void, onSample: () => void }} handlers
     */
    attach(button, handlers) {
      const wrap = document.createElement('div');
      wrap.className = 'attach-menu-wrap';
      button.parentNode.insertBefore(wrap, button);
      wrap.appendChild(button);

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*,.pdf,.doc,.docx,.txt';
      fileInput.style.display = 'none';
      fileInput.setAttribute('aria-hidden', 'true');
      wrap.appendChild(fileInput);

      const menu = document.createElement('div');
      menu.className = 'attach-menu';
      menu.setAttribute('role', 'menu');
      menu.innerHTML =
        '<button type="button" role="menuitem" data-action="upload">' +
        '  ' + Medy.icons.upload + ' Upload image or document' +
        '</button>' +
        '<div class="menu-divider" aria-hidden="true"></div>' +
        '<button type="button" role="menuitem" data-action="sample">' +
        '  ' + Medy.icons.sparkles + ' Use sample data' +
        '</button>';
      wrap.appendChild(menu);

      function open() {
        menu.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }

      function close() {
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }

      function toggle(e) {
        e.stopPropagation();
        menu.classList.contains('open') ? close() : open();
      }

      button.addEventListener('click', toggle);

      fileInput.addEventListener('change', function () {
        const file = fileInput.files && fileInput.files[0];
        if (file) handlers.onUpload(file);
        fileInput.value = '';
        close();
      });

      menu.addEventListener('click', function (e) {
        const item = e.target.closest('[data-action]');
        if (!item) return;
        close();
        if (item.dataset.action === 'upload') fileInput.click();
        if (item.dataset.action === 'sample') handlers.onSample();
      });

      document.addEventListener('click', function (e) {
        if (!wrap.contains(e.target)) close();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
      });
    },
  };
})();
