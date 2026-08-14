/* ==========================================================================
   MEDY — pages/analyze.js
   Main multimodal input area.
   Lets the user choose HOW to give MEDY input via three method cards:
     Vision (future) | Attachments | Understand (text)
   All modes stay on this single page — no separate routes per input method.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};
  Medy.pages = Medy.pages || {};

  const PREVIEW_ROOT = 'analyze-preview-root';

  Medy.pages.analyze = {
    state: {
      mode: 'understand',
      text: '',
      file: null,
      busy: false,
    },

    MODELS: {
      vision: {
        icon: 'scan',
        title: 'Vision',
        desc: 'Real-time video input',
        sub: 'Sign understanding',
      },
      attachments: {
        icon: 'upload',
        title: 'Attachments',
        desc: 'Upload images or files',
        sub: 'Analyze uploaded content',
      },
      understand: {
        icon: 'messageCircle',
        title: 'Understand',
        desc: 'Enter text or health information',
        sub: 'Let MEDY understand your input',
      },
    },

    render() {
      const cards = Object.keys(this.MODELS)
        .map((mode) => {
          const cfg = this.MODELS[mode];
          const isActive = mode === this.state.mode;
          return (
            '<button type="button" class="method-card' + (isActive ? ' active' : '') + '"' +
            '  data-mode="' + mode + '"' +
            '  aria-pressed="' + isActive + '"' +
            '  aria-label="Analyze using ' + cfg.title + '"' +
            '>' +
            '  <span class="method-check" aria-hidden="true">' + Medy.icons.check + '</span>' +
            '  <span class="method-icon">' + Medy.icons[cfg.icon] + '</span>' +
            '  <strong>' + cfg.title + '</strong>' +
            '  <span class="method-desc">' + cfg.desc + '</span>' +
            '  <span class="method-sub">' + Medy.icons.arrowRight + ' ' + cfg.sub + '</span>' +
            '</button>'
          );
        })
        .join('');

      return (
        '<section class="page-head">' +
        '  <div class="container">' +
        '    <span class="section-eyebrow">' + Medy.icons.bot + ' Multimodal input</span>' +
        '    <h1>Analyze</h1>' +
        '    <p>Choose how you want MEDY to understand your input.</p>' +
        '  </div>' +
        '</section>' +
        '<section class="section-sm">' +
        '  <div class="container">' +
        '    <div class="method-grid" role="group" aria-label="How to provide input">' +
        '      ' + cards +
        '    </div>' +
        '    <div id="analyze-panel"></div>' +
        '    <div id="analyze-result" aria-live="polite"></div>' +
        '    <div class="disclaimer">' +
        '      ' + Medy.icons.info +
        '      <p><strong style="color:var(--text-soft)">Medical disclaimer:</strong> MEDY output is ' +
        'AI-generated, mock data. It is not a medical diagnosis. Consult a qualified healthcare ' +
        'professional for medical advice.</p>' +
        '    </div>' +
        '  </div>' +
        '</section>'
      );
    },

    mount(root) {
      const self = this;
      root.querySelectorAll('.method-card').forEach(function (card) {
        card.addEventListener('click', function () {
          self.selectMode(root, card.dataset.mode);
        });
      });
      this.renderPanel(root);
    },

    selectMode(root, mode) {
      if (mode === this.state.mode) return;
      this.state.mode = mode;
      root.querySelectorAll('.method-card').forEach(function (card) {
        const active = card.dataset.mode === mode;
        card.classList.toggle('active', active);
        card.setAttribute('aria-pressed', String(active));
      });
      this.renderPanel(root);
    },

    /* ------------------------------------------------------------------
       Method panels
       ------------------------------------------------------------------ */
    renderPanel(root) {
      const panel = root.querySelector('#analyze-panel');
      panel.classList.remove('animate-in');
      void panel.offsetWidth; // restart animation
      panel.classList.add('animate-in');

      const mode = this.state.mode;
      if (mode === 'vision') {
        panel.innerHTML = this.visionPanel();
      } else if (mode === 'attachments') {
        panel.innerHTML = this.attachmentsPanel();
        this.wireAttachments(root, panel);
      } else {
        panel.innerHTML = this.understandPanel();
        this.wireUnderstand(root, panel);
      }
    },

    understandPanel() {
      return (
        '<div class="card analyze-card">' +
        '  <div id="analyze-input-root"></div>' +
        '  <div class="attachment-bar">' +
        '    <button id="btn-attach" class="btn-attach" type="button" aria-haspopup="true" aria-expanded="false">' +
        '      ' + Medy.icons.paperclip + ' Attach' +
        '    </button>' +
        '    <span class="field-help" style="margin-top:0">' +
        '      Describe a symptom, reading or report detail — or attach a file.' +
        '    </span>' +
        '  </div>' +
        '  <div id="' + PREVIEW_ROOT + '"></div>' +
        '  <div class="analyze-actions">' +
        '    <button id="btn-analyze" class="btn btn-primary btn-lg btn-analyze" type="button">' +
        '      ' + Medy.icons.badgeCheck + ' Analyze' +
        '    </button>' +
        '  </div>' +
        '</div>'
      );
    },

    wireUnderstand(root, panel) {
      const self = this;
      const textarea = Medy.analyzeInput.mount(panel.querySelector('#analyze-input-root'), {
        onChange: function (value) {
          self.state.text = value;
        },
      });

      Medy.attachmentMenu.attach(panel.querySelector('#btn-attach'), {
        onUpload: function (file) {
          self.attachFile(root, panel, file);
        },
        onSample: function () {
          Medy.analyzeInput.fill(textarea, Medy.api.sampleText);
        },
      });

      panel.querySelector('#btn-analyze').addEventListener('click', function () {
        self.run(root, panel);
      });
    },

    attachmentsPanel() {
      return (
        '<div class="card analyze-card">' +
        '  <div class="upload-zone" id="upload-zone" tabindex="0" role="button" aria-label="Choose a file to analyze">' +
        '    <span class="upload-icon">' + Medy.icons.upload + '</span>' +
        '    <strong>Choose a file</strong>' +
        '    <span>Click to browse, or drop an image or document here</span>' +
        '    <input type="file" id="upload-input" accept="image/*,.pdf,.doc,.docx,.txt" hidden />' +
        '  </div>' +
        '  <div id="' + PREVIEW_ROOT + '"></div>' +
        '  <div class="field-label">' +
        '    <label for="att-note">Add context (optional)</label>' +
        '  </div>' +
        '  <textarea id="att-note" class="analyze-textarea" maxlength="1000" rows="3" ' +
        '    placeholder="Optional — add any detail that helps MEDY understand the file."></textarea>' +
        '  <div class="analyze-actions">' +
        '    <button id="btn-analyze" class="btn btn-primary btn-lg btn-analyze" type="button">' +
        '      ' + Medy.icons.badgeCheck + ' Analyze' +
        '    </button>' +
        '  </div>' +
        '</div>'
      );
    },

    wireAttachments(root, panel) {
      const self = this;
      const zone = panel.querySelector('#upload-zone');
      const input = panel.querySelector('#upload-input');
      const note = panel.querySelector('#att-note');

      // Restore previous state if the user toggled modes.
      if (self.state.file) self.showPreview(root, panel, self.state.file);
      if (self.state.text) note.value = self.state.text;

      note.addEventListener('input', function () {
        self.state.text = note.value;
      });

      zone.addEventListener('click', function () {
        input.click();
      });
      zone.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          input.click();
        }
      });
      zone.addEventListener('dragover', function (e) {
        e.preventDefault();
        zone.classList.add('drag');
      });
      zone.addEventListener('dragleave', function () {
        zone.classList.remove('drag');
      });
      zone.addEventListener('drop', function (e) {
        e.preventDefault();
        zone.classList.remove('drag');
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) self.attachFile(root, panel, file);
      });
      input.addEventListener('change', function () {
        const file = input.files && input.files[0];
        if (file) self.attachFile(root, panel, file);
        input.value = '';
      });

      panel.querySelector('#btn-analyze').addEventListener('click', function () {
        self.run(root, panel);
      });
    },

    attachFile(root, panel, file) {
      this.state.file = file;
      this.showPreview(root, panel, file);
    },

    showPreview(root, panel, file) {
      const self = this;
      const area = panel.querySelector('#' + PREVIEW_ROOT);
      area.innerHTML = '';
      area.appendChild(
        Medy.filePreview.create(file, function () {
          if (self.state.file === file) self.state.file = null;
        })
      );
    },

    visionPanel() {
      return (
        '<div class="card analyze-card">' +
        '  <div class="vision-panel">' +
        '    <div class="method-icon">' + Medy.icons.scan + '</div>' +
        '    <h3>Live video &amp; sign understanding</h3>' +
        '    <p>MEDY will accept real-time camera input to understand sign language and analyze ' +
        'medical imagery. This arrives in a future phase — no camera is used today.</p>' +
        '    <span class="btn btn-secondary" aria-disabled="true">Coming soon</span>' +
        '  </div>' +
        '</div>'
      );
    },

    /* ------------------------------------------------------------------
       Analysis flow (mock via api.js)
       ------------------------------------------------------------------ */
    async run(root, panel) {
      const state = this.state;
      if (state.busy) return;

      state.busy = true;
      const btn = panel.querySelector('#btn-analyze');
      const btnLabel = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML =
        '<span class="spinner" style="width:18px;height:18px;border-width:2px" aria-hidden="true"></span>' +
        ' Analyzing…';

      const resultEl = root.querySelector('#analyze-result');
      resultEl.innerHTML = Medy.loadingState.render('Analyzing your input…');
      if (typeof resultEl.scrollIntoView === 'function') {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      try {
        const data = await Medy.api.analyze({ text: state.text, file: state.file });
        resultEl.innerHTML = this.renderResult(data);
      } catch (err) {
        resultEl.innerHTML =
          '<div class="error-state" role="alert">' +
          '  ' + Medy.icons.alertTriangle +
          '  <div>' +
          '    <strong>Unable to analyze</strong>' +
          '    <p>' + (err && err.message ? err.message : 'Something went wrong. Please try again.') + '</p>' +
          '  </div>' +
          '</div>';
      } finally {
        state.busy = false;
        btn.disabled = false;
        btn.innerHTML = btnLabel;
      }
    },

    renderResult(data) {
      return (
        '<section class="result-section">' +
        '  <div class="result-head">' +
        '    <h2>Analysis Result</h2>' +
        '    <span class="status-badge">' + Medy.icons.badgeCheck + ' ' + data.status + '</span>' +
        '  </div>' +
        '  <div class="result-grid">' +
        '    ' + Medy.scoreCard.render(data.confidence) +
        '    ' + Medy.evidenceCard.render(data.evidence) +
        '    ' + Medy.claimCard.render(data.claim) +
        '  </div>' +
        '  <div class="disclaimer" style="margin-top:1.25rem">' +
        '    ' + Medy.icons.info +
        '    <p>' + data.disclaimer + '</p>' +
        '  </div>' +
        '</section>'
      );
    },
  };
})();
