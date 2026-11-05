import * as React from "react";
import { cn } from "../../lib/cn";
import { describedBy, FieldShell, fieldBoxClasses, StatusIcon, type FieldSize } from "./field";

/**
 * Input: Figma "Basic input" (node 18:77197).
 * Medidas do campo lidas do Figma:
 *   md  → 38px · padding 8×12 · borda 1 · raio 8   (Body/Small)
 *   lg  → 48px · padding 8×16 · borda 1 · raio 12  (Body/16)
 *   xl  → 60px · padding 8×20 · borda 2 · raio 8   (Body/20)
 * O raio de md e xl vem do token legado radius-legacy/md (8px); só o lg usa radius/md (12px).
 * Está listado como ponto de atenção no README.
 */
const boxBySize: Record<FieldSize, string> = {
  md: "h-[38px] rounded-xs border px-3 py-2",
  lg: "h-12 rounded-md border px-4 py-2",
  xl: "h-[60px] rounded-xs border-2 px-5 py-2",
};

const textBySize: Record<FieldSize, string> = {
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  /** Mensagem de ajuda abaixo do campo. */
  helpText?: string;
  /** `true` só pinta o erro. Uma string também mostra a mensagem. */
  error?: string | boolean;
  /** Estado de sucesso (borda e mensagem verdes). */
  success?: boolean;
  /** Figma: Size = Medium · Large · Xlarge. */
  size?: FieldSize;
  /** Figma: Icon = Prefix. */
  startIcon?: React.ReactNode;
  /** Figma: Icon = Suffix. */
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, helpText, error, success, size = "md", startIcon, endIcon, required, disabled, className, ...props },
    ref,
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const hasError = Boolean(error);
    const hasMessage = Boolean(typeof error === "string" ? error : helpText);

    return (
      <FieldShell
        id={inputId}
        label={label}
        required={required}
        helpText={helpText}
        error={error}
        success={success}
        size={size}
      >
        <div
          className={cn(
            "flex w-full items-center gap-2",
            boxBySize[size],
            fieldBoxClasses({ error: hasError, success }),
            disabled && "cursor-not-allowed",
            className,
          )}
        >
          {startIcon && <span className="shrink-0 text-foreground-secondary [&_svg]:size-4">{startIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy(inputId, hasMessage)}
            className={cn(
              "min-w-0 flex-1 bg-transparent font-sans text-foreground outline-none",
              "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:text-foreground-secondary",
              textBySize[size],
            )}
            {...props}
          />
          {endIcon && <span className="shrink-0 text-foreground-secondary [&_svg]:size-4">{endIcon}</span>}
          <StatusIcon error={hasError} success={success} />
        </div>
      </FieldShell>
    );
  },
);
Input.displayName = "Input";
