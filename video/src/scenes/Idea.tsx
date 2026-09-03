import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {C, FONT, SPRING} from '../theme';
import type {Copy} from '../copy';

export const Idea: React.FC<{copy: Copy}> = ({copy}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const top = spring({frame, fps, config: SPRING});
  const bottom = spring({frame: frame - 22, fps, config: SPRING});
  const rule = spring({frame: frame - 44, fps, config: SPRING});

  return (
    <AbsoluteFill>
      <Backdrop tint="cool" />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: FONT,
          padding: '0 160px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.24,
            letterSpacing: '-0.025em',
            color: C.ink2,
            opacity: top,
            transform: `translateY(${interpolate(top, [0, 1], [18, 0])}px)`,
          }}
        >
          {copy.ideaTop}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            backgroundImage: `linear-gradient(96deg, ${C.cool}, ${C.cool2})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            opacity: bottom,
            transform: `translateY(${interpolate(bottom, [0, 1], [18, 0])}px)`,
          }}
        >
          {copy.ideaBottom}
        </div>
        <div
          style={{
            marginTop: 46,
            width: interpolate(rule, [0, 1], [0, 220]),
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${C.cool}, ${C.cool2})`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
