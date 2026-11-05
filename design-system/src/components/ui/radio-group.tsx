import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/cn";

/**
 * Radio: Figma "Radio Button" (node 1:11475).
 * Círculo de 16px · borda 1 `input` · marcado: borda `primary` + bolinha de 8px `primary`.
 * Hover: borda `ring`. Teclado: setas trocam a opção (padrão radiogroup, vem do Radix).
 */
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-3", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "children"> {
  /** Texto ao lado do círculo. Sem ele, passe `aria-label`. */
  label?: React.ReactNode;
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, id, disabled, ...props }, ref) => {
  const autoId = React.useId();
  const itemId = id ?? autoId;
  return (
    <div className={cn("inline-flex items-center gap-2", disabled && "opacity-50")}>
      <RadioGroupPrimitive.Item
        ref={ref}
        id={itemId}
        disabled={disabled}
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full border border-input bg-background outline-none transition-shadow",
          "hover:border-ring",
          "focus-visible:border-ring focus-visible:shadow-[0_0_0_3px_var(--ring-focus)]",
          "data-[state=checked]:border-primary",
          "disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-primary" />
      </RadioGroupPrimitive.Item>
      {label && (
        <label
          htmlFor={itemId}
          className={cn("font-sans text-sm font-medium text-foreground", !disabled && "cursor-pointer")}
        >
          {label}
        </label>
      )}
    </div>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";
