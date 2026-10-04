import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Integracoes from "@/components/Integracoes";
import Servicos from "@/components/Servicos";
import Segmentos from "@/components/Segmentos";
import AntesDepois from "@/components/AntesDepois";
import Cases from "@/components/Cases";
import Agentes from "@/components/Agentes";
import Metodo from "@/components/Metodo";
import Equipe from "@/components/Equipe";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppFlutuante from "@/components/WhatsApp";
import ScrollFx from "@/components/ScrollFx";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Integracoes />
        <Servicos />
        <Segmentos />
        <AntesDepois />
        <Cases />
        <Agentes />
        <Metodo />
        <Equipe />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFlutuante />
      <ScrollFx />
    </>
  );
}
