import { statSync } from "node:fs";
import { join } from "node:path";
import Reveal from "./Reveal";
import { servicos } from "@/content/site";
import ServicosGaleria from "./ServicosGaleria";
import type { GalleryItem } from "@/components/ui/circular-gallery-2";
import Titulo from "./Titulo";

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
    <section id="servicos">
      <div className="shell pt-24 sm:pt-32 lg:pt-40">
        <div className="grid grid-cols-1 items-end gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16">
          <Titulo className="titulo-secao">
            {servicos.titulo[0]}
            <br />
            {servicos.titulo[1]}
          </Titulo>
          <Reveal className="intro-secao max-w-[500px]">{servicos.intro}</Reveal>
        </div>
      </div>

      <Reveal y={40} className="relative mt-6 h-[480px] w-full sm:mt-10 sm:h-[620px]">
        <ServicosGaleria items={galleryItems} />
      </Reveal>

      <div className="shell flex flex-col items-center gap-5 pb-8 pt-4 text-center lg:pt-6">
        <p className="kicker m-0 text-ash">Arraste para navegar, ou veja tudo de uma vez:</p>
        {/* Os cards da galeria são imagens; esta lista deixa os serviços legíveis de relance e indexáveis. */}
        <ul className="m-0 flex max-w-[980px] list-none flex-wrap justify-center gap-2 p-0 sm:gap-2.5">
          {servicos.itens.map((s) => (
            <li
              key={s.n}
              className="rounded-full bg-nevoa px-4 py-2 text-[14px] tracking-[-0.01em] text-ink sm:px-5 sm:py-2.5 sm:text-[15px]"
            >
              {s.nome}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
