"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { contato, menuLinks } from "@/content/site";

/** Grupos de formas geométricas revelados no hover de cada link. */
const SHAPES: React.ReactNode[][] = [
  [
    <span key="a" className="absolute right-[10%] top-[12%] h-[190px] w-[190px] border-2 border-sky/60" />,
    <span key="b" className="absolute right-[26%] top-[46%] h-[120px] w-[120px] rounded-full bg-sky/20" />,
    <span key="c" className="absolute bottom-[14%] right-[8%] h-0.5 w-[260px] bg-sky/60" />,
  ],
  [
    <span key="a" className="absolute right-[22%] top-[18%] h-[90px] w-[240px] bg-sky/20" />,
    <span key="b" className="absolute right-[8%] top-[40%] h-[240px] w-0.5 bg-sky/60" />,
    <span key="c" className="absolute bottom-[18%] right-[24%] h-[150px] w-[150px] rounded-full border-2 border-sky/50" />,
  ],
  [
    <span key="a" className="absolute right-[14%] top-[14%] h-[90px] w-[90px] bg-sky/30" />,
    <span key="b" className="absolute right-[30%] top-[38%] h-[90px] w-[90px] bg-sky/20" />,
    <span key="c" className="absolute bottom-[16%] right-[12%] h-[90px] w-[90px] border-2 border-sky/50" />,
  ],
  [
    <span key="a" className="absolute right-[10%] top-[20%] h-0.5 w-[300px] -rotate-[24deg] bg-sky/50" />,
    <span key="b" className="absolute right-[16%] top-[44%] h-0.5 w-[300px] -rotate-[24deg] bg-sky/40" />,
    <span key="c" className="absolute bottom-[18%] right-[22%] h-[170px] w-[170px] bg-sky/10" />,
  ],
  [
    <span key="a" className="absolute right-[18%] top-[16%] h-[210px] w-[210px] rounded-full bg-sky/15" />,
    <span key="b" className="absolute right-[10%] top-[52%] h-[130px] w-[130px] border-2 border-sky/60" />,
    <span key="c" className="absolute bottom-[12%] right-[34%] h-[60px] w-[60px] bg-sky/40" />,
  ],
];

export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // trava o scroll da página e monta/desmonta em volta da animação
  useEffect(() => {
    if (open) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!mounted) return;
    const el = root.current;
    if (!el) return;
    const q = (s: string) => Array.from(el.querySelectorAll(s));

    tl.current?.kill();
    const t = gsap.timeline({ defaults: { ease: "power4.inOut", duration: 0.7 } });
    tl.current = t;

    if (open) {
      t.to(q("[data-overlay]"), { opacity: 1, duration: 0.5 }, 0)
        .fromTo(q("[data-panel]"), { xPercent: 101 }, { xPercent: 0, stagger: 0.11, duration: 0.62 }, 0)
        .fromTo(
          q("[data-link]"),
          { yPercent: 140, rotate: 7, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.055, duration: 0.75, ease: "power4.out" },
          0.42
        )
        .fromTo(q("[data-fade]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" }, 0.6);
    } else {
      t.to(q("[data-sheet]"), { xPercent: 110, duration: 0.6 }, 0)
        .to(q("[data-overlay]"), { opacity: 0, duration: 0.45 }, 0)
        .add(() => setMounted(false));
    }

    return () => {
      t.kill();
    };
  }, [open, mounted]);

  const hoverShapes = (i: number, on: boolean) => {
    const group = root.current?.querySelector('[data-shapes="' + i + '"]');
    if (!group) return;
    const els = Array.from(group.children);
    if (on) {
      gsap.set(group, { opacity: 1 });
      gsap.fromTo(
        els,
        { scale: 0.5, opacity: 0, rotate: -10 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
      );
    } else {
      gsap.to(els, {
        scale: 0.85,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => gsap.set(group, { opacity: 0 }),
      });
    }
  };

  if (!mounted) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div data-overlay onClick={onClose} className="absolute inset-0 bg-ink/55 opacity-0" />

      <div data-sheet className="absolute bottom-0 right-0 top-0 w-full max-w-[1080px] overflow-hidden">
        <div data-panel className="absolute inset-0 bg-surface" />
        <div data-panel className="absolute inset-0 bg-brand" />
        <div data-panel className="absolute inset-0 bg-navy" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {SHAPES.map((group, i) => (
            <div key={i} data-shapes={i + 1} className="absolute inset-0 opacity-0">
              {group}
            </div>
          ))}
        </div>

        <div className="relative flex h-full flex-col justify-between gap-[clamp(20px,4vh,56px)] overflow-y-auto px-[clamp(24px,5vw,64px)] pb-[clamp(24px,4vh,48px)] pt-[clamp(20px,3.4vh,40px)] text-white [overscroll-behavior:contain]">
          <div data-fade className="flex items-center justify-between gap-8 opacity-0">
            <Image src="/logo-white.png" alt="AutomatIA" width={727} height={169} className="h-[30px] w-auto" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="cursor-pointer border-2 border-white/45 px-[18px] py-2.5 font-mono text-[13px] tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              FECHAR ✕
            </button>
          </div>

          <ul className="m-0 flex list-none flex-col p-0">
            {menuLinks.map((m, i) => (
              <li
                key={m.href + m.n}
                onMouseEnter={() => hoverShapes(i + 1, true)}
                onMouseLeave={() => hoverShapes(i + 1, false)}
                className="overflow-hidden border-t border-white/20"
              >
                <a
                  href={m.href}
                  onClick={onClose}
                  className="flex items-baseline gap-7 py-[clamp(6px,1.1vh,14px)] text-white no-underline transition-colors hover:text-sky"
                >
                  <span data-link className="block text-[clamp(30px,5.4vh,68px)] font-extrabold leading-[1.02] tracking-[-0.04em]">
                    {m.rotulo}
                  </span>
                  <span className="font-mono text-[13px] tracking-[0.14em] text-skyMuted">{m.n}</span>
                </a>
              </li>
            ))}
          </ul>

          <div data-fade className="flex shrink-0 flex-wrap items-end justify-between gap-10 border-t-2 border-white/40 pt-[clamp(16px,2.4vh,26px)] opacity-0">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs tracking-[0.16em] text-skyMuted">DIAGNÓSTICO GRATUITO</span>
              <a href={contato.whatsapp} className="text-[clamp(21px,3vh,30px)] font-extrabold tracking-[-0.02em] text-white transition-colors hover:text-sky">
                WhatsApp {contato.telefone}
              </a>
            </div>
            <a href={contato.instagram} className="font-mono text-[13px] tracking-[0.14em] text-white transition-colors hover:text-sky">
              INSTAGRAM {contato.handle.toUpperCase()} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
