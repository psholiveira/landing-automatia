"use client";

import { useReveal } from "@/hooks/useReveal";
import Reveal from "./Reveal";
import { antesDepois } from "@/content/site";
import Titulo from "./Titulo";

export default function AntesDepois() {
  const rule = useReveal<HTMLDivElement>({ scaleY: true });

  return (
    <section>
      <div className="shell section-y">
        <Titulo className="titulo-secao mb-12 max-w-[920px] sm:mb-16 lg:mb-20">{antesDepois.titulo}</Titulo>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1px_1fr] lg:gap-16">
          <div className="flex flex-col">
            <div className="kicker mb-4 text-ash">Hoje</div>
            {antesDepois.antes.map((t) => (
              <Reveal
                key={t}
                className="border-t border-ink/[0.08] py-4 text-[19px] leading-[1.3] tracking-[-0.01em] text-ash line-through decoration-ash/40 sm:py-5 sm:text-[22px] lg:text-[24px]"
              >
                {t}
              </Reveal>
            ))}
          </div>

          <div ref={rule} className="hidden origin-top bg-ink/[0.08] lg:block" />

          <div className="flex flex-col">
            <div className="kicker mb-4 text-brand">Com a AutomatIA</div>
            {antesDepois.depois.map((t) => (
              <Reveal
                key={t}
                className="border-t border-ink/[0.08] py-4 text-[19px] leading-[1.3] tracking-[-0.01em] text-navy sm:py-5 sm:text-[22px] lg:text-[24px]"
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
