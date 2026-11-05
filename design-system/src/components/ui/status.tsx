import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Status v2: Figma "Status" (node 181:88).
 * Indicador do estado de um registro. Combina cor + texto (e ponto no estilo Dot),
 * nunca depende só da cor.
 *
 * Medidas lidas do Figma:
 *   tag  → 22px · padding 4×8  · texto 9px  Medium
 *   pill → 27px · padding 6×12 · texto 10px Bold
 *   dot  → 27px · padding 8×16 · texto 10px Medium · ponto de 6px
 *
 * As cores do Status no Figma NÃO usam tokens do Theme (são hex e escalas Tailwind soltas),
 * por isso estão fixas aqui. Veja "Pontos de atenção" no README.
 * Os tipos Warning e Info em Dark não foram lidos do Figma: foram inferidos por analogia.
 */
export type StatusType = "success" | "warning" | "error" | "info" | "neutral";
export type StatusAppearance = "tag" | "pill" | "dot";

const colors: Record<StatusAppearance, Record<StatusType, string>> = {
  tag: {
    success: "bg-[#f0fdf4] text-[#15803d] dark:border dark:border-[#15803d]/20 dark:bg-[#15803d]/5 dark:text-[#34d399]",
    warning: "bg-[#fefce8] text-[#a16207] dark:border dark:border-[#a16207]/20 dark:bg-[#a16207]/5 dark:text-[#fbbf24]",
    error: "bg-[#fef2f2] text-[#b91c1c] dark:border dark:border-[#b91c1c]/20 dark:bg-[#b91c1c]/5 dark:text-[#f87171]",
    info: "bg-[#eff6ff] text-[#1d4ed8] dark:border dark:border-[#1d4ed8]/20 dark:bg-[#1d4ed8]/5 dark:text-[#60a5fa]",
    neutral: "bg-[#fafafa] text-[#4b5563] dark:border dark:border-[#4b5563]/20 dark:bg-[#4b5563]/5 dark:text-[#d1d5db]",
  },
  pill: {
    success: "bg-[#e8f5e9] text-[#2e7d32] dark:border dark:border-[#2e7d32]/30 dark:bg-[#2e7d32]/5 dark:text-[#34d399]",
    warning: "bg-[#fefce8] text-[#a16207] dark:border dark:border-[#a16207]/30 dark:bg-[#a16207]/5 dark:text-[#fbbf24]",
    error: "bg-[#fef2f2] text-[#b91c1c] dark:border dark:border-[#b91c1c]/30 dark:bg-[#b91c1c]/5 dark:text-[#f87171]",
    info: "bg-[#eff6ff] text-[#1d4ed8] dark:border dark:border-[#1d4ed8]/30 dark:bg-[#1d4ed8]/5 dark:text-[#60a5fa]",
    neutral: "bg-[#fafafa] text-[#4b5563] dark:border dark:border-[#4b5563]/30 dark:bg-[#4b5563]/5 dark:text-[#d1d5db]",
  },
  dot: {
    success:
      "border border-[#bbf7d0]/20 bg-[#dcfce7]/40 text-[#15803d] dark:border-[#15803d]/20 dark:bg-[#15803d]/10 dark:text-[#34d399]",
    warning:
      "border border-[#fce87f]/20 bg-[#fef9c3]/40 text-[#c38600] dark:border-[#c38600]/20 dark:bg-[#c38600]/10 dark:text-[#fbbf24]",
    error:
      "border border-[#fecaca]/20 bg-[#fee2e2]/40 text-[#b91c1c] dark:border-[#b91c1c]/20 dark:bg-[#b91c1c]/10 dark:text-[#f87171]",
    info:
      "border border-[#bfdbfe]/20 bg-[#dbeafe]/40 text-[#1d4ed8] dark:border-[#1d4ed8]/20 dark:bg-[#1d4ed8]/10 dark:text-[#60a5fa]",
    neutral:
      "border border-[#e5e7eb]/20 bg-[#f3f4f6]/40 text-[#4b5563] dark:border-[#4b5563]/20 dark:bg-[#4b5563]/10 dark:text-[#d1d5db]",
  },
};

const shape: Record<StatusAppearance, string> = {
  tag: "h-[22px] rounded-full px-2 py-1 text-[9px] leading-[14px] font-medium",
  pill: "h-[27px] rounded-full px-3 py-1.5 text-[10px] leading-[15px] font-bold",
  dot: "h-[27px] gap-1.5 rounded-[40px] px-4 py-2 text-[10px] leading-[11px] font-medium",
};

export interface StatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma: Type. O mesmo tipo deve ter o mesmo significado em todas as telas. */
  type?: StatusType;
  /** Figma: Style (renomeado para não colidir com a prop `style` do React). */
  appearance?: StatusAppearance;
}

export function Status({ type = "success", appearance = "tag", className, children, ...props }: StatusProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-sans",
        shape[appearance],
        colors[appearance][type],
        className,
      )}
      {...props}
    >
      {appearance === "dot" && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
