"use client";

import { useReveal } from "@/hooks/useReveal";
import Reveal from "./Reveal";
import { contato, cta } from "@/content/site";

export default function CTA() {
  const titulo = useReveal<HTMLHeadingElement>({ y: 90, duration: 1.1, ease: "power4.out" });

  return (
    <section id="contato" className="overflow-hidden border-b-2 border-ink bg-navy text-white">
      <div className="shell py-[76px] sm:py-24 lg:py-[120px]">
        <Reveal className="kicker mb-7 text-skyMuted sm:mb-11">{cta.kicker}</Reveal>

        <h2
          ref={titulo}
          className="m-0 max-w-[1180px] text-[clamp(34px,9.5vw,58px)] font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[7.2vw] md:leading-[0.87] md:tracking-[-0.042em]"
        >
          {cta.titulo}
        </h2>

        <div className="mt-10 grid grid-cols-1 items-end gap-9 border-t-2 border-white/40 pt-8 sm:mt-14 sm:gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16 lg:pt-11">
          <Reveal className="max-w-[540px] text-[16px] font-medium leading-[1.45] text-white/85 sm:text-lg lg:text-[23px] lg:leading-[1.35]">
            {cta.texto}
          </Reveal>

          <Reveal className="flex flex-col gap-3.5 sm:gap-4">
            <a
              href={contato.emailHref}
              className="flex items-center justify-between gap-3 bg-white px-5 py-5 text-[15px] font-extrabold tracking-[-0.015em] text-navy transition-colors hover:bg-sky sm:gap-5 sm:px-7 sm:py-[26px] sm:text-xl lg:text-2xl"
            >
              <span className="min-w-0 break-all">{contato.email}</span>
              <span className="font-mono font-normal">→</span>
            </a>
            <a
              href={contato.instagram}
              className="flex items-center justify-between gap-3 border-2 border-white/45 px-[18px] py-[18px] text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 sm:gap-5 sm:px-[26px] sm:py-6 sm:text-lg lg:text-xl"
            >
              <span className="min-w-0 break-words">Instagram {contato.handle}</span>
              <span className="font-mono font-normal">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
