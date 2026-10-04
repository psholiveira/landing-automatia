"use client";

import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { contato, hero, stats } from "@/content/site";
import Counter from "./Counter";
import { WhatsAppIcon } from "./WhatsApp";

gsap.registerPlugin(SplitText);

/** Manchas de luz do fundo: posição, tamanho e cor de cada uma. */
const LUZES = [
  { cls: "-right-[12%] -top-[22%] h-[460px] w-[460px] sm:h-[680px] sm:w-[680px] lg:h-[860px] lg:w-[860px]", cor: "rgba(26,115,200,0.6)" },
  { cls: "-left-[18%] top-[30%] h-[360px] w-[360px] sm:h-[520px] sm:w-[520px] lg:h-[640px] lg:w-[640px]", cor: "rgba(111,171,232,0.28)" },
  { cls: "left-[35%] -bottom-[25%] h-[320px] w-[320px] sm:h-[460px] sm:w-[460px] lg:h-[560px] lg:w-[560px]", cor: "rgba(0,170,220,0.22)" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));

    // Animações contínuas: só rodam com o herói na tela, para não gastar bateria à toa.
    const loops: gsap.core.Animation[] = [];
    let observer: IntersectionObserver | undefined;
    let tirarMouse: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // "words" junto: cada palavra vira um bloco inteiro e o navegador não quebra "enquan-to"
      const letras = SplitText.create(q("[data-split]"), { type: "words,chars" });
      gsap.set(letras.chars, { transformPerspective: 600, transformOrigin: "50% 100%" });

      // ── entrada: começa enquanto a cortina (CSS) ainda está abrindo ──
      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.35 })
        .from(q("[data-aurora]"), { opacity: 0, scale: 1.35, duration: 2.4, ease: "power2.out" }, 0)
        .from(q("[data-col]"), { scaleY: 0, transformOrigin: "top", duration: 1.4, stagger: 0.07, ease: "power3.inOut" }, 0)
        .from(letras.chars, { yPercent: 110, rotateX: -85, opacity: 0, filter: "blur(10px)", duration: 1.1, stagger: 0.018 }, 0.1)
        .fromTo(
          q("[data-destaque]"),
          { clipPath: "inset(-20% 100% -30% 0)" },
          { clipPath: "inset(-20% 0% -30% 0)", duration: 1.1, ease: "power3.inOut" },
          0.45
        )
        .to(q("[data-kicker]"), { opacity: 1, duration: 0.8 }, 0.2)
        .fromTo(q("[data-kicker]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut" }, 0.2)
        .fromTo(
          q("[data-feixe]"),
          { xPercent: -130, skewX: -20, opacity: 1 },
          { xPercent: 430, duration: 1.7, ease: "power2.inOut" },
          0.55
        )
        .fromTo(q("[data-sub]"), { y: 30, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 }, 0.75)
        .fromTo(q("[data-cta]"), { y: 36 }, { y: 0, opacity: 1, duration: 0.9 }, 0.85)
        .fromTo(q("[data-stat]"), { y: 28 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0.95);

      // ── luz difusa respirando e reflexo periódico no "você dorme." ──
      q("[data-luz]").forEach((luz, i) => {
        loops.push(
          gsap.to(luz, {
            x: i % 2 ? 70 : -60,
            y: i === 1 ? -50 : 60,
            scale: 1.15,
            duration: 9 + i * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            paused: true,
          })
        );
      });
      loops.push(
        gsap.fromTo(
          q("[data-destaque]"),
          { backgroundPosition: "100% 0" },
          { backgroundPosition: "0% 0", duration: 1.6, ease: "power2.inOut", delay: 1.6, repeat: -1, repeatDelay: 4.5, paused: true }
        )
      );

      // ── rolagem: o texto sobe mais rápido que o fundo e se apaga (parallax) ──
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } })
        .to(q("[data-conteudo]"), { y: -110, opacity: 0.1, ease: "none" }, 0)
        .to(q("[data-aurora-scroll]"), { yPercent: 22, scale: 1.18, ease: "none" }, 0)
        .to(q("[data-grade]"), { yPercent: 10, ease: "none" }, 0);

      // ── a luz segue o mouse de leve (só em quem tem mouse) ──
      const alvo = el.querySelector<HTMLElement>("[data-aurora-mouse]");
      if (alvo && window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(alvo, "x", { duration: 1.4, ease: "power3" });
        const yTo = gsap.quickTo(alvo, "y", { duration: 1.4, ease: "power3" });
        const mover = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo(((e.clientX - r.left) / r.width - 0.5) * 80);
          yTo(((e.clientY - r.top) / r.height - 0.5) * 50);
        };
        el.addEventListener("pointermove", mover);
        tirarMouse = () => el.removeEventListener("pointermove", mover);
      }
    }, el);

    observer = new IntersectionObserver(([entry]) => {
      loops.forEach((l) => (entry.isIntersecting ? l.play() : l.pause()));
    });
    observer.observe(el);

    return () => {
      observer?.disconnect();
      tirarMouse?.();
      ctx.revert();
    };
  }, []);

  return (
    <header ref={root} id="topo" className="relative overflow-hidden border-b-2 border-ink bg-navy text-white">
      {/* ── fundo: luz difusa, colunas, vinheta e granulado ── */}
      <div data-aurora className="pointer-events-none absolute inset-0">
        <div data-aurora-mouse className="absolute inset-0">
          <div data-aurora-scroll className="absolute inset-0">
            {LUZES.map((l, i) => (
              <div
                key={i}
                data-luz
                className={"absolute rounded-full " + l.cls}
                style={{ background: `radial-gradient(circle, ${l.cor} 0%, rgba(11,42,91,0) 68%)` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div data-grade className="pointer-events-none absolute inset-0 grid grid-cols-3 sm:grid-cols-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} data-col className={"border-r border-white/10" + (i > 1 ? " hidden sm:block" : "")} />
        ))}
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_45%,rgba(3,12,30,0.6)_100%)]" />
      <div aria-hidden className="grao pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

      {/* feixe de luz que cruza a tela uma vez na entrada */}
      <div
        aria-hidden
        data-feixe
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0"
      />

      {/* cortina de abertura (CSS puro — ver .cortina em globals.css) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
        <div className="cortina absolute inset-x-0 top-0 h-1/2 origin-top bg-[#030d22]" />
        <div className="cortina absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-[#030d22]" />
        <div className="cortina-linha absolute inset-x-0 top-1/2 h-px bg-sky shadow-[0_0_24px_4px_rgba(111,171,232,0.6)]" />
      </div>

      {/* ── conteúdo ── */}
      <div data-conteudo className="shell relative pt-[80px] sm:pt-[104px] lg:pt-[110px]">
        <div data-kicker className="mb-4 flex items-start gap-3 entra sm:mb-11 sm:items-center sm:gap-3.5">
          <span className="mt-[5px] h-2 w-2 shrink-0 animate-blink bg-sky sm:mt-0 sm:h-[9px] sm:w-[9px]" />
          <span className="kicker text-skyMuted">{hero.kicker}</span>
        </div>

        <h1 className="m-0 max-w-[1240px] text-[clamp(38px,10.5vw,64px)] font-extrabold leading-[0.92] tracking-[-0.035em] md:text-[8.2vw] md:leading-[0.86] md:tracking-[-0.04em]">
          {hero.linhas.map((linha) => (
            <span key={linha} className="block overflow-hidden pb-[0.04em]">
              <span data-split className="block">
                {linha}
              </span>
            </span>
          ))}
          <span className="block pb-[0.06em]">
            <span data-destaque className="brilho inline-block pr-[0.06em]">
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
              href={contato.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 overflow-hidden bg-white px-5 py-5 text-[16px] font-extrabold tracking-[-0.01em] text-navy shadow-[6px_6px_0_rgba(111,171,232,0.45)] transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-sky hover:shadow-[8px_8px_0_rgba(111,171,232,0.55)] sm:gap-4 sm:px-7 sm:py-6 sm:text-[21px]"
            >
              <WhatsAppIcon className="h-6 w-6 shrink-0 text-[#1fa855] group-hover:text-navy sm:h-7 sm:w-7" />
              {hero.ctaPrimario}
              <span className="ml-auto font-mono font-normal transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#servicos"
              className="flex items-center justify-between gap-4 border-2 border-white/45 px-[18px] py-[18px] text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 sm:gap-5 sm:px-[26px] sm:py-[22px] sm:text-[19px]"
            >
              {hero.ctaSecundario} <span className="font-mono font-normal">↓</span>
            </a>
            <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-1.5 p-0 font-mono text-[11px] tracking-[0.06em] text-skyPale sm:text-[13px]">
              {hero.garantias.map((g) => (
                <li key={g} className="flex items-center gap-1.5">
                  <span aria-hidden className="text-sky">✓</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t-2 border-white/35">
        <div className="shell grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.rotulo}
              data-stat
              className={
                "entra flex flex-col gap-1.5 border-r border-white/20 py-7 pr-4 sm:gap-2 sm:pr-8 md:py-10 md:pb-11 " +
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
