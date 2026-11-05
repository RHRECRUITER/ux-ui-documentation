import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Ensina o tailwind-merge sobre o raio extra do design system (rounded-2xs).
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["2xs"],
    },
  },
});

/** Junta classes condicionais e resolve conflitos do Tailwind (a última vence). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
