# -*- coding: utf-8 -*-
"""Замер: что делает англоязычный набор правил с корректной русской и немецкой прозой.

Корпус — публичные статьи трёхъязычного сайта bobkov.cc: один и тот же текст
в трёх версиях, переведённый живым человеком, а не машиной. Это даёт редкую
возможность сравнить не разные тексты, а один текст в трёх языках.

    python study/measure.py <каталог-с-корпусом> > study/data.json

Каталог должен содержать файлы вида <имя>.<ru|en|de>.md. Скрипт прогоняет
check.js дважды: с правильным языком и принудительно как английский, и
записывает находки обоих прогонов.
"""
import json
import os
import subprocess
import sys
import glob

CHECK = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "check.js")


def scan(path, lang, context="technical"):
    result = subprocess.run(
        ["node", CHECK, "--lang", lang, "--context", context, "--json", path],
        capture_output=True, text=True, encoding="utf-8")
    try:
        return json.loads(result.stdout)[0]
    except Exception:
        return None


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        raise SystemExit(2)

    corpus = sys.argv[1]
    rows = []

    for path in sorted(glob.glob(os.path.join(corpus, "*.md"))):
        name = os.path.basename(path)
        parts = name.rsplit(".", 2)
        if len(parts) != 3:
            continue
        stem, lang, _ = parts
        if lang not in ("ru", "en", "de"):
            continue

        native = scan(path, lang)
        as_english = scan(path, "en")
        if not native or not as_english:
            continue

        def by_rule(report):
            counts = {}
            for finding in report["findings"]:
                if finding["level"] in ("P0", "P1"):
                    counts[finding["rule"]] = counts.get(finding["rule"], 0) + 1
            return counts

        rows.append({
            "article": stem,
            "lang": lang,
            "words": native["words"],
            "native_findings": by_rule(native),
            "english_ruleset_findings": by_rule(as_english),
            "score": native["score"]["total"],
        })

    print(json.dumps({"corpus": os.path.basename(corpus.rstrip("/\\")), "rows": rows},
                     ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
