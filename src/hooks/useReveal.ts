"use client";

import { useEffect, useRef } from "react";
import { gsap, isBelowFold, prefersReducedMotion } from "@/lib/gsap";

type RevealOptions = {
  /** deslocamento vertical de entrada, em px */
  y?: number;
  /** deslocamento horizontal de entrada, em px */
  x?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  /** anima escala vertical (usado nas réguas que crescem) */
  scaleY?: boolean;
  /** elemento que dispara o gatilho, quando não é o próprio */
  trigger?: React.RefObject<Element>;
};

/** Revela um elemento ao entrar na viewport (ou já na entrada, se visível). */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const opts = useRef(options);
  opts.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { y = 46, x = 0, delay = 0, duration = 0.9, ease = "power3.out", scaleY, trigger } = opts.current;

    const ctx = gsap.context(() => {
      const target = trigger?.current ?? el;
      const from = scaleY ? { scaleY: 0 } : { y, x, opacity: 0 };
      const to: gsap.TweenVars = scaleY
        ? { scaleY: 1, duration: 1.2, ease: "power3.inOut" }
        : { y: 0, x: 0, opacity: 1, duration, delay, ease };

      if (isBelowFold(target)) {
        to.immediateRender = false;
        to.scrollTrigger = { trigger: target, start: "top 90%", once: true };
      }

      gsap.fromTo(el, from, to);
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
