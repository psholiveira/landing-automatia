"use client";

import { useEffect, useState } from "react";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery-2";

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
  const [bend, setBend] = useState(BEND_BASE);

  useEffect(() => {
    const sync = () => setBend(bendPara(window.innerWidth));
    sync();
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);
    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
    };
  }, []);

  return (
    <CircularGallery
      items={items}
      bend={bend}
      borderRadius={0.04}
      scrollEase={0.04}
      // deixa a rolagem vertical da página com o navegador e o arrasto
      // horizontal com a galeria, em vez dos dois disputarem o mesmo gesto
      className="touch-pan-y"
    />
  );
}
