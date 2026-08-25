import Image from "next/image";
import Reveal from "./Reveal";
import { caseCliente } from "@/content/site";

export default function Case() {
  return (
    <section id="case" className="border-b-2 border-ink bg-surface">
      <div className="shell py-[110px]">
        <Reveal className="kicker mb-10 text-brand">{caseCliente.kicker}</Reveal>

        <div className="grid grid-cols-1 items-stretch gap-16 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="relative h-[520px] min-w-0 border-2 border-ink grayscale">
            {caseCliente.imagem ? (
              <Image src={caseCliente.imagem} alt={caseCliente.imagemAlt} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-[repeating-linear-gradient(45deg,#dcd8d8_0_10px,#f3f2f2_10px_20px)]">
                <span className="border-2 border-ink bg-ground px-[18px] py-3 font-mono text-sm text-ink/80">
                  substituir por print do resultado
                </span>
              </div>
            )}
          </Reveal>

          <div className="flex min-w-0 flex-col justify-between gap-10">
            <Reveal>
              <blockquote className="m-0 text-[52px] font-extrabold leading-[1.02] tracking-[-0.03em]">
                “<span className="text-brand">{caseCliente.destaque}</span>
                {caseCliente.resto}”
              </blockquote>
            </Reveal>

            <Reveal className="flex flex-col gap-[18px]">
              <div className="h-0.5 bg-ink" />
              <div className="flex items-baseline justify-between gap-6">
                <div className="text-xl font-bold">{caseCliente.autor}</div>
                <div className="font-mono text-sm text-ash">SUBSTITUIR</div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
