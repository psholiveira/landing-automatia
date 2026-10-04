import Reveal from "./Reveal";
import { WhatsAppIcon } from "./WhatsApp";
import { segmentos, whatsappCom } from "@/content/site";
import Titulo from "./Titulo";

export default function Segmentos() {
  return (
    <section id="para-quem" className="border-b-2 border-ink bg-ink text-white">
      <div className="shell section-y">
        <div className="mb-10 grid grid-cols-1 items-end gap-6 sm:mb-14 lg:mb-16 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-4 sm:gap-5">
            <div className="kicker text-sky">{segmentos.kicker}</div>
            <Titulo className="m-0 text-[clamp(30px,8vw,52px)] font-extrabold leading-[0.98] tracking-[-0.03em] lg:text-[68px] lg:leading-[0.92] lg:tracking-[-0.038em]">
              {segmentos.titulo}
            </Titulo>
          </Reveal>
          <Reveal className="max-w-[480px] text-[16px] font-medium leading-[1.45] text-white/75 sm:text-lg lg:text-[21px] lg:leading-[1.4]">
            {segmentos.intro}
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {segmentos.itens.map((s, i) => (
            <Reveal key={s.nome} delay={i * 0.08} className="h-full">
              <article className="group flex h-full flex-col border-2 border-white/25 bg-white/[0.03] transition-colors hover:border-sky hover:bg-white/[0.06]">
                <div className="flex items-baseline justify-between gap-4 border-b-2 border-white/15 px-5 py-5 sm:px-6">
                  <h3 className="m-0 text-[22px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[24px]">{s.nome}</h3>
                  <span className="font-mono text-xs text-sky">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-1 flex-col gap-5 px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-smoke">{segmentos.dorRotulo}</span>
                    <p className="m-0 text-[16px] font-medium leading-[1.4] text-white/60 line-through decoration-white/25">{s.dor}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-sky">{segmentos.entregaRotulo}</span>
                    <p className="m-0 text-[16px] font-bold leading-[1.4]">{s.entrega}</p>
                  </div>
                </div>
                <a
                  href={whatsappCom(s.mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center gap-2.5 border-t-2 border-white/15 px-5 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-brand sm:px-6"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
                  {segmentos.cta}
                  <span className="ml-auto font-mono font-normal transition-transform group-hover:translate-x-1">→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
