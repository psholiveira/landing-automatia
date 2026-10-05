"use client";

import { useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Efeitos de rolagem da página inteira, ligados por atributo — as seções só
 * marcam o elemento e não precisam virar componentes de cliente:
 *  - data-parallax="0.1"  → o elemento anda contra a rolagem (fração da própria altura)
 *  - data-parallax-img    → a imagem dentro da moldura desliza e dá profundidade
 *  - data-linha           → uma régua que se desenha conforme a seção passa
 */
export default function ScrollFx() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const v = parseFloat(el.dataset.parallax || "0.1") * 100;
        gsap.fromTo(
          el,
          { yPercent: v },
          { yPercent: -v, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax-img] img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7, scale: 1.16 },
          {
            yPercent: 7,
            scale: 1.16,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-linha]").forEach((el) => {
        gsap.to(el, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top 85%", end: "top 45%", scrub: 0.6 },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
