"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Bot, LayoutGrid, Route, type LucideIcon } from "lucide-react";
import { navLinks } from "@/content/site";
import { Dock, DockItem } from "@/components/ui/dock";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import MenuOverlay from "./MenuOverlay";

const PANEL_HEIGHT = 56;
const MAGNIFICATION = 68;
const DISTANCE = 130;

/** Ícone de cada link — puramente visual, por isso mora aqui e não em content/site.ts. */
const NAV_ICONS: Record<string, LucideIcon> = {
  "#servicos": LayoutGrid,
  "#metodo": Route,
  "#agentes": Bot,
};

/** Único filho de um DockItem: recebe `width` injetado via cloneElement. */
type DockInjected = { width?: MotionValue<number> };

function Logo() {
  return (
    <a href="#topo" aria-label="AutomatIA — início" className="flex shrink-0 items-center px-1 sm:px-2">
      <Image
        src="/logo.png"
        alt="AutomatIA"
        width={727}
        height={169}
        priority
        className="h-4 w-auto object-contain sm:h-6 lg:h-7"
      />
    </a>
  );
}

function DockMenuButton({
  width,
  onClick,
  open,
  className,
}: DockInjected & { onClick: () => void; open: boolean; className?: string }) {
  const size = useTransform(width as MotionValue<number>, [40, MAGNIFICATION], [14, 20]);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Abrir menu"
      aria-expanded={open}
      className={cn(
        "flex h-full w-full items-center justify-center text-white transition-colors hover:bg-brand",
        className
      )}
    >
      <motion.span style={{ height: size, width: size }} className="relative block">
        <span className="absolute left-0 top-[38%] h-0.5 w-full bg-current" />
        <span className="absolute left-[38%] top-0 h-full w-0.5 bg-current" />
      </motion.span>
    </motion.button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.15 }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-3 z-50 flex justify-center px-2 sm:top-4 sm:px-4">
        <Dock
          align="start"
          panelHeight={PANEL_HEIGHT}
          magnification={MAGNIFICATION}
          distance={DISTANCE}
          className="gap-0.5 rounded-full border-2 border-ink bg-ground/90 px-1 shadow-[0_4px_0_0_rgba(32,30,29,0.12)] backdrop-blur-md sm:gap-4 sm:px-2"
        >
          <Logo />

          <span aria-hidden className="mx-0.5 h-5 w-px shrink-0 self-center bg-ink/15 sm:mx-1 sm:h-6" />

          <nav className="flex h-full shrink-0 items-center gap-0 sm:gap-1">
            {navLinks.map((l) => {
              const Icon = NAV_ICONS[l.href];
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-1 py-1.5 font-mono text-[9px] uppercase tracking-[0.02em] text-ink transition-colors hover:bg-ink/10 hover:text-brand min-[380px]:text-[10px] min-[410px]:text-[11px] min-[410px]:tracking-[0.06em] sm:gap-2 sm:px-3 sm:py-2 sm:text-[11px] sm:tracking-[0.1em] lg:text-[13px] lg:tracking-[0.12em]"
                >
                  {Icon && <Icon className="hidden h-4 w-4 shrink-0 sm:block" strokeWidth={2} aria-hidden />}
                  {l.rotulo}
                </a>
              );
            })}
          </nav>

          <span aria-hidden className="mx-0.5 h-5 w-px shrink-0 self-center bg-ink/15 sm:mx-1 sm:h-6" />

          <DockItem className="ml-1 aspect-square shrink-0 rounded-full bg-ink sm:ml-0">
            <DockMenuButton open={open} onClick={() => setOpen(true)} className="rounded-full" />
          </DockItem>
        </Dock>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
