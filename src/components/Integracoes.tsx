import { integracoes } from "@/content/site";

function Lista({ copia }: { copia?: boolean }) {
  return (
    <ul
      aria-hidden={copia}
      className={
        "m-0 flex shrink-0 list-none items-center gap-8 p-0 pr-8 sm:gap-12 sm:pr-12 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:gap-y-3 motion-reduce:px-5" +
        (copia ? " motion-reduce:hidden" : "")
      }
    >
      {integracoes.itens.map((nome) => (
        <li key={nome} className="flex items-center gap-8 whitespace-nowrap text-[19px] font-extrabold tracking-[-0.02em] text-ink/70 sm:gap-12 sm:text-[26px]">
          {nome}
          <span aria-hidden className="h-2 w-2 bg-brand" />
        </li>
      ))}
    </ul>
  );
}

export default function Integracoes() {
  return (
    <section aria-label={integracoes.rotulo} className="border-b-2 border-ink bg-white">
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="shell flex items-center pb-0 pt-6 lg:mx-0 lg:w-auto lg:shrink-0 lg:border-r-2 lg:border-ink lg:py-8">
          <p className="kicker m-0 text-brand">{integracoes.rotulo}</p>
        </div>
        {/* Duas cópias lado a lado: a animação anda metade da largura e recomeça sem emenda. */}
        <div className="group relative flex overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] lg:py-8">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap">
            <Lista />
            <Lista copia />
          </div>
        </div>
      </div>
    </section>
  );
}
