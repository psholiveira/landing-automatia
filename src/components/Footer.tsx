import Image from "next/image";
import { contato, rodape } from "@/content/site";
import { WhatsAppIcon } from "./WhatsApp";
import Titulo from "./Titulo";

const rotuloColuna = "m-0 mb-5 font-mono text-[11px] tracking-[0.16em] text-smoke sm:text-xs";
const linkColuna = "text-[16px] font-semibold text-[#e6e3e2] transition-colors hover:text-sky sm:text-[17px]";

export default function Footer() {
  const contatos = [
    { rotulo: `WhatsApp ${contato.telefone}`, href: contato.whatsapp, externo: true },
    { rotulo: contato.email, href: contato.emailHref, externo: false },
    { rotulo: `Instagram ${contato.handle}`, href: contato.instagram, externo: true },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-[#cfcccb]">
      <div className="shell pt-16 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr] lg:gap-10">
          {/* marca */}
          <div className="flex flex-col items-start gap-6">
            <Image src="/logo-white.png" alt="AutomatIA" width={727} height={169} className="h-9 w-auto sm:h-11" />
            <p className="m-0 max-w-[300px] text-[20px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[22px]">
              {rodape.frase}
            </p>
            <span className="inline-flex items-center gap-2.5 border border-white/20 px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-skyMuted">
              <span className="h-2 w-2 animate-blink bg-[#25D366]" />
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
            <p className="m-0 mb-5 max-w-[300px] text-[16px] font-medium leading-[1.45] text-white/75">{rodape.comeceTexto}</p>
            <a
              href={contato.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#25D366] px-5 py-4 text-[16px] font-extrabold tracking-[-0.01em] text-ink shadow-[5px_5px_0_rgba(255,255,255,0.15)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-white"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              {rodape.comeceCta}
              <span className="font-mono font-normal transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* assinatura gigante — fecha a página como créditos de filme */}
      <div aria-hidden className="mt-16 select-none overflow-hidden border-y border-white/10 sm:mt-20">
        <Titulo
          as="div"
          className="shell whitespace-nowrap py-2 text-[clamp(64px,17.5vw,268px)] font-extrabold leading-[0.95] tracking-[-0.055em] text-white/[0.1]"
        >
          Automat<span className="text-sky/35">IA</span>
        </Titulo>
      </div>

      {/* pb extra: o botão flutuante do WhatsApp fica por cima deste canto */}
      <div className="shell flex flex-col gap-3 pb-28 pt-6 font-mono text-[11px] tracking-[0.1em] text-smoke sm:flex-row sm:items-center sm:justify-between sm:text-xs">
        <span>
          © {new Date().getFullYear()} AUTOMATIA · {rodape.direitos.toUpperCase()}
        </span>
        <a href="#topo" className="transition-colors hover:text-sky">
          {rodape.topo.toUpperCase()} ↑
        </a>
      </div>
    </footer>
  );
}
