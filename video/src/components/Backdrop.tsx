import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';

// Тёплое пятно медленно дышит на холодном фоне: атмосфера тёплая,
// действие холодное. Тот же приём, что на первом экране сайта.
export const Backdrop: React.FC<{tint?: 'warm' | 'cool'}> = ({tint = 'warm'}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 34;
  const breathe = 0.9 + Math.sin(frame / 70) * 0.1;
  const glow = tint === 'warm' ? 'rgba(245,158,11,0.16)' : 'rgba(59,130,246,0.18)';
  const glow2 = tint === 'warm' ? 'rgba(240,90,170,0.10)' : 'rgba(139,92,246,0.12)';

  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(760px 520px at ${18 + drift * 0.4}% ${24 + drift * 0.2}%, ${glow}, transparent 68%),
                       radial-gradient(680px 480px at ${86 - drift * 0.3}% ${78 + drift * 0.15}%, ${glow2}, transparent 66%)`,
          opacity: breathe,
        }}
      />
      {/* Волосяная сетка: держит кадр и даёт ощущение мастерской, а не слайда */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px),
                            linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
          opacity: 0.22,
        }}
      />
    </AbsoluteFill>
  );
};
