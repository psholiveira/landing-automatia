import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { faq } from "@/content/site";
import Titulo from "./Titulo";

export default function FAQ() {
  return (
    <section id="faq">
      <div className="shell section-y grid grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Titulo className="titulo-secao lg:sticky lg:top-28 lg:self-start">{faq.titulo}</Titulo>

        <div className="flex flex-col border-b border-ink/[0.08]">
          {faq.itens.map((item) => (
            <Reveal key={item.p}>
              <details className="group border-t border-ink/[0.08]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-[19px] leading-[1.3] tracking-[-0.02em] text-navy transition-colors hover:text-brand sm:py-7 sm:text-[22px] [&::-webkit-details-marker]:hidden">
                  {item.p}
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-nevoa text-navy transition-colors duration-200 group-open:bg-navy group-open:text-white"
                  >
                    <Plus className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45" strokeWidth={2} />
                  </span>
                </summary>
                <p className="m-0 max-w-[620px] pb-7 text-[16px] leading-[1.6] text-ash sm:text-lg">{item.r}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
