"""Build every image the site uses into public/img/ (WebP) + src/lib/media.json (sizes).

Run:  ~/Desktop/nudes/research/.venv/bin/python -I scripts/build_media.py
Sources (all from Instagram @group_design_, the client's own work):
  ig:NNN:MM   carousel image MM of post NNN (research/ig_posts.json order) -> originals/ig/NNN-code-MM.jpg
  hl:NAME:NN  highlight frame -> originals/hl/NAME/NN.jpg
  ...@l,t,r,b optional crop as fractions
"""
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/img"
MAXW = 1600


def ig(n, m="00"):
    return f"ig:{n:03d}:{m}"


def seq(n, *ms):
    return [ig(n, f"{m:02d}") for m in ms]


# slug -> ordered images (first = cover)
PROJECTS = {
    "panorama": seq(26, 0) + seq(28, 0, 1, 2) + seq(26, 1, 2, 3) + seq(27, 0, 1, 2, 3) + seq(19, 0, 2, 3, 4, 5, 7)
    + seq(17, 1, 0, 2, 4, 5, 6) + seq(11, 0, 1, 2) + seq(9, 0, 1),
    "olyva": seq(15, 5, 0, 1, 2, 3, 4, 6) + seq(22, 1, 0, 2, 3, 4, 5) + seq(12, 0, 1, 2, 3, 4),
    "bordo": seq(4, 1, 2, 3, 4, 5) + seq(7, 0, 1, 2, 3, 4) + seq(5, 1, 0, 2, 3, 4, 5, 6) + seq(2, 0, 1, 2, 3, 4),
    "budynok-185": seq(66, 0) + seq(67, 0, 1, 3, 4, 6, 7) + seq(66, 1, 2, 3, 4, 6, 7) + seq(65, 1, 2, 3, 4, 5)
    + seq(57, 0, 3, 4, 5, 6) + seq(58, 0, 2) + seq(59, 0, 3, 4) + seq(61, 0, 1) + seq(64, 0, 2, 5, 6)
    + seq(60, 0, 2, 4) + seq(62, 3, 4, 0) + seq(56, 0, 2, 4),
    "novi-petrivtsi": seq(99, 5) + seq(100, 0, 1, 2, 4, 5) + seq(98, 0, 1, 3, 4) + seq(99, 0, 1, 2, 3, 7)
    + seq(94, 0, 1) + seq(92, 0, 2, 4, 5, 7) + seq(88, 0, 2) + seq(93, 0, 1) + seq(96, 1, 2, 3)
    + seq(90, 0, 1, 2, 4) + seq(87, 0, 1, 2) + seq(91, 0, 1, 3, 5) + seq(95, 0, 3, 5),
    "rodyna": [f"hl:реалізовані:{n:02d}" for n in (40, 41, 44, 42, 43, 39, 24, 46, 48, 50, 51)] + seq(117, 0, 1, 3, 6, 7),
    "varshavskyi": seq(109, 0) + seq(110, 0, 1, 2, 4) + seq(109, 1, 2, 3, 6) + seq(106, 0, 1, 2, 3)
    + seq(105, 0, 1, 2, 4, 5) + seq(104, 1, 0, 2, 4, 5, 6) + seq(103, 0, 1, 2) + seq(102, 0, 1, 2)
    + seq(113, 0, 1, 3) + seq(112, 0, 1, 2, 4) + seq(108, 0, 1),
    "crystal-avenue": seq(72, 1) + seq(73, 0, 2, 3) + seq(72, 0, 2, 3, 4, 5, 6, 7) + seq(71, 1, 0, 2, 3, 4, 6, 7, 8)
    + seq(70, 0, 1, 3) + seq(69, 0, 1) + seq(73, 4),
    "kavyarnya": seq(79, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14) + [f"hl:кавярня:{n:02d}" for n in (0, 12, 6)],
    "ofis": seq(42, 5, 0, 1, 2, 3, 4, 6, 7, 8, 9) + seq(46, 0, 1, 2) + seq(45, 0, 1, 2) + seq(47, 1, 2, 3, 4),
    "zelena-kukhnya": seq(124, 0, 1, 2, 3, 4, 5, 6, 7) + seq(126, 0, 1, 2) + seq(125, 0, 1, 2, 3) + seq(121, 0, 2, 3, 4),
}

# "planned vs result" pairs from the «реалізовані» highlight (1170x2080 frames split in halves)
COMPARE = {f"compare/{k}-{part}": f"hl:реалізовані:{n}@0,{a},1,{b}"
           for k, n in (("bedroom", 29), ("living", 30), ("hall", 31))
           for part, a, b in (("plan", 0.0, 0.405), ("result", 0.612, 1.0))}

SINGLE = {
    "olena": ig(38, "00"),
    "olena-2": ig(38, "03"),
}


def src_path(spec):
    kind, a, b = spec.split("@")[0].split(":")
    if kind == "ig":
        return next((ROOT / "originals/ig").glob(f"{int(a):03d}-*-{b}.jpg"), None)
    return ROOT / "originals/hl" / a / f"{int(b):02d}.jpg"


def build(spec, out):
    p = src_path(spec)
    if not p or not p.exists():
        raise SystemExit(f"missing source {spec}")
    im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
    if "@" in spec:
        l, t, r, b = map(float, spec.split("@")[1].split(","))
        W, H = im.size
        im = im.crop((round(l * W), round(t * H), round(r * W), round(b * H)))
    if im.width > MAXW:
        im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "WEBP", quality=80, method=6)
    return {"src": "/" + str(out.relative_to(ROOT / "public")), "w": im.width, "h": im.height}


manifest = {"projects": {}, "single": {}}
for slug, specs in PROJECTS.items():
    seen = []
    for s in specs:
        if s not in seen:
            seen.append(s)
    manifest["projects"][slug] = [build(s, OUT / "p" / slug / f"{i:02d}.webp") for i, s in enumerate(seen)]
for name, s in {**COMPARE, **SINGLE}.items():
    manifest["single"][name] = build(s, OUT / f"{name}.webp")

(ROOT / "src/lib").mkdir(parents=True, exist_ok=True)
json.dump(manifest, open(ROOT / "src/lib/media.json", "w"), indent=0)
n = sum(len(v) for v in manifest["projects"].values()) + len(manifest["single"])
print(n, "images")
