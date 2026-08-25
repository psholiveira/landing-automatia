import Reveal from "./Reveal";
import { metodo } from "@/content/site";

export default function Metodo() {
  return (
    <section id="metodo" className="border-b-2 border-ink">
      <div className="shell py-[110px]">
        <Reveal className="mb-[72px] flex flex-col gap-5">
          <div className="kicker text-brand">{metodo.kicker}</div>
          <h2 className="m-0 max-w-[900px] text-[82px] font-extrabold leading-[0.9] tracking-[-0.038em]">{metodo.titulo}</h2>
        </Reveal>

        <div className="flex flex-col">
          {metodo.etapas.map((e) => (
            <Reveal
              key={e.n}
              x={-60}
              y={0}
              duration={0.9}
              className="grid grid-cols-1 items-start gap-10 border-t-2 border-ink py-9 transition-colors duration-200 hover:bg-surface lg:grid-cols-[120px_340px_1fr]"
            >
              <div className="pt-2 font-mono text-[15px] text-brand">{e.n}</div>
              <h3 className="m-0 text-[42px] font-extrabold leading-[0.95] tracking-[-0.03em]">{e.titulo}</h3>
              <p className="m-0 max-w-[640px] text-xl font-medium leading-[1.4] text-ink/75">{e.texto}</p>
            </Reveal>
          ))}
          <div className="border-t-2 border-ink" />
        </div>
      </div>
    </section>
  );
}
