#!/usr/bin/env node
// plain-prose: mechanical check for AI writing patterns.
// Zero dependencies. Node 18+.
//
// Usage: node check.js [options] <file...>
//   --lang en|ru|de|auto   language of the text (default: auto)
//   --context <profile>    blog|social|technical|pitch|docs|casual (default: blog)
//   --json                 machine-readable output
//   --strict               P2 findings also fail the run
//   --quiet                only the summary line
//
// Exit: 0 clean, 1 findings, 2 tool error.

'use strict';

const fs = require('fs');
const path = require('path');

// ── dictionaries ──────────────────────────────────────────────────────────
// Kept short on purpose. The SKILL.md references carry the full catalogue;
// this file holds only what a regular expression can judge without context.

const DICT = {
  en: {
    tier1: ['delve', 'delve into', 'tapestry', 'realm', 'paradigm shift', 'embark', 'beacon',
      'testament to', 'robust', 'comprehensive', 'cutting-edge', 'state-of-the-art', 'leverage',
      'leveraging', 'pivotal', 'underscores', 'meticulous', 'meticulously', 'seamless',
      'seamlessly', 'game-changer', 'game-changing', 'harness', 'myriad', 'plethora',
      'resonate', 'foster', 'cultivate', 'ever-evolving', 'thriving', 'vibrant', 'supercharge',
      'unlock the power', 'deep dive', 'lean into', 'double down', 'navigate the', 'unpack'],
    hedge: ['it\'s important to note', 'it is important to note', 'it\'s worth noting',
      'it is worth noting', 'to be clear', 'to be honest', 'quite frankly', 'perhaps',
      'could potentially', 'may eventually', 'arguably', 'in some sense'],
    filler: ['genuinely', 'truly', 'really', 'literally', 'simply', 'incredibly', 'absolutely',
      'fundamentally', 'inherently', 'essentially', 'ultimately', 'basically', 'actually'],
    opener: ['here\'s the thing', 'here\'s what', 'here\'s why', 'here\'s how',
      'the uncomfortable truth', 'it turns out', 'let me be clear', 'the truth is',
      'in today\'s fast-paced', 'in an era where', 'in a world where', 'let\'s dive',
      'let\'s explore', 'let\'s unpack', 'can we talk about'],
    crutch: ['let that sink in', 'full stop.', 'make no mistake', 'this matters because',
      'here\'s why that matters', 'and that\'s okay', 'think about it.', 'ask yourself'],
    p0: ['i hope this helps', 'great question', 'as an ai', 'as of my last update',
      'my training data', 'let me know if you\'d like', 'certainly! here',
      'i cannot browse', 'as a large language model'],
    attribution: ['experts believe', 'experts say', 'studies show', 'research suggests',
      'many argue', 'it is widely recognized', 'it is widely recognised', 'some would say'],
    closer: ['the future looks bright', 'only time will tell', 'one thing is certain',
      'this is just the beginning', 'thank me later', 'worth your time',
      'let me know in the comments'],
    transition: ['moreover', 'furthermore', 'additionally', 'in conclusion', 'overall'],
    copula: ['serves as', 'functions as', 'stands as a testament', 'represents a'],
    three: /\b([a-z]+), ([a-z]+),? and ([a-z]+)\b/gi,
    contrast: [/\bit'?s not (?:just )?[^.,;]{2,40}[,.] it'?s\b/gi,
      /\bisn'?t (?:about |the )?[^.,;]{2,40}[,.] it'?s\b/gi,
      /\bnot (?:just )?[^.,;]{2,40}, but (?:also )?\b/gi,
      /\bthe (?:question|answer|problem) isn'?t\b/gi,
      /\bstops being [^.,;]{2,30} and starts being\b/gi],
    dashRule: true
  },
  ru: {
    tier1: ['ключевую роль', 'играет важную роль', 'краеугольный камень', 'неотъемлемая часть',
      'новые горизонты', 'на новый уровень', 'мощный инструмент', 'бесшовный', 'бесшовно',
      'ландшафт', 'экосистема', 'синергия', 'челлендж', 'инсайт', 'майндсет',
      'меняет правила игры', 'глубокое погружение', 'погрузимся', 'революционный',
      'инновационный подход', 'уникальное решение', 'комплексный подход'],
    hedge: ['стоит отметить', 'важно отметить', 'нельзя не отметить', 'следует отметить',
      'хочется отметить', 'как известно', 'не секрет, что', 'по большому счёту',
      'в некотором смысле'],
    filler: ['на самом деле', 'по сути', 'фактически', 'буквально', 'действительно',
      'поистине', 'крайне важно', 'абсолютно'],
    opener: ['в современном мире', 'в наше время', 'в эпоху цифров', 'сегодня, когда',
      'давайте разберёмся', 'давайте разберемся', 'давайте рассмотрим', 'давайте погрузимся',
      'в этой статье мы', 'в условиях стремительно'],
    crutch: ['и вот тут начинается самое интересное', 'вдумайтесь', 'задумайтесь на секунду',
      'это меняет всё'],
    p0: ['как языковая модель', 'я не имею доступа к интернету',
      'на момент моего последнего обновления', 'надеюсь, это поможет',
      'отличный вопрос', 'дайте знать, если'],
    attribution: ['эксперты считают', 'исследования показывают', 'многие полагают',
      'общеизвестно, что', 'как показывает практика'],
    closer: ['подводя итог', 'в заключение хотелось бы', 'время покажет', 'будущее за',
      'надеюсь, эта статья была полезной', 'пишите в комментариях', 'всем добра'],
    transition: ['таким образом', 'более того', 'кроме того', 'в свою очередь',
      'в связи с этим', 'тем самым'],
    copula: ['является', 'представляет собой', 'осуществляется', 'производится',
      'на сегодняшний день', 'в рамках', 'с целью', 'в целях', 'данный', 'данная', 'данное'],
    three: /(?<![\p{L}])(\p{L}+), (\p{L}+) и (\p{L}+)(?![\p{L}])/gu,
    contrast: [/(?<![\p{L}])это не просто [^.,;]{2,40}[,.] это/giu,
      /(?<![\p{L}])не просто [^.,;]{2,40}, а /giu,
      /(?<![\p{L}])речь идёт не о [^.,;]{2,40}, а о/giu,
      /(?<![\p{L}])дело не в [^.,;]{2,40}[,.] дело в/giu],
    dashRule: false
  },
  de: {
    tier1: ['nahtlos', 'ganzheitlich', 'bahnbrechend', 'wegweisend', 'zukunftsweisend',
      'revolutioniert', 'entscheidende Rolle', 'von entscheidender Bedeutung',
      'wesentlicher Bestandteil', 'neue Möglichkeiten', 'auf ein neues Niveau',
      'Mehrwert schaffen', 'Herausforderungen meistern', 'Landschaft', 'Ökosystem',
      'Insights', 'Learnings', 'Mindset', 'Game-Changer', 'leistungsstarkes Werkzeug'],
    hedge: ['es ist wichtig zu beachten', 'es sei angemerkt', 'es gilt zu beachten',
      'möglicherweise', 'unter Umständen', 'gewissermaßen'],
    filler: ['wirklich', 'tatsächlich', 'buchstäblich', 'absolut', 'äußerst', 'überaus'],
    opener: ['in der heutigen schnelllebigen', 'in der heutigen digitalen', 'in Zeiten von',
      'lassen Sie uns eintauchen', 'tauchen wir ein', 'in diesem Artikel werfen wir'],
    crutch: ['lassen Sie das kurz wirken', 'denken Sie darüber nach', 'das ändert alles'],
    p0: ['als KI-Modell', 'als Sprachmodell', 'zum Zeitpunkt meines letzten Updates',
      'ich hoffe, das hilft', 'gute Frage', 'lassen Sie mich wissen, ob'],
    attribution: ['Experten glauben', 'Studien zeigen', 'Forschungen legen nahe',
      'es ist allgemein anerkannt'],
    closer: ['zusammenfassend lässt sich sagen', 'abschließend lässt sich festhalten',
      'die Zukunft bleibt spannend', 'es bleibt abzuwarten',
      'ich hoffe, dieser Artikel war hilfreich', 'schreiben Sie es in die Kommentare'],
    transition: ['darüber hinaus', 'des Weiteren', 'ferner', 'zudem', 'nicht zuletzt'],
    copula: ['stellt dar', 'fungiert als', 'dient als', 'im Rahmen von', 'zum Zwecke der',
      'unter Verwendung von', 'die Durchführung der', 'die Bereitstellung von'],
    three: /(?<![\p{L}])(\p{L}+), (\p{L}+) und (\p{L}+)(?![\p{L}])/gu,
    contrast: [/(?<![\p{L}])es ist nicht [^.,;]{2,40}[,.] es ist/giu,
      /(?<![\p{L}])nicht nur [^.,;]{2,40}, sondern auch/giu],
    dashRule: false
  }
};

// Rules a context profile switches off entirely. Mirrors the tolerance matrix
// in references/contexts.md; the em dash limit varies by profile instead of
// switching off, so it is absent here for every profile that still counts it.
const SKIP = {
  blog: [],
  social: ['uniform-paragraphs', 'transition', 'copula', 'closer', 'rule-of-three',
    'bare-bullets', 'bold'],
  technical: ['rule-of-three', 'hedge', 'copula', 'bare-bullets'],
  pitch: [],
  docs: ['em-dash', 'bold', 'transition', 'copula', 'uniform-paragraphs', 'bare-bullets',
    'closer', 'hashtags', 'emoji-heading'],
  casual: ['em-dash', 'bold', 'transition', 'copula', 'uniform-paragraphs', 'rule-of-three',
    'hedge', 'filler', 'tier1', 'closer', 'heading-case', 'emoji-heading', 'bare-bullets']
};

// Tier 1 words that carry real meaning in technical writing. Listed in
// references/contexts.md under the technical vocabulary exemptions.
const TECH_OK = {
  en: ['robust', 'comprehensive', 'seamless', 'seamlessly', 'leverage', 'leveraging',
    'foster', 'resonate'],
  ru: ['экосистема', 'ландшафт'],
  de: ['nahtlos', 'ganzheitlich', 'Ökosystem', 'Landschaft']
};

// ── text preparation ──────────────────────────────────────────────────────

// Blank out regions the skill promises not to touch, keeping every offset so
// line numbers stay honest.
function mask(src, skipQuotes) {
  let out = src;
  const blank = (m) => m.replace(/[^\n]/g, ' ');
  // A deliberate choice is not a tell. A line carrying the ignore marker drops
  // out of the audit; a file carrying the file marker is skipped whole. Without
  // an escape hatch the tool nags about settled decisions and stops being read.
  //
  // The marker only counts inside a comment. Writing about the marker in prose
  // must not trigger it: the first version of this rule blanked the README that
  // documented it.
  const FILE_MARK = /<!--\s*prose-ignore-file\s*-->|(?:^|\s)(?:\/\/|#)\s*prose-ignore-file\b/;
  const LINE_MARK = /<!--\s*prose-ignore(-file)?\s*-->|(?:^|\s)(?:\/\/|#)\s*prose-ignore(-file)?\b/;
  if (FILE_MARK.test(out)) return blank(out);
  out = out.split('\n').map((line) => (LINE_MARK.test(line) ? blank(line) : line)).join('\n');
  out = out.replace(/^---\n[\s\S]*?\n---\n/, blank);      // frontmatter
  out = out.replace(/```[\s\S]*?```/g, blank);            // fenced code
  out = out.replace(/~~~[\s\S]*?~~~/g, blank);
  out = out.replace(/`[^`\n]*`/g, blank);                 // inline code
  out = out.replace(/^ {4,}\S.*$/gm, blank);              // indented code
  out = out.replace(/\]\([^)\s]+\)/g, blank);             // link targets
  out = out.replace(/https?:\/\/\S+/g, blank);            // bare URLs
  out = out.replace(/^\s*\|.*\|\s*$/gm, blank);           // table rows
  if (skipQuotes) {
    // Writing about AI patterns quotes them. Those quotations belong to the
    // subject, not to the author's own prose.
    out = out.replace(/"[^"\n]{2,160}"/g, blank);
    out = out.replace(/[“][^”\n]{2,160}[”]/g, blank);
    out = out.replace(/«[^»\n]{2,160}»/g, blank);
    out = out.replace(/„[^“\n]{2,160}[“”]/g, blank);
  }
  return out;
}

function lineIndex(src) {
  const starts = [0];
  for (let i = 0; i < src.length; i++) if (src[i] === '\n') starts.push(i + 1);
  return (offset) => {
    let lo = 0, hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid; else hi = mid - 1;
    }
    return lo + 1;
  };
}

function detectLang(text) {
  const cyr = (text.match(/\p{Script=Cyrillic}/gu) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  if (cyr > latin * 0.3) return 'ru';
  // Compare German function words against English ones rather than against the
  // whole text: a code-heavy German article dilutes any share-of-words ratio
  // until it reads as English.
  const de = (text.match(
    /[äöüßÄÖÜ]|\b(der|die|das|den|dem|des|und|nicht|werden|wird|sich|eine|einen|einem|einer|mit|für|auf|ist|aus|über|zum|zur|beim|man|kann|oder)\b/gi
  ) || []).length;
  const en = (text.match(
    /\b(the|and|of|to|is|in|that|with|for|this|are|from|you|it|on|as|by|but|not|can|or)\b/gi
  ) || []).length;
  return de >= 3 && de > en ? 'de' : 'en';
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function phraseRe(list) {
  return new RegExp('(?<![\\p{L}])(' + list.map(escapeRe).join('|') + ')(?![\\p{L}])', 'giu');
}

// ── statistics ────────────────────────────────────────────────────────────

function paragraphs(masked) {
  return masked.split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^#{1,6}\s/.test(p) && !/^\s*[-*+>|]/.test(p) && !/^\d+\.\s/.test(p));
}

function sentences(text) {
  return text.split(/(?<=[.!?…])[\s\n]+/).map((s) => s.trim()).filter((s) => s.length > 1);
}

const wordsIn = (s) => (s.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;

function spread(values) {
  if (values.length < 2) return 1;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (!mean) return 1;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance) / mean;   // coefficient of variation
}

// ── the check ─────────────────────────────────────────────────────────────

function analyse(src, opts) {
  const masked = mask(src, opts.skipQuotes);
  const lang = opts.lang === 'auto' ? detectLang(masked) : opts.lang;
  const dict = DICT[lang];
  if (!dict) throw new Error(`unknown language: ${lang}`);
  const skip = new Set(SKIP[opts.context] || []);
  const lineOf = lineIndex(src);
  const total = wordsIn(masked) || 1;
  const findings = [];

  const add = (level, rule, message, offset) => {
    if (skip.has(rule)) return;
    findings.push({ level, rule, message, line: offset == null ? null : lineOf(offset) });
  };

  const scan = (list, level, rule, label) => {
    if (skip.has(rule) || !list.length) return 0;
    const re = phraseRe(list);
    const seen = new Map();
    let m, count = 0;
    while ((m = re.exec(masked)) !== null) {
      count++;
      const key = m[0].toLowerCase();
      if (!seen.has(key)) seen.set(key, { n: 0, at: m.index });
      seen.get(key).n++;
    }
    for (const [word, info] of seen) {
      add(level, rule, `${label}: "${word}"${info.n > 1 ? ` ×${info.n}` : ''}`, info.at);
    }
    return count;
  };

  // P0
  const p0 = scan(dict.p0, 'P0', 'chatbot', 'chatbot artifact');
  scan(dict.attribution, 'P0', 'attribution', 'sourceless attribution');
  for (const m of masked.matchAll(/\[(?:insert|your|company|name|x)[^\]]*\]/gi)) {
    add('P0', 'placeholder', `unfilled placeholder: "${m[0]}"`, m.index);
  }
  for (const m of masked.matchAll(/utm_source=(?:chatgpt|claude|perplexity)[^\s)]*/gi)) {
    add('P0', 'tracking', `AI tool tracking parameter: "${m[0]}"`, m.index);
  }
  for (const m of masked.matchAll(/【[^】]*】/g)) {
    add('P0', 'citation-leak', `citation markup leak: "${m[0]}"`, m.index);
  }

  // P1
  const exempt = opts.context === 'technical' ? new Set(TECH_OK[lang] || []) : new Set();
  const t1 = scan(dict.tier1.filter((w) => !exempt.has(w)), 'P1', 'tier1', 'tier 1 vocabulary');
  scan(dict.opener, 'P1', 'opener', 'throat-clearing opener');
  scan(dict.crutch, 'P1', 'crutch', 'emphasis crutch');
  scan(dict.closer, 'P1', 'closer', 'generic closer');
  const hedges = scan(dict.hedge, 'P1', 'hedge', 'hedge');

  let contrasts = 0;
  for (const re of dict.contrast) {
    for (const m of masked.matchAll(re)) {
      contrasts++;
      add('P1', 'contrast', `binary contrast: "${m[0].trim().slice(0, 60)}"`, m.index);
    }
  }

  // Em dash rate, English only. A dash separating a bolded lead term or a link
  // in a list item is typography, not a prose splice.
  if (dict.dashRule && !skip.has('em-dash')) {
    let dashes = 0, first = null;
    for (const m of masked.matchAll(/—|(?<=\s)--(?=\s)/g)) {
      const lineStart = src.lastIndexOf('\n', m.index) + 1;
      const lineEnd = src.indexOf('\n', m.index);
      const line = src.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
      // A list item separating a lead term from its gloss is a definition, not
      // a splice. A term wrapped in bold, inline code or a link is marked as a
      // label at any length; an unmarked one has to be short. Either way the
      // item gets one dash: a second is prose again.
      const item = line.match(/^\s*(?:[-*+]|\d+\.)\s+(.*)$/);
      if (item) {
        const parts = item[1].split('—');
        const lead = parts[0].trim();
        const labelled = /^(\*\*.+\*\*|`.+`|\[.+\](\(.*\))?)$/.test(lead);
        if (parts.length === 2 && (labelled || wordsIn(lead) <= 6)) continue;
      }
      dashes++;
      if (first === null) first = m.index;
    }
    const rate = (dashes / total) * 1000;
    const limit = opts.context === 'social' ? 2 : 1;
    if (rate > limit) {
      add('P1', 'em-dash',
        `em dashes: ${dashes} in ${total} words (${rate.toFixed(1)} per 1000, limit ${limit})`,
        first);
    }
  }

  // Bold overuse: the rule is one bolded phrase per section at most, so the
  // budget is the section count and not a word rate. A bolded lead term opening
  // a list item is a label, the same carve-out the em dash rule makes.
  if (!skip.has('bold')) {
    const bold = [...masked.matchAll(/\*\*[^*\n]{2,}\*\*/g)].filter((m) => {
      const lineStart = masked.lastIndexOf('\n', m.index) + 1;
      return !/^\s*(?:[-*+]|\d+\.)\s+$/.test(masked.slice(lineStart, m.index));
    });
    const sections = (masked.match(/^#{2,6}\s/gm) || []).length;
    const budget = Math.max(2, sections);
    if (bold.length > budget) {
      add('P1', 'bold',
        `bold overuse: ${bold.length} bolded spans for ${sections} sections`, bold[0].index);
    }
  }

  // P2
  scan(dict.transition, 'P2', 'transition', 'transition word');
  const copula = scan(dict.copula, 'P2', 'copula', 'copula avoidance or officialese');
  const fillers = scan(dict.filler, 'P2', 'filler', 'empty intensifier');

  // A triad is a cadence of exactly three. When the sentence already carries a
  // comma before the match, the match is a slice of a longer enumeration, and
  // an enumeration is specification rather than rhythm.
  const triples = [...masked.matchAll(dict.three)].filter((m) => {
    const start = Math.max(0, ...['.', '!', '?', '\n', ':', ';']
      .map((c) => masked.lastIndexOf(c, m.index - 1) + 1));
    return !masked.slice(start, m.index).includes(',');
  });
  if (!skip.has('rule-of-three') && triples.length > 1) {
    add('P2', 'rule-of-three', `rule of three ×${triples.length}, keep at most one`,
      triples[0].index);
  }

  for (const m of masked.matchAll(/^#{1,6}\s+(.*)$/gm)) {
    const heading = m[1].trim();
    if (/\p{Extended_Pictographic}/u.test(heading)) {
      add('P2', 'emoji-heading', `emoji in heading: "${heading}"`, m.index);
    }
    const w = heading.split(/\s+/).filter((x) => /^\p{L}/u.test(x));
    if (w.length >= 4) {
      const caps = w.slice(1).filter((x) => /^\p{Lu}/u.test(x)).length;
      if (caps / (w.length - 1) > 0.6 && lang === 'en') {
        add('P2', 'heading-case', `Title Case heading: "${heading}"`, m.index);
      }
    }
  }

  const tags = [...masked.matchAll(/(?:^|\s)#[\p{L}\d_]+/gu)];
  if (tags.length >= 5) {
    add('P2', 'hashtags', `hashtag stuffing: ${tags.length} tags`, tags[0].index);
  }

  // Rhythm.
  const paras = paragraphs(masked);
  const paraLens = paras.map(wordsIn).filter((n) => n >= 12);
  const paraSpread = spread(paraLens);
  if (!skip.has('uniform-paragraphs') && paraLens.length >= 4 && paraSpread < 0.18) {
    add('P2', 'uniform-paragraphs',
      `paragraphs are uniform (${paraLens.join('/')} words), vary the length`, null);
  }

  const sentLens = sentences(paras.join('\n\n')).map(wordsIn).filter((n) => n > 0);
  const sentSpread = spread(sentLens);
  if (sentLens.length >= 6 && sentSpread < 0.30) {
    add('P2', 'uniform-sentences',
      `sentence lengths are uniform (spread ${sentSpread.toFixed(2)}, want 0.40+)`, null);
  }

  // Bare noun-phrase bullets: five or more short items with no verb-looking word.
  const bullets = [...masked.matchAll(/^\s*[-*+]\s+(.{3,60})$/gm)]
    .map((m) => m[1].trim())
    .filter((t) => !/[.:;!?]$/.test(t) && wordsIn(t) <= 5);
  if (bullets.length >= 5) {
    add('P2', 'bare-bullets',
      `${bullets.length} bullets are bare noun phrases, write the sentences`, null);
  }

  // ── proxy score ────────────────────────────────────────────────────────
  const per1k = (n) => (n / total) * 1000;
  const band = (value, good, bad) => {
    const t = (value - good) / (bad - good);
    return Math.max(1, Math.min(10, Math.round(10 - t * 9)));
  };
  const count = (rule) => findings.filter((f) => f.rule === rule).length;

  const score = {
    directness: band(per1k(count('opener') + count('crutch') + count('closer')), 0, 6),
    rhythm: band(1 - Math.min(1, (paraSpread + sentSpread) / 1.2), 0.25, 0.85),
    trust: band(per1k(hedges + p0 + count('attribution')), 0, 8),
    authenticity: band(per1k(t1 + contrasts * 3), 0, 14),
    density: band(per1k(fillers + copula + triples.length * 2), 0, 20)
  };
  score.total = Object.values(score).reduce((a, b) => a + b, 0);

  return { lang, context: opts.context, words: total, findings, score };
}

// ── reporting ─────────────────────────────────────────────────────────────

const ORDER = { P0: 0, P1: 1, P2: 2 };

function report(file, result, opts) {
  const { findings, score } = result;
  if (opts.json) return;
  const head = `${file}  [${result.lang}/${result.context}, ${result.words} words]`;
  if (!opts.quiet) {
    console.log(head);
    if (!findings.length) console.log('  clean');
    for (const f of [...findings].sort((a, b) => ORDER[a.level] - ORDER[b.level] || (a.line || 0) - (b.line || 0))) {
      console.log(`  ${f.level}  ${f.line ? String(f.line).padStart(4) : '   -'}  ${f.message}`);
    }
    console.log('');
  }
  const dims = ['directness', 'rhythm', 'trust', 'authenticity', 'density']
    .map((d) => `${d} ${score[d]}`).join('  ');
  console.log(`  ${dims}`);
  console.log(`  proxy score ${score.total}/50${score.total < 35 ? '  (below 35, revise)' : ''}`);
  if (!opts.quiet) console.log('');
}

function parseArgs(argv) {
  const opts = { lang: 'auto', context: 'blog', json: false, strict: false, quiet: false,
    skipQuotes: false, files: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--lang') opts.lang = argv[++i];
    else if (a === '--context') opts.context = argv[++i];
    else if (a === '--json') opts.json = true;
    else if (a === '--strict') opts.strict = true;
    else if (a === '--quiet') opts.quiet = true;
    else if (a === '--skip-quotes') opts.skipQuotes = true;
    else if (a === '-h' || a === '--help') opts.help = true;
    else if (a.startsWith('-')) throw new Error(`unknown option: ${a}`);
    else opts.files.push(a);
  }
  return opts;
}

const USAGE = `plain-prose check

  node check.js [options] <file...>

  --lang en|ru|de|auto   language of the text (default: auto)
  --context <profile>    blog|social|technical|pitch|docs|casual (default: blog)
  --json                 machine-readable output
  --strict               P2 findings also fail the run
  --quiet                only the score line
  --skip-quotes          ignore quoted spans, for writing about AI patterns

Exit 0 clean, 1 findings, 2 tool error.`;

function main(argv) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (err) {
    console.error(err.message);
    return 2;
  }
  if (opts.help || !opts.files.length) {
    console.log(USAGE);
    return opts.help ? 0 : 2;
  }
  if (!SKIP[opts.context]) {
    console.error(`unknown context: ${opts.context}`);
    return 2;
  }

  const results = [];
  let failed = false;
  for (const file of opts.files) {
    let src;
    try {
      src = fs.readFileSync(file, 'utf8');
    } catch {
      console.error(`cannot read ${file}`);
      return 2;
    }
    const result = analyse(src, opts);
    results.push({ file: path.relative(process.cwd(), file) || file, ...result });
    report(file, result, opts);
    const levels = new Set(result.findings.map((f) => f.level));
    if (levels.has('P0') || levels.has('P1') || (opts.strict && levels.has('P2'))) failed = true;
  }
  if (opts.json) console.log(JSON.stringify(results, null, 2));
  return failed ? 1 : 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));

module.exports = { analyse, mask, detectLang, parseArgs, main };
