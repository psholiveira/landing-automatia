"use client";

import { useEffect, useRef } from "react";
import { gsap, isBelowFold, prefersReducedMotion } from "@/lib/gsap";

type Props = { valor: number; sufixo?: string; prefixo?: string; className?: string };

/** Número que conta de zero até o valor final ao entrar na tela. */
export default function Counter({ valor, sufixo = "", prefixo = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = prefixo + valor + sufixo;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      const vars: gsap.TweenVars = {
        v: valor,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = prefixo + Math.round(obj.v) + sufixo;
        },
        onComplete: () => {
          el.textContent = final;
        },
      };
      if (isBelowFold(el)) vars.scrollTrigger = { trigger: el, start: "top 92%", once: true };
      gsap.to(obj, vars);
    }, el);

    return () => ctx.revert();
  }, [valor, sufixo, prefixo, final]);

  return (
    <span ref={ref} className={className}>
      {final}
    </span>
  );
}
