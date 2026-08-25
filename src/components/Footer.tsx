import Image from "next/image";
import { navLinks } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-[#cfcccb]">
      <div className="shell flex flex-wrap items-end justify-between gap-10 py-14">
        <Image src="/logo-white.png" alt="AutomatIA" width={727} height={169} className="h-[42px] w-auto" />

        <div className="flex gap-11 font-mono text-[13px] tracking-[0.1em]">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-[#cfcccb] transition-colors hover:text-sky">
              {l.rotulo.toUpperCase()}
            </a>
          ))}
        </div>

        <div className="font-mono text-xs tracking-[0.1em] text-smoke">
          © {new Date().getFullYear()} AUTOMATIA · TODOS OS DIREITOS RESERVADOS
        </div>
      </div>
    </footer>
  );
}
