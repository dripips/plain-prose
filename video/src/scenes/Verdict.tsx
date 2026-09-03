import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {C, FONT, MONO, SPRING} from '../theme';
import type {Copy} from '../copy';

export const Verdict: React.FC<{copy: Copy}> = ({copy}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const big = spring({frame, fps, config: {...SPRING, damping: 24}});
  const text = spring({frame: frame - 20, fps, config: SPRING});

  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontFamily: FONT, textAlign: 'center'}}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 148,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: C.warm,
            opacity: big,
            transform: `scale(${interpolate(big, [0, 1], [0.9, 1])})`,
          }}
        >
          {copy.verdictTop}
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 38,
            lineHeight: 1.4,
            color: C.ink,
            whiteSpace: 'pre-line',
            opacity: text,
            transform: `translateY(${interpolate(text, [0, 1], [18, 0])}px)`,
            maxWidth: 1180,
          }}
        >
          {copy.verdictBottom}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
