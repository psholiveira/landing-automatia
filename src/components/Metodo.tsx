import Reveal from "./Reveal";
import { contato, metodo } from "@/content/site";
import Titulo from "./Titulo";
import BtnConteudo from "./BtnConteudo";

export default function Metodo() {
  return (
    <section id="metodo">
      <div className="shell section-y">
        <Titulo className="titulo-secao mb-12 max-w-[820px] sm:mb-16 lg:mb-20">{metodo.titulo}</Titulo>

        <div className="flex flex-col">
          {metodo.etapas.map((e) => (
            <Reveal
              key={e.n}
              x={-40}
              y={0}
              duration={0.9}
              className="relative grid grid-cols-[48px_1fr] items-baseline gap-x-4 gap-y-2 border-t border-ink/[0.08] py-8 sm:grid-cols-[72px_1fr] sm:py-10 lg:grid-cols-[120px_360px_1fr] lg:gap-10"
            >
              {/* régua que se desenha ao rolar (ScrollFx) */}
              <span aria-hidden data-linha className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-brand" />
              <span className="text-[15px] tabular-nums text-brand sm:text-[17px]">{e.n}</span>
              <h3 className="m-0 text-[26px] font-normal leading-[1.1] tracking-[-0.03em] text-navy sm:text-[32px] lg:text-[36px]">{e.titulo}</h3>
              <p className="col-start-2 m-0 max-w-[600px] text-[16px] leading-[1.55] text-ash sm:text-lg lg:col-start-3">{e.texto}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 border-t border-ink/[0.08] pt-10 sm:mt-0">
          <a
            href={contato.whatsapp}
            data-ga="metodo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-escuro w-full sm:w-auto"
          >
            <BtnConteudo seta="direita">{metodo.cta}</BtnConteudo>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
