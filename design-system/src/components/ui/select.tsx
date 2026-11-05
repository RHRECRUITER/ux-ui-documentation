import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { describedBy, FieldShell, fieldBoxClasses } from "./field";

/**
 * Select: Figma "Input selected" (node 29:131).
 * Usa o Select do Radix, então teclado (Enter/espaço abre, setas navegam, Esc fecha) já vem pronto.
 * Medidas: md 38px · padding 8×12 · raio 8   |   lg 48px · padding 8×16 · raio 12.
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  helpText?: string;
  error?: string | boolean;
  success?: boolean;
  required?: boolean;
  disabled?: boolean;
  /** Figma: Size = Medium · Large. */
  size?: "md" | "lg";
  id?: string;
  name?: string;
  className?: string;
}

const triggerBySize = {
  md: "h-[38px] rounded-xs px-3 py-2",
  lg: "h-12 rounded-md px-4 py-2",
};

export function Select({
  options,
  label,
  placeholder = "Selecione uma opção",
  helpText,
  error,
  success,
  required,
  disabled,
  size = "md",
  id,
  className,
  ...root
}: SelectProps) {
  const autoId = React.useId();
  const triggerId = id ?? autoId;
  const hasError = Boolean(error);
  const hasMessage = Boolean(typeof error === "string" ? error : helpText);

  return (
    <FieldShell
      id={triggerId}
      label={label}
      required={required}
      helpText={helpText}
      error={error}
      success={success}
      labelClassName="text-sm font-medium"
    >
      <SelectPrimitive.Root disabled={disabled} required={required} {...root}>
        <SelectPrimitive.Trigger
          id={triggerId}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy(triggerId, hasMessage)}
          className={cn(
            "flex w-full items-center justify-between gap-2 border font-sans text-sm text-foreground outline-none",
            "data-[placeholder]:text-foreground-secondary",
            "focus-visible:border-ring focus-visible:shadow-[0_0_0_3px_var(--ring-focus)]",
            "disabled:cursor-not-allowed disabled:text-foreground-secondary",
            triggerBySize[size],
            fieldBoxClasses({ error: hasError, success }),
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="size-4 shrink-0 text-foreground-secondary" aria-hidden />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className={cn(
              "z-50 max-h-72 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xs border border-border",
              "bg-popover p-1 text-popover-foreground shadow-[0_4px_8px_-1px_rgba(0,0,0,0.12)]",
            )}
          >
            <SelectPrimitive.Viewport className="flex flex-col gap-0.5">
              {options.map((o) => (
                <SelectPrimitive.Item
                  key={o.value}
                  value={o.value}
                  disabled={o.disabled}
                  className={cn(
                    "relative flex h-8 cursor-default select-none items-center rounded-2xs py-1.5 pr-8 pl-2 font-sans text-sm font-medium outline-none",
                    "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-60",
                  )}
                >
                  <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2">
                    <Check className="size-4 text-primary" aria-hidden />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </FieldShell>
  );
}
