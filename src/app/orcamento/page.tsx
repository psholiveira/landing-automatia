import type { Metadata } from "next";
import Orcamento from "@/components/Orcamento";

export const metadata: Metadata = {
  title: "Orçamento — AutomatIA",
  description: "Conte o que você precisa e receba o orçamento pelo WhatsApp. Diagnóstico gratuito, sem compromisso.",
  alternates: { canonical: "/orcamento" },
};

export default function Page() {
  return <Orcamento />;
}
