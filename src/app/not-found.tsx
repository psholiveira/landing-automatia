import NaoEncontrada from "@/components/NaoEncontrada";

/**
 * Captura qualquer URL que não corresponda a uma rota do app (além dos
 * notFound() disparados dentro de um segmento).
 */
export default function NotFound() {
  return <NaoEncontrada />;
}
