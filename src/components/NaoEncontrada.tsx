"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { corDaLetra } from "@/lib/utils";
import { contato, naoEncontrada, navLinks } from "@/content/site";
import BtnConteudo from "./BtnConteudo";
import OndaPontos from "./OndaPontos";

/** Mesmo mundo do herói: branco, o código em degradê por letra e a onda de pontos embaixo. */
export default function NaoEncontrada() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const q = (s: string) => Array.from(el.querySelectorAll(s));

    // a coreografia do herói: os dígitos sobem, a onda chega e o resto entra em seguida
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.1 })
        .from(q("[data-digito]"), { yPercent: 55, opacity: 0, duration: 1.2, stagger: 0.07 }, 0)
        .fromTo(q("[data-onda]"), { y: 80 }, { y: 0, opacity: 1, duration: 2, ease: "power2.out" }, 0.1)
        .fromTo(q("[data-entra]"), { y: 18 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.4);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white">
      <div className="shell relative z-10 py-6 sm:py-8">
        <Link href="/" aria-label="AutomatIA — início" className="inline-block">
          <Image src="/logo.png" alt="AutomatIA" width={727} height={169} priority className="h-6 w-auto sm:h-7" />
        </Link>
      </div>

      {/* o pb reserva a faixa da onda, como no herói */}
      <div className="shell relative z-10 flex flex-1 flex-col items-center justify-center pb-[28svh] pt-4 text-center">
        <p aria-hidden className="m-0 whitespace-nowrap text-[clamp(120px,30vw,240px)] leading-[0.9] tracking-[-0.05em]">
          {naoEncontrada.codigo.split("").map((d, i, todos) => (
            <span key={i} data-digito className="inline-block" style={{ color: corDaLetra(i, todos.length) }}>
              {d}
            </span>
          ))}
        </p>

        <h1 data-entra className="entra m-0 mt-4 text-[clamp(26px,4.6vw,44px)] font-normal leading-[1.15] tracking-[-0.03em] text-navy sm:mt-6">
          {naoEncontrada.linhas.join(" ")} <span className="text-brand">{naoEncontrada.linhaDestaque}</span>
        </h1>

        <p data-entra className="entra intro-secao mt-4 max-w-[520px] sm:mt-5">{naoEncontrada.texto}</p>

        <div data-entra className="entra mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row">
          <Link href="/" className="btn btn-escuro w-full sm:w-auto">
            <BtnConteudo seta="direita">{naoEncontrada.ctaPrimario}</BtnConteudo>
          </Link>
          <a href={contato.emailHref} className="btn btn-contorno w-full sm:w-auto">
            <BtnConteudo>{naoEncontrada.ctaSecundario}</BtnConteudo>
          </a>
        </div>

        <nav data-entra aria-label={naoEncontrada.atalhos} className="entra mt-10 flex flex-col items-center gap-3 sm:mt-12">
          <span className="kicker text-ash">{naoEncontrada.atalhos}</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              // Os links do site são âncoras de seção; a partir de uma rota
              // inexistente eles precisam do "/" na frente para voltar à home
              // antes de rolar até a seção.
              <Link key={l.href} href={"/" + l.href} className="text-[15px] text-navy transition-colors hover:text-brand">
                <BtnConteudo>{l.rotulo}</BtnConteudo>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div data-onda className="entra pointer-events-none absolute inset-x-0 bottom-0 h-[34%]">
        <OndaPontos className="h-full w-full" />
      </div>
    </main>
  );
}
