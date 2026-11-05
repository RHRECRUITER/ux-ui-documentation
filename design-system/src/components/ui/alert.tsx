import * as React from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Alert: Figma "Alert" da página Componentes do App (node 241:7411).
 * Padding 14×16 · gap 12 · raio 12 (radius/md) · borda 1 · ícone 20px · texto Manrope Medium 14px.
 * Largura: ocupa o espaço disponível (no Figma: Fill).
 *
 * As cores do Alert no Figma são hex soltos (não são tokens do Theme), por isso ficam fixas aqui.
 * Em Dark: fundo = cor a 10%, borda = cor a 30%, ícone e texto = a própria cor.
 */
export type AlertTone = "info" | "warning" | "error" | "success";

const toneClasses: Record<AlertTone, string> = {
  info: "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8] dark:border-[#60a5fa]/30 dark:bg-[#60a5fa]/10 dark:text-[#60a5fa]",
  warning:
    "border-[#fde68a] bg-[#fffbeb] text-[#92400e] dark:border-[#fbbf24]/30 dark:bg-[#fbbf24]/10 dark:text-[#fbbf24]",
  error: "border-[#fecaca] bg-[#fef2f2] text-[#b91c1c] dark:border-[#f87171]/30 dark:bg-[#f87171]/10 dark:text-[#f87171]",
  success:
    "border-[#a7f3d0] bg-[#ecfdf5] text-[#065f46] dark:border-[#34d399]/30 dark:bg-[#34d399]/10 dark:text-[#34d399]",
};

// No Figma o ícone tem uma cor própria (um tom mais forte que o texto) no modo Light.
const iconClasses: Record<AlertTone, string> = {
  info: "text-[#2563eb] dark:text-[#60a5fa]",
  warning: "text-[#b45309] dark:text-[#fbbf24]",
  error: "text-[#dc2626] dark:text-[#f87171]",
  success: "text-[#047857] dark:text-[#34d399]",
};

const defaultIcons: Record<AlertTone, React.ComponentType<{ className?: string }>> = {
  info: Info,
  warning: TriangleAlert,
  error: CircleAlert,
  success: CircleCheck,
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma: Tone. */
  tone?: AlertTone;
  /** Troca o ícone padrão do tom (Figma: Icon). */
  icon?: React.ReactNode;
}

export function Alert({ tone = "info", icon, className, children, ...props }: AlertProps) {
  const DefaultIcon = defaultIcons[tone];
  return (
    <div
      // Erros e avisos são anunciados na hora; info e sucesso são cordiais.
      role={tone === "error" || tone === "warning" ? "alert" : "status"}
      className={cn(
        "flex w-full items-start gap-3 rounded-md border px-4 py-3.5 font-sans text-sm font-medium",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <span className={cn("mt-px shrink-0 [&_svg]:size-5", iconClasses[tone])} aria-hidden>
        {icon ?? <DefaultIcon />}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
