import Reveal from "./Reveal";
import Avatar from "./Avatar";
import { AvisoRascunho, visivel } from "./Rascunho";
import { equipe } from "@/content/site";
import Titulo from "./Titulo";

export default function Equipe() {
  if (!visivel(equipe.rascunho)) return null;

  return (
    <section id="equipe" className="border-b-2 border-ink bg-white">
      <div className="shell section-y">
        <AvisoRascunho rascunho={equipe.rascunho} />

        <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal className="flex flex-col gap-4 sm:gap-5 lg:sticky lg:top-28 lg:self-start">
            <div className="kicker text-brand">{equipe.kicker}</div>
            <Titulo className="m-0 text-[clamp(30px,8vw,52px)] font-extrabold leading-[0.98] tracking-[-0.03em] lg:text-[64px] lg:leading-[0.92] lg:tracking-[-0.038em]">
              {equipe.titulo}
            </Titulo>
            <p className="m-0 mt-2 max-w-[440px] text-[16px] font-medium leading-[1.45] text-ink/75 sm:text-lg lg:text-xl lg:leading-[1.4]">
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
                    className="aspect-[3/4] w-full text-[clamp(48px,12vw,96px)] shadow-[8px_8px_0_#201e1d]"
                  />
                  <div className="flex flex-col gap-1 pt-2">
                    <h3 className="m-0 text-[24px] font-extrabold tracking-[-0.025em] sm:text-[28px]">{p.nome}</h3>
                    <span className="font-mono text-[11px] tracking-[0.12em] text-brand sm:text-xs">{p.cargo.toUpperCase()}</span>
                    <p className="m-0 mt-2 text-[16px] font-medium leading-[1.45] text-ink/75">{p.bio}</p>
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
