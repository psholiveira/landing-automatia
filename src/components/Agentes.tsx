"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import Reveal from "./Reveal";
import { agentes } from "@/content/site";

export default function Agentes() {
  const chatRef = useRef<HTMLDivElement>(null);
  const chatCard = useReveal<HTMLDivElement>({ y: 80, duration: 1 });

  return (
    <section id="agentes" className="overflow-hidden border-b-2 border-ink bg-brand text-white">
      <div className="shell section-y">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-6 sm:gap-9">
            <Reveal className="kicker text-skyPale">{agentes.kicker}</Reveal>
            <Reveal>
              <h2 className="m-0 text-[clamp(34px,9.5vw,58px)] font-extrabold leading-[0.95] tracking-[-0.035em] lg:text-[92px] lg:leading-[0.87] lg:tracking-[-0.04em]">{agentes.titulo}</h2>
            </Reveal>
            <Reveal className="max-w-[560px] text-[16px] font-medium leading-[1.45] text-white/90 sm:text-lg lg:text-[22px] lg:leading-[1.4]">{agentes.texto}</Reveal>

            <div className="grid grid-cols-3 gap-3 border-t-2 border-white/50 pt-5 sm:gap-7 sm:pt-[26px]">
              {agentes.numeros.map((n) => (
                <Reveal key={n.rotulo} className="flex flex-col gap-1.5">
                  <div className="text-[clamp(24px,7vw,34px)] font-extrabold tracking-[-0.03em] lg:text-[44px]">{n.valor}</div>
                  <div className="font-mono text-[10px] leading-[1.3] tracking-[0.08em] text-skyPale sm:text-xs sm:tracking-[0.1em]">{n.rotulo}</div>
                </Reveal>
              ))}
            </div>
          </div>

          <div ref={chatCard} className="border-2 border-ink bg-white text-ink shadow-[8px_8px_0_rgba(11,42,91,0.45)] sm:shadow-[18px_18px_0_rgba(11,42,91,0.45)]">
            <div className="flex items-center gap-2.5 border-b-2 border-ink bg-ground px-4 py-3.5 sm:gap-3 sm:px-[22px] sm:py-[18px]">
              <span className="h-2.5 w-2.5 shrink-0 bg-brand" />
              <span className="font-mono text-[11px] tracking-[0.08em] sm:text-[13px] sm:tracking-[0.1em]">AGENTE AUTOMATIA · ONLINE</span>
            </div>

            <div ref={chatRef} className="flex flex-col gap-3 px-4 py-5 sm:gap-4 sm:px-[22px] sm:py-[26px]">
              {agentes.chat.map((m, i) => (
                <ChatBubble key={i} texto={m.texto} de={m.de} index={i} trigger={chatRef} />
              ))}
              <div className="flex gap-1.5 self-start border-2 border-ink bg-ground px-4 py-3.5 sm:px-[18px] sm:py-4">
                <span className="h-2 w-2 animate-blink bg-brand" />
                <span className="h-2 w-2 animate-blink bg-brand [animation-delay:0.2s]" />
                <span className="h-2 w-2 animate-blink bg-brand [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({
  texto,
  de,
  index,
  trigger,
}: {
  texto: string;
  de: "cliente" | "agente";
  index: number;
  trigger: React.RefObject<Element>;
}) {
  const ref = useReveal<HTMLDivElement>({ y: 22, duration: 0.5, delay: index * 0.28, ease: "back.out(1.6)", trigger });
  const cliente = de === "cliente";

  return (
    <div
      ref={ref}
      className={
        "max-w-[86%] border-2 border-ink px-3.5 py-3 text-[15px] font-medium leading-[1.35] sm:max-w-[82%] sm:px-[18px] sm:py-4 sm:text-[17px] " +
        (cliente ? "self-end bg-navy text-white" : "self-start bg-ground text-ink")
      }
    >
      {texto}
    </div>
  );
}
