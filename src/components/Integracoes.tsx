import Image from "next/image";
import { integracoes } from "@/content/site";

/**
 * Altura de cada logo para que todas pesem parecido: logos largas ficam mais
 * baixas, ícones quadrados mais altos (área ~constante), com teto para os ícones.
 */
const altura = (proporcao: number) => Math.round(Math.min(34, 26 * Math.sqrt(3 / proporcao)));

/**
 * Uma volta do letreiro. As logos aparecem duas vezes dentro dela para a volta
 * ser mais larga que qualquer tela (uma vez só mede ~1.800px e abriria um buraco
 * em monitores grandes). A repetição é só visual: fica fora do leitor de tela e
 * some quando o movimento está desligado.
 */
function Volta({ copia }: { copia?: boolean }) {
  return (
    <ul
      aria-hidden={copia}
      className={
        "m-0 flex shrink-0 list-none items-center gap-14 p-0 pr-14 sm:gap-20 sm:pr-20 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8 motion-reduce:px-5" +
        (copia ? " motion-reduce:hidden" : "")
      }
    >
      {[0, 1].map((rep) =>
        integracoes.itens.map((it) => {
          const h = altura(it.proporcao);
          const decorativa = copia || rep > 0;
          return (
            <li
              key={`${rep}-${it.nome}`}
              aria-hidden={rep > 0 || undefined}
              className={"shrink-0" + (rep > 0 ? " motion-reduce:hidden" : "")}
              style={{ "--h": `${h}px` } as React.CSSProperties}
            >
              <Image
                src={it.logo}
                alt={decorativa ? "" : it.nome}
                width={Math.round(h * it.proporcao)}
                height={h}
                // fora da tela o letreiro ainda vai trazê-las: carregar já evita que surjam do nada
                loading="eager"
                className="h-[calc(var(--h)*0.8)] w-auto sm:h-[var(--h)]"
              />
            </li>
          );
        })
      )}
    </ul>
  );
}

export default function Integracoes() {
  return (
    <section aria-label={integracoes.rotulo} className="border-y border-ink/[0.07] bg-white py-10 sm:py-14">
      <p className="kicker shell m-0 mb-8 text-center text-ash sm:mb-10">{integracoes.rotulo}</p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {/*
         * Duas voltas idênticas lado a lado: a animação anda metade do trilho (uma
         * volta exata) e recomeça sem emenda. O shrink-0 é o que garante isso — sem
         * ele o flex comprimia o trilho, os -50% caíam no meio da volta e a faixa
         * pulava de volta ao início.
         */}
        <div className="flex w-max shrink-0 animate-marquee motion-reduce:w-auto motion-reduce:shrink motion-reduce:animate-none motion-reduce:flex-wrap">
          <Volta />
          <Volta copia />
        </div>
      </div>
    </section>
  );
}
