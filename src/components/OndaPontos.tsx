"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/*
 * Campo de pontos em perspectiva ondulando — um plano 3D projetado num canvas 2D.
 * Espaçamento fixo no "mundo": perto da câmera os pontos ficam grandes e
 * espaçados; no horizonte, pequenos e densos. É isso que dá a profundidade.
 */
const Z_PERTO = 1.4; // distância da primeira fileira
const Z_LONGE = 34; // horizonte
const PASSO_Z = 1.085; // cada fileira fica 8,5% mais longe que a anterior
const PASSO_X = 0.55; // espaço entre pontos na mesma fileira
const ALTURA_CAMERA = 1;

/** `cor` em "r,g,b" — o alfa de cada fileira é calculado aqui. */
export default function OndaPontos({ className, cor = "32,30,29" }: { className?: string; cor?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let rodando = false;
    // o mouse empurra a onda de leve (x de 0 a 1; 0.5 = centro)
    let mouse = 0.5;
    let mouseSuave = 0.5;

    const medir = () => {
      // pontos quadrados não ganham nada acima de 1.5x — e o custo de preencher cresce ao quadrado
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const desenhar = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const horizonte = h * 0.12; // folga em cima para as cristas
      // focal escolhida para a fileira mais próxima encostar na base do canvas
      const f = ((h - horizonte) * Z_PERTO) / ALTURA_CAMERA;
      const xMax = ((w / 2) * Z_LONGE) / f + 1;
      mouseSuave += (mouse - mouseSuave) * 0.04;
      const empurrao = (mouseSuave - 0.5) * 2;

      const passoX = w < 640 ? PASSO_X * 1.35 : PASSO_X; // menos pontos no celular

      for (let z = Z_PERTO; z < Z_LONGE; z *= PASSO_Z) {
        const perto = Z_PERTO / z; // 1 na frente, ~0 no horizonte
        const tamanho = 0.9 + 3.2 * perto;
        const escala = f / z;
        // esmaece as fileiras do horizonte (faz o papel de uma máscara CSS, sem recompor a camada)
        const topo = Math.min(1, (escala * ALTURA_CAMERA) / (h * 0.22));
        ctx.fillStyle = `rgba(${cor},${((0.25 + 0.75 * perto) * topo).toFixed(3)})`;
        // uma fileira inteira vira um único preenchimento
        ctx.beginPath();
        for (let x = -xMax; x <= xMax; x += passoX) {
          const sx = w / 2 + x * escala;
          if (sx < -4 || sx > w + 4) continue;
          const y =
            0.6 * Math.sin(x * 0.34 + t * 0.9 + empurrao) * Math.cos(z * 0.26 - t * 0.6) +
            0.16 * Math.sin(x * 0.85 - z * 0.45 + t * 1.3);
          const sy = horizonte + (ALTURA_CAMERA - y) * escala;
          if (sy > h + 4) continue;
          ctx.rect(sx - tamanho / 2, sy - tamanho / 2, tamanho, tamanho);
        }
        ctx.fill();
      }
    };

    const quadro = (agora: number) => {
      desenhar(agora / 1000);
      raf = requestAnimationFrame(quadro);
    };
    const tocar = () => {
      if (rodando) return;
      rodando = true;
      raf = requestAnimationFrame(quadro);
    };
    const parar = () => {
      rodando = false;
      cancelAnimationFrame(raf);
    };

    const estatico = prefersReducedMotion();
    const ro = new ResizeObserver(() => {
      medir();
      if (estatico || !rodando) desenhar(0);
    });
    ro.observe(canvas);
    medir();
    desenhar(0);

    // só anima com o canvas na tela
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !estatico ? tocar() : parar()));
    io.observe(canvas);

    const mover = (e: PointerEvent) => (mouse = e.clientX / window.innerWidth);
    if (!estatico) window.addEventListener("pointermove", mover, { passive: true });

    return () => {
      parar();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", mover);
    };
  }, [cor]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
