"use client";

import { useEffect, useState } from "react";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery-2";

const DESKTOP = "(min-width: 1024px)";

/**
 * A galeria circular é WebGL e dimensiona os cards a partir da ALTURA do
 * container (ver Media.onResize no vendor) — num celular os cards ficariam
 * pequenos demais para o texto desenhado dentro deles ser lido. Por isso ela
 * só é montada no desktop; no mobile o Servicos renderiza um carrossel HTML
 * com o mesmo conteúdo. Montar condicionalmente (em vez de esconder por CSS)
 * evita subir um contexto WebGL inútil no celular.
 */
export default function ServicosGaleria({ items }: { items: GalleryItem[] }) {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!desktop) return null;

  return <CircularGallery items={items} bend={3} borderRadius={0.04} scrollEase={0.04} />;
}
