"use client";

import { useReveal } from "@/hooks/useReveal";
import Reveal from "./Reveal";
import { contato, cta } from "@/content/site";

export default function CTA() {
  const titulo = useReveal<HTMLHeadingElement>({ y: 90, duration: 1.1, ease: "power4.out" });

  return (
    <section id="contato" className="overflow-hidden border-b-2 border-ink bg-navy text-white">
      <div className="shell py-[120px]">
        <Reveal className="kicker mb-11 text-skyMuted">{cta.kicker}</Reveal>

        <h2 ref={titulo} className="m-0 max-w-[1180px] text-[7.2vw] font-extrabold leading-[0.87] tracking-[-0.042em]">
          {cta.titulo}
        </h2>

        <div className="mt-16 grid grid-cols-1 items-end gap-16 border-t-2 border-white/40 pt-11 lg:grid-cols-2">
          <Reveal className="max-w-[540px] text-[23px] font-medium leading-[1.35] text-white/85">{cta.texto}</Reveal>

          <Reveal className="flex flex-col gap-4">
            <a
              href={contato.whatsapp}
              className="flex items-center justify-between gap-5 bg-white px-7 py-[26px] text-2xl font-extrabold tracking-[-0.015em] text-navy transition-colors hover:bg-sky"
            >
              WhatsApp {contato.telefone} <span className="font-mono font-normal">→</span>
            </a>
            <a
              href={contato.instagram}
              className="flex items-center justify-between gap-5 border-2 border-white/45 px-[26px] py-6 text-xl font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Instagram {contato.handle} <span className="font-mono font-normal">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
