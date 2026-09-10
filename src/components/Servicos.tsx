import { statSync } from "node:fs";
import { join } from "node:path";
import Reveal from "./Reveal";
import { servicos } from "@/content/site";
import ServicosGaleria from "./ServicosGaleria";
import { type GalleryItem } from "@/components/ui/circular-gallery-2";

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
      <div className="shell pt-[72px] sm:pt-24 lg:pt-[110px]">
        <div className="grid grid-cols-1 items-end gap-7 border-b-2 border-ink pb-10 sm:gap-10 lg:grid-cols-2 lg:gap-16 lg:pb-14">
          <Reveal className="flex flex-col gap-4 sm:gap-5">
            <div className="kicker text-brand">{servicos.kicker}</div>
            <h2 className="m-0 text-[clamp(32px,8.6vw,56px)] font-extrabold leading-[0.92] tracking-[-0.03em] lg:text-[76px] lg:leading-[0.9] lg:tracking-[-0.035em]">
              {servicos.titulo[0]}
              <br />
              {servicos.titulo[1]}
            </h2>
          </Reveal>
          <Reveal className="max-w-[520px] text-[16px] font-medium leading-[1.45] text-ink/75 sm:text-lg lg:text-[21px] lg:leading-[1.4]">
            {servicos.intro}
          </Reveal>
        </div>
      </div>

      <Reveal y={40} className="relative h-[620px] w-full">
        <ServicosGaleria items={galleryItems} />
      </Reveal>

      <div className="shell pb-9 pt-5 lg:pb-11 lg:pt-6">
        <p className="kicker text-smoke">ARRASTE OU USE O SCROLL PARA NAVEGAR</p>
      </div>

    </section>
  );
}
