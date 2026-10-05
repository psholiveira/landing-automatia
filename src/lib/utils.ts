import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Cor da letra i de uma palavra de n letras, do azul-marinho ao azul da marca.
 * Por letra (e não com background-clip) porque as letras animam separadas, e
 * texto com fundo recortado some quando os filhos ganham transform.
 */
export function corDaLetra(i: number, n: number) {
  const de = [11, 42, 91]; // navy
  const ate = [26, 115, 200]; // brand
  const k = n > 1 ? i / (n - 1) : 0;
  return `rgb(${de.map((c, j) => Math.round(c + (ate[j] - c) * k)).join(",")})`;
}
