import Image from "next/image";
import Reveal from "./Reveal";
import Avatar from "./Avatar";
import { AvisoRascunho, visivel } from "./Rascunho";
import { cases } from "@/content/site";
import Titulo from "./Titulo";
import BtnConteudo from "./BtnConteudo";

type Case = (typeof cases.itens)[number];

/** Print do desktop num navegador + print do celular por cima, no canto. */
function Telas({ c }: { c: Case }) {
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${cases.linkRotulo}: ${c.cliente}`}
      className="group/telas relative flex h-full items-center justify-start overflow-hidden rounded-3xl bg-gradient-to-br from-skyPale/70 via-nevoa to-nevoa p-5 pb-16 sm:p-8 sm:pb-20 lg:p-10 lg:pb-24"
    >
      <div
        data-parallax="0.05"
        className="relative w-[88%] overflow-hidden rounded-xl bg-white shadow-[0_30px_70px_-30px_rgba(11,42,91,0.45)] ring-1 ring-ink/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/telas:-translate-y-1"
      >
        <div className="flex items-center gap-1.5 border-b border-ink/[0.06] px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="ml-2 truncate text-[11px] tracking-[-0.005em] text-ash sm:text-xs">{c.dominio}</span>
        </div>
        <div className="relative aspect-[1440/900]">
          <Image
            src={c.imagem.desktop}
            alt={`Página inicial do site ${c.cliente} no computador`}
            fill
            sizes="(min-width: 1024px) 560px, 85vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div
        data-parallax="0.16"
        className="absolute bottom-4 right-4 w-[27%] max-w-[170px] rounded-[20px] bg-ink p-[3px] shadow-[0_30px_60px_-24px_rgba(11,42,91,0.55)] sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8"
      >
        <div className="relative aspect-[390/844] overflow-hidden rounded-[17px]">
          <Image
            src={c.imagem.mobile}
            alt={`O mesmo site ${c.cliente} no celular`}
            fill
            sizes="170px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </a>
  );
}

export default function Cases() {
  if (!visivel(cases.rascunho)) return null;

  return (
    <section id="cases">
      <div className="shell section-y">
        <AvisoRascunho rascunho={cases.rascunho} />

        <div className="mb-12 grid grid-cols-1 items-end gap-6 sm:mb-16 sm:gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-16">
          <Titulo className="titulo-secao">{cases.titulo}</Titulo>
          <Reveal className="intro-secao max-w-[460px]">{cases.intro}</Reveal>
        </div>

        <div className="flex flex-col gap-20 sm:gap-28">
          {cases.itens.map((c, i) => (
            <Reveal key={c.cliente}>
              <article className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Alterna o lado da imagem a cada case, para o bloco não ficar repetitivo. */}
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <Telas c={c} />
                </div>

                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-3">
                    <div className="kicker flex flex-wrap gap-x-3 gap-y-1">
                      <span className="text-brand">{c.segmento}</span>
                      <span className="text-ash">{c.local}</span>
                    </div>
                    <h3 className="m-0 text-[32px] font-normal leading-[1.05] tracking-[-0.035em] text-navy sm:text-[40px] lg:text-[44px]">{c.cliente}</h3>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="kicker text-ash">{cases.problemaRotulo}</span>
                      <p className="m-0 text-[16px] leading-[1.55] text-ash sm:text-[17px]">{c.problema}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="kicker text-brand">{cases.solucaoRotulo}</span>
                      <p className="m-0 text-[16px] font-medium leading-[1.55] text-ink sm:text-[17px]">{c.solucao}</p>
                    </div>
                  </div>

                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {c.entregas.map((e) => (
                      <li key={e} className="rounded-full bg-nevoa px-3.5 py-1.5 text-[13px] tracking-[-0.01em] text-ink sm:text-[14px]">
                        {e}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-end justify-between gap-5 border-t border-ink/[0.08] pt-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[56px] font-normal leading-[0.9] tracking-[-0.05em] text-brand sm:text-[64px]">{c.destaque.valor}</span>
                      <span className="max-w-[160px] text-[14px] leading-[1.3] text-ash">{c.destaque.rotulo}</span>
                    </div>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-escuro btn-sm"
                    >
                      <BtnConteudo seta="diagonal">{cases.linkRotulo}</BtnConteudo>
                    </a>
                  </div>
                </div>

                {c.depoimento.texto && (
                  <figure className="m-0 flex flex-col gap-5 rounded-3xl bg-nevoa p-6 sm:p-8 lg:col-span-2 lg:p-10">
                    <blockquote className="m-0 text-[20px] leading-[1.4] tracking-[-0.02em] text-navy sm:text-[26px]">“{c.depoimento.texto}”</blockquote>
                    <figcaption className="flex items-center gap-3">
                      <Avatar nome={c.depoimento.autor} foto={c.depoimento.foto} className="h-12 w-12 rounded-full text-sm" />
                      <div className="flex flex-col">
                        <span className="text-[15px] font-medium text-ink">{c.depoimento.autor}</span>
                        <span className="text-[13px] text-ash">{c.depoimento.cargo}</span>
                      </div>
                    </figcaption>
                  </figure>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
