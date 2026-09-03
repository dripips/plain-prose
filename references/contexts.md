# Contexts

A LinkedIn post and an API reference do not get the same rules. Pick a profile, or infer one.

## Profiles

**social.** Short-form posts. Fragments and visual formatting are the register.
**blog.** The default. Long-form prose, every rule at full strength.
**technical.** Posts and articles with code, APIs, architecture. Technical vocabulary gets a pass.
**pitch.** Investor mail, sponsor requests, sales. High-trust audience, promotional language is the biggest risk.
**docs.** Documentation, READMEs, guides, reference. Clarity outranks voice.
**casual.** Chat, internal notes, issue comments, quick replies. Only the worst offenders.

## Inferring the profile

| Signal | Profile |
|---|---|
| Under 300 words with hashtags or mentions | social |
| Code blocks, API references, architecture | technical |
| Salutation plus fundraising or sales language | pitch |
| Step-by-step instructions, parameter tables, README shape | docs |
| Nothing decisive | blog |

Say which profile you picked and why. The writer can override.

## Tolerance matrix

Rules missing from the table apply at full strength everywhere.

| Rule | social | blog | technical | pitch | docs | casual |
|---|---|---|---|---|---|---|
| Em dashes | 2 per post | strict | strict | strict | relaxed | skip |
| Bold overuse | hooks allowed | strict | strict | strict | relaxed | skip |
| Emoji in headings | 1 to 2 at line end | strict | strict | strict | skip | skip |
| Excessive bullets | skip | strict | relaxed | strict | skip | skip |
| Hedging | strict | strict | relaxed | strict | relaxed | skip |
| Tier 1A vocabulary | strict | strict | partial | strict | relaxed | P0 only |
| Tier 1B clarity | relaxed | strict | strict | strict | strict | skip |
| Promotional language | some sell expected | strict | strict | extra strict | strict | skip |
| Significance inflation | strict | strict | strict | extra strict | relaxed | skip |
| Copula avoidance | skip | strict | relaxed | strict | skip | skip |
| Uniform paragraphs | skip | strict | strict | strict | relaxed | skip |
| Rule of three | relaxed | strict | relaxed | strict | relaxed | skip |
| Rhetorical questions | 1 as hook | strict | strict | strict | strict | skip |
| Transition words | skip | strict | strict | strict | relaxed | skip |
| Generic conclusions | skip | strict | strict | extra strict | skip | skip |
| Fragments | skip | strict | relaxed | strict | skip | skip |
| Bare noun-phrase bullets | strict | strict | relaxed | strict | relaxed | skip |
| Hashtag stuffing | strict | strict | strict | extra strict | skip | skip |
| Numbered list inflation | relaxed | strict | relaxed | strict | skip | skip |

**extra strict** means flag borderline instances. In a pitch, one "thriving ecosystem" costs the whole message.

**skip** means do not audit this category here. The rule does not apply, or the edit is not worth making.

## Technical vocabulary exemptions

These carry real meaning in technical writing and should not be flagged there: `robust`, `comprehensive`, `seamless`, `ecosystem`, `leverage` (of actual leverage or an API), `facilitate`, `streamline`, `framework`, `paradigm` (of an actual programming paradigm). <!-- prose-ignore -->

Still flagged in technical writing: `delve`, `tapestry`, `beacon`, `embark`, `testament to`, `game-changer`, `harness`, `unlock`, `supercharge`.

## Register-scoped weak signals

These mean something only in the right context, and never on their own.

**Curly quotes and apostrophes.** Word, Google Docs, macOS and iOS all curl quotes automatically, so most human prose contains them. They are worth noting only in plain-text contexts where nothing auto-curls: commit messages, code comments, plaintext drafts. Never flag a curly apostrophe alone.

**Immaculate typography in a casual register.** Perfect spacing, punctuation and capitalisation in a place where people type fast, such as an issue comment or a DM, is corroborating evidence at best. A careful person types a clean comment.

The inverse matters more. When editing someone's casual text, preserve their typos, contractions and capitalisation. Smoothing the rough edges erases the fingerprint that marks the text as theirs.
