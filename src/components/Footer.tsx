import Image from "next/image";
import { contato, navLinks } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-[#cfcccb]">
      <div className="shell flex flex-col items-start gap-8 py-10 sm:gap-10 sm:py-14 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
        <Image src="/logo-white.png" alt="AutomatIA" width={727} height={169} className="h-8 w-auto sm:h-[42px]" />

        <div className="flex flex-col gap-3.5 sm:gap-4">
          <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[12px] tracking-[0.1em] sm:gap-x-11 sm:text-[13px]">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-[#cfcccb] transition-colors hover:text-sky">
                {l.rotulo.toUpperCase()}
              </a>
            ))}
          </div>
          {/* Contato também aqui embaixo: quem chega ao fim da página não precisa subir de novo. */}
          <div className="flex flex-wrap gap-x-7 gap-y-2 font-mono text-[11px] tracking-[0.1em] text-smoke sm:gap-x-11 sm:text-xs">
            <a href={contato.emailHref} className="break-all transition-colors hover:text-sky">
              {contato.email.toUpperCase()}
            </a>
            <a
              href={contato.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap transition-colors hover:text-sky"
            >
              WHATSAPP {contato.telefone}
            </a>
            <a
              href={contato.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-sky"
            >
              INSTAGRAM {contato.handle.toUpperCase()}
            </a>
          </div>
        </div>

        <div className="font-mono text-[10px] leading-[1.5] tracking-[0.1em] text-smoke sm:text-xs">
          © {new Date().getFullYear()} AUTOMATIA · TODOS OS DIREITOS RESERVADOS
        </div>
      </div>
    </footer>
  );
}
