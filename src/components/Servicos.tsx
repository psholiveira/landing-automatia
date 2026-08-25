import { statSync } from "node:fs";
import { join } from "node:path";
import Reveal from "./Reveal";
import { servicos } from "@/content/site";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery-2";

/**
 * A galeria carrega as imagens via `new Image()` direto no navegador, fora do
 * pipeline de assets do Next — sem um cache-buster, trocar o SVG em disco não
 * invalida o cache HTTP do navegador e a imagem antiga continua aparecendo.
 * A versão é o mtime do arquivo, então regenerar o card já muda a URL sozinho.
 */
function assetVersion(publicPath: string) {
  try {
    return statSync(join(process.cwd(), "public", publicPath)).mtimeMs.toString(36);
  } catch {
    return "0";
  }
}

// Número, nome e descrição já vêm desenhados dentro da própria imagem
// (veja scripts/gen-service-cards.mjs), por isso não repetimos legenda aqui.
const galleryItems: GalleryItem[] = servicos.itens.map((s) => ({
  image: `${s.imagem}?v=${assetVersion(s.imagem)}`,
  text: "",
}));

export default function Servicos() {
  return (
    <section id="servicos" className="border-b-2 border-ink">
      <div className="shell pt-[110px]">
        <div className="grid grid-cols-1 items-end gap-16 border-b-2 border-ink pb-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <div className="kicker text-brand">{servicos.kicker}</div>
            <h2 className="m-0 text-[76px] font-extrabold leading-[0.9] tracking-[-0.035em]">
              {servicos.titulo[0]}
              <br />
              {servicos.titulo[1]}
            </h2>
          </Reveal>
          <Reveal className="max-w-[520px] text-[21px] font-medium leading-[1.4] text-ink/75">{servicos.intro}</Reveal>
        </div>
      </div>

      <Reveal y={40} className="relative h-[620px] w-full">
        <CircularGallery items={galleryItems} bend={3} borderRadius={0.04} scrollEase={0.04} />
      </Reveal>

      <div className="shell pb-11 pt-6">
        <p className="kicker text-smoke">ARRASTE OU USE O SCROLL PARA NAVEGAR</p>
      </div>
    </section>
  );
}
