# Structures

Shapes that read as machine-written even when every word is clean.

## Binary contrast

The most reliable tell in the catalogue. State the positive claim and drop the negation.

| Pattern | Problem |
|---|---|
| "It's not X, it's Y." | Telegraphed reversal |
| "X isn't the problem. Y is." | Formulaic reframe |
| "The answer isn't X. It's Y." | Predictable pivot |
| "The question isn't X. It's Y." | Rhetorical misdirection |
| "It feels like X. It's actually Y." | Setup and reveal cliche |
| "stops being X and starts being Y" | False transformation arc |
| "not just X, but Y" | Additive hedge |

**The split form.** The negation and the correction land in two separate sentences, so each looks innocent alone: "The headline isn't the latency. The real story is the retry storm." Same move, same fix.

**The countdown.** Several negations stacked before the reveal: "It's not the price. It's not the features. It's the trust." Cut to the claim.

**The tail.** A bare negation fragment glued to the end: "The options come from the selected row, no guessing." Write it as a clause or cut it.

Carve-out: a list enumerating real constraints ("no dependencies, no telemetry, no network calls") is specification, not a reveal.

## Negative listing

Saying what a thing is not, at length, before saying what it is.

- "Not a framework. Not a library. A convention."
- "It wasn't the deploy. It wasn't the migration. It was DNS."

State the last item. The reader does not need the runway.

## Dramatic fragmentation

Fragments used to manufacture profundity.

- "One config file. That's it. That's the whole setup."
- "Fast. Cheap. Reliable."
- "This changes everything. Everything."

Write complete sentences and let the content carry the weight. A fragment is fine when the register is already fragmentary, such as chat or a short post. It is a tell when a rewrite chops a working sentence to create rhythm.

## Rhetorical setups

These announce insight instead of delivering it.

| Pattern | Fix |
|---|---|
| "What if I told you" | Make the claim |
| "Here's what I mean:" | Cut, the next sentence already means it |
| "Think about it." | Cut |
| "Ask yourself:" | Cut |
| "And that's okay." | Cut, the reader needs no permission |
| Stacked questions with no answers | Answer one, cut the rest |

A rhetorical question as an opener is a weak hook. One is survivable in a social post. Two in a row is a pattern.

## False agency

Inanimate things doing human work. Machines love this because it avoids naming who acted.

| Pattern | Reality |
|---|---|
| "a complaint becomes a fix" | Someone fixed it |
| "the decision emerges" | Someone decided |
| "the culture shifts" | People changed behaviour |
| "the conversation moves toward" | Someone steered it |
| "the data tells us" | Someone read it and concluded |
| "the market rewards" | Buyers paid |
| "the architecture demands" | An engineer chose a constraint |

Name the person. If no specific person fits, use "you" and put the reader in the seat.

## Agentless passive

| Pattern | Fix |
|---|---|
| "Mistakes were made." | Name who made them |
| "It is believed that" | Name who believes it |
| "The decision was reached" | Name who decided |
| "The feature was deprioritised" | Name who deprioritised it |

Passive is correct when the actor is unknown, irrelevant or deliberately withheld, and in method sections where convention requires it. Elsewhere find the actor.

## Narrator from a distance

Floating above the scene instead of standing in it.

| Pattern | Fix |
|---|---|
| "Nobody designed this." | Put the reader in the room |
| "People tend to" | "You" |
| "This is why" | Say the thing |
| "In many organisations" | Name one |

"You don't sit down one morning and decide to build a distributed monolith" beats "nobody designs a distributed monolith".

## Rule of three

Machines default to triads: three adjectives, three examples, three clauses. One triad per piece at most. Two items read as a choice, four as a list, three as a cadence.

Watch also the colon into a triple: "The result is predictable: slower, costlier, harder to change."

## Rhythm and uniformity

| Pattern | Fix |
|---|---|
| Every paragraph the same length | Break one, merge two |
| Every sentence 15 to 20 words | Write one of six words and one of thirty |
| Every paragraph ends on a punchy line | End on an ordinary clause sometimes |
| Every paragraph opens the same way | Vary the opening |
| Same subject starting four sentences in a row | Restructure |

Paragraph-reshuffle test: if paragraphs can be reordered without the reader noticing, there is no argument, only a list. Add the connective tissue or cut to what is load-bearing.

## Sentence openers

| Pattern | Fix |
|---|---|
| A run of What / When / Which / Why openers | Lead with the subject |
| "So," at the head of a paragraph | Cut |
| "Look," / "Listen," | Cut |
| "Moreover", "Furthermore", "Additionally" | Cut, or "also" |

"What makes this hard is the retry budget" becomes "the retry budget makes this hard".

## Copula avoidance

Inflated substitutes for "is".

| Avoid | Use |
|---|---|
| serves as | is |
| functions as | is |
| stands as a testament to | shows |
| boasts, features (of a product) | has |
| represents | is |

## Formatting tells

- **Bold overuse.** One bolded phrase per section at most. If a phrase matters enough to bold, restructure the sentence to open with it.
- **Emoji in headings.** Remove. A social post may carry one at the end of a line.
- **Title Case Headings.** Sentence case, unless the house style says otherwise.
- **Inline-header lists.** `- **Term**: sentence` repeated for eight items is an outline, not prose.
- **Bullet lists of bare noun phrases.** Five or more short adjective-noun items with no verbs carry no information. Write the sentence.
- **List-label periods.** "1. Setup." with a full stop on a fragment.
- **Numbered list inflation.** Numbering three unordered items implies a sequence that does not exist.
- **Excessive structure.** Headings every two paragraphs, a table for two values, a summary of a 300-word text.
- **Wall of text.** The opposite failure: 400 words with no break.

## Content tests

**Treadmill test.** Read a paragraph and ask what a reader now knows that they did not before. If the answer is nothing, cut the paragraph. Restating the premise in new words is the most common form of AI-generated length.

**Specificity test.** Count the concrete nouns: names, numbers, dates, versions, file paths. A page with none is either abstract by design or empty.

**When to rewrite from scratch.** Patch when the tells are local: a phrase here, a triad there. Rewrite when the structure is the problem, when every paragraph is the same shape, or when the piece says nothing and the fix is to find out what it should say.
