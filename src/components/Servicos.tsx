import Reveal from "./Reveal";
import { servicos } from "@/content/site";

export default function Servicos() {
  return (
    <section id="servicos" className="border-b-2 border-ink">
      <div className="shell pt-[110px]">
        <div className="grid grid-cols-1 items-end gap-16 border-b-2 border-ink pb-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <div className="kicker text-brand">{servicos.kicker}</div>
            <h2 className="m-0 text-[76px] font-extrabold leading-[0.9] tracking-[-0.035em]">
              {servicos.titulo[0]}
              <br />
              {servicos.titulo[1]}
            </h2>
          </Reveal>
          <Reveal className="max-w-[520px] text-[21px] font-medium leading-[1.4] text-ink/75">{servicos.intro}</Reveal>
        </div>
      </div>

      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {servicos.itens.map((s, i) => (
            <Reveal key={s.n} y={60} duration={0.85} delay={(i % 3) * 0.08} className="border-b-2 border-r border-rule">
              {/* o lift do hover vive num filho: o wrapper do Reveal tem transform do GSAP */}
              <div className="flex h-full flex-col gap-4 pb-[52px] pr-10 pt-11 transition-transform duration-200 hover:-translate-y-1 hover:bg-surface">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-[13px] text-brand">{s.n}</span>
                  <span className="h-0.5 flex-1 bg-brand/35" />
                </div>
                <h3 className="m-0 pr-6 text-[32px] font-extrabold leading-[1.02] tracking-[-0.025em]">{s.nome}</h3>
                <p className="m-0 pr-10 text-[17px] leading-[1.45] text-ash">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
