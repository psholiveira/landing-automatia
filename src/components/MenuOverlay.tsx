"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { contato, menuLinks } from "@/content/site";
import OndaPontos from "./OndaPontos";

/**
 * Rótulo cujas letras rolam no hover: cada letra tem uma cópia em ::after
 * (ver .rolante no globals.css) que sobe no lugar da original, em cascata.
 * Letras agrupadas por palavra para a quebra de linha continuar entre palavras.
 */
function Rolante({ texto }: { texto: string }) {
  let i = 0;
  return (
    <>
      <span className="sr-only">{texto}</span>
      <span aria-hidden>
        {texto.split(" ").map((palavra, p) => (
          <span key={p}>
            {p > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {palavra.split("").map((c) => {
                const n = i++;
                return (
                  <span key={n} className="rolante" style={{ "--i": n } as React.CSSProperties}>
                    <span data-c={c}>{c}</span>
                  </span>
                );
              })}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}

export default function MenuOverlay({
  open,
  onClose,
  ativa,
}: {
  open: boolean;
  onClose: () => void;
  /** id da seção no meio da tela, vindo do scroll-spy do Navbar */
  ativa: string | null;
}) {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const gatilho = useRef<HTMLElement | null>(null);

  // trava o scroll da página e monta/desmonta em volta da animação
  useEffect(() => {
    if (open) {
      gatilho.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc fecha; Tab circula só dentro do menu enquanto ele está aberto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const focaveis = root.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!focaveis?.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!mounted) return;
    const el = root.current;
    if (!el) return;
    const q = (s: string) => Array.from(el.querySelectorAll(s));
    const reduz = prefersReducedMotion();

    tl.current?.kill();
    const t = gsap.timeline({ defaults: { ease: "power4.inOut", duration: 0.7 } });
    tl.current = t;

    if (open) {
      el.querySelector<HTMLElement>("[data-fechar]")?.focus({ preventScroll: true });

      if (reduz) {
        // sem deslocamento: os painéis já estão no lugar e tudo só aparece
        t.set(q("[data-panel]"), { xPercent: 0 })
          .set(q("[data-link]"), { yPercent: 0, rotate: 0, opacity: 1 })
          .to(q("[data-overlay], [data-fade]"), { opacity: 1, duration: 0.25, ease: "none" }, 0)
          .fromTo(q("[data-sheet]"), { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "none" }, 0);
      } else {
        t.to(q("[data-overlay]"), { opacity: 1, duration: 0.5 }, 0)
          .fromTo(q("[data-panel]"), { xPercent: 101 }, { xPercent: 0, stagger: 0.11, duration: 0.62 }, 0)
          .fromTo(
            q("[data-link]"),
            { yPercent: 140, rotate: 7, opacity: 0 },
            { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.055, duration: 0.75, ease: "power4.out" },
            0.42
          )
          .fromTo(q("[data-fade]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" }, 0.6);
      }
    } else {
      const fim = () => {
        setMounted(false);
        gatilho.current?.focus({ preventScroll: true });
      };
      if (reduz) {
        t.to(q("[data-sheet], [data-overlay]"), { opacity: 0, duration: 0.2, ease: "none" }).add(fim);
      } else {
        // a saída é mais curta que a entrada: quem fecha já decidiu
        t.to(q("[data-sheet]"), { xPercent: 110, duration: 0.5 }, 0)
          .to(q("[data-overlay]"), { opacity: 0, duration: 0.4 }, 0)
          .add(fim);
      }
    }

    return () => {
      t.kill();
    };
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div ref={root} id="menu-principal" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[100]">
      <div data-overlay onClick={onClose} className="absolute inset-0 bg-ink/55 opacity-0" />

      <div data-sheet className="absolute bottom-0 right-0 top-0 w-full max-w-[1080px] overflow-hidden">
        <div data-panel className="absolute inset-0 bg-surface" />
        <div data-panel className="absolute inset-0 bg-brand" />
        <div data-panel className="absolute inset-0 bg-navy" />

        {/* a mesma onda do herói, agora em azul-céu: o menu continua o mundo da página */}
        <div data-fade className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] opacity-0">
          <OndaPontos cor="111,171,232" className="h-full w-full opacity-[0.42]" />
        </div>

        <div className="relative flex h-full flex-col justify-between gap-[clamp(20px,4vh,56px)] overflow-y-auto px-[clamp(20px,5vw,64px)] pb-[max(24px,env(safe-area-inset-bottom))] pt-[clamp(18px,3.4vh,40px)] text-white [overscroll-behavior:contain] sm:pb-[clamp(24px,4vh,48px)]">
          <div data-fade className="flex items-center justify-between gap-4 opacity-0 sm:gap-8">
            <Image src="/logo-white.png" alt="AutomatIA" width={727} height={169} className="h-[26px] w-auto sm:h-[30px]" />
            <button
              type="button"
              data-fechar
              onClick={onClose}
              aria-label="Fechar menu"
              className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-[14px] font-medium text-white transition-[border-color,background-color,transform] duration-200 hover:border-white hover:bg-white/10 active:scale-[0.96] sm:px-5 sm:py-2.5 sm:text-[15px]"
            >
              Fechar
              <X aria-hidden strokeWidth={2.25} className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90" />
            </button>
          </div>

          <ul className="group/lista m-0 flex list-none flex-col p-0">
            {menuLinks.map((m) => {
              const aqui = ativa === m.href.slice(1);
              return (
                <li key={m.href + m.n} className="overflow-hidden border-t border-white/20">
                  <a
                    href={m.href}
                    onClick={onClose}
                    aria-current={aqui ? "location" : undefined}
                    className="group flex items-center gap-3 py-[clamp(8px,1.1vh,14px)] text-white no-underline transition-opacity duration-300 group-hover/lista:opacity-40 hover:!opacity-100 sm:gap-5"
                  >
                    <span data-link className="block text-[clamp(27px,5.4vh,68px)] font-normal leading-[1.05] tracking-[-0.04em]">
                      <Rolante texto={m.rotulo} />
                    </span>
                    <ArrowRight
                      aria-hidden
                      strokeWidth={2.5}
                      className="hidden h-[clamp(24px,4.2vh,48px)] w-[clamp(24px,4.2vh,48px)] shrink-0 -translate-x-5 text-sky opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 sm:block"
                    />
                    <span className="ml-auto flex shrink-0 items-center gap-2.5 text-[13px] tabular-nums text-skyMuted sm:text-sm">
                      {aqui && (
                        <>
                          <span aria-hidden className="relative flex h-2 w-2">
                            <span className="absolute inset-0 animate-ping rounded-full bg-sky opacity-60 motion-reduce:hidden" />
                            <span className="relative h-2 w-2 rounded-full bg-sky" />
                          </span>
                          <span className="hidden text-sky sm:inline">Você está aqui</span>
                        </>
                      )}
                      {m.n}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div data-fade className="flex shrink-0 flex-wrap items-end justify-between gap-5 border-t-2 border-white/40 pt-[clamp(16px,2.4vh,26px)] opacity-0 sm:gap-10">
            <div className="flex flex-col gap-1.5">
              <span className="kicker text-skyMuted">Diagnóstico gratuito</span>
              <a href={contato.emailHref} className="break-all text-[clamp(18px,3vh,30px)] tracking-[-0.03em] text-white transition-colors hover:text-sky">
                {contato.email}
              </a>
            </div>
            <div className="flex flex-col items-start gap-2 text-[14px] sm:items-end sm:text-[15px]">
              {[
                { href: contato.whatsapp, rotulo: `WhatsApp ${contato.telefone}` },
                { href: contato.instagram, rotulo: `Instagram ${contato.handle}` },
              ].map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 whitespace-nowrap text-white transition-colors hover:text-sky"
                >
                  {c.rotulo}
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
