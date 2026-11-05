import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Button: Figma "Button Contained" (node 18:81254).
 * Estados Hover / Focus / Pressed / Disabled vêm de CSS. Só `loading` é prop.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap font-heading font-semibold",
    "transition-colors select-none outline-none",
    "focus-visible:ring-2",
    "disabled:pointer-events-none",
    "data-[loading=true]:pointer-events-none",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary-hover active:bg-primary-pressed",
          "focus-visible:ring-primary",
          "disabled:bg-disabled disabled:text-disabled-foreground",
        ],
        secondary: [
          "border border-border bg-transparent text-foreground",
          "hover:bg-muted active:border-primary active:bg-accent",
          "focus-visible:ring-primary",
          "disabled:border-disabled disabled:text-disabled-foreground",
        ],
        tertiary: [
          "bg-transparent text-primary",
          "hover:bg-accent active:bg-border",
          "focus-visible:ring-primary",
          "disabled:text-disabled-foreground",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive-hover active:bg-destructive-pressed",
          "focus-visible:ring-destructive",
          "disabled:bg-disabled disabled:text-disabled-foreground",
        ],
      },
      // Medidas lidas do Figma (estado Default): altura, padding, raio e text style.
      size: {
        xl: "h-14 gap-3 rounded-xl px-8 py-3.5 text-base", // 56 · 14×32 · radius/xl · Button/16
        lg: "h-12 gap-3 rounded-lg px-6 py-3 text-sm", //     48 · 12×24 · radius/lg · Button/14
        md: "h-10 gap-3 rounded-md px-4 py-2.5 text-sm", //   40 · 10×16 · radius/md · Button/14
        sm: "h-8 gap-3 rounded-sm px-3 py-1.5 text-xs", //     32 · 6×12  · radius/sm · Button/12
      },
    },
    defaultVariants: { variant: "primary", size: "xl" }, // padrão do Figma: Primary + Xlarge
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Mostra spinner e bloqueia cliques, sem aplicar o visual de desabilitado. */
  loading?: boolean;
  /** Ícone antes do texto (Figma: Icon = Prefix). Use um ícone do lucide-react. */
  startIcon?: React.ReactNode;
  /** Ícone depois do texto (Figma: Icon = Suffix). */
  endIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, startIcon, endIcon, children, onClick, type = "button", ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, size }), loading && "gap-2", className)}
      onClick={(e) => {
        if (loading) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      {...props}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : startIcon}
      {children}
      {endIcon}
    </button>
  ),
);
Button.displayName = "Button";

/**
 * Icon button: Figma "Icon button" (node 18:82644).
 * Quadrado nos tamanhos 56 / 48 / 40 / 32. `aria-label` é obrigatório (só tem ícone).
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center transition-colors select-none outline-none",
    "focus-visible:ring-2 focus-visible:ring-primary",
    "disabled:pointer-events-none",
    "data-[loading=true]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary-hover active:bg-primary-pressed",
          "disabled:bg-disabled disabled:text-disabled-foreground",
        ],
        secondary: [
          "border border-border bg-transparent text-foreground",
          "hover:bg-muted active:border-primary active:bg-accent",
          "disabled:border-disabled disabled:text-disabled-foreground",
        ],
      },
      shape: {
        square: "rounded-[6px]", // raio de 6px lido do Figma (fora da escala atual de Radius)
        rounded: "rounded-full",
      },
      size: {
        xl: "size-14 [&_svg]:size-6",
        lg: "size-12 [&_svg]:size-5",
        md: "size-10 [&_svg]:size-5",
        sm: "size-8 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "primary", shape: "square", size: "xl" },
  },
);

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof iconButtonVariants> {
  /** Ícone do lucide-react. */
  icon: React.ReactNode;
  /** Obrigatório: descreve a ação para leitores de tela. */
  "aria-label": string;
  loading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, shape, size, icon, loading = false, onClick, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={cn(iconButtonVariants({ variant, shape, size }), className)}
      onClick={(e) => {
        if (loading) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" aria-hidden /> : icon}
    </button>
  ),
);
IconButton.displayName = "IconButton";

export { buttonVariants, iconButtonVariants };
