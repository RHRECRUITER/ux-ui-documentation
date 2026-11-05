import * as React from "react";
import { cn } from "../../lib/cn";
import { describedBy, FieldShell, fieldBoxClasses } from "./field";

/**
 * Textarea: Figma "Text area" (node 26:131).
 * Campo de 96px de altura mínima · padding 8×12 · borda 1 · raio 8 · texto Body/Small.
 * Mesmos estados e regras de validação do Input.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helpText?: string;
  error?: string | boolean;
  success?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, helpText, error, success, required, disabled, className, ...props }, ref) => {
    const autoId = React.useId();
    const textareaId = id ?? autoId;
    const hasError = Boolean(error);
    const hasMessage = Boolean(typeof error === "string" ? error : helpText);

    return (
      <FieldShell
        id={textareaId}
        label={label}
        required={required}
        helpText={helpText}
        error={error}
        success={success}
      >
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy(textareaId, hasMessage)}
          className={cn(
            "min-h-24 w-full resize-y rounded-xs border px-3 py-2 font-sans text-sm text-foreground outline-none",
            "placeholder:text-foreground-secondary disabled:cursor-not-allowed disabled:text-foreground-secondary",
            fieldBoxClasses({ error: hasError, success }),
            className,
          )}
          {...props}
        />
      </FieldShell>
    );
  },
);
Textarea.displayName = "Textarea";
