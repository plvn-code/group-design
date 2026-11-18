"""Download Instagram images into originals/ig/.
  covers: NNN-code.jpg (first media of every post)
  full <idx...>: NNN-code-MM.jpg (all non-video media of given posts)"""
import json, sys, urllib.request, concurrent.futures as cf
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
d = json.load(open(ROOT / "research/ig_posts.json"))
OUT = ROOT / "originals/ig"; OUT.mkdir(parents=True, exist_ok=True)
jobs = []
if sys.argv[1] == "covers":
    for i, p in enumerate(d):
        m = p["media"][0]
        if m.get("url"): jobs.append((m["url"], OUT / f"{i:03d}-{p['code']}.jpg"))
else:
    for i in map(int, sys.argv[2:]):
        p = d[i]
        for j, m in enumerate(p["media"]):
            if m.get("url") and not m["video"]: jobs.append((m["url"], OUT / f"{i:03d}-{p['code']}-{j:02d}.jpg"))
jobs = [j for j in jobs if not j[1].exists()]
def get(job):
    url, out = job
    try: out.write_bytes(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read())
    except Exception as e: print("fail", out.name, e)
with cf.ThreadPoolExecutor(12) as ex: list(ex.map(get, jobs))
print(len(jobs), "downloaded")
