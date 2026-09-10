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
      <div data-grid className="pointer-events-none absolute inset-0 grid grid-cols-3 entra sm:grid-cols-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={"border-r border-white/10" + (i > 1 ? " hidden sm:block" : "")} />
        ))}
      </div>
      <div
        data-glow
        className="pointer-events-none absolute -right-[10%] -top-[20%] h-[420px] w-[420px] sm:h-[600px] sm:w-[600px] lg:h-[780px] lg:w-[780px]"
        style={{ background: "radial-gradient(circle, rgba(26,115,200,0.55) 0%, rgba(11,42,91,0) 68%)" }}
      />

      <div className="shell relative pt-[80px] sm:pt-[104px] lg:pt-[110px]">
        <div data-kicker className="mb-4 flex items-start gap-3 entra sm:mb-11 sm:items-center sm:gap-3.5">
          <span className="mt-[5px] h-2 w-2 shrink-0 animate-blink bg-sky sm:mt-0 sm:h-[9px] sm:w-[9px]" />
          <span className="kicker text-skyMuted">{hero.kicker}</span>
        </div>

        <h1 className="m-0 max-w-[1240px] text-[clamp(38px,10.5vw,64px)] font-extrabold leading-[0.92] tracking-[-0.035em] md:text-[8.2vw] md:leading-[0.86] md:tracking-[-0.04em]">
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

        <div className="mt-6 grid grid-cols-1 gap-6 pb-12 sm:mt-14 sm:gap-10 sm:pb-14 lg:mt-16 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16 lg:pb-[72px]">
          <p data-sub className="order-2 m-0 max-w-[620px] text-[17px] font-medium leading-[1.4] text-white/80 entra sm:text-xl lg:order-none lg:text-2xl lg:leading-[1.35]">
            {hero.subtitulo}
          </p>
          <div data-cta className="order-1 flex flex-col gap-3.5 entra sm:gap-[18px] lg:order-none">
            <a
              href="#contato"
              className="flex items-center justify-between gap-4 bg-white px-5 py-5 text-[16px] font-extrabold tracking-[-0.01em] text-navy transition-colors hover:bg-sky sm:gap-5 sm:px-7 sm:py-6 sm:text-[21px]"
            >
              {hero.ctaPrimario} <span className="font-mono font-normal">→</span>
            </a>
            <a
              href="#servicos"
              className="flex items-center justify-between gap-4 border-2 border-white/45 px-[18px] py-[18px] text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 sm:gap-5 sm:px-[26px] sm:py-[22px] sm:text-[19px]"
            >
              {hero.ctaSecundario} <span className="font-mono font-normal">↓</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t-2 border-white/35">
        <div className="shell grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.rotulo}
              className={
                "flex flex-col gap-1.5 border-r border-white/20 py-7 pr-4 sm:gap-2 sm:pr-8 md:py-10 md:pb-11 " +
                (i < 2 ? "border-b border-white/20 md:border-b-0" : "")
              }
            >
              <Counter
                valor={s.valor}
                sufixo={s.sufixo}
                className="block text-[34px] font-extrabold leading-none tracking-[-0.04em] text-white sm:text-[46px] lg:text-[62px]"
              />
              <div className="font-mono text-[11px] tracking-[0.1em] text-skyMuted sm:text-[13px]">{s.rotulo}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
