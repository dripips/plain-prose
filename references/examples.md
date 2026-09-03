# Before and after

## English

### 1. Throat-clearing plus binary contrast

**Before:** Here's the thing: building products is hard. Not because the technology is complex. Because people are complex. Let that sink in. <!-- prose-ignore -->

**After:** Building products is hard. The technology is manageable. People are not.

Cut the opener, the split negation and the emphasis crutch.

### 2. Filler plus permission-granting

**Before:** It turns out that most teams struggle with alignment. The uncomfortable truth is that nobody wants to admit they're confused. And that's okay. <!-- prose-ignore -->

**After:** Teams struggle with alignment because nobody admits confusion.

### 3. Jargon stack

**Before:** In today's fast-paced landscape, we need to lean into discomfort and navigate uncertainty with clarity. This matters because your competition isn't waiting. <!-- prose-ignore -->

**After:** Move faster. Your competition is.

### 4. Dramatic fragmentation

**Before:** Speed. Quality. Cost. You can only pick two. That's it. That's the tradeoff. <!-- prose-ignore -->

**After:** You can pick two of speed, quality and cost.

The fix is one sentence, not a shorter fragment. An earlier version of this example rewrote it with an em dash, which broke the rule the example was demonstrating.

### 5. False agency

**Before:** When feedback loops tighten, a complaint becomes a fix within the same sprint, and the culture shifts toward ownership. <!-- prose-ignore -->

**After:** When you read support tickets on Monday, you ship the fix by Thursday. After a few months the team stops waiting to be asked.

Name who acts. Keep the claim the source made and add no new fact.

### 6. Vague declarative with no specific behind it

**Before:** The implications for the deployment pipeline are significant. <!-- prose-ignore -->

**After (source had the detail):** The deployment pipeline now runs migrations before the health check, so a failed migration stops the rollout.

**After (source had no detail):** [flagged] "The implications are significant" names nothing. The source does not say what changes in the pipeline. Ask the author, or cut the sentence.

The second case is the important one. Inventing the detail would have read better and been false.

## Русский

### 7. Канцелярит и раздутая значимость

**Было:** В современном мире автоматизация складского учёта играет ключевую роль. Осуществление внедрения данной системы позволяет вывести управление запасами на принципиально новый уровень. <!-- prose-ignore -->

**Стало:** Crate считает себестоимость по партиям. Когда партия уходит со склада, видно, из какой поставки списался каждый десяток и по какой цене.

Убраны открывающий штамп, отглагольные существительные и «новый уровень». Конкретика взята из источника.

### 8. Калька и бинарный контраст

**Было:** Это не просто мощный инструмент, это целая экосистема для бесшовной работы с данными. <!-- prose-ignore -->

**Стало:** Инструмент читает выгрузки CRM и сводит дубли в одну карточку.

### 9. Связки и пассив

**Было:** Таким образом, было принято решение о переносе проверки. Более того, при этом рекомендуется использовать очередь. <!-- prose-ignore -->

**Стало:** Мы перенесли проверку в очередь: она держит пик в 400 запросов в секунду, а синхронный вызов держал 60.

Названы те, кто решил. Числа взяты из источника, а не придуманы.

### 10. Ложный друг: тире оставляем

**Было:** Kin является инструментом, который предназначен для поиска дубликатов. <!-- prose-ignore -->

**Стало:** Kin — поиск дубликатов в клиентской базе.

Тире здесь обязательно по правилам русского языка. Правило «ноль длинных тире» из английского слоя тут не применяется.

## Deutsch

### 11. Substantivstil

**Vorher:** Die Durchführung der Implementierung dieser Lösung ermöglicht eine deutliche Verbesserung der Optimierung der Lagerprozesse. <!-- prose-ignore -->

**Nachher:** Die Lösung bucht Wareneingänge nach Charge. Beim Versand sieht man, aus welcher Lieferung jedes Stück stammt.

### 12. Floskel und Anglizismus

**Vorher:** In der heutigen schnelllebigen digitalen Landschaft ist eine nahtlose Integration von entscheidender Bedeutung. <!-- prose-ignore -->

**Nachher:** Die Integration läuft über eine REST-Schnittstelle und braucht keinen Agenten auf dem Server.

### 13. Falscher Freund: Gedankenstrich bleibt

**Vorher:** Der Auftrag wird geprüft und anschließend, sofern alle Positionen vorliegen, freigegeben.

**Nachher:** Der Auftrag wird geprüft und dann freigegeben – vorausgesetzt, alle Positionen liegen vor.

Der Gedankenstrich mit Leerzeichen ist korrekte deutsche Interpunktion. Die englische Null-Dash-Regel gilt hier nicht.

## Non-edits

Cases where the right answer is to leave the text alone.

**A quoted tell.** The source quotes someone writing "we need to leverage our robust ecosystem". Flag it, keep the quote intact. Rewriting a quotation falsifies it.

**A tell inside a table cell.** Report it. A table exists to carry data, and a wording fix is not worth risking that.

**A technical term that looks like jargon.** "The retry is idempotent" survives. "Idempotent" is the precise word.

**Someone's rough casual message.** "ok so the migration blew up again, im rolling back" stays as written. Cleaning it up erases the author.

**Prose that is already good.** Say so and make only the cuts that are needed.
