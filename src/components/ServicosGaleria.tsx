"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/components/ui/circular-gallery-2";

// WebGL (ogl) num pacote à parte: não pesa no carregamento inicial da página.
const CircularGallery = dynamic(() => import("@/components/ui/circular-gallery-2").then((m) => m.CircularGallery), {
  ssr: false,
});

/** Largura de referência em que `bend: 3` foi calibrado. */
const LARGURA_BASE = 1440;
const BEND_BASE = 3;

/**
 * A curvatura da galeria é medida contra a metade da largura do viewport 3D
 * (ver `H = viewport.width / 2` no vendor), que encolhe junto com a tela. Um
 * `bend` fixo, portanto, vira um arco muito mais fechado no celular do que no
 * desktop. Escalando o bend com a largura, o arco mantém a MESMA proporção em
 * qualquer tela — o tamanho dos cards em pixels já é idêntico, porque depende
 * só da altura do container (700x900 * altura/1500).
 *
 * O valor é arredondado em degraus de 0.25 porque trocá-lo remonta o contexto
 * WebGL: assim um resize contínuo não fica recriando a galeria a cada frame.
 */
function bendPara(largura: number) {
  const bruto = (BEND_BASE * largura) / LARGURA_BASE;
  return Math.max(0.75, Math.round(bruto * 4) / 4);
}

export default function ServicosGaleria({ items }: { items: GalleryItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  // null até a seção chegar perto da tela: só então a galeria monta, já com o
  // bend certo — antes ela montava no carregamento e de novo ao corrigir o bend.
  const [bend, setBend] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => setBend(bendPara(window.innerWidth));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        sync();
        window.addEventListener("resize", sync);
        window.addEventListener("orientationchange", sync);
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
    };
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {bend !== null && (
        <CircularGallery
          items={items}
          bend={bend}
          borderRadius={0.04}
          scrollEase={0.04}
          // deixa a rolagem vertical da página com o navegador e o arrasto
          // horizontal com a galeria, em vez dos dois disputarem o mesmo gesto
          className="touch-pan-y"
        />
      )}
    </div>
  );
}
