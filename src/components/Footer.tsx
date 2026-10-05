import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { contato, rodape } from "@/content/site";
import Titulo from "./Titulo";
import BtnConteudo from "./BtnConteudo";

const rotuloColuna = "kicker m-0 mb-5 text-white/60";
const linkColuna = "text-[16px] text-white/85 transition-colors hover:text-sky sm:text-[17px]";

export default function Footer() {
  const contatos = [
    { rotulo: `WhatsApp ${contato.telefone}`, href: contato.whatsapp, externo: true },
    { rotulo: contato.email, href: contato.emailHref, externo: false },
    { rotulo: `Instagram ${contato.handle}`, href: contato.instagram, externo: true },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy text-white/70">
      <div className="shell pt-16 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr] lg:gap-10">
          {/* marca */}
          <div className="flex flex-col items-start gap-6">
            <Image src="/logo-white.png" alt="AutomatIA" width={727} height={169} className="h-9 w-auto sm:h-11" />
            <p className="m-0 max-w-[300px] text-[20px] leading-[1.25] tracking-[-0.025em] text-white sm:text-[22px]">
              {rodape.frase}
            </p>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-3.5 py-2 text-[13px] text-white/75">
              <span className="h-2 w-2 animate-blink rounded-full bg-[#25D366]" />
              {rodape.status}
            </span>
          </div>

          {/* navegação */}
          <nav aria-label="Rodapé">
            <p className={rotuloColuna}>{rodape.navegueRotulo}</p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {rodape.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkColuna}>
                    {l.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contato */}
          <div>
            <p className={rotuloColuna}>{rodape.contatoRotulo}</p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {contatos.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={linkColuna + " break-all"}
                  >
                    {c.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start">
            <p className={rotuloColuna}>{rodape.comeceRotulo}</p>
            <p className="m-0 mb-5 max-w-[300px] text-[16px] leading-[1.55] text-white/70">{rodape.comeceTexto}</p>
            <a
              href={contato.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-claro"
            >
              <BtnConteudo seta="direita">{rodape.comeceCta}</BtnConteudo>
            </a>
          </div>
        </div>
      </div>

      {/* assinatura gigante — fecha a página como créditos de filme */}
      <div aria-hidden className="mt-16 select-none overflow-hidden border-y border-white/[0.08] sm:mt-20">
        <Titulo
          as="div"
          className="shell whitespace-nowrap py-2 text-[clamp(64px,17.5vw,268px)] font-normal leading-[1] tracking-[-0.05em] text-white/[0.08]"
        >
          Automat<span className="text-sky/30">IA</span>
        </Titulo>
      </div>

      <div className="shell flex flex-col gap-3 pb-10 pt-6 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} AutomatIA · {rodape.direitos}
        </span>
        <a href="#topo" className="group inline-flex items-center gap-1.5 transition-colors hover:text-sky">
          {rodape.topo}
          <ArrowUp aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
