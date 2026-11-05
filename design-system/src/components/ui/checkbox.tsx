import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Checkbox: Figma "Checkbox" (node 11:350).
 * Caixa de 18px · raio 4 (radius/2xs) · borda 1 `input`. Marcado: fundo e borda `primary`.
 * Foco: borda `ring` + halo 3px. Erro: borda `destructive` + halo 3px. Desabilitado: 50% de opacidade.
 */
export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "children"> {
  /** Texto ao lado da caixa. Sem ele, passe `aria-label`. */
  label?: React.ReactNode;
  /** Estado de erro (ex.: termos não aceitos). */
  error?: boolean;
}

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, error, id, disabled, ...props }, ref) => {
    const autoId = React.useId();
    const checkboxId = id ?? autoId;
    return (
      <div className={cn("inline-flex items-center gap-2", disabled && "opacity-50")}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          disabled={disabled}
          aria-invalid={error || undefined}
          className={cn(
            "peer flex size-[18px] shrink-0 items-center justify-center rounded-2xs border bg-background outline-none transition-shadow",
            "border-input",
            "focus-visible:border-ring focus-visible:shadow-[0_0_0_3px_var(--ring-focus)]",
            "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
            "disabled:cursor-not-allowed",
            error && "border-destructive shadow-[0_0_0_3px_var(--ring-error)] focus-visible:border-destructive",
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            {props.checked === "indeterminate" ? (
              <Minus className="size-3" strokeWidth={3} aria-hidden />
            ) : (
              <Check className="size-3" strokeWidth={3} aria-hidden />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn("font-sans text-sm font-medium text-foreground", !disabled && "cursor-pointer")}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
