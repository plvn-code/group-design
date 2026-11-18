"use client";

import Image from "next/image";
import { useState } from "react";
import { IDrag } from "./Icons";
import type { Img } from "@/lib/projects";

type Pair = { key: string; label: string; plan: Img; result: Img };

/** Planned render vs real photo: drag (or use the arrow keys on the range input) to reveal. */
export function Compare({ pairs }: { pairs: Pair[] }) {
  const [k, setK] = useState(0);
  const [x, setX] = useState(50);
  const p = pairs[k];
  return (
    <div>
      <div className="cmp__tabs" role="tablist" aria-label="Приміщення">
        {pairs.map((q, i) => (
          <button
            key={q.key}
            className="chip"
            role="tab"
            aria-selected={i === k}
            onClick={() => {
              setK(i);
              setX(50);
            }}
          >
            {q.label}
          </button>
        ))}
      </div>
      <div className="cmp__frame" style={{ ["--x" as string]: `${x}%` }}>
        <Image src={p.result.src} alt={`${p.label}: реальне фото після ремонту`} fill sizes="(max-width: 960px) 100vw, 58vw" quality={80} />
        <div className="cmp__top">
          <Image src={p.plan.src} alt={`${p.label}: 3D-візуалізація з дизайн-проєкту`} fill sizes="(max-width: 960px) 100vw, 58vw" quality={80} />
        </div>
        <span className="cmp__lbl cmp__lbl--l">Візуалізація</span>
        <span className="cmp__lbl cmp__lbl--r">Реальне фото</span>
        <div className="cmp__handle">
          <span className="cmp__knob">
            <IDrag />
          </span>
        </div>
        <input
          className="cmp__range"
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          aria-label="Порівняти візуалізацію та результат"
        />
      </div>
    </div>
  );
}
