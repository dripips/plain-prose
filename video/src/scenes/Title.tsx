import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {C, FONT, MONO, SPRING} from '../theme';
import type {Copy} from '../copy';

export const Title: React.FC<{copy: Copy}> = ({copy}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rise = spring({frame, fps, config: SPRING});
  const sub = spring({frame: frame - 10, fps, config: SPRING});

  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontFamily: FONT}}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: '-0.035em',
            color: C.ink,
            transform: `translateY(${interpolate(rise, [0, 1], [26, 0])}px)`,
            opacity: rise,
          }}
        >
          plain<span style={{color: C.cool}}>-</span>prose
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 30,
            color: C.ink2,
            letterSpacing: '-0.01em',
            transform: `translateY(${interpolate(sub, [0, 1], [16, 0])}px)`,
            opacity: sub,
          }}
        >
          {copy.tagline}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
