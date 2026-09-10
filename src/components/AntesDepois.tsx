"use client";

import { useReveal } from "@/hooks/useReveal";
import Reveal from "./Reveal";
import { antesDepois } from "@/content/site";

export default function AntesDepois() {
  const rule = useReveal<HTMLDivElement>({ scaleY: true });

  return (
    <section className="border-b-2 border-ink bg-surface">
      <div className="shell section-y">
        <Reveal className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-5 lg:mb-16">
          <div className="kicker text-brand">{antesDepois.kicker}</div>
          <h2 className="m-0 max-w-[1000px] text-[clamp(30px,8vw,52px)] font-extrabold leading-[0.98] tracking-[-0.03em] lg:text-[82px] lg:leading-[0.9] lg:tracking-[-0.038em]">
            {antesDepois.titulo}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 border-t-2 border-ink pt-8 sm:gap-12 lg:grid-cols-[1fr_2px_1fr] lg:gap-14 lg:pt-10">
          <div className="flex flex-col gap-4 sm:gap-[22px]">
            <div className="font-mono text-[11px] tracking-[0.16em] text-smoke sm:text-[13px]">HOJE</div>
            {antesDepois.antes.map((t) => (
              <Reveal
                key={t}
                className="border-t border-rule pt-3.5 text-[19px] font-medium leading-[1.2] text-smoke line-through decoration-smoke/50 sm:pt-[18px] sm:text-[22px] lg:text-[26px] lg:leading-[1.18]"
              >
                {t}
              </Reveal>
            ))}
          </div>

          <div ref={rule} className="hidden origin-top bg-ink lg:block" />

          <div className="flex flex-col gap-4 sm:gap-[22px]">
            <div className="font-mono text-[11px] tracking-[0.16em] text-brand sm:text-[13px]">COM A AUTOMATIA</div>
            {antesDepois.depois.map((t) => (
              <Reveal
                key={t}
                className="border-t-2 border-ink pt-3.5 text-[19px] font-bold leading-[1.2] text-ink sm:pt-[18px] sm:text-[22px] lg:text-[26px] lg:leading-[1.18]"
              >
                {t}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
