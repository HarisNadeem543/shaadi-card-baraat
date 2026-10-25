import React from 'react';

/**
 * EntranceCopy — Poetic invitation text and prompt below the swinging lantern.
 * Fades out smoothly on ignition.
 */
export default function EntranceCopy({
  t,
  lang,
  isNudge,
  promptText,
}) {
  return (
    <>
      {/* Top brand header */}
      <div className="brand-top" id="brandTop" aria-hidden="true">
        {t.entranceBrand || 'MAIDA & USMAN'}
      </div>

      {/* Main poetic lines and interactive prompt */}
      <div className={`copy ${isNudge ? 'nudge' : ''}`} id="copy">
        <div
          className="line"
          style={{ whiteSpace: 'pre-line' }}
          dir={lang === 'ur' ? 'rtl' : 'ltr'}
        >
          {t.entranceLine || 'A house waits for you,\nlamp by lamp'}
        </div>

        <div className="instr" id="instr" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
          {promptText || t.entranceInstr || 'Swing the lantern'}
        </div>
      </div>
    </>
  );
}
