// Палитра и типографика ролика. Взято из DESIGN.md сайта: тёмный фон,
// холодный синий с уходом в фиолет для действия, тёплый янтарь для атмосферы
// и для того, что помечено как след.

export const C = {
  bg: '#0a0a11',
  bgLift: '#12121c',
  ink: 'rgba(255,255,255,0.94)',
  ink2: 'rgba(255,255,255,0.66)',
  ink3: 'rgba(255,255,255,0.40)',
  hairline: 'rgba(255,255,255,0.10)',
  cool: '#3b82f6',
  cool2: '#8b5cf6',
  warm: '#f59e0b',
  bad: '#ef4444',
  good: '#34d399',
};

export const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, "Helvetica Neue", Arial, sans-serif';

export const MONO = 'ui-monospace, "JetBrains Mono", "SF Mono", Consolas, monospace';

// Одна пружина на весь ролик, как одна кривая на весь сайт.
export const SPRING = { damping: 200, mass: 0.6, stiffness: 110 };

export const FPS = 30;

// Длительности сцен в кадрах.
export const D = {
  title: 3 * FPS,
  idea: 5 * FPS,
  example: 7 * FPS,
  study: 9 * FPS,
  verdict: 5 * FPS,
  outro: 4 * FPS,
};
