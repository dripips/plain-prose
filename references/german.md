# Deutsch

Machine tells specific to German prose. The English rules in `phrases.md` and `structures.md` still apply. This file adds what they miss, plus the German conventions that look like tells to an English-trained eye and are not.

Deutsche KI-Texte entstehen meist über das Englische. Anglizismen und Lehnübersetzungen sind darum ein ebenso starkes Signal wie die Floskeln.

## Einstiegsfloskeln

Streichen und mit der Sache beginnen.

- „In der heutigen schnelllebigen Welt“
- „In der heutigen digitalen Landschaft“
- „In Zeiten von“, „Gerade heute, wo“
- „Es ist wichtig zu beachten, dass“, „Es sei angemerkt“
- „Lassen Sie uns eintauchen“, „Tauchen wir ein“
- „In diesem Artikel werfen wir einen Blick auf“
- „Nicht zuletzt deshalb“

## Substantivstil

Das deutsche Gegenstück zum Kanzleiton: Nominalisierungen statt Verben, Genitivketten.

| Ersetzen | Durch |
|---|---|
| die Durchführung der Implementierung | implementieren |
| zur Verbesserung der Optimierung | verbessern |
| die Bereitstellung von | bereitstellen |
| unter Verwendung von | mit |
| im Rahmen von | bei, in |
| zum Zwecke der | um zu |
| eine Erhöhung der Effizienz bewirken | schneller machen |
| Inanspruchnahme | nutzen |

Drei Genitive hintereinander („zur Steigerung der Qualität der Betreuung der Kunden“) lösen sich immer in ein Verb auf.

## Aufgeblasene Bedeutung

- „spielt eine entscheidende Rolle“
- „von entscheidender Bedeutung“
- „ein wesentlicher Bestandteil“
- „revolutioniert die Art und Weise, wie“
- „eröffnet neue Möglichkeiten“
- „hebt X auf ein neues Niveau“
- „bahnbrechend“, „wegweisend“, „zukunftsweisend“

Jeweils durch das ersetzen, was die Sache konkret tut. Fehlt das Konkrete in der Quelle: als Lücke markieren, nichts erfinden.

## Lehnübersetzungen

| Lehnwort | Aus | Besser |
|---|---|---|
| nahtlos | seamless | ohne Bruch, reibungslos, oder streichen |
| robust | robust | belastbar, stabil, oder die Grenze nennen |
| ganzheitlich | holistic | vollständig, oder streichen |
| Landschaft (Markt-, Technologie-) | landscape | Feld, Branche, Markt |
| Ökosystem (nicht biologisch) | ecosystem | Umfeld, Werkzeugkette |
| Reise (für einen Prozess) | journey | Weg, Ablauf |
| Mehrwert schaffen | add value | sagen, was besser wird |
| Herausforderungen meistern | tackle challenges | das Problem benennen |
| Insights, Learnings, Mindset, Journey | direkt | Erkenntnisse, Lehren, Haltung, Weg |
| Game-Changer | game-changer | benennen, was sich ändert |

## Konstruktionen

**„Nicht nur X, sondern auch Y“.** Eine korrekte deutsche Konstruktion, deshalb nach Häufigkeit urteilen: zweimal auf einer Seite ist Stil, in jedem Absatz ist ein Signal.

**„Es ist nicht X, es ist Y“.** Die direkte Übersetzung des englischen Musters, im Deutschen noch auffälliger. Die positive Aussage direkt schreiben.

**Rhetorische Frage mit sofortiger Antwort.** „Was bedeutet das konkret? Es bedeutet, dass ...“ Frage streichen.

**Dreiergruppen.** „schnell, sicher und einfach“. Zwei Glieder oder vier.

**Passiv im Übermaß.** „wird durchgeführt“, „es wird empfohlen“, „es wurde entschieden“. Den Handelnden nennen.

**Konnektorenketten.** „darüber hinaus“, „zudem“, „ferner“, „des Weiteren“, „nicht zuletzt“ gestapelt. Höchstens einer pro Absatz.

## Schlussfloskeln

- „Zusammenfassend lässt sich sagen“
- „Abschließend lässt sich festhalten“
- „Die Zukunft bleibt spannend“
- „Es bleibt abzuwarten“
- „Ich hoffe, dieser Artikel war hilfreich“
- „Wie sehen Sie das? Schreiben Sie es in die Kommentare“

Ein Pflicht-„Fazit:“ unter jedem Text ist selbst ein Muster. Nur setzen, wenn der Text wirklich eines braucht.

## Falsche Freunde

Das sind keine Maschinensignale. Unverändert lassen.

- **Der Gedankenstrich –** mit Leerzeichen ist normale deutsche Interpunktion, kein Em-Dash-Verstoß. Gewertet wird die Gewohnheit, nicht das Zeichen: Einschübe in jedem Absatz sind ein Muster.
- **Anführungszeichen „ “** und schweizerisch « ». Korrekte Typografie.
- **Lange Sätze und Schachtelsätze.** In deutscher Fach- und Amtssprache Normalfall.
- **Komposita.** „Verbrauchereigentumswohnung“ ist Deutsch, nicht Maschine. Auffällig sind nur frei erfundene Komposita ohne Beleg.
- **Siezen, Amtsdeutsch im Behördentext, Gendersternchen.** Register- oder Stilentscheidung des Autors.

## Prüfung

`node check.js --lang de <Datei>` zählt die Floskeln aus dieser Datei, Absatzlängen und Dreiergruppen. Gedankenstriche und deutsche Anführungszeichen werden im deutschen Modus nicht bestraft.
