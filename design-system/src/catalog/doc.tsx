import * as React from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { cn } from "../lib/cn";

/** Peças de documentação usadas só pelo catálogo (não fazem parte da biblioteca). */

export const FIGMA_FILE = "https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs";
export const figmaLink = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId}`;

// ---------- Tema (Light / Dark) ----------

export type ThemeMode = "light" | "dark";
export const ThemeContext = React.createContext<ThemeMode>("light");

// ---------- Página ----------

export function Page({
  title,
  description,
  figma,
  children,
}: {
  title: string;
  description: React.ReactNode;
  /** node-id do Figma, no formato 18-81254 */
  figma?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3 border-b border-border pb-8">
        <h1 className="text-4xl font-extrabold tracking-[-1px]">{title}</h1>
        <p className="max-w-3xl text-lg text-foreground-secondary">{description}</p>
        {figma && (
          <a
            href={figmaLink(figma)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Abrir no Figma <ExternalLink className="size-3.5" aria-hidden />
          </a>
        )}
      </header>
      {children}
    </article>
  );
}

export function Section({ title, hint, children }: { title: string; hint?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-[-1px]">{title}</h2>
        {hint && <p className="max-w-3xl text-sm text-foreground-secondary">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

// ---------- Demo + código ----------

/** Caixa onde o componente aparece de verdade, com fundo do tema. */
export function Demo({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs font-medium text-foreground-secondary">{label}</span>}
      <div className={cn("flex flex-wrap items-center gap-4 rounded-lg border border-border bg-background p-6", className)}>
        {children}
      </div>
    </div>
  );
}

export function Code({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard bloqueado: ignora */
    }
  };
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-[#0d1b18] text-[#d7efe9]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-[#8fb5ab]">
        <span>{language}</span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-2xs px-2 py-1 font-medium outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#34d399]"
        >
          {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

/** Demo ao vivo seguida do código que a gera. */
export function Example({
  title,
  hint,
  code,
  children,
  demoClassName,
}: {
  title: string;
  hint?: React.ReactNode;
  code: string;
  children: React.ReactNode;
  demoClassName?: string;
}) {
  return (
    <Section title={title} hint={hint}>
      <Demo className={demoClassName}>{children}</Demo>
      <Code code={code} />
    </Section>
  );
}

// ---------- Tabela de props ----------

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  /** Nome da propriedade equivalente no Figma */
  figma?: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-muted text-xs text-foreground-secondary">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Prop</th>
            <th className="px-4 py-2.5 font-semibold">Tipo</th>
            <th className="px-4 py-2.5 font-semibold">Padrão</th>
            <th className="px-4 py-2.5 font-semibold">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-border align-top">
              <td className="px-4 py-3 font-mono text-[13px] font-semibold text-primary">{r.name}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-foreground-secondary">{r.type}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-foreground-secondary">{r.default ?? "—"}</td>
              <td className="px-4 py-3">
                {r.description}
                {r.figma && (
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Figma: <code className="font-mono">{r.figma}</code>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Utilitário: valor computado de um token ----------

/** Lê o valor atual de uma variável CSS (muda quando o tema muda). */
export function useCssVar(name: string) {
  const mode = React.useContext(ThemeContext);
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    // Espera o React aplicar a classe .dark antes de ler.
    const id = requestAnimationFrame(() => {
      setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
    });
    return () => cancelAnimationFrame(id);
  }, [name, mode]);
  return value;
}
