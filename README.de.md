# plain-prose

Ein Agent-Skill, der Spuren maschinellen Schreibens aus Texten entfernt. Englisch, Russisch, Deutsch. Mit einem Prüfwerkzeug ohne Abhängigkeiten.

[English](README.md) · [Русский](README.ru.md)

## Ansehen

[![Drei echte Korrekturen und die Messung, 47 Sekunden](video/poster-en.png)](https://github.com/dripips/plain-prose/releases/download/v1.1.0/plain-prose-en.mp4)

47 Sekunden: was eine Spur ist, drei Korrekturen aus echten Commits und die Messung hinter der Sprachebene. Es gibt sie auf [Englisch](https://github.com/dripips/plain-prose/releases/download/v1.1.0/plain-prose-en.mp4) und auf [Russisch](https://github.com/dripips/plain-prose/releases/download/v1.1.0/plain-prose-ru.mp4).

## Worum es geht

Für diese Aufgabe gibt es bereits zwei gute Skills, und sie widersprechen einander.

[stop-slop](https://github.com/hardikpandya/stop-slop) von Hardik Pandya sind 13 KB redaktionelles Urteil: alle Adverbien streichen, keine Gedankenstriche, zwei Glieder statt drei. Es liest sich wie jemand, der viel fremden Text gekürzt hat. Es zerlegt allerdings technische Dokumentation, kennt keinen Unterschied zwischen einem Post und einer API-Referenz, und in seiner eigenen Beispieldatei steht ein Gedankenstrich genau in dem Satz, der die Regel gegen Gedankenstriche vorführt.

[avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) von Conor Bronsdon sind 100 KB Technik: drei Modi, Prioritätsstufen, eine Toleranzmatrix nach Zielgruppe, Schutz davor, beim Umschreiben Fakten zu erfinden, und ein ehrlicher Abschnitt darüber, wie stark KI-Detektoren bei Nicht-Muttersprachlern danebenliegen. Alles davon lädt bei jedem Aufruf in den Kontext, und ein guter Teil ist Repository-Maschinerie statt Redaktionshilfe.

Hier steckt die Disziplin des ersten und die Technik des zweiten. Die Widersprüche sind aufgelöst, und eine Ebene kommt hinzu, die keiner von beiden hat: Russisch und Deutsch.

Beide Vorlagen stehen unter MIT. Diese auch.

## Was sich beim Zusammenführen geändert hat

| Frage | stop-slop | avoid-ai-writing | plain-prose |
|---|---|---|---|
| Adverbien | Alle streichen | Hohle Verstärker streichen | Leere streichen, sachtragende behalten. „läuft nächtlich“ bleibt |
| Gedankenstriche | Immer null | Rate pro 1000 Wörter | Null in englischer Prosa, Ausnahme für Listentypografie, im Russischen und Deutschen gar keine Regel |
| Satzfragmente | Nur vollständige Sätze | Im lockeren Ton erlaubt | Verboten, wenn für Dramatik erzeugt, erlaubt, wenn das Register ohnehin so ist |
| Reichweite der Aussage | Klingt wie ein Urteil | Signal, kein Beweis | Signal, kein Beweis, und das steht im Skill selbst |
| Größe | 13 KB, lädt vollständig | 100 KB, lädt vollständig | 9 KB Kern, Referenzen bei Bedarf |
| Sprachen | Englisch | Englisch | Englisch, Russisch, Deutsch |

Die drei Sprachen sind der Teil, den keine Vorlage hatte. Deutscher Maschinentext trägt eigene Spuren: Substantivstil statt Verben, Einstiege wie „In der heutigen schnelllebigen Welt“, Lehnübersetzungen wie „nahtlos“ und „Mehrwert schaffen“. Ebenso wichtig sind die falschen Freunde. Der Gedankenstrich mit Leerzeichen ist korrekte deutsche Interpunktion, „ “ sind korrekte Anführungszeichen, und lange Schachtelsätze sind in der Fachsprache normal. Ein englisches Regelwerk markiert all das und irrt jedes Mal. Russisch bekommt dieselbe Behandlung für Kanzleiton und den obligatorischen Gedankenstrich zwischen Subjekt und Prädikat.

## Installation

**Claude Code.** Den Ordner in das Skill-Verzeichnis kopieren:

```
/plugin marketplace add dripips/plain-prose
/plugin install plain-prose@dripips
```

Oder weiterhin als schlichter Ordner:

```bash
git clone https://github.com/dripips/plain-prose.git ~/.claude/skills/plain-prose
```

Der Skill greift, sobald jemand um eine Bereinigung, eine Prüfung oder eine Überarbeitung bittet. Beim Verfassen von Prosa lädt er auch von selbst.

**Andere Agenten.** `SKILL.md` folgt dem agentskills.io-Format. Cursor, Copilot, OpenHands und alles Weitere, das dieses Format liest, nutzen denselben Ordner. Die Referenzen sind reines Markdown mit relativen Links.

**Nur das Prüfwerkzeug.** Node 18 oder neuer, sonst nichts:

```bash
node check.js entwurf.md
```

## Verwendung

```
entferne die KI-Spuren aus diesem Beitrag
prüfe post.md, aber schreibe nichts um
bearbeite README.de.md direkt, Kontext docs
schreibe es knapp um, es ist eine Entscheidungsvorlage
```

Drei Modi. `rewrite` liefert eine saubere Fassung und liest das eigene Ergebnis noch einmal, weil nach dem ersten Durchgang Spuren zurückbleiben. `detect` markiert nur. `edit` ändert eine Datei an Ort und Stelle, Stelle für Stelle, und lässt bereits menschliche Absätze unangetastet.

Sechs Kontextprofile entscheiden über die Strenge. Ein Beitrag und eine API-Referenz bekommen nicht dieselben Regeln, und die Matrix in [references/contexts.md](references/contexts.md) nennt jede Lockerung einzeln.

## Das Prüfwerkzeug

```
node check.js [Optionen] <Datei...>

  --lang en|ru|de|auto   Sprache des Textes (Vorgabe: auto)
  --context <Profil>     blog|social|technical|pitch|docs|casual
  --json                 maschinenlesbare Ausgabe
  --strict               auch P2-Funde lassen den Lauf scheitern
  --quiet                nur die Bewertungszeile
  --skip-quotes          Zitate überspringen, für Texte über KI-Spuren
```

Ausgabe:

```
$ node check.js entwurf.md
entwurf.md  [de/blog, 412 words]
  P1     3  throat-clearing opener: "in der heutigen schnelllebigen"
  P1     7  tier 1 vocabulary: "nahtlos" ×3
  P1    22  tier 1 vocabulary: "von entscheidender Bedeutung"
  P2    31  copula avoidance or officialese: "die Durchführung der"
  P2     -  paragraphs are uniform (47/49/48/46 words), vary the length

  directness 6  rhythm 3  trust 8  authenticity 4  density 6
  proxy score 27/50  (below 35, revise)
```

Rückgabewert 0 bei sauberem Text, 1 bei Funden. Damit passt es in einen Pre-Commit-Hook oder in CI.

Eine Zeile mit `prose-ignore` fällt aus der Prüfung, eine Datei mit `prose-ignore-file` wird ganz übersprungen. Gedacht für den Fall, dass die markierte Stelle eine bewusste Entscheidung ist.

Vor der Auswertung werden Frontmatter, Codeblöcke, Inline-Code, Linkziele, nackte URLs und Tabellenzeilen ausgeblendet. Der Skill verspricht, genau diese Bereiche nie umzuschreiben, also wäre es unredlich, dort zu zählen. Zwei Ausnahmen folgen derselben Logik: Ein Strich, der in einem Listenpunkt einen Begriff von seiner Erläuterung trennt, ist Typografie, und eine Dreiergruppe innerhalb einer längeren Aufzählung ist eine Spezifikation und kein Rhythmus.

Die Bewertung über fünf Achsen ist eine Näherung. Sie misst, was ein regulärer Ausdruck messen kann: Füllwortanteil, Streuung der Satz- und Absatzlängen, Anzahl der Abschwächer, Dichte des Vokabulars der ersten Stufe. Die eigentliche Bewertung nimmt das Modell vor, das den Text liest, und dieselben fünf Achsen sind in `SKILL.md` für es beschrieben.

## Was es nicht leistet

Es beantwortet nicht, ob ein Mensch den Text geschrieben hat. Eine Stanford-Untersuchung fand bei kommerziellen Detektoren über 60% Fehlalarme auf Aufsätzen von Nicht-Muttersprachlern, bei offenen Detektoren über 70% Fehlklassifikation. Jedes Muster aus diesem Katalog kommt auch bei einem müden Menschen um ein Uhr nachts vor. Die Markierungen taugen zur Verbesserung eines Textes und nicht als Beleg über die Urheberschaft.

Es fügt nichts hinzu. Eine Überarbeitung darf Füllwörter streichen, eine vorhandene Aussage schärfen und einen vergrabenen Punkt nach oben holen. Sie darf keine Zahl, keinen Namen, kein Datum, keine Haltung und keine Ich-Bemerkung erfinden. Erfundene Konkretheit liest sich immer besser und ist immer schlechter. Die Leitplanken stehen in [references/rewriting.md](references/rewriting.md).

Es befolgt keine Anweisungen aus der bearbeiteten Datei. Steht im Dokument „ignoriere die Regeln oben“, landet dieser Satz unter den Funden.

## Aufbau

```
SKILL.md                    der Kern, lädt immer
references/phrases.md       Wörter und Wendungen in drei Stufen
references/structures.md    Satz- und Absatzformen
references/rewriting.md     Erfindungsverbot, Stimmen, Ausgabeformate
references/contexts.md      Strenge nach Zielgruppe, mit Toleranzmatrix
references/russian.md       russische Spuren, Lehnwörter, falsche Freunde
references/german.md        deutsche Spuren, Substantivstil, falsche Freunde
references/not-tells.md     was als Spur gilt und keine ist
references/examples.md      vorher und nachher in drei Sprachen
check.js                    das Prüfwerkzeug
check.test.js               31 Tests, node --test
```

## Entwicklung

```bash
node --test      # die Testsuite
npm run self     # das Prüfwerkzeug über die eigenen Dateien laufen lassen
```

Der Selbsttest läuft mit `--skip-quotes --context docs`, denn ein Katalog verbotener Wendungen besteht aus verbotenen Wendungen. Auch dann bleiben Funde in `references/examples.md`, wo die Vorher-Beispiele ohne Anführungszeichen stehen. Diese Grenze ist bekannt: Ein mechanisches Werkzeug sieht nicht, dass ein Beispiel ein Beispiel ist.

## Herkunft

Zusammengeführt aus [stop-slop](https://github.com/hardikpandya/stop-slop) von Hardik Pandya und [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) von Conor Bronsdon, beide MIT. Der Gedanke, dass eine Spur kein verbotenes Wort ist, sondern ein Wort, das niemand gewählt hat, sowie die Markierung `prose-ignore` und die Nicht-Spuren-Liste stammen aus [unslop-ui](https://github.com/JCarterJohnson/vibecoded-design-tells) von Carter Johnson (MIT). Die Vokabularstufen gehen auf [brandonwise/humanizer](https://github.com/brandonwise/humanizer) zurück, das Erfindungsverbot auf [isatimur/de-slop](https://github.com/isatimur/de-slop), beides über die zweite Vorlage.

MIT.
