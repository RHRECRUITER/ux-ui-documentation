import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Avatar: Figma "Componentes" da página Avatar (node 1:11694).
 * Tamanhos (px): 2xl 24 · 3xl 32 · 4xl 40 · 5xl 48 · 6xl 64 · 7xl 80 · 8xl 96.
 * Iniciais: Manrope SemiBold 12/14/16/18/20/24/30px.
 * Squircle: raio 4/4/8/10/12/16/24px (um por tamanho).
 */
export type AvatarSize = "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl";

const sizeClasses: Record<AvatarSize, { box: string; text: string; squircle: string; icon: string }> = {
  "2xl": { box: "size-6", text: "text-xs", squircle: "rounded-[4px]", icon: "size-3" },
  "3xl": { box: "size-8", text: "text-sm", squircle: "rounded-[4px]", icon: "size-4" },
  "4xl": { box: "size-10", text: "text-base", squircle: "rounded-[8px]", icon: "size-5" },
  "5xl": { box: "size-12", text: "text-lg", squircle: "rounded-[10px]", icon: "size-6" },
  "6xl": { box: "size-16", text: "text-xl", squircle: "rounded-[12px]", icon: "size-7" },
  "7xl": { box: "size-20", text: "text-2xl", squircle: "rounded-[16px]", icon: "size-8" },
  "8xl": { box: "size-24", text: "text-3xl", squircle: "rounded-[24px]", icon: "size-10" },
};

/** "Maria da Silva" → "MS". */
export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma: Size. */
  size?: AvatarSize;
  /** Figma: Format = Circle | squircle. */
  shape?: "circle" | "squircle";
  /** Foto. Se faltar ou falhar ao carregar, mostra as iniciais de `name`. */
  src?: string;
  /** Nome da pessoa: vira o texto alternativo e as iniciais. */
  name?: string;
  /** Figma: Status = placeholder (espaço reservado com "+"). */
  placeholder?: boolean;
}

export function Avatar({ size = "2xl", shape = "circle", src, name = "", placeholder, className, ...props }: AvatarProps) {
  const [failed, setFailed] = React.useState(false);
  const s = sizeClasses[size];
  const showImage = Boolean(src) && !failed && !placeholder;
  const initials = getInitials(name);

  return (
    <span
      role="img"
      aria-label={name || "Avatar"}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden font-sans font-semibold select-none",
        s.box,
        s.text,
        shape === "circle" ? "rounded-full" : s.squircle,
        placeholder
          ? "border border-dashed border-border bg-muted text-muted-foreground"
          : showImage
            ? "bg-card"
            : "bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      {placeholder ? (
        <Plus className={s.icon} aria-hidden />
      ) : showImage ? (
        <img src={src} alt="" className="size-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <span aria-hidden>{initials}</span>
      )}
    </span>
  );
}
