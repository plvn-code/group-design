"""One row per post: all carousel images, labelled. args: out-name idx..."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent
T = 150
rows = []
for i in sys.argv[2:]:
    fs = sorted((ROOT / "originals/ig").glob(f"{int(i):03d}-*-[0-9][0-9].jpg"))
    rows.append((i, fs[:10]))
W = 40 + 10 * T
sheet = Image.new("RGB", (W, len(rows) * (T + 4)), "white"); dr = ImageDraw.Draw(sheet)
for r, (i, fs) in enumerate(rows):
    y = r * (T + 4); dr.text((4, y + 4), str(i), fill="black")
    for k, f in enumerate(fs):
        im = Image.open(f).convert("RGB"); im.thumbnail((T, T)); sheet.paste(im, (40 + k * T, y))
        dr.text((40 + k * T + 2, y + 2), f.stem[-2:], fill="red")
sheet.save(ROOT / f"research/sheets/{sys.argv[1]}.jpg", quality=72)
