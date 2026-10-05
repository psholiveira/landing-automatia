import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { WhatsAppIcon } from "./WhatsApp";
import { segmentos, whatsappCom } from "@/content/site";
import Titulo from "./Titulo";

export default function Segmentos() {
  return (
    <section id="para-quem">
      <div className="shell section-y">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 sm:mb-16 sm:gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-16">
          <Titulo className="titulo-secao">{segmentos.titulo}</Titulo>
          <Reveal className="intro-secao max-w-[480px]">{segmentos.intro}</Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {segmentos.itens.map((s, i) => (
            <Reveal key={s.nome} delay={i * 0.08} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl bg-nevoa p-6 transition-[background-color,box-shadow] duration-300 hover:bg-white hover:shadow-[0_24px_60px_-28px_rgba(11,42,91,0.35)] hover:ring-1 hover:ring-ink/[0.06] sm:p-7">
                <h3 className="m-0 text-[24px] font-normal leading-[1.1] tracking-[-0.025em] text-navy">{s.nome}</h3>
                <div className="mt-6 flex flex-1 flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="kicker text-ash">{segmentos.dorRotulo}</span>
                    <p className="m-0 text-[16px] leading-[1.45] text-ash line-through decoration-ash/40">{s.dor}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="kicker text-brand">{segmentos.entregaRotulo}</span>
                    <p className="m-0 text-[16px] font-medium leading-[1.45] text-ink">{s.entrega}</p>
                  </div>
                </div>
                <a
                  href={whatsappCom(s.mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex items-center gap-2.5 border-t border-ink/[0.08] pt-5 text-[15px] font-medium text-navy transition-colors hover:text-brand"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px] shrink-0 text-[#1fa855]" />
                  {segmentos.cta}
                  <ArrowRight aria-hidden className="ml-auto h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
