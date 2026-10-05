import Reveal from "./Reveal";
import Avatar from "./Avatar";
import { AvisoRascunho, visivel } from "./Rascunho";
import { equipe } from "@/content/site";
import Titulo from "./Titulo";

export default function Equipe() {
  if (!visivel(equipe.rascunho)) return null;

  return (
    <section id="equipe">
      <div className="shell section-y">
        <AvisoRascunho rascunho={equipe.rascunho} />

        <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal className="flex flex-col gap-4 sm:gap-5 lg:sticky lg:top-28 lg:self-start">
            <Titulo className="titulo-secao lg:text-[60px]">
              {equipe.titulo}
            </Titulo>
            <p className="intro-secao mt-1 max-w-[420px]">
              {equipe.texto}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 sm:gap-8">
            {equipe.pessoas.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.1} className={i % 2 ? "min-[480px]:mt-16" : ""}>
                <article className="flex flex-col gap-4">
                  <Avatar
                    nome={p.nome}
                    foto={p.foto}
                    parallax
                    className="aspect-[3/4] w-full rounded-3xl text-[clamp(48px,12vw,96px)]"
                  />
                  <div className="flex flex-col gap-1 pt-2">
                    <h3 className="m-0 text-[24px] font-normal tracking-[-0.03em] text-navy sm:text-[28px]">{p.nome}</h3>
                    <span className="kicker text-brand">{p.cargo}</span>
                    <p className="m-0 mt-2 text-[16px] leading-[1.55] text-ash">{p.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
