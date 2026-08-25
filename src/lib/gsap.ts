"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Respeita a preferência de sistema por menos movimento. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Um elemento que já está visível no carregamento deve animar de imediato.
 * Só o que está abaixo da dobra recebe gatilho de scroll — caso contrário o
 * ScrollTrigger dispara tudo de uma vez antes do layout assentar.
 */
export const isBelowFold = (el: Element) =>
  el.getBoundingClientRect().top > window.innerHeight * 0.9;
