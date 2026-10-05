"use client";

import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, isBelowFold, prefersReducedMotion } from "@/lib/gsap";

gsap.registerPlugin(SplitText);

type Props = {
  as?: "h2" | "h3" | "p" | "div";
  className?: string;
  children: React.ReactNode;
};

/**
 * Título que entra palavra por palavra ao chegar na tela.
 * Sem máscara de corte de propósito: com entrelinha apertada (0.9) ela
 * cortaria acentos e cedilhas. Sem blur: em muitos títulos ele pesava na rolagem.
 */
export default function Titulo({ as: Tag = "h2", className, children }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const { words } = SplitText.create(el, { type: "words" });
      gsap.from(words, {
        yPercent: 70,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: isBelowFold(el) ? { trigger: el, start: "top 88%", once: true } : undefined,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
