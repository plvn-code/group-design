"""Download highlight frames (image or video cover) into originals/hl/<slug>/NN.jpg."""
import json, re, sys, urllib.request, concurrent.futures as cf
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
d = json.loads(open(ROOT / "research/ig_hl.json").read())
if isinstance(d, str): d = json.loads(d)
json.dump(d, open(ROOT / "research/ig_hl.json", "w"), ensure_ascii=False, indent=1)
slug = lambda t: re.sub(r"[^a-zа-яіїєґ0-9]+", "-", t.lower()).strip("-")
want = sys.argv[1:]
jobs = []
for r in d.values():
    s = slug(r["title"])
    if want and s not in want: continue
    for i, it in enumerate(r["items"]):
        out = ROOT / "originals/hl" / s / f"{i:02d}.jpg"
        if it["img"] and not out.exists(): jobs.append((it["img"], out))
def get(job):
    url, out = job; out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read())
with cf.ThreadPoolExecutor(10) as ex: list(ex.map(get, jobs))
print(len(jobs), [slug(r["title"]) for r in d.values()])
