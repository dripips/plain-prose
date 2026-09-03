import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {C, FONT, MONO, SPRING} from '../theme';
import type {Copy} from '../copy';

export const Outro: React.FC<{copy: Copy}> = ({copy}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const url = spring({frame, fps, config: SPRING});
  const line = spring({frame: frame - 16, fps, config: SPRING});

  return (
    <AbsoluteFill>
      <Backdrop tint="cool" />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontFamily: FONT}}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 52,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: C.ink,
            opacity: url,
            transform: `translateY(${interpolate(url, [0, 1], [20, 0])}px)`,
          }}
        >
          {copy.outroTop}
        </div>
        <div
          style={{
            marginTop: 26,
            width: interpolate(line, [0, 1], [0, 300]),
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${C.cool}, ${C.cool2})`,
          }}
        />
        <div style={{marginTop: 26, fontSize: 25, color: C.ink2, opacity: line}}>{copy.outroBottom}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
