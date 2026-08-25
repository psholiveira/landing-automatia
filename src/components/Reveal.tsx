"use client";

import { useReveal } from "@/hooks/useReveal";

type Props = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  id?: string;
};

/** Wrapper de conveniência: <Reveal className="...">conteúdo</Reveal> */
export default function Reveal({ children, className, id, ...anim }: Props) {
  const ref = useReveal<HTMLDivElement>(anim);
  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
