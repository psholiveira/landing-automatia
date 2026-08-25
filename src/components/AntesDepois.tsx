"use client";

import { useReveal } from "@/hooks/useReveal";
import Reveal from "./Reveal";
import { antesDepois } from "@/content/site";

export default function AntesDepois() {
  const rule = useReveal<HTMLDivElement>({ scaleY: true });

  return (
    <section className="border-b-2 border-ink bg-surface">
      <div className="shell py-[110px]">
        <Reveal className="mb-16 flex flex-col gap-5">
          <div className="kicker text-brand">{antesDepois.kicker}</div>
          <h2 className="m-0 max-w-[1000px] text-[82px] font-extrabold leading-[0.9] tracking-[-0.038em]">
            {antesDepois.titulo}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-14 border-t-2 border-ink pt-10 lg:grid-cols-[1fr_2px_1fr]">
          <div className="flex flex-col gap-[22px]">
            <div className="font-mono text-[13px] tracking-[0.16em] text-smoke">HOJE</div>
            {antesDepois.antes.map((t) => (
              <Reveal
                key={t}
                className="border-t border-rule pt-[18px] text-[26px] font-medium leading-[1.18] text-smoke line-through decoration-smoke/50"
              >
                {t}
              </Reveal>
            ))}
          </div>

          <div ref={rule} className="hidden origin-top bg-ink lg:block" />

          <div className="flex flex-col gap-[22px]">
            <div className="font-mono text-[13px] tracking-[0.16em] text-brand">COM A AUTOMATIA</div>
            {antesDepois.depois.map((t) => (
              <Reveal key={t} className="border-t-2 border-ink pt-[18px] text-[26px] font-bold leading-[1.18] text-ink">
                {t}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
