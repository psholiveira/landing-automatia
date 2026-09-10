"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { contato, naoEncontrada, navLinks } from "@/content/site";

export default function NaoEncontrada() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const q = (s: string) => Array.from(el.querySelectorAll(s));

    // Mesma coreografia de entrada do herói: as linhas sobem por trás de uma
    // máscara e o resto entra em seguida. Tudo aqui está acima da dobra, então
    // não há gatilho de scroll — a timeline roda de imediato.
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(q("[data-topo]"), { opacity: 1, duration: 0.6 }, 0)
        .to(q("[data-kicker]"), { opacity: 1, duration: 0.6 }, 0.15)
        .from(q("[data-line]"), { yPercent: 118, duration: 1.15, stagger: 0.09 }, 0.2)
        .fromTo(q("[data-sub]"), { y: 24 }, { y: 0, opacity: 1, duration: 0.9 }, 0.6)
        .fromTo(q("[data-cta]"), { y: 28 }, { y: 0, opacity: 1, duration: 0.8 }, 0.72)
        .fromTo(q("[data-atalhos]"), { y: 20 }, { y: 0, opacity: 1, duration: 0.7 }, 0.85)
        .to(q("[data-grid]"), { opacity: 1, duration: 1.4 }, 0.1);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy text-white"
    >
      <div data-grid className="pointer-events-none absolute inset-0 grid grid-cols-3 entra sm:grid-cols-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={"border-r border-white/10" + (i > 1 ? " hidden sm:block" : "")} />
        ))}
      </div>
      <div
        className="pointer-events-none absolute -right-[10%] -top-[20%] h-[420px] w-[420px] sm:h-[600px] sm:w-[600px] lg:h-[780px] lg:w-[780px]"
        style={{ background: "radial-gradient(circle, rgba(26,115,200,0.55) 0%, rgba(11,42,91,0) 68%)" }}
      />

      <div data-topo className="shell relative flex items-center justify-between gap-4 py-6 entra sm:py-8">
        <Link href="/" aria-label="AutomatIA — início" className="shrink-0">
          <Image src="/logo-white.png" alt="AutomatIA" width={727} height={169} priority className="h-6 w-auto sm:h-7" />
        </Link>
        <span className="font-mono text-[11px] tracking-[0.14em] text-skyMuted sm:text-[13px] sm:tracking-[0.16em]">
          STATUS {naoEncontrada.codigo}
        </span>
      </div>

      <div className="shell relative flex flex-1 flex-col justify-center py-10 sm:py-14">
        <div data-kicker className="flex items-start gap-3 entra sm:items-center sm:gap-3.5">
          <span className="mt-[5px] h-2 w-2 shrink-0 animate-blink bg-sky sm:mt-0 sm:h-[9px] sm:w-[9px]" />
          <span className="kicker text-skyMuted">{naoEncontrada.kicker}</span>
        </div>

        <div className="mt-7 flex items-end gap-3 sm:mt-9 sm:gap-5">
          <span className="block overflow-hidden">
            <span
              data-line
              className="block text-[clamp(96px,28vw,180px)] font-extrabold leading-[0.78] tracking-[-0.05em] text-sky md:text-[15vw]"
            >
              {naoEncontrada.codigo}
            </span>
          </span>
          <span
            aria-hidden
            className="mb-[0.1em] h-[clamp(16px,4.6vw,30px)] w-[clamp(16px,4.6vw,30px)] shrink-0 animate-blink bg-sky md:h-[2.4vw] md:w-[2.4vw]"
          />
        </div>

        <h1 className="m-0 mt-6 max-w-[1000px] text-[clamp(32px,9vw,56px)] font-extrabold leading-[0.94] tracking-[-0.035em] sm:mt-8 md:text-[6vw] md:leading-[0.88] md:tracking-[-0.04em]">
          {naoEncontrada.linhas.map((linha) => (
            <span key={linha} className="block overflow-hidden">
              <span data-line className="block">
                {linha}
              </span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <span data-line className="block">
              {naoEncontrada.linhaDestaque}
            </span>
          </span>
        </h1>

        <div className="mt-8 grid grid-cols-1 items-end gap-8 sm:mt-11 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <p data-sub className="m-0 max-w-[560px] text-[17px] font-medium leading-[1.4] text-white/80 entra sm:text-xl lg:text-[22px] lg:leading-[1.35]">
            {naoEncontrada.texto}
          </p>

          <div data-cta className="flex flex-col gap-3.5 entra sm:gap-[18px]">
            <Link
              href="/"
              className="flex items-center justify-between gap-4 bg-white px-5 py-5 text-[16px] font-extrabold tracking-[-0.01em] text-navy transition-colors hover:bg-sky sm:gap-5 sm:px-7 sm:py-6 sm:text-[21px]"
            >
              {naoEncontrada.ctaPrimario} <span className="font-mono font-normal">→</span>
            </Link>
            <a
              href={contato.emailHref}
              className="flex items-center justify-between gap-4 border-2 border-white/45 px-[18px] py-[18px] text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 sm:gap-5 sm:px-[26px] sm:py-[22px] sm:text-[19px]"
            >
              {naoEncontrada.ctaSecundario} <span className="font-mono font-normal">→</span>
            </a>
          </div>
        </div>
      </div>

      <div data-atalhos className="shell relative flex flex-col gap-4 border-t-2 border-white/35 py-7 entra sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-9">
        <span className="font-mono text-[11px] tracking-[0.14em] text-skyMuted sm:text-[13px] sm:tracking-[0.16em]">
          {naoEncontrada.atalhos}
        </span>
        <nav className="flex flex-wrap gap-x-7 gap-y-3 sm:gap-x-11">
          {navLinks.map((l) => (
            // Os links do site são âncoras de seção; a partir de uma rota
            // inexistente eles precisam do "/" na frente para voltar à home
            // antes de rolar até a seção.
            <Link
              key={l.href}
              href={"/" + l.href}
              className="font-mono text-[12px] tracking-[0.1em] text-white transition-colors hover:text-sky sm:text-[13px]"
            >
              {l.rotulo.toUpperCase()} →
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
