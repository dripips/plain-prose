// Тексты ролика. Примеры взяты из настоящих правок сайта bobkov.cc,
// числа — из study/. Ничего не придумано под красивую картинку.

export type Lang = 'ru' | 'en';

export type Example = {
  label: string;
  before: string;
  after: string;
  // Куски строки before, которые подсвечиваются как след и вычёркиваются.
  tells: string[];
  note: string;
};

export type Copy = {
  title: string;
  tagline: string;
  ideaTop: string;
  ideaBottom: string;
  examplesTitle: string;
  beforeLabel: string;
  afterLabel: string;
  examples: Example[];
  studyTitle: string;
  studySub: string;
  bars: { label: string; value: number; kind: 'warm' | 'bad' | 'cool' }[];
  limitLabel: string;
  verdictTop: string;
  verdictBottom: string;
  outroTop: string;
  outroBottom: string;
};

export const COPY: Record<Lang, Copy> = {
  ru: {
    title: 'plain-prose',
    tagline: 'следы ИИ в тексте — русский, английский, немецкий',
    ideaTop: 'След — это не запрещённое слово,',
    ideaBottom: 'а слово, которое никто не выбирал',
    examplesTitle: 'Как это выглядит',
    beforeLabel: 'было',
    afterLabel: 'стало',
    examples: [
      {
        label: 'канцелярит и раздутая значимость',
        before: 'В современном мире автоматизация складского учёта играет ключевую роль.',
        after: 'Crate считает себестоимость по партиям.',
        tells: ['В современном мире', 'играет ключевую роль'],
        note: 'открывающий штамп и значимость без содержания',
      },
      {
        label: 'калька и бинарный контраст',
        before: 'Это не просто мощный инструмент, это целая экосистема.',
        after: 'Инструмент сводит дубли в одну карточку.',
        tells: ['не просто', 'мощный инструмент', 'экосистема'],
        note: '«не просто X, а Y» — самый частый след после канцелярита',
      },
      {
        label: 'самопохвала вместо факта',
        before: 'Создаю сложные веб-системы с вниманием к деталям.',
        after: 'Коммерческая разработка и открытые продукты на Rails, Laravel и Go.',
        tells: ['с вниманием к деталям'],
        note: 'заголовок главной страницы до и после правки',
      },
    ],
    studyTitle: 'Что англоязычные правила делают с русским',
    studySub: '14 статей в трёх человеческих переводах. Длинных тире на 1000 слов',
    bars: [
      { label: 'русский оригинал', value: 39.7, kind: 'warm' },
      { label: 'немецкий перевод', value: 25.0, kind: 'warm' },
      { label: 'английский, до чистки', value: 24.0, kind: 'bad' },
      { label: 'английский, после', value: 8.0, kind: 'cool' },
    ],
    limitLabel: 'порог английского правила: 1',
    verdictTop: '28 из 28',
    verdictBottom: 'русских и немецких статей англоязычный набор\nпомечает ложно. Настоящих находок в них ноль.',
    outroTop: 'github.com/dripips/plain-prose',
    outroBottom: 'MIT · собрано из трёх открытых скиллов, все названы',
  },
  en: {
    title: 'plain-prose',
    tagline: 'AI writing tells in English, Russian and German',
    ideaTop: 'A tell is not a banned word.',
    ideaBottom: 'It is a word nobody chose.',
    examplesTitle: 'What it looks like',
    beforeLabel: 'before',
    afterLabel: 'after',
    examples: [
      {
        label: 'throat-clearing and binary contrast',
        before: "Here's the thing: building products is hard. Not because the technology is complex. Because people are complex.",
        after: 'Building products is hard. The technology is manageable. People are not.',
        tells: ["Here's the thing", 'Not because'],
        note: 'the opener and the split negation both go',
      },
      {
        label: 'jargon stack',
        before: "In today's fast-paced landscape, we need to lean into discomfort and navigate uncertainty.",
        after: 'Move faster. Your competition is.',
        tells: ["In today's fast-paced", 'landscape', 'lean into', 'navigate'],
        note: 'four tier-1 words in one sentence',
      },
      {
        label: 'self-praise instead of a fact',
        before: 'Building complex web systems with attention to detail.',
        after: 'Commercial development and open products in Rails, Laravel and Go.',
        tells: ['with attention to detail'],
        note: 'the home page headline, before and after',
      },
    ],
    studyTitle: 'What an English rule set does to Russian',
    studySub: '14 articles in three human translations. Em dashes per 1000 words',
    bars: [
      { label: 'Russian original', value: 39.7, kind: 'warm' },
      { label: 'German translation', value: 25.0, kind: 'warm' },
      { label: 'English, before cleanup', value: 24.0, kind: 'bad' },
      { label: 'English, after', value: 8.0, kind: 'cool' },
    ],
    limitLabel: 'English rule threshold: 1',
    verdictTop: '28 of 28',
    verdictBottom: 'Russian and German articles flagged by the English\nrule set. Real findings in them: zero.',
    outroTop: 'github.com/dripips/plain-prose',
    outroBottom: 'MIT · merged from three open skills, all credited',
  },
};
