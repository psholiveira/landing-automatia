"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/content/site";
import OndaPontos from "./OndaPontos";
import { corDaLetra } from "@/lib/utils";

const MARCA = "AutomatIA";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.1 })
        .from(q("[data-letra]"), { yPercent: 55, opacity: 0, duration: 1.2, stagger: 0.045 }, 0)
        .fromTo(q("[data-onda]"), { y: 80 }, { y: 0, opacity: 1, duration: 2, ease: "power2.out" }, 0.1)
        .fromTo(q("[data-tagline]"), { y: 18 }, { y: 0, opacity: 1, duration: 1 }, 0.45);

      // ao rolar, a marca se afasta e a onda sobe por cima dela
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } })
        .to(q("[data-conteudo]"), { y: -90, opacity: 0, ease: "none" }, 0)
        .to(q("[data-onda-scroll]"), { yPercent: -18, ease: "none" }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={root}
      id="topo"
      className="relative flex h-[100svh] max-h-[1000px] min-h-[640px] flex-col overflow-hidden bg-white"
    >
      {/* centralizada na faixa branca acima da onda; o pt desconta a altura do navbar */}
      <div data-conteudo className="shell relative z-10 flex h-[60%] flex-col items-center justify-center pt-16 text-center sm:h-[58%]">
        <h1 className="m-0 font-normal">
          <span className="sr-only">{MARCA} — </span>
          <span aria-hidden className="block whitespace-nowrap text-[clamp(56px,18vw,180px)] leading-[1] tracking-[-0.035em]">
            {MARCA.split("").map((l, i) => (
              <span key={i} data-letra className="inline-block" style={{ color: corDaLetra(i, MARCA.length) }}>
                {l}
              </span>
            ))}
          </span>
          <span
            data-tagline
            className="entra mt-4 block text-[clamp(20px,2.5vw,34px)] leading-[1.25] tracking-[-0.01em] text-ash sm:mt-6"
          >
            {hero.linhas.join(" ")}{" "}
            <span className="bg-gradient-to-r from-brand to-[#5b4fd6] bg-clip-text text-transparent">{hero.linhaDestaque}</span>
          </span>
        </h1>
      </div>

      {/* onda de pontos: se apaga em direção ao topo para não brigar com o slogan */}
      <div data-onda className="entra pointer-events-none absolute inset-x-0 bottom-0 h-[40%] sm:h-[45%]">
        <div data-onda-scroll className="h-full w-full">
          <OndaPontos className="h-full w-full" />
        </div>
      </div>
    </header>
  );
}
