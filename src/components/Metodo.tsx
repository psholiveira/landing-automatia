import Reveal from "./Reveal";
import { metodo } from "@/content/site";

export default function Metodo() {
  return (
    <section id="metodo" className="border-b-2 border-ink">
      <div className="shell section-y">
        <Reveal className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-5 lg:mb-[72px]">
          <div className="kicker text-brand">{metodo.kicker}</div>
          <h2 className="m-0 max-w-[900px] text-[clamp(30px,8vw,52px)] font-extrabold leading-[0.98] tracking-[-0.03em] lg:text-[82px] lg:leading-[0.9] lg:tracking-[-0.038em]">
            {metodo.titulo}
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {metodo.etapas.map((e) => (
            <Reveal
              key={e.n}
              x={-60}
              y={0}
              duration={0.9}
              className="grid grid-cols-1 items-start gap-2.5 border-t-2 border-ink py-7 transition-colors duration-200 hover:bg-surface sm:gap-4 sm:py-8 lg:grid-cols-[120px_340px_1fr] lg:gap-10 lg:py-9"
            >
              <div className="font-mono text-[12px] tracking-[0.1em] text-brand sm:text-[15px] sm:tracking-normal lg:pt-2">
                {e.n}
              </div>
              <h3 className="m-0 text-[26px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[32px] lg:text-[42px] lg:leading-[0.95] lg:tracking-[-0.03em]">
                {e.titulo}
              </h3>
              <p className="m-0 max-w-[640px] text-[16px] font-medium leading-[1.45] text-ink/75 sm:text-lg lg:text-xl lg:leading-[1.4]">
                {e.texto}
              </p>
            </Reveal>
          ))}
          <div className="border-t-2 border-ink" />
        </div>
      </div>
    </section>
  );
}
