# Words and phrases

Three tiers, by how much a single hit actually means.

- **Tier 1A, machine markers.** Replace on sight. A cluster of these says something about how the text was produced.
- **Tier 1B, clarity edits.** Replace on sight too, but a hit says nothing about authorship. These are the words careful humans reach for in formal registers. Report them separately from 1A. Presenting a wordiness fix as proof of machine authorship is the mistake this split exists to prevent.
- **Tier 2, cluster flags.** Fine alone. Two or more in one paragraph is a signal.
- **Tier 3, density flags.** Ordinary words that machines overuse. Flag when they crowd the text, roughly 3% of total words or a single phrase repeated three times.

Each entry covers its inflected forms: `leverage` also catches `leveraging` and `leveraged`, `meticulous` catches `meticulously`. Judge by context when a form has an honest separate sense.

## Tier 1A, machine markers

| Replace | With |
|---|---|
| delve, delve into | explore, dig into, look at |
| landscape (as metaphor) | field, space, industry |
| tapestry, symphony, mosaic | describe the actual thing |
| realm | area, field, domain |
| paradigm | model, approach |
| embark | start, begin |
| beacon | rewrite the sentence |
| testament to | shows, proves |
| robust | strong, reliable, solid |
| comprehensive | thorough, complete |
| cutting-edge, state-of-the-art | latest, newest |
| leverage (verb) | use |
| pivotal | important, key |
| underscores, highlights the importance of | shows |
| meticulous | careful, precise |
| seamless | smooth, without friction |
| game-changer, game-changing | name what changed |
| harness (verb) | use |
| navigate (challenges) | handle, address |
| unpack (an idea) | explain, examine |
| lean into | accept, commit to |
| double down | commit, increase |
| deep dive | analysis |
| foster, cultivate | build, encourage |
| myriad, plethora | many, or the number |
| resonate with | matter to, convince |
| elevate | improve, raise |
| unlock, supercharge, turbocharge | name the effect |
| ever-evolving, rapidly evolving | cut, or give the rate |
| vibrant, thriving (ecosystem) | cut |
| journey (for a process) | process, work, project |

## Tier 1B, clarity edits

Not evidence of anything. Still worth fixing.

| Replace | With |
|---|---|
| in order to | to |
| utilize | use |
| commence | start |
| ascertain | find out |
| endeavor | try |
| facilitate | help, make easier |
| prior to | before |
| subsequent to | after |
| in the event that | if |
| a number of | some, or the number |
| due to the fact that | because |
| at this point in time | now |
| has the ability to | can |

## Tier 2, cluster flags

Two in a paragraph is the signal.

`crucial`, `essential`, `vital`, `significant`, `substantial`, `notable`, `remarkable`, `compelling`, `intricate`, `nuanced`, `holistic`, `innovative`, `transformative`, `empower`, `streamline`, `optimize`, `curate`, `align`, `ecosystem`, `framework`, `insight`, `synergy`, `impactful`.

## Tier 3, density flags

`important`, `key`, `various`, `numerous`, `effective`, `powerful`, `valuable`, `ensure`, `enhance`, `provide`, `additionally`, `moreover`, `furthermore`, `overall`, `ultimately`, `essentially`, `arguably`.

## Throat-clearing openers

Cut them and state the point.

- "Here's the thing:"
- "Here's what / here's why / here's how"
- "The uncomfortable truth is"
- "It turns out"
- "The real X is"
- "Let me be clear"
- "The truth is,"
- "I'm going to be honest"
- "Can we talk about"
- "In today's fast-paced world"
- "In an era where"

Any "here's what/this/that" is throat-clearing in front of the point.

## Emphasis crutches

Delete. They add nothing.

- "Full stop." / "Period."
- "Let that sink in."
- "This matters because"
- "Make no mistake"
- "Here's why that matters"
- "And that's the point."

## Hedges and softeners

- "perhaps", "possibly", "could potentially", "may eventually"
- "it's important to note that", "it's worth noting that"
- "to be clear", "to be honest", "quite frankly"
- "in some sense", "in a way"

Stacked hedges are the loudest version: "this could potentially become one of the more significant developments" says nothing at four times the length.

## Empty intensifiers

Cut when they only add heat: `genuinely`, `truly`, `really`, `literally`, `simply`, `just`, `deeply`, `fundamentally`, `inherently`, `incredibly`, `absolutely`.

Keep an adverb that carries information. "The job runs nightly", "roughly 400ms", "the flag applies globally". The test: delete it and see whether a fact disappears.

`actually` deserves its own line. Default to deleting it. Keep it only where the sentence names a real correction: "we expected a cache hit, it was actually a miss".

## Business jargon

| Avoid | Use |
|---|---|
| circle back | return to |
| on the same page | agreed |
| take a step back | reconsider |
| moving forward | next, from now |
| at the end of the day | cut |
| when it comes to | cut, or "for" |
| at its core | cut |
| the reality is | cut |

## Vague endorsement

Cut or replace: "worth reading", "worth a look", "worth checking out", "worth your time", "worth paying attention to". Say why.

## Vague declaratives

Sentences announcing importance without naming anything.

- "The reasons are structural."
- "The implications are significant."
- "This is the deepest problem."
- "The stakes are high."
- "The consequences are real."

Replace each with the specific thing. If the source has no specific thing, flag the gap. Do not invent one.

## Vague attribution

- "Experts believe", "studies show", "research suggests", "many argue"
- "It is widely recognised that"

Name the study, the person, the year. If the source names none, cut the claim or mark it unsourced. Never invent a citation.

## Chatbot artifacts

Top priority, because they end a reader's trust in one line.

- "I hope this helps!"
- "Great question!"
- "Certainly! Here is"
- "As an AI"
- "As of my last update", "my training data"
- "Let me know if you'd like me to"
- Leftover placeholders: `[insert name]`, `[Company]`, `[X]`
- Citation markup leaks: `【4:1†source】`, `[1]` with no bibliography
- Tracking parameters left on pasted URLs: `?utm_source=chatgpt.com`

## Meta-commentary

The text should move, not narrate its own structure.

- "In this section, we'll"
- "The rest of this article explains"
- "Let me walk you through"
- "As we'll see"
- "But that's another post"
- "Hint:", "Plot twist:", "Spoiler:"

## Closers to cut

- "The future looks bright."
- "One thing is certain:"
- "Only time will tell."
- "This is just the beginning."
- "Thank me later.", "You're welcome."
- "What do you think? Let me know in the comments."
- Hashtag stacks of five or more.
