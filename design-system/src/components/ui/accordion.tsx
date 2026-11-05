import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Accordion: Figma "Accordion item" (node 108:21534).
 * Item: padding 12×16 · raio 10 (radius/sm) · fundo e borda `--accordion-bg`.
 * Default: pergunta 16px Medium, resposta 14px. Compact: pergunta 14px.
 * Em Dark o fundo vira `primary` e o texto `primary-foreground` (tokens --accordion-*).
 * Teclado, aria-expanded e foco vêm do Radix.
 */
type AccordionSize = "default" | "compact";
const SizeContext = React.createContext<AccordionSize>("default");

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  /** Figma: Size = Default | Compact. */
  size?: AccordionSize;
};

export const Accordion = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Root>, AccordionProps>(
  ({ size = "default", className, ...props }, ref) => (
    <SizeContext.Provider value={size}>
      <AccordionPrimitive.Root ref={ref} className={cn("flex w-full flex-col gap-2", className)} {...(props as any)} />
    </SizeContext.Provider>
  ),
);
Accordion.displayName = "Accordion";

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "rounded-sm border border-[var(--accordion-bg)] bg-[var(--accordion-bg)] px-4 text-[var(--accordion-foreground)]",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const size = React.useContext(SizeContext);
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between gap-2.5 rounded-sm py-3 text-left font-sans font-medium outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          size === "default" ? "text-base" : "text-sm",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className="size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden font-sans text-sm",
      "data-[state=open]:animate-[rh-accordion-down_0.2s_ease-out] data-[state=closed]:animate-[rh-accordion-up_0.2s_ease-out]",
    )}
    {...props}
  >
    <div className={cn("pb-3", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
