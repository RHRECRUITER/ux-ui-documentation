import * as React from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Peças compartilhadas por Input, Textarea e Select.
 * No Figma os três usam os mesmos estados e tokens.
 */

export type FieldSize = "md" | "lg" | "xl";

/** Estados visuais de um campo (Figma: Default, Active, Error, Success, Disabled). */
export function fieldBoxClasses({ error, success }: { error?: boolean; success?: boolean }) {
  return cn(
    "bg-background transition-shadow",
    // Default + Active (foco): borda `ring` e halo de 3px `ring-focus`
    !error &&
      !success &&
      "border-input focus-within:border-ring focus-within:shadow-[0_0_0_3px_var(--ring-focus)]",
    // Success: só a borda muda
    success && !error && "border-success focus-within:shadow-[0_0_0_3px_var(--ring-focus)]",
    // Error: borda `destructive` + halo de 3px `ring-error`, sempre visível
    error && "border-destructive shadow-[0_0_0_3px_var(--ring-error)]",
  );
}

interface FieldShellProps {
  id: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  error?: string | boolean;
  success?: boolean;
  /** Tamanho do label: o Input Large/Xlarge usa texto maior no Figma. */
  size?: FieldSize;
  labelClassName?: string;
  children: React.ReactNode;
}

const labelBySize: Record<FieldSize, string> = {
  md: "text-sm font-medium", //   Body/Small
  lg: "text-base font-normal", //  Body/16 Regular
  xl: "text-xl font-medium", //    Body/20 Medium
};

/** Rótulo + campo + mensagem de ajuda/erro, com os ids de acessibilidade ligados. */
export function FieldShell({
  id,
  label,
  required,
  helpText,
  error,
  success,
  size = "md",
  labelClassName,
  children,
}: FieldShellProps) {
  const message = typeof error === "string" ? error : helpText;
  const hasError = Boolean(error);
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={id} className={cn("flex gap-1 text-foreground", labelBySize[size], labelClassName)}>
          {label}
          {required && (
            <span aria-hidden className="text-destructive">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {message && (
        <p
          id={`${id}-help`}
          role={hasError ? "alert" : undefined}
          className={cn(
            "text-xs",
            hasError ? "text-destructive" : success ? "text-success" : "text-foreground-secondary",
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}

/** Ícone automático de erro/sucesso no fim do campo (como no Figma). */
export function StatusIcon({ error, success }: { error?: boolean; success?: boolean }) {
  if (error) return <CircleAlert className="size-4 shrink-0 text-destructive" aria-hidden />;
  if (success) return <CircleCheck className="size-4 shrink-0 text-success" aria-hidden />;
  return null;
}

export function describedBy(id: string, hasMessage: boolean) {
  return hasMessage ? `${id}-help` : undefined;
}
