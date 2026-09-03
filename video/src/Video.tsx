import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {COPY, type Lang} from './copy';
import {D} from './theme';
import {Title} from './scenes/Title';
import {Idea} from './scenes/Idea';
import {Example} from './scenes/Example';
import {Study} from './scenes/Study';
import {Verdict} from './scenes/Verdict';
import {Outro} from './scenes/Outro';

export const totalFrames = (lang: Lang) =>
  D.title + D.idea + COPY[lang].examples.length * D.example + D.study + D.verdict + D.outro;

export const Video: React.FC<{lang: Lang}> = ({lang}) => {
  const copy = COPY[lang];
  useVideoConfig();

  let at = 0;
  const next = (length: number) => {
    const from = at;
    at += length;
    return from;
  };

  return (
    <AbsoluteFill>
      <Sequence from={next(D.title)} durationInFrames={D.title}>
        <Title copy={copy} />
      </Sequence>
      <Sequence from={next(D.idea)} durationInFrames={D.idea}>
        <Idea copy={copy} />
      </Sequence>
      {copy.examples.map((example, i) => (
        <Sequence key={example.label} from={next(D.example)} durationInFrames={D.example}>
          <Example copy={copy} example={example} index={i} total={copy.examples.length} />
        </Sequence>
      ))}
      <Sequence from={next(D.study)} durationInFrames={D.study}>
        <Study copy={copy} />
      </Sequence>
      <Sequence from={next(D.verdict)} durationInFrames={D.verdict}>
        <Verdict copy={copy} />
      </Sequence>
      <Sequence from={next(D.outro)} durationInFrames={D.outro}>
        <Outro copy={copy} />
      </Sequence>
    </AbsoluteFill>
  );
};
