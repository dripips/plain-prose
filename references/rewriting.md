# Rewriting

Removal is half the job. A text with every flag cleared and no stance left reads as machine output in a quieter register.

## Never inject

None of the following may be added to a text that did not already have it. Each is a failed rewrite even when the result scores clean.

- **Fake first person.** "I've seen this a hundred times", "in my experience", "I'll admit". If the source has no `I`, the rewrite has no `I`.
- **Manufactured stakes.** "In a world where", "now more than ever", "the stakes have never been higher".
- **Forced contrarianism.** "Everyone says X, but they're wrong." Inventing a foil invents a claim.
- **Performed candor.** "Let's be honest", "real talk", "here's the thing".
- **Em dash theatrics.** Dashes staged for drama the content has not earned. Never add one during a rewrite.
- **Staccato conversion.** Chopping working sentences into fragments to fake rhythm. Vary sentences by varying sentences.
- **Invented specifics.** A number, name, date, tool or mechanism the source never contained. This is the most tempting fix, because a concrete detail always reads better. A fabricated specific is worse than the vague phrase it replaced. Flag the gap and leave it.

**The test.** For every edit, ask whether the information came from the source. Subtracting and sharpening are in scope. Adding stance, personality or fact is not.

This is a constraint on the editor, not a pattern in the text. A first-person aside is fine when the author wrote it and a failure when the tool inserted it. The difference is provenance, which no detector can see.

## Putting voice back

Where the genre carries a voice, such as essays, posts and personal writing, restore it on purpose: a reaction the author had, a preference they stated, an aside they made, one thought they left unresolved. Draw all of it from the source.

For encyclopedic, legal, reference and API text, neutral and plain is the correct human voice. Do not inject personality there.

If the original is already strong, say so and make only the necessary cuts. Over-editing is its own failure mode.

## Voice profiles

Optional. If the writer names none, infer the register from the text and impose nothing. Every target below stays inside the never-inject rules: a voice profile can surface what the source has, never manufacture what it lacks.

**casual.** Contractions throughout. Short sentences, around fourteen words on average. Fragments allowed. Near-zero jargon. Keep warm hedges ("I think"), cut corporate ones ("it's worth noting"). For blogs, social, community writing.

**professional.** Active voice. Varied sentence length. One concrete claim per paragraph where the source provides one, never "experts say". Low tolerance for hedging. For business writing and pitches.

**technical.** Plain copulatives over inflated substitutes. One idea per sentence. Imperative for instructions. Jargon is fine, defined on first use. Tables and lists only where the content is list-shaped. For docs and technical posts.

**warm.** Address the reader directly where the source already does. Cut intensifiers in favour of stronger verbs. No performed empathy ("I completely understand how you feel"). Medium sentences, fifteen to twenty words. For onboarding, mentoring, thank-yous.

**blunt.** Lead with the claim. No windup. No padding to reach a triad. Near-zero hedging. Short declaratives with an occasional long sentence for contrast. For decision memos and hard feedback.

**Match a sample.** If the writer supplies their own writing, analyse its sentence-length pattern, contraction rate, paragraph openings and recurring word choices, then match those instead of a named profile. Do not upgrade their vocabulary. If they write "stuff", keep "stuff".

**Composition with context.** Voice sets the target, context sets how hard to enforce it. Where they disagree, take the stricter reading: a warm voice on API docs still gets no decorative tables.

## Output

### rewrite mode

**1. Issues found.** Every tell, with the offending text quoted, grouped P0 / P1 / P2.

**2. Rewritten version.** The full text. Preserve structure, intent and every technical detail. Change only what the rules require.

**3. What changed.** The meaningful edits, not a word-level diff.

**4. Second pass.** Re-read section 2 as if someone else wrote it. Machine tells survive first rewrites: recycled transitions, a new triad, filler that replaced other filler. Fix them, return the corrected text here, and say plainly that this version is the deliverable. A reader skimming for the finished text will otherwise copy section 2 and ship the tells this pass just removed.

Stop after the second pass. A third rewrite costs a full regeneration and rarely finds anything.

### detect mode

**1. Issues found.** Grouped by priority, each with the quoted text. Keep tier 1B clarity edits visually separate from 1A markers and label which is which.

**2. Assessment.** For each flag, say whether it is a clear problem or a judgement call. Some machine-associated patterns are good writing: uniform paragraph length is a defect, a well-placed "however" is not. If the text is clean, say so.

### edit mode

**1. Edits made.** Each change with its location and the before and after. Only the spans you touched.

**2. Verification.** Confirm you re-read the file and the flags are resolved. Name what you left alone on purpose, and why.

Run `node check.js <file>` before and after. The count should fall and the preserved regions should be untouched.
