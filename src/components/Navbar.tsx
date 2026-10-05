"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { BadgeCheck, Bot, LayoutGrid, Plus, Route, type LucideIcon } from "lucide-react";
import { menuLinks, navLinks } from "@/content/site";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import MenuOverlay from "./MenuOverlay";

/** Ícone de cada link — puramente visual, por isso mora aqui e não em content/site.ts. */
const NAV_ICONS: Record<string, LucideIcon> = {
  "#servicos": LayoutGrid,
  "#cases": BadgeCheck,
  "#metodo": Route,
  "#agentes": Bot,
};

/** Todas as seções que algum menu aponta — o navbar usa um subconjunto. */
const SECOES = menuLinks.map((m) => m.href.slice(1));

/** Mola das pílulas: assenta rápido, com um quase nada de sobra. */
const MOLA = { type: "spring", duration: 0.5, bounce: 0.18 } as const;

/** Seção que cruza o meio da tela agora — alimenta o destaque do navbar e do menu. */
function useSecaoAtiva() {
  const [ativa, setAtiva] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setAtiva(e.target.id);
          else setAtiva((a) => (a === e.target.id ? null : a));
        }),
      // uma faixa fina no meio da viewport: só uma seção cabe nela por vez
      { rootMargin: "-48% 0px -51% 0px" }
    );
    SECOES.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return ativa;
}

function Logo() {
  return (
    <a href="#topo" aria-label="AutomatIA — início" className="flex shrink-0 items-center px-1 sm:px-2">
      <Image
        src="/logo.png"
        alt="AutomatIA"
        width={727}
        height={169}
        priority
        className="h-6 w-auto object-contain lg:h-7"
      />
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [rolou, setRolou] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const ativa = useSecaoAtiva();

  const { scrollY, scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  useMotionValueEvent(scrollY, "change", (y) => setRolou(y > 24));

  useEffect(() => {
    const el = headerRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.3 }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <header ref={headerRef} className="entra fixed inset-x-0 top-3 z-50 flex justify-center px-2 sm:top-4 sm:px-4">
        <div
          className={cn(
            "flex h-14 max-w-full items-center gap-0.5 rounded-full border border-ink/[0.08] px-1 transition-[background-color,box-shadow] duration-500 sm:gap-4 sm:px-1.5",
            // no topo a barra assenta no branco do herói; rolando, ela flutua sobre conteúdo colorido e precisa de elevação
            rolou
              ? "bg-white/80 shadow-[0_14px_36px_-16px_rgba(11,42,91,0.45)] backdrop-blur-xl backdrop-saturate-150"
              : "bg-white/90 shadow-[0_8px_24px_-14px_rgba(11,42,91,0.3)]"
          )}
        >
          <Logo />

          <span aria-hidden className="mx-1 hidden h-6 w-px shrink-0 bg-ink/10 lg:block" />

          {/* No celular os links ficariam ilegíveis; eles moram no menu (+). */}
          <nav aria-label="Seções" className="hidden shrink-0 items-center lg:flex" onMouseLeave={() => setHover(null)}>
            {navLinks.map((l) => {
              const Icon = NAV_ICONS[l.href];
              const atual = ativa === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={atual ? "location" : undefined}
                  onMouseEnter={() => setHover(l.href)}
                  onFocus={() => setHover(l.href)}
                  onBlur={() => setHover(null)}
                  className={cn(
                    "relative flex items-center whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-medium tracking-[-0.01em] transition-[color,transform] duration-200 active:scale-[0.97]",
                    atual ? "text-white" : "text-navy"
                  )}
                >
                  {hover === l.href && (
                    <motion.span layoutId="nav-hover" transition={MOLA} className="absolute inset-0 rounded-full bg-nevoa" />
                  )}
                  {atual && <motion.span layoutId="nav-atual" transition={MOLA} className="absolute inset-0 rounded-full bg-navy" />}
                  <span className="relative flex items-center gap-2">
                    {Icon && <Icon className="hidden h-4 w-4 shrink-0 xl:block" strokeWidth={2} aria-hidden />}
                    {l.rotulo}
                  </span>
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="menu-principal"
            className="group relative ml-8 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white transition-[background-color,transform] duration-200 hover:bg-brand active:scale-[0.94] sm:ml-4 lg:ml-0"
          >
            {/* anel de leitura: quanto da página já passou */}
            <svg viewBox="0 0 44 44" aria-hidden className="pointer-events-none absolute inset-0 -rotate-90">
              <circle cx="22" cy="22" r="19" fill="none" stroke="currentColor" strokeOpacity={0.16} strokeWidth="2" />
              <motion.circle
                cx="22"
                cy="22"
                r="19"
                fill="none"
                stroke="#6fabe8"
                strokeWidth="2"
                style={{ pathLength: progresso }}
              />
            </svg>
            <Plus
              aria-hidden
              strokeWidth={2.25}
              className="h-[18px] w-[18px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90"
            />
          </button>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} ativa={ativa} />
    </MotionConfig>
  );
}
