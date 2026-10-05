"use client";

import Reveal from "./Reveal";
import Link from "next/link";
import { contato, cta, orcamentoHref } from "@/content/site";
import OndaPontos from "./OndaPontos";
import Titulo from "./Titulo";
import BtnConteudo from "./BtnConteudo";

/** Único momento escuro da página: o marinho começa aqui e segue pelo rodapé. */
export default function CTA() {
  return (
    <section id="contato" className="relative overflow-hidden bg-navy text-white">
      {/* a onda do herói volta em azul-céu: a página fecha como abriu */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]">
        <OndaPontos cor="111,171,232" className="h-full w-full opacity-60" />
      </div>

      <div className="shell relative flex flex-col items-center pb-[clamp(180px,26vw,300px)] pt-28 text-center sm:pt-36 lg:pt-44">
        <Titulo className="m-0 max-w-[1000px] text-[clamp(40px,10vw,64px)] font-normal leading-[1] tracking-[-0.04em] lg:text-[96px]">
          {cta.titulo}
        </Titulo>

        <Reveal className="mt-6 max-w-[560px] text-[17px] leading-[1.55] text-white/70 sm:mt-8 sm:text-lg lg:text-[20px]">
          {cta.texto}
        </Reveal>

        <Reveal className="mt-10 flex w-full flex-col items-center gap-3 sm:mt-12">
          <Link
            href={orcamentoHref("contato")}
            className="btn btn-claro w-full sm:w-auto"
          >
            <BtnConteudo seta="direita">Pedir meu orçamento</BtnConteudo>
          </Link>
          <div className="flex w-full flex-wrap justify-center gap-3">
            <a href={contato.emailHref} className="btn btn-contorno-claro flex-1 sm:flex-none">
              <BtnConteudo>{contato.email}</BtnConteudo>
            </a>
            <a
              href={contato.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-contorno-claro flex-1 sm:flex-none"
            >
              <BtnConteudo>{`Instagram ${contato.handle}`}</BtnConteudo>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
