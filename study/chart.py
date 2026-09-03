# -*- coding: utf-8 -*-
"""Графики для замера. SVG рисуется руками: у проекта нет зависимостей и здесь тоже.

    python study/chart.py

Кладёт study/dash-rate.svg и study/false-positives.svg.
Числа берутся из study/data.json и study/dashes.json, ничего не зашито.
"""
import io
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# Палитра: тёплое — то, что мерили, холодное — порог и правильный прогон.
INK = "#e7e7ea"
MUTED = "#8b8b96"
GRID = "#2a2a33"
BG = "#12121a"
WARM = "#f59e0b"
COOL = "#3b82f6"
BAD = "#ef4444"


def bars(title, subtitle, rows, unit, limit=None, limit_label=None, width=760):
    """rows: [(подпись, значение, цвет)]"""
    pad_l, pad_r, pad_t, pad_b = 190, 70, 74, 46
    bar_h, gap = 34, 16
    height = pad_t + len(rows) * (bar_h + gap) + pad_b
    plot_w = width - pad_l - pad_r
    top = max([r[1] for r in rows] + ([limit] if limit else []))
    top = top * 1.15 or 1

    out = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" '
        'viewBox="0 0 %d %d" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif">'
        % (width, height, width, height),
        '<rect width="%d" height="%d" fill="%s"/>' % (width, height, BG),
        '<text x="%d" y="34" fill="%s" font-size="19" font-weight="700">%s</text>' % (pad_l - 150, INK, title),
        '<text x="%d" y="56" fill="%s" font-size="13">%s</text>' % (pad_l - 150, MUTED, subtitle),
    ]

    for i, (label, value, colour) in enumerate(rows):
        y = pad_t + i * (bar_h + gap)
        w = max(2, int(plot_w * value / top))
        out.append('<text x="%d" y="%d" fill="%s" font-size="13" text-anchor="end">%s</text>'
                   % (pad_l - 14, y + bar_h * 0.66, INK, label))
        out.append('<rect x="%d" y="%d" width="%d" height="%d" rx="5" fill="%s"/>'
                   % (pad_l, y, w, bar_h, colour))
        out.append('<text x="%d" y="%d" fill="%s" font-size="13" font-weight="600" '
                   'font-family="ui-monospace, monospace">%s</text>'
                   % (pad_l + w + 10, y + bar_h * 0.66, INK,
                      ("%.1f" % value).rstrip("0").rstrip(".") + unit))

    if limit:
        x = pad_l + int(plot_w * limit / top)
        out.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="%s" stroke-width="2" '
                   'stroke-dasharray="5 4"/>' % (x, pad_t - 12, x, height - pad_b + 6, COOL))
        out.append('<text x="%d" y="%d" fill="%s" font-size="12">%s</text>'
                   % (x + 7, height - pad_b + 22, COOL, limit_label))

    out.append("</svg>")
    return "\n".join(out)


def main():
    dashes = json.load(io.open(os.path.join(HERE, "dashes.json"), encoding="utf-8"))
    data = json.load(io.open(os.path.join(HERE, "data.json"), encoding="utf-8"))
    before = json.load(io.open(os.path.join(HERE, "english-before.json"), encoding="utf-8"))

    def rate(rows):
        w = sum(r["words"] for r in rows)
        d = sum(r["dashes"] for r in rows)
        return 1000.0 * d / w if w else 0

    chart1 = bars(
        "Длинное тире: один и тот же текст на трёх языках",
        "14 статей сайта bobkov.cc, переведённых человеком. Число на 1000 слов прозы",
        [("русский оригинал", rate(dashes["ru"]), WARM),
         ("немецкий перевод", rate(dashes["de"]), WARM),
         ("английский, до чистки", rate(before["rows"]), BAD),
         ("английский, после", rate(dashes["en"]), COOL)],
        "", limit=1, limit_label="порог англоязычного правила: 1")

    io.open(os.path.join(HERE, "dash-rate.svg"), "w", encoding="utf-8", newline="\n").write(chart1)

    rows = data["rows"]
    stats = {}
    for row in rows:
        s = stats.setdefault(row["lang"], {"native": 0, "english": 0, "files": 0})
        s["native"] += sum(row["native_findings"].values())
        s["english"] += sum(row["english_ruleset_findings"].values())
        s["files"] += 1

    chart2 = bars(
        "Что англоязычный набор правил делает с чужим языком",
        "Находки P0 и P1 на тех же 42 файлах: со своим языком против принудительно английского",
        [("русский, свой язык", stats["ru"]["native"], COOL),
         ("русский, англонабор", stats["ru"]["english"], BAD),
         ("немецкий, свой язык", stats["de"]["native"], COOL),
         ("немецкий, англонабор", stats["de"]["english"], BAD),
         ("английский, свой язык", stats["en"]["native"], COOL),
         ("английский, англонабор", stats["en"]["english"], COOL)],
        " находок")

    io.open(os.path.join(HERE, "false-positives.svg"), "w", encoding="utf-8", newline="\n").write(chart2)

    print("dash-rate.svg и false-positives.svg записаны")
    for lang in ("ru", "de", "en"):
        s = stats[lang]
        print("%s: файлов %d, свой язык %d находок, англонабор %d"
              % (lang, s["files"], s["native"], s["english"]))


if __name__ == "__main__":
    main()
