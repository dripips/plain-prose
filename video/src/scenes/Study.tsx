import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {C, FONT, MONO, SPRING} from '../theme';
import type {Copy} from '../copy';

export const Study: React.FC<{copy: Copy}> = ({copy}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const head = spring({frame, fps, config: SPRING});
  const top = Math.max(...copy.bars.map((b) => b.value)) * 1.12;
  const plot = 1180;
  const limitX = (1 / top) * plot;
  const limit = spring({frame: frame - 150, fps, config: SPRING});

  const colour = (kind: string) => (kind === 'warm' ? C.warm : kind === 'bad' ? C.bad : C.cool);

  return (
    <AbsoluteFill>
      <Backdrop tint="cool" />
      <AbsoluteFill style={{fontFamily: FONT, padding: '96px 130px', justifyContent: 'center'}}>
        <div style={{opacity: head, transform: `translateY(${interpolate(head, [0, 1], [16, 0])}px)`}}>
          <div style={{fontSize: 46, fontWeight: 700, color: C.ink, letterSpacing: '-0.025em'}}>
            {copy.studyTitle}
          </div>
          <div style={{marginTop: 12, fontSize: 24, color: C.ink2}}>{copy.studySub}</div>
        </div>

        <div style={{marginTop: 56, position: 'relative'}}>
          {copy.bars.map((bar, i) => {
            const grow = spring({frame: frame - 26 - i * 13, fps, config: {...SPRING, damping: 26}});
            const width = (bar.value / top) * plot * grow;
            const shown = bar.value * grow;
            return (
              <div key={bar.label} style={{display: 'flex', alignItems: 'center', marginBottom: 22}}>
                <div style={{width: 330, textAlign: 'right', paddingRight: 22, fontSize: 25, color: C.ink2}}>
                  {bar.label}
                </div>
                <div style={{width, height: 44, borderRadius: 7, background: colour(bar.kind)}} />
                <div
                  style={{
                    marginLeft: 16,
                    fontFamily: MONO,
                    fontSize: 27,
                    fontWeight: 700,
                    color: C.ink,
                    opacity: grow,
                  }}
                >
                  {shown.toFixed(1).replace(/\.0$/, '')}
                </div>
              </div>
            );
          })}

          {/* Порог английского правила: почти у самой оси, и это весь смысл */}
          <div
            style={{
              position: 'absolute',
              left: 330 + limitX,
              top: -18,
              bottom: 26,
              width: 3,
              background: C.good,
              opacity: limit,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 330 + limitX + 14,
              bottom: -6,
              fontSize: 22,
              color: C.good,
              opacity: limit,
              whiteSpace: 'nowrap',
            }}
          >
            {copy.limitLabel}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
