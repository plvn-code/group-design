import sys
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent
files = sorted((ROOT / "originals/ig").glob("[0-9][0-9][0-9]-*.jpg"))
files = [f for f in files if len(f.stem) == 15] if sys.argv[1] == "covers" else [f for f in files if f.name.startswith(tuple(sys.argv[2:]))]
C, T, N = 8, 180, 48
for s in range(0, len(files), N):
    chunk = files[s:s + N]; R = (len(chunk) + C - 1) // C
    sheet = Image.new("RGB", (C * T, R * (T + 16)), "white"); dr = ImageDraw.Draw(sheet)
    for k, f in enumerate(chunk):
        im = Image.open(f).convert("RGB"); im.thumbnail((T, T))
        x, y = (k % C) * T, (k // C) * (T + 16)
        sheet.paste(im, (x + (T - im.width) // 2, y)); dr.text((x + 4, y + T + 2), f.stem[:16], fill="black")
    sheet.save(ROOT / f"research/sheets/{sys.argv[1]}-{s // N:02d}.jpg", quality=72)
print(len(files))
