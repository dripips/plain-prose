import React from 'react';
import {Composition} from 'remotion';
import {Video, totalFrames} from './Video';
import {FPS} from './theme';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Ru"
      component={Video}
      durationInFrames={totalFrames('ru')}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{lang: 'ru' as const}}
    />
    <Composition
      id="En"
      component={Video}
      durationInFrames={totalFrames('en')}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{lang: 'en' as const}}
    />
  </>
);
