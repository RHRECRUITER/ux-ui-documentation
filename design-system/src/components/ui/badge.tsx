import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Badge: Figma "Badge" (node 11:403), estilo shadcn/ui.
 * 22px de altura · padding 2×8 · raio 8 · texto Body/Caption Medium (12px, 500).
 * Use success/warning/info para estados do produto (aprovado, pendente, informativo).
 */
const badgeVariants = cva(
  "inline-flex h-[22px] items-center justify-center whitespace-nowrap rounded-xs border px-2 py-0.5 font-sans text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground",
        secondary: "border-secondary bg-secondary text-secondary-foreground",
        destructive: "border-destructive bg-destructive text-destructive-foreground",
        outline: "border-border bg-transparent text-foreground",
        success: "border-success bg-success text-success-foreground",
        warning: "border-warning bg-warning text-warning-foreground",
        info: "border-info bg-info text-info-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
