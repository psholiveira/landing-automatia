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
      <div className="shell py-[110px]">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col gap-9">
            <Reveal className="kicker text-skyPale">{agentes.kicker}</Reveal>
            <Reveal>
              <h2 className="m-0 text-[92px] font-extrabold leading-[0.87] tracking-[-0.04em]">{agentes.titulo}</h2>
            </Reveal>
            <Reveal className="max-w-[560px] text-[22px] font-medium leading-[1.4] text-white/90">{agentes.texto}</Reveal>

            <div className="grid grid-cols-3 gap-7 border-t-2 border-white/50 pt-[26px]">
              {agentes.numeros.map((n) => (
                <Reveal key={n.rotulo} className="flex flex-col gap-1.5">
                  <div className="text-[44px] font-extrabold tracking-[-0.03em]">{n.valor}</div>
                  <div className="font-mono text-xs tracking-[0.1em] text-skyPale">{n.rotulo}</div>
                </Reveal>
              ))}
            </div>
          </div>

          <div ref={chatCard} className="border-2 border-ink bg-white text-ink shadow-[18px_18px_0_rgba(11,42,91,0.45)]">
            <div className="flex items-center gap-3 border-b-2 border-ink bg-ground px-[22px] py-[18px]">
              <span className="h-2.5 w-2.5 bg-brand" />
              <span className="font-mono text-[13px] tracking-[0.1em]">AGENTE AUTOMATIA · ONLINE</span>
            </div>

            <div ref={chatRef} className="flex flex-col gap-4 px-[22px] py-[26px]">
              {agentes.chat.map((m, i) => (
                <ChatBubble key={i} texto={m.texto} de={m.de} index={i} trigger={chatRef} />
              ))}
              <div className="flex gap-1.5 self-start border-2 border-ink bg-ground px-[18px] py-4">
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
        "max-w-[82%] border-2 border-ink px-[18px] py-4 text-[17px] font-medium leading-[1.35] " +
        (cliente ? "self-end bg-navy text-white" : "self-start bg-ground text-ink")
      }
    >
      {texto}
    </div>
  );
}
