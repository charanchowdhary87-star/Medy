/* ==========================================================================
   MEDY — pages/about.js
   About MEDY: mission, roadmap (future AI modalities) and safety note.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};
  Medy.pages = Medy.pages || {};

  const ROADMAP = [
    {
      icon: 'scan',
      title: 'Medical Vision',
      text: 'Upload an image of a scan or report and receive an AI-assisted visual summary.',
    },
    {
      icon: 'hand',
      title: 'Sign Language',
      text: 'Real-time gesture recognition to make healthcare more accessible for everyone.',
    },
    {
      icon: 'mic',
      title: 'Voice Interaction',
      text: 'Speak naturally and let MEDY transcribe, understand and respond in kind.',
    },
    {
      icon: 'messageCircle',
      title: 'Smart Chat',
      text: 'A conversational assistant that explains health information in plain language.',
    },
  ];

  const STEPS = [
    { title: 'Share information', text: 'Type a few lines about a symptom, reading or report detail.' },
    { title: 'MEDY structures it', text: 'The information is organized into a clear, readable result.' },
    { title: 'You stay in control', text: 'Understand the output and always confirm with a professional.' },
  ];

  Medy.pages.about = {
    render() {
      const roadmapCards = ROADMAP.map(
        (m) =>
          '<article class="card feature-card">' +
          '  <div class="feature-icon">' + Medy.icons[m.icon] + '</div>' +
          '  <h3>' + m.title + '</h3>' +
          '  <p>' + m.text + '</p>' +
          '</article>'
      ).join('');

      const steps = STEPS.map(
        (s) =>
          '<article class="card step-card">' +
          '  <div class="step-num"></div>' +
          '  <h3>' + s.title + '</h3>' +
          '  <p>' + s.text + '</p>' +
          '</article>'
      ).join('');

      return (
        '<section class="page-head">' +
        '  <div class="container">' +
        '    <span class="section-eyebrow">' + Medy.icons.heartPulse + ' About MEDY</span>' +
        '    <h1>A healthcare assistant that speaks your language.</h1>' +
        '    <p>MEDY is a smart multimodal healthcare assistant designed to help people understand ' +
        'health information through simple, accessible and intelligent interactions.</p>' +
        '  </div>' +
        '</section>' +
        // Mission
        '<section class="section">' +
        '  <div class="container">' +
        '    <div class="section-head">' +
        '      <h2>Our mission</h2>' +
        '      <p>Healthcare information is often complex, technical and hard to access. MEDY turns it ' +
        'into something understandable — so anyone can make more informed decisions about their health, ' +
        'in their own words.</p>' +
        '    </div>' +
        '    <div class="steps-grid">' + steps + '</div>' +
        '  </div>' +
        '</section>' +
        // Roadmap
        '<section class="section" style="padding-top:0">' +
        '  <div class="container">' +
        '    <div class="section-head center">' +
        '      <span class="section-eyebrow">' + Medy.icons.sparkles + ' Future capabilities</span>' +
        '      <h2>Built to grow with AI</h2>' +
        '      <p>The frontend is intentionally simple today. These multimodal capabilities can plug ' +
        'into the same interface in future phases.</p>' +
        '    </div>' +
        '    <div class="feature-grid">' + roadmapCards + '</div>' +
        '  </div>' +
        '</section>' +
        // Disclaimer
        '<section class="section-sm">' +
        '  <div class="container">' +
        '    <div class="disclaimer">' +
        '      ' + Medy.icons.info +
        '      <p><strong style="color:var(--text-soft)">Medical safety:</strong> MEDY does not provide ' +
        'medical advice. All output is AI-generated and intended for demonstration and education only. ' +
        'Always consult a qualified healthcare professional for medical advice.</p>' +
        '    </div>' +
        '    <div style="text-align:center;margin-top:2.25rem">' +
        '      <a class="btn btn-primary btn-lg" href="#/analyze">' +
        '        Try the demo ' + Medy.icons.arrowRight +
        '      </a>' +
        '    </div>' +
        '  </div>' +
        '</section>'
      );
    },

    mount() {
      // No interactive wiring needed on this page yet.
    },
  };
})();
