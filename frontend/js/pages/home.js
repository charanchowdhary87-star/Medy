/* ==========================================================================
   MEDY — pages/home.js
   Primary application screen: hero + feature cards + CTA.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};
  Medy.pages = Medy.pages || {};

  const FEATURES = [
    {
      icon: 'scan',
      title: 'Medical Vision',
      text: 'Understand medical images such as scans and reports with future AI-powered visual analysis.',
    },
    {
      icon: 'bot',
      title: 'AI Assistant',
      text: 'Interact with MEDY through simple, natural conversation about your health questions.',
    },
    {
      icon: 'fileText',
      title: 'Health Information',
      text: 'Organize important health information and get clear, structured summaries of it.',
    },
    {
      icon: 'accessibility',
      title: 'Accessible Healthcare',
      text: 'Support multiple communication methods so healthcare is easier to reach for everyone.',
    },
  ];

  Medy.pages.home = {
    render() {
      const featureCards = FEATURES.map(
        (f) =>
          '<article class="card feature-card">' +
          '  <div class="feature-icon">' + Medy.icons[f.icon] + '</div>' +
          '  <h3>' + f.title + '</h3>' +
          '  <p>' + f.text + '</p>' +
          '</article>'
      ).join('');

      return (
        // Hero
        '<section class="hero">' +
        '  <div class="container hero-grid">' +
        '    <div>' +
        '      <span class="hero-badge">' + Medy.icons.sparkles + ' Smart Multimodal Healthcare Assistant</span>' +
        '      <h1>Healthcare that <span class="accent">understands</span> you.</h1>' +
        '      <p class="lead">MEDY is a smart healthcare assistant designed to help users understand ' +
        'health information through simple, accessible and intelligent interactions.</p>' +
        '      <div class="hero-actions">' +
        '        <a class="btn btn-primary btn-lg" href="#/analyze">' +
        '          Get Started ' + Medy.icons.arrowRight +
        '        </a>' +
        '        <button class="btn btn-secondary btn-lg" type="button" data-scroll-to="features">' +
        '          Explore MEDY' +
        '        </button>' +
        '      </div>' +
        '      <div class="hero-trust">' +
        '        <span>' + Medy.icons.shield + ' Privacy-first demo</span>' +
        '        <span>' + Medy.icons.heartPulse + ' Accessible by design</span>' +
        '        <span>' + Medy.icons.badgeCheck + ' AI-ready architecture</span>' +
        '      </div>' +
        '    </div>' +
        '    <div class="hero-visual" aria-hidden="true">' +
        '      <div class="hero-glow"></div>' +
        '      <div class="hero-card">' +
        '        <div class="hero-card-head">' +
        '          <div class="hero-avatar">' + Medy.icons.logo + '</div>' +
        '          <div><strong>MEDY Assistant</strong><span>Always ready to help</span></div>' +
        '          <span class="status-chip"><span class="dot"></span> Online</span>' +
        '        </div>' +
        '        <div class="hero-card-chat">' +
        '          <div class="bubble user">My blood pressure was 135/85 today. Should I worry?</div>' +
        '          <div class="bubble medy">' +
        '            That reading is slightly elevated but not an emergency. About 62% of your ' +
        '            recent readings fall within the normal range.' +
        '            <span class="stat-line"><span class="mini-bar"><i></i></span> Healthy trend</span>' +
        '          </div>' +
        '        </div>' +
        '        <div class="hero-card-note">' +
        '          ' + Medy.icons.info +
        '          Demo chat shown for illustration — real AI is connected in a future phase.' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</section>' +
        // Features
        '<section class="section" id="features">' +
        '  <div class="container">' +
        '    <div class="section-head center">' +
        '      <span class="section-eyebrow">' + Medy.icons.heartPulse + ' What MEDY does</span>' +
        '      <h2>Designed around people, not processes.</h2>' +
        '      <p>Simple capabilities today, built on an architecture that can grow into a ' +
        'multimodal healthcare assistant tomorrow.</p>' +
        '    </div>' +
        '    <div class="feature-grid">' + featureCards + '</div>' +
        '  </div>' +
        '</section>' +
        // CTA
        '<section class="section-sm">' +
        '  <div class="container">' +
        '    <div class="card" style="padding:2.5rem;display:grid;grid-template-columns:1fr auto;gap:2rem;align-items:center">' +
        '      <div>' +
        '        <h2>Try the Analyze experience</h2>' +
        '        <p style="margin-top:.5rem">Enter health information or attach a file and see how MEDY ' +
        'presents a structured, readable result — with mock data for now.</p>' +
        '      </div>' +
        '      <a class="btn btn-primary btn-lg" href="#/analyze">' +
        '        Open Analyze ' + Medy.icons.arrowRight +
        '      </a>' +
        '    </div>' +
        '    <div class="disclaimer" style="margin-top:1.5rem">' +
        '      ' + Medy.icons.info +
        '      <p><strong style="color:var(--text-soft)">Medical disclaimer:</strong> MEDY is a demonstration ' +
        'project. Output is AI-generated and is not a medical diagnosis. Consult a qualified healthcare ' +
        'professional for medical advice.</p>' +
        '    </div>' +
        '  </div>' +
        '</section>'
      );
    },

    mount(root) {
      root.querySelector('[data-scroll-to="features"]').addEventListener('click', function () {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
  };
})();
