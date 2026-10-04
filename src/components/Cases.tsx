import Image from "next/image";
import Reveal from "./Reveal";
import Avatar from "./Avatar";
import { AvisoRascunho, visivel } from "./Rascunho";
import { cases } from "@/content/site";
import Titulo from "./Titulo";

type Case = (typeof cases.itens)[number];

/** Print do desktop num navegador + print do celular por cima, no canto. */
function Telas({ c }: { c: Case }) {
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${cases.linkRotulo}: ${c.cliente}`}
      className="group/telas relative flex h-full items-center justify-start overflow-hidden bg-brand p-5 pb-16 sm:p-8 sm:pb-20 lg:p-10 lg:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:40px_40px]"
      />

      <div data-parallax="0.05" className="relative w-[88%] border-2 border-ink bg-white shadow-[6px_6px_0_#0b2a5b]">
        <div className="flex items-center gap-2 border-b-2 border-ink bg-ground px-3 py-2">
          <span className="h-2 w-2 bg-ink/25" />
          <span className="h-2 w-2 bg-ink/25" />
          <span className="h-2 w-2 bg-ink/25" />
          <span className="ml-2 truncate font-mono text-[10px] tracking-[0.04em] text-ash sm:text-[11px]">{c.dominio}</span>
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

      <div data-parallax="0.16" className="absolute bottom-4 right-4 w-[27%] max-w-[170px] rounded-[18px] border-2 border-ink bg-ink p-[3px] shadow-[6px_6px_0_#0b2a5b] sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[15px]">
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
    <section id="cases" className="border-b-2 border-ink">
      <div className="shell section-y">
        <AvisoRascunho rascunho={cases.rascunho} />

        <div className="mb-10 grid grid-cols-1 items-end gap-6 sm:mb-14 lg:mb-16 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-4 sm:gap-5">
            <div className="kicker text-brand">{cases.kicker}</div>
            <Titulo className="m-0 text-[clamp(30px,8vw,52px)] font-extrabold leading-[0.98] tracking-[-0.03em] lg:text-[76px] lg:leading-[0.9] lg:tracking-[-0.038em]">
              {cases.titulo}
            </Titulo>
          </Reveal>
          <Reveal className="max-w-[460px] text-[16px] font-medium leading-[1.45] text-ink/75 sm:text-lg lg:text-[21px] lg:leading-[1.4]">
            {cases.intro}
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 sm:gap-12">
          {cases.itens.map((c, i) => (
            <Reveal key={c.cliente}>
              <article className="grid grid-cols-1 border-2 border-ink bg-white shadow-[8px_8px_0_#201e1d] lg:grid-cols-2">
                {/* Alterna o lado da imagem a cada case, para o bloco não ficar repetitivo. */}
                <div className={"border-b-2 border-ink lg:border-b-0 " + (i % 2 ? "lg:order-2 lg:border-l-2" : "lg:border-r-2")}>
                  <Telas c={c} />
                </div>

                <div className="flex flex-col gap-6 p-5 sm:p-8 lg:p-10">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.14em] sm:text-xs">
                      <span className="text-brand">{c.segmento}</span>
                      <span className="text-smoke">{c.local}</span>
                    </div>
                    <h3 className="m-0 text-[28px] font-extrabold leading-[1] tracking-[-0.03em] sm:text-[36px] lg:text-[40px]">{c.cliente}</h3>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-smoke">{cases.problemaRotulo}</span>
                      <p className="m-0 text-[16px] font-medium leading-[1.45] text-ink/75 sm:text-[17px]">{c.problema}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-brand">{cases.solucaoRotulo}</span>
                      <p className="m-0 text-[16px] font-semibold leading-[1.45] sm:text-[17px]">{c.solucao}</p>
                    </div>
                  </div>

                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {c.entregas.map((e) => (
                      <li key={e} className="border-2 border-ink bg-ground px-2.5 py-1.5 text-[13px] font-bold tracking-[-0.01em] sm:text-[14px]">
                        {e}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-5 border-t-2 border-ink pt-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[48px] font-extrabold leading-[0.9] tracking-[-0.045em] text-brand sm:text-[56px]">{c.destaque.valor}</span>
                      <span className="font-mono text-[11px] tracking-[0.12em] text-ash">{c.destaque.rotulo}</span>
                    </div>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border-2 border-ink bg-ink px-4 py-3 text-[15px] font-extrabold text-white transition-colors hover:bg-brand"
                    >
                      {cases.linkRotulo}
                      <span className="font-mono font-normal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                    </a>
                  </div>
                </div>

                {c.depoimento.texto && (
                  <figure className="m-0 flex flex-col gap-4 border-t-2 border-ink bg-ground p-5 sm:p-8 lg:col-span-2 lg:p-10">
                    <blockquote className="m-0 text-[19px] font-bold leading-[1.35] tracking-[-0.015em] sm:text-[24px]">“{c.depoimento.texto}”</blockquote>
                    <figcaption className="flex items-center gap-3">
                      <Avatar nome={c.depoimento.autor} foto={c.depoimento.foto} className="h-12 w-12 rounded-full text-sm" />
                      <div className="flex flex-col">
                        <span className="text-[15px] font-extrabold">{c.depoimento.autor}</span>
                        <span className="font-mono text-[11px] tracking-[0.08em] text-smoke">{c.depoimento.cargo}</span>
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
