import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Miolo de um botão: o rótulo rola no hover e dá lugar a uma cópia idêntica, e
 * a seta sai por um lado enquanto outra entra pelo oposto. O efeito mora no
 * globals.css (.btn-rotulo, .btn-seta) e dispara pelo :hover do elemento pai,
 * então serve para .btn e para qualquer outro link.
 */
export default function BtnConteudo({ children, seta }: { children: string; seta?: "direita" | "diagonal" }) {
  const Icone = seta === "diagonal" ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span className="btn-rotulo">
        <span>{children}</span>
        <span aria-hidden className="select-none">{children}</span>
      </span>
      {seta && (
        <span aria-hidden className={seta === "diagonal" ? "btn-seta btn-seta-diagonal" : "btn-seta"}>
          <Icone strokeWidth={2} />
          <Icone strokeWidth={2} />
        </span>
      )}
    </>
  );
}
