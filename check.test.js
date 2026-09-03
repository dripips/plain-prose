'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { analyse, mask, detectLang, parseArgs } = require('./check.js');

const run = (src, opts = {}) => analyse(src, { lang: 'auto', context: 'blog', ...opts });
const rules = (result) => result.findings.map((f) => f.rule);
const messages = (result) => result.findings.map((f) => f.message).join('\n');

test('mask blanks frontmatter, fenced code and inline code without moving offsets', () => {
  const src = '---\ntitle: robust\n---\n\nA line with `delve` inside.\n\n```\ndelve\n```\n';
  const masked = mask(src);
  assert.strictEqual(masked.length, src.length);
  assert.ok(!/delve/.test(masked));
  assert.ok(!/robust/.test(masked));
});

test('masked regions are not flagged', () => {
  const src = 'Ordinary text.\n\n```js\nconst seamless = leverage(robust);\n```\n';
  assert.deepStrictEqual(rules(run(src)), []);
});

test('table rows are reported to the reader, not rewritten by the checker', () => {
  const src = '| term | note |\n|---|---|\n| delve | leverage |\n';
  assert.ok(!rules(run(src)).includes('tier1'));
});

test('language detection', () => {
  assert.strictEqual(detectLang('The pipeline runs nightly and writes a report.'), 'en');
  assert.strictEqual(detectLang('Сборка идёт по ночам и пишет отчёт в файл.'), 'ru');
  assert.strictEqual(detectLang('Der Auftrag wird geprüft und nicht sofort freigegeben.'), 'de');
});

test('English tier 1 vocabulary is flagged with a count', () => {
  const result = run('We leverage a robust and comprehensive platform. We leverage it daily.');
  assert.ok(rules(result).includes('tier1'));
  assert.match(messages(result), /"leverage" ×2/);
});

test('English throat-clearing and crutches', () => {
  const result = run("Here's the thing: it works. Let that sink in.");
  assert.ok(rules(result).includes('opener'));
  assert.ok(rules(result).includes('crutch'));
});

test('binary contrast, joined and split forms', () => {
  assert.ok(rules(run("It's not the speed, it's the trust.")).includes('contrast'));
  assert.ok(rules(run("The question isn't latency. Something else matters.")).includes('contrast'));
});

test('Russian openers, officialese and contrast', () => {
  const src = 'В современном мире это не просто инструмент, это философия. '
    + 'Данный подход является ключевым.';
  const result = run(src);
  assert.strictEqual(result.lang, 'ru');
  assert.ok(rules(result).includes('opener'));
  assert.ok(rules(result).includes('contrast'));
  assert.ok(rules(result).includes('copula'));
});

test('German openers and Substantivstil', () => {
  const src = 'In der heutigen schnelllebigen Welt ist die Durchführung der Implementierung '
    + 'nahtlos und von entscheidender Bedeutung für den Betrieb.';
  const result = run(src, { lang: 'de' });
  assert.ok(rules(result).includes('opener'));
  assert.ok(rules(result).includes('tier1'));
  assert.ok(rules(result).includes('copula'));
});

test('em dash rate is an English rule only', () => {
  const en = 'Alpha — beta — gamma — delta — epsilon — zeta.';
  assert.ok(rules(run(en, { lang: 'en' })).includes('em-dash'));

  const ru = 'Kin — поиск дублей. Crate — учёт партий. Toll — шлюз запросов.';
  assert.ok(!rules(run(ru, { lang: 'ru' })).includes('em-dash'));
});

test('a dash after a bolded list term is typography, not a splice', () => {
  const src = ['- **Alpha** — the first one',
    '- **Beta** — the second one',
    '- **Gamma** — the third one',
    '- **Delta** — the fourth one'].join('\n');
  assert.ok(!rules(run(src, { lang: 'en' })).includes('em-dash'));
});

test('P0 findings: chatbot artifacts, placeholders, tracking parameters', () => {
  const result = run('Great question! I hope this helps. Contact [insert name] for details.');
  const found = rules(result);
  assert.ok(found.includes('chatbot'));
  assert.ok(found.includes('placeholder'));
  assert.strictEqual(result.findings.filter((f) => f.level === 'P0').length >= 2, true);
});

test('sourceless attribution is P0', () => {
  const result = run('Experts believe the approach scales.');
  assert.ok(result.findings.some((f) => f.rule === 'attribution' && f.level === 'P0'));
});

test('rule of three fires on the second triad, not the first', () => {
  assert.ok(!rules(run('It is fast, cheap and simple.')).includes('rule-of-three'));
  const two = 'It is fast, cheap and simple. The build is quiet, quick and green.';
  assert.ok(rules(run(two)).includes('rule-of-three'));
});

test('uniform paragraphs are flagged and varied ones are not', () => {
  const same = Array.from({ length: 4 },
    () => 'The service reads the queue and writes a row into the ledger every single minute today.')
    .join('\n\n');
  assert.ok(rules(run(same)).includes('uniform-paragraphs'));

  const varied = ['It broke.',
    'The queue backed up for eleven minutes while the consumer waited on a lock that the '
    + 'migration held open, and nobody noticed until the pager fired at half past four.',
    'We moved the migration behind a feature flag and the lock went away.'].join('\n\n');
  assert.ok(!rules(run(varied)).includes('uniform-paragraphs'));
});

test('context profile switches rules off', () => {
  const src = 'Here\'s the thing: we leverage a robust platform. Moreover, it is seamless.';
  assert.ok(rules(run(src, { context: 'blog' })).includes('tier1'));
  assert.ok(!rules(run(src, { context: 'casual' })).includes('tier1'));
  assert.ok(!rules(run(src, { context: 'technical' })).includes('hedge'));
});

test('docs profile keeps content rules and drops decoration rules', () => {
  const src = 'Alpha — beta — gamma — delta. Experts believe it works.';
  const found = rules(run(src, { lang: 'en', context: 'docs' }));
  assert.ok(!found.includes('em-dash'));
  assert.ok(found.includes('attribution'));
});

test('score falls as tells accumulate', () => {
  const clean = 'The importer reads 40k rows in about nine seconds. It writes them in one '
    + 'transaction. If a row fails a constraint the whole batch rolls back, and the log names '
    + 'the offending row. We kept the old importer behind a flag for two releases.';
  const slop = "Here's the thing: in today's fast-paced landscape, we leverage a robust, "
    + 'comprehensive and seamless platform. It\'s not just a tool, it\'s a paradigm shift. '
    + 'Experts believe this is a game-changer. The future looks bright. I hope this helps!';
  assert.ok(run(clean).score.total > run(slop).score.total);
  assert.ok(run(slop).score.total < 35);
});

test('clean prose produces no P0 or P1', () => {
  const clean = 'Crate books receipts by lot. When stock ships, the movement page shows which '
    + 'lot each unit came from and what it cost. The ledger reconciles against the snapshot '
    + 'every night, and a mismatch fails the job loudly.';
  const found = run(clean).findings.filter((f) => f.level !== 'P2');
  assert.deepStrictEqual(found.map((f) => f.message), []);
});

test('argument parsing', () => {
  const opts = parseArgs(['--lang', 'ru', '--context', 'docs', '--json', 'a.md', 'b.md']);
  assert.strictEqual(opts.lang, 'ru');
  assert.strictEqual(opts.context, 'docs');
  assert.strictEqual(opts.json, true);
  assert.deepStrictEqual(opts.files, ['a.md', 'b.md']);
  assert.throws(() => parseArgs(['--nope']), /unknown option/);
});

test('unknown language is rejected', () => {
  assert.throws(() => analyse('text', { lang: 'fr', context: 'blog' }), /unknown language/);
});

test('--skip-quotes exempts quoted examples in writing about AI patterns', () => {
  const src = 'The catalogue lists "here\'s the thing" and "let that sink in" as openers.';
  assert.ok(rules(run(src)).includes('opener'));
  assert.deepStrictEqual(rules(run(src, { skipQuotes: true })), []);
});

test('a bolded lead term in a list item is a label, not decoration', () => {
  const items = Array.from({ length: 12 }, (_, i) => `- **Term ${i}** the note for it`).join('\n');
  assert.ok(!rules(run(items)).includes('bold'));
  const inline = Array.from({ length: 12 },
    () => 'A sentence with **heavy emphasis** dropped into ordinary prose here.').join(' ');
  assert.ok(rules(run(inline)).includes('bold'));
});

test('a triad inside a longer enumeration is specification, not cadence', () => {
  const list = 'Refuse quoted material, code blocks, tables, frontmatter and file paths. '
    + 'Skip inline code, link targets, table rows and bare URLs.';
  assert.ok(!rules(run(list)).includes('rule-of-three'));
});

test('technical context exempts vocabulary that carries real meaning there', () => {
  const src = 'The retry path is robust and the API exposes a comprehensive filter. '
    + 'We leverage the batch endpoint. Then we delve into the trace.';
  const blog = rules(run(src, { context: 'blog' }));
  const tech = messages(run(src, { context: 'technical' }));
  assert.ok(blog.includes('tier1'));
  assert.ok(!/robust|comprehensive|leverage/.test(tech));
  assert.match(tech, /delve/);
});

test('social raises the em dash limit instead of dropping the rule', () => {
  // Two dashes in a thousand words: over the blog limit of one, at the social limit of two.
  const body = 'word '.repeat(998) + 'alpha — beta and gamma — delta.';
  assert.ok(rules(run(body, { lang: 'en', context: 'blog' })).includes('em-dash'));
  assert.ok(!rules(run(body, { lang: 'en', context: 'social' })).includes('em-dash'));
});
