import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicos from "@/components/Servicos";
import AntesDepois from "@/components/AntesDepois";
import Agentes from "@/components/Agentes";
import Metodo from "@/components/Metodo";
import Case from "@/components/Case";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicos />
        <AntesDepois />
        <Agentes />
        <Metodo />
        <Case />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
