/* ==========================================================================
   MEDY — api.js
   --------------------------------------------------------------------------
   Single point of contact between the UI and any future backend/AI.

   Phase 1 returns MOCK data only. To connect a real AI service later,
   replace the body of `Medy.api.analyze` with a fetch() call that
   posts `{ text, file }` to your endpoint — no UI changes needed.
   ========================================================================== */
(function () {
  'use strict';

  window.Medy = window.Medy || {};

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const SAMPLE_TEXT =
    'My blood pressure readings this week were 135/85, 128/80 and 132/84. ' +
    'I have been feeling more tired than usual in the afternoons.';

  // Demo source material used when a file is attached but no text is typed.
  const SAMPLE_FILE_TEXT =
    'Attached report shows a fasting blood sugar level of 112 mg/dL ' +
    'alongside the latest lipid panel values for review.';

  function buildEvidence(claim, confidence) {
    const high = confidence >= 85;
    return [
      {
        label: high
          ? 'Information looks consistent with general healthy ranges.'
          : 'Several values fall slightly outside typical resting ranges.',
        source: 'based on the text you provided',
      },
      {
        label: 'Symptoms described (such as fatigue) commonly accompany the values mentioned.',
        source: 'general health references',
      },
      {
        label: 'No urgent red-flag patterns (e.g. severe symptoms or critical thresholds) were detected.',
        source: 'demo safety check',
      },
      {
        label: 'Reported information is partial — full context requires a qualified professional.',
        source: 'data completeness',
      },
    ];
  }

  Medy.api = {
    ready: true,

    /**
     * Future AI entry point. Returns a Promise that resolves to a result
     * object (or rejects with { message }).
     */
    async analyze({ text, file } = {}) {
      // Simulate network latency.
      await delay(1500);

      const content = (text && text.trim()) || (file ? SAMPLE_FILE_TEXT : '');

      if (!content) {
        return Promise.reject({
          message: 'Please enter some health information or attach a file first.',
        });
      }

      // Deterministic but varied demo confidence (%). Fake AI — not a diagnosis.
      const confidence = Math.min(97, Math.max(78, 80 + (content.length % 16)));

      return {
        status: 'Analyzed',
        confidence,
        claim: content,
        summary:
          'This is a demo analysis of the health information you provided. ' +
          'It mirrors how MEDY will summarize findings once real AI is connected.',
        evidence: buildEvidence(content, confidence),
        disclaimer:
          'AI-generated information. Not a medical diagnosis. ' +
          'Consult a qualified healthcare professional for medical advice.',
      };
    },

    sampleText: SAMPLE_TEXT,
  };
})();
