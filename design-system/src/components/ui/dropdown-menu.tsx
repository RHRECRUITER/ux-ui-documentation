import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Dropdown: Figma "Dropdown menu" e "Dropdown item" (nodes 30:3251 e 30:3160).
 * Menu: fundo `popover` · borda 1 · raio 8 · padding 4 · gap 2 · sombra 0 4px 8px -1px (12% preto).
 * Item: 32px · padding 6×8 · raio 4 · texto 14px Medium · ícone de 16px.
 *   hover/foco → fundo `accent`, texto `accent-foreground`
 *   selecionado → check `primary` à direita
 *   desabilitado → texto `foreground-secondary` a 60%
 * Teclado: setas navegam, Enter seleciona, Esc fecha (vem do Radix).
 */
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 flex min-w-[200px] flex-col gap-0.5 rounded-xs border border-border bg-popover p-1 text-popover-foreground",
        "shadow-[0_4px_8px_-1px_rgba(0,0,0,0.12)]",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const itemBase = [
  "relative flex h-8 cursor-default select-none items-center gap-2 rounded-2xs px-2 py-1.5 font-sans text-sm font-medium outline-none",
  "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:text-foreground-secondary data-[disabled]:opacity-60",
  "[&_svg]:size-4 [&_svg]:shrink-0",
];

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /** Ícone à esquerda (Figma: Leading icon). */
  icon?: React.ReactNode;
}

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} className={cn(itemBase, className)} {...props}>
    {icon}
    <span className="flex-1 truncate">{children}</span>
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

/** Item que pode ficar marcado (Figma: State = Selected, com check). */
export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem ref={ref} className={cn(itemBase, className)} {...props}>
    {icon}
    <span className="flex-1 truncate">{children}</span>
    <DropdownMenuPrimitive.ItemIndicator>
      <Check className="text-primary" aria-hidden />
    </DropdownMenuPrimitive.ItemIndicator>
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 font-sans text-xs font-medium text-foreground-secondary", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
