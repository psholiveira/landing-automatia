"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import Reveal from "./Reveal";
import { agentes, contato } from "@/content/site";
import Titulo from "./Titulo";
import BtnConteudo from "./BtnConteudo";

export default function Agentes() {
  const chatRef = useRef<HTMLDivElement>(null);
  const chatCard = useReveal<HTMLDivElement>({ y: 80, duration: 1 });

  return (
    <section id="agentes" className="overflow-hidden">
      <div className="shell section-y">
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-6 sm:gap-8">
            <Titulo className="titulo-secao lg:text-[76px]">{agentes.titulo}</Titulo>
            <Reveal className="intro-secao max-w-[540px]">{agentes.texto}</Reveal>

            <div className="grid grid-cols-3 gap-4 border-t border-ink/[0.08] pt-6 sm:gap-8">
              {agentes.numeros.map((n) => (
                <Reveal key={n.rotulo} className="flex flex-col gap-1.5">
                  <div className="text-[clamp(30px,8vw,40px)] font-normal leading-none tracking-[-0.04em] text-brand lg:text-[52px]">{n.valor}</div>
                  <div className="text-[13px] leading-[1.35] text-ash sm:text-sm">{n.rotulo}</div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-escuro w-full sm:w-auto"
              >
                <BtnConteudo seta="direita">{agentes.cta}</BtnConteudo>
              </a>
            </Reveal>
          </div>

          <div
            ref={chatCard}
            className="rounded-[28px] bg-nevoa p-2 shadow-[0_40px_90px_-40px_rgba(11,42,91,0.4)] ring-1 ring-ink/[0.05]"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy to-brand text-[13px] font-medium text-white">IA</span>
              <div className="flex flex-col leading-tight">
                <span className="text-[15px] font-medium text-ink">Agente AutomatIA</span>
                <span className="flex items-center gap-1.5 text-[12px] text-ash">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                  online
                </span>
              </div>
            </div>

            <div ref={chatRef} className="flex flex-col gap-2.5 rounded-[22px] bg-white px-4 py-5 sm:gap-3 sm:px-5 sm:py-6">
              {agentes.chat.map((m, i) => (
                <ChatBubble key={i} texto={m.texto} de={m.de} index={i} trigger={chatRef} />
              ))}
              <div className="flex gap-1 self-start rounded-2xl rounded-bl-md bg-nevoa px-4 py-3.5">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-ash/60" />
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-ash/60 [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-ash/60 [animation-delay:0.4s]" />
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
  const ref = useReveal<HTMLDivElement>({ y: 22, duration: 0.5, delay: index * 0.28, ease: "power3.out", trigger });
  const cliente = de === "cliente";

  return (
    <div
      ref={ref}
      className={
        "max-w-[86%] rounded-2xl px-4 py-3 text-[15px] leading-[1.4] sm:max-w-[80%] sm:text-[16px] " +
        (cliente ? "self-end rounded-br-md bg-brand text-white" : "self-start rounded-bl-md bg-nevoa text-ink")
      }
    >
      {texto}
    </div>
  );
}
