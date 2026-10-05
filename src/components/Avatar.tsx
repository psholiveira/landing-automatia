import Image from "next/image";
import { cn } from "@/lib/utils";

/** Foto quando existe; senão, as iniciais do nome sobre o azul da marca. */
export default function Avatar({
  nome,
  foto,
  className,
  parallax,
}: {
  nome: string;
  foto?: string;
  className?: string;
  /** a foto desliza dentro da moldura ao rolar (ver ScrollFx) */
  parallax?: boolean;
}) {
  const iniciais = nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div
      data-parallax-img={parallax || undefined}
      className={cn("relative grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br from-navy to-brand text-white", className)}
    >
      {foto ? (
        <Image src={foto} alt={nome} fill sizes="(min-width: 1024px) 400px, 90vw" className="object-cover" />
      ) : (
        <span aria-hidden className="font-normal tracking-[-0.03em]">{iniciais}</span>
      )}
    </div>
  );
}
