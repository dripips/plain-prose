import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {C, FONT, MONO, SPRING} from '../theme';
import type {Copy, Example as Ex} from '../copy';

// Режем строку на куски: помеченные следы и всё остальное. Так подсветка и
// вычёркивание попадают ровно на те слова, о которых идёт речь.
const split = (text: string, tells: string[]) => {
  const parts: {text: string; tell: boolean}[] = [{text, tell: false}];
  for (const tell of tells) {
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.tell) continue;
      const at = part.text.indexOf(tell);
      if (at === -1) continue;
      const replacement = [
        {text: part.text.slice(0, at), tell: false},
        {text: tell, tell: true},
        {text: part.text.slice(at + tell.length), tell: false},
      ].filter((p) => p.text.length > 0);
      parts.splice(i, 1, ...replacement);
      break;
    }
  }
  return parts;
};

export const Example: React.FC<{copy: Copy; example: Ex; index: number; total: number}> = ({
  copy,
  example,
  index,
  total,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const inBefore = spring({frame, fps, config: SPRING});
  const mark = interpolate(frame, [30, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const strike = interpolate(frame, [66, 88], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fade = interpolate(frame, [96, 116], [1, 0.44], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const inAfter = spring({frame: frame - 104, fps, config: SPRING});
  const inNote = spring({frame: frame - 116, fps, config: SPRING});

  const parts = split(example.before, example.tells);

  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill style={{fontFamily: FONT, padding: '104px 130px', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 44, opacity: inBefore}}>
          <span style={{fontFamily: MONO, fontSize: 22, color: C.ink3}}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span style={{width: 6, height: 6, borderRadius: 3, background: C.ink3}} />
          <span style={{fontSize: 24, color: C.ink2, letterSpacing: '-0.01em'}}>{example.label}</span>
        </div>

        {/* Было */}
        <div style={{opacity: inBefore}}>
          <div style={{fontFamily: MONO, fontSize: 19, color: C.warm, marginBottom: 14, letterSpacing: '0.04em'}}>
            {copy.beforeLabel.toUpperCase()}
          </div>
          <div style={{fontSize: 42, lineHeight: 1.42, color: C.ink, opacity: fade, letterSpacing: '-0.015em'}}>
            {parts.map((part, i) =>
              part.tell ? (
                <span
                  key={i}
                  style={{
                    position: 'relative',
                    background: `rgba(245,158,11,${0.22 * mark})`,
                    boxShadow: `0 0 0 ${4 * mark}px rgba(245,158,11,${0.10 * mark})`,
                    borderRadius: 5,
                    color: mark > 0.4 ? C.warm : C.ink,
                  }}
                >
                  {part.text}
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '54%',
                      height: 3,
                      width: `${strike * 100}%`,
                      background: C.warm,
                      borderRadius: 2,
                    }}
                  />
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>

        {/* Стало */}
        <div
          style={{
            marginTop: 52,
            opacity: inAfter,
            transform: `translateY(${interpolate(inAfter, [0, 1], [26, 0])}px)`,
          }}
        >
          <div style={{fontFamily: MONO, fontSize: 19, color: C.good, marginBottom: 14, letterSpacing: '0.04em'}}>
            {copy.afterLabel.toUpperCase()}
          </div>
          <div style={{fontSize: 42, lineHeight: 1.42, color: C.ink, fontWeight: 500, letterSpacing: '-0.015em'}}>
            {example.after}
          </div>
        </div>

        {/* Вывод набран той же идиомой, что шапка сцены: точка и приглушённый
            текст. Толстая цветная полоса слева читалась бы как врезка из
            любого сгенерированного интерфейса, а ролик как раз про это. */}
        <div
          style={{
            marginTop: 46,
            minHeight: 68,
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            fontSize: 24,
            color: C.ink2,
            opacity: inNote,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              background: C.cool,
              flexShrink: 0,
              transform: 'translateY(-4px)',
            }}
          />
          {example.note}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
