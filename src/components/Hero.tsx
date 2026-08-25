"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { hero, stats } from "@/content/site";
import Counter from "./Counter";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const q = (s: string) => Array.from(el.querySelectorAll(s));

    let glowLoop: gsap.core.Tween | undefined;
    let observer: IntersectionObserver | undefined;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(q("[data-line]"), { yPercent: 118, duration: 1.15, stagger: 0.09 })
        .to(q("[data-kicker]"), { opacity: 1, duration: 0.6 }, 0.15)
        .fromTo(q("[data-sub]"), { y: 24 }, { y: 0, opacity: 1, duration: 0.9 }, 0.5)
        .fromTo(q("[data-cta]"), { y: 28 }, { y: 0, opacity: 1, duration: 0.8 }, 0.65)
        .to(q("[data-grid]"), { opacity: 1, duration: 1.4 }, 0.1);

      // Loop infinito: pausado enquanto o herói está fora da viewport, para não
      // gastar CPU/GPU com uma seção que o usuário nem está vendo.
      glowLoop = gsap.to(q("[data-glow]"), {
        y: 60,
        x: -40,
        scale: 1.12,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true,
      });
      gsap.to(q("[data-glow]"), {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) glowLoop?.play();
        else glowLoop?.pause();
      },
      { threshold: 0 }
    );
    observer.observe(el);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <header ref={root} id="topo" className="relative overflow-hidden border-b-2 border-ink bg-navy text-white">
      <div data-grid className="pointer-events-none absolute inset-0 grid grid-cols-6 opacity-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-r border-white/10" />
        ))}
      </div>
      <div
        data-glow
        className="pointer-events-none absolute -right-[10%] -top-[20%] h-[780px] w-[780px]"
        style={{ background: "radial-gradient(circle, rgba(26,115,200,0.55) 0%, rgba(11,42,91,0) 68%)" }}
      />

      <div className="shell relative pt-[110px]">
        <div data-kicker className="mb-11 flex items-center gap-3.5 opacity-0">
          <span className="h-[9px] w-[9px] animate-blink bg-sky" />
          <span className="kicker text-skyMuted">{hero.kicker}</span>
        </div>

        <h1 className="m-0 max-w-[1240px] text-[8.2vw] font-extrabold leading-[0.86] tracking-[-0.04em]">
          {hero.linhas.map((linha) => (
            <span key={linha} className="block overflow-hidden">
              <span data-line className="block">
                {linha}
              </span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <span data-line className="block text-sky">
              {hero.linhaDestaque}
            </span>
          </span>
        </h1>

        <div className="mt-16 grid grid-cols-1 items-end gap-16 pb-[72px] lg:grid-cols-[1.1fr_1fr]">
          <p data-sub className="m-0 max-w-[620px] text-2xl font-medium leading-[1.35] text-white/80 opacity-0">
            {hero.subtitulo}
          </p>
          <div data-cta className="flex flex-col gap-[18px] opacity-0">
            <a
              href="#contato"
              className="flex items-center justify-between gap-5 bg-white px-7 py-6 text-[21px] font-extrabold tracking-[-0.01em] text-navy transition-colors hover:bg-sky"
            >
              {hero.ctaPrimario} <span className="font-mono font-normal">→</span>
            </a>
            <a
              href="#servicos"
              className="flex items-center justify-between gap-5 border-2 border-white/45 px-[26px] py-[22px] text-[19px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {hero.ctaSecundario} <span className="font-mono font-normal">↓</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t-2 border-white/35">
        <div className="shell grid grid-cols-2 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.rotulo} className="flex flex-col gap-2 border-r border-white/20 py-10 pb-11 pr-8">
              <Counter
                valor={s.valor}
                sufixo={s.sufixo}
                className="block text-[62px] font-extrabold leading-none tracking-[-0.04em] text-white"
              />
              <div className="font-mono text-[13px] tracking-[0.1em] text-skyMuted">{s.rotulo}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
