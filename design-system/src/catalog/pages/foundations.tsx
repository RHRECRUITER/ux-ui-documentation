import { Code, Demo, Page, Section, useCssVar } from "../doc";

// ---------- Início ----------

export function Overview() {
  return (
    <Page
      title="RHLabs Design System"
      description="Componentes React + Tailwind construídos a partir do arquivo Figma RHLabs. Use este catálogo para ver cada componente funcionando, copiar o código e conferir as props."
    >
      <Section title="Como usar no seu projeto">
        <ol className="flex max-w-3xl list-decimal flex-col gap-2 pl-5 text-base">
          <li>
            Copie <code className="font-mono text-sm">src/styles/tokens.css</code> e o bloco <code className="font-mono text-sm">@theme</code> de{" "}
            <code className="font-mono text-sm">src/styles/index.css</code> para o CSS global.
          </li>
          <li>
            Copie <code className="font-mono text-sm">src/lib/cn.ts</code> e a pasta{" "}
            <code className="font-mono text-sm">src/components/ui</code> (padrão copy-paste do shadcn/ui).
          </li>
          <li>Instale as dependências e carregue as fontes Manrope e Plus Jakarta Sans.</li>
          <li>Importe os componentes e use os tokens, nunca valores soltos.</li>
        </ol>
        <Code
          language="bash"
          code={`npm i class-variance-authority clsx tailwind-merge lucide-react \\
  @radix-ui/react-accordion @radix-ui/react-checkbox @radix-ui/react-dropdown-menu \\
  @radix-ui/react-radio-group @radix-ui/react-select`}
        />
        <Code
          code={`import { Button, Input, Select, Checkbox, Alert } from "@/components/ui";

<Button variant="primary" size="md">Salvar</Button>`}
        />
      </Section>

      <Section title="Regras de ouro">
        <ul className="grid max-w-4xl gap-3 sm:grid-cols-2">
          {[
            ["Tokens, não hex", "Cor, espaço e raio vêm de variáveis do Figma. Nada de valor solto no código."],
            ["Estado vem de CSS", "Hover, foco, pressed e disabled são pseudo-classes, não props. Só loading e error são props."],
            ["Dark mode é do tema", "Não existe prop dark. A classe .dark no html troca todos os tokens."],
            ["Acessibilidade primeiro", "Foco visível, label em todo campo, estado nunca só por cor."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-1 text-base font-semibold">{t}</h3>
              <p className="text-sm text-foreground-secondary">{d}</p>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  );
}

// ---------- Cores ----------

const groups: { title: string; hint?: string; tokens: { name: string; fg?: string }[] }[] = [
  {
    title: "Superfícies e texto",
    tokens: [
      { name: "background", fg: "foreground" },
      { name: "card", fg: "card-foreground" },
      { name: "popover", fg: "popover-foreground" },
      { name: "muted", fg: "muted-foreground" },
      { name: "secondary", fg: "secondary-foreground" },
      { name: "foreground-secondary" },
    ],
  },
  {
    title: "Marca e ação",
    tokens: [
      { name: "primary", fg: "primary-foreground" },
      { name: "primary-hover", fg: "primary-foreground" },
      { name: "primary-pressed", fg: "primary-foreground" },
      { name: "accent", fg: "accent-foreground" },
    ],
  },
  {
    title: "Semânticas",
    tokens: [
      { name: "destructive", fg: "destructive-foreground" },
      { name: "destructive-hover", fg: "destructive-foreground" },
      { name: "destructive-pressed", fg: "destructive-foreground" },
      { name: "success", fg: "success-foreground" },
      { name: "warning", fg: "warning-foreground" },
      { name: "info", fg: "info-foreground" },
    ],
  },
  {
    title: "Bordas, foco e desabilitado",
    tokens: [
      { name: "border" },
      { name: "input" },
      { name: "ring" },
      { name: "ring-focus" },
      { name: "ring-error" },
      { name: "disabled", fg: "disabled-foreground" },
    ],
  },
  {
    title: "Gráficos",
    tokens: [{ name: "chart-1" }, { name: "chart-2" }, { name: "chart-3" }, { name: "chart-4" }, { name: "chart-5" }],
  },
];

function Swatch({ name, fg }: { name: string; fg?: string }) {
  const value = useCssVar(`--${name}`);
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex h-16 items-end rounded-md border border-border p-2 text-lg font-semibold"
        style={{ background: `var(--${name})`, color: fg ? `var(--${fg})` : "var(--foreground)" }}
      >
        {fg ? "Aa" : ""}
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[13px] font-semibold">--{name}</span>
        <span className="font-mono text-xs text-muted-foreground">{value || "…"}</span>
      </div>
    </div>
  );
}

export function Colors() {
  return (
    <Page
      title="Cores"
      figma="2-8"
      description="Três camadas: Primitives → Theme → componentes. Telas e componentes usam só os tokens do Theme (abaixo). Troque o tema no topo para ver os valores Light e Dark."
    >
      {groups.map((g) => (
        <Section key={g.title} title={g.title}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {g.tokens.map((t) => (
              <Swatch key={t.name} {...t} />
            ))}
          </div>
        </Section>
      ))}
      <Section title="Uso em código">
        <Code
          code={`/* utilities do Tailwind geradas pelos tokens */
<div className="bg-card text-card-foreground border border-border" />
<p className="text-foreground-secondary" />
<button className="bg-primary text-primary-foreground hover:bg-primary-hover" />

/* ou direto em CSS */
.box { background: var(--card); border: 1px solid var(--border); }`}
        />
      </Section>
    </Page>
  );
}

// ---------- Tipografia ----------

const scale = [
  { token: "2xs", cls: "text-[10px] leading-[14px]", px: "10 / 14", use: "Informações complementares" },
  { token: "xs", cls: "text-xs", px: "12 / 16", use: "Legendas, infos" },
  { token: "sm", cls: "text-sm", px: "14 / 20", use: "Texto auxiliar, campos" },
  { token: "base", cls: "text-base", px: "16 / 24", use: "Corpo de texto padrão" },
  { token: "lg", cls: "text-lg", px: "18 / 28", use: "Texto de destaque" },
  { token: "xl", cls: "text-xl", px: "20 / 28", use: "Subtítulos, tópicos" },
  { token: "2xl", cls: "text-2xl", px: "24 / 32", use: "Subtítulos, tópicos" },
  { token: "3xl", cls: "text-3xl", px: "30 / 36", use: "H2" },
  { token: "4xl", cls: "text-4xl", px: "36 / 40", use: "Título de seção (H1)" },
  { token: "5xl", cls: "text-5xl", px: "48 / 48", use: "Display" },
];

const styles: { name: string; cls: string; sample: string }[] = [
  { name: "Heading/Display", cls: "font-heading text-5xl font-extrabold tracking-[-1px]", sample: "Seu RH mais inteligente" },
  { name: "Heading/H1", cls: "font-heading text-4xl font-extrabold tracking-[-1px]", sample: "Título principal da página" },
  { name: "Heading/H2", cls: "font-heading text-3xl font-semibold tracking-[-1px]", sample: "Título de seção" },
  { name: "Heading/H3", cls: "font-heading text-2xl font-semibold tracking-[-1px]", sample: "Subtítulo" },
  { name: "Heading/H4", cls: "font-heading text-xl font-semibold", sample: "Tópico" },
  { name: "Body/Lead", cls: "font-sans text-xl", sample: "Texto de abertura, maior que o corpo." },
  { name: "Body/Large", cls: "font-sans text-lg font-semibold", sample: "Texto grande em destaque" },
  { name: "Body/Default", cls: "font-sans text-base", sample: "Texto padrão para parágrafos e corpo de texto." },
  { name: "Body/Medium", cls: "font-sans text-base font-medium", sample: "Texto padrão com peso médio" },
  { name: "Body/Small", cls: "font-sans text-sm font-medium", sample: "Texto auxiliar para informações complementares" },
  { name: "Body/Small Regular", cls: "font-sans text-sm", sample: "Texto auxiliar regular" },
  { name: "Body/Caption", cls: "font-sans text-xs", sample: "Legenda para informações secundárias" },
  { name: "Button/M", cls: "font-heading text-base font-semibold", sample: "Agendar demonstração" },
  { name: "Code/Inline", cls: "font-mono text-sm font-medium", sample: "npm run dev" },
];

export function Typography() {
  return (
    <Page
      title="Tipografia"
      figma="2-9"
      description="Duas famílias: Plus Jakarta Sans nos títulos, botões e navegação, e Manrope em textos, formulários e tabelas. Use no máximo 2 pesos por fonte na mesma tela."
    >
      <Section title="Famílias">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-xs font-medium text-foreground-secondary">PRIMÁRIA · font-heading</p>
            <p className="mt-2 font-heading text-4xl font-bold">Plus Jakarta Sans</p>
            <p className="mt-2 font-heading text-sm text-foreground-secondary">Medium 500 · SemiBold 600 · Bold 700 · ExtraBold 800</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-xs font-medium text-foreground-secondary">SECUNDÁRIA · font-sans</p>
            <p className="mt-2 font-sans text-4xl font-bold">Manrope</p>
            <p className="mt-2 font-sans text-sm text-foreground-secondary">Regular 400 · Medium 500 · SemiBold 600 · Bold 700</p>
          </div>
        </div>
      </Section>

      <Section title="Text styles do Figma">
        <div className="overflow-hidden rounded-lg border border-border">
          {styles.map((s) => (
            <div key={s.name} className="flex flex-col gap-1 border-b border-border bg-card px-5 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="w-44 shrink-0 font-mono text-xs text-muted-foreground">{s.name}</span>
              <span className={s.cls}>{s.sample}</span>
            </div>
          ))}
        </div>
        <Code
          code={`// Heading/H1
<h1 className="font-heading text-4xl font-extrabold tracking-[-1px]">Título</h1>

// Body/Default
<p className="font-sans text-base">Parágrafo</p>`}
        />
      </Section>

      <Section title="Escala de tamanhos" hint="Tamanho / line-height em px. Classe Tailwind correspondente.">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-muted text-xs text-foreground-secondary">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Token</th>
                <th className="px-4 py-2.5 font-semibold">px</th>
                <th className="px-4 py-2.5 font-semibold">Uso sugerido</th>
                <th className="px-4 py-2.5 font-semibold">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {scale.map((r) => (
                <tr key={r.token} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-[13px] font-semibold text-primary">{r.token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground-secondary">{r.px}</td>
                  <td className="px-4 py-3">{r.use}</td>
                  <td className={`px-4 py-3 ${r.cls}`}>Lorem ipsum</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </Page>
  );
}

// ---------- Raio e espaçamento ----------

const radii = [
  { token: "2xs", cls: "rounded-2xs", px: "4px", use: "Checkbox, itens de menu" },
  { token: "xs", cls: "rounded-xs", px: "8px", use: "Menus, badge, input Medium" },
  { token: "sm", cls: "rounded-sm", px: "10px", use: "Botão Small, accordion" },
  { token: "md", cls: "rounded-md", px: "12px", use: "Botão Medium, input Large, alert" },
  { token: "lg", cls: "rounded-lg", px: "16px", use: "Botão Large, cards" },
  { token: "xl", cls: "rounded-xl", px: "18px", use: "Botão Xlarge" },
  { token: "full", cls: "rounded-full", px: "9999px", use: "Avatar, pills, radio" },
];

const spaces = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

export function RadiusSpacing() {
  return (
    <Page
      title="Raio e espaçamento"
      figma="2-10"
      description="Raios da coleção Radius do Figma e escala de espaçamento de 4px (a padrão do Tailwind)."
    >
      <Section title="Border radius" hint="Atenção: os tokens abaixo sobrescrevem o rounded-* padrão do Tailwind. Veja o README.">
        <Demo className="items-end gap-6">
          {radii.map((r) => (
            <div key={r.token} className="flex w-28 flex-col items-center gap-2 text-center">
              <div className={`size-16 border-2 border-primary bg-accent ${r.cls}`} />
              <span className="font-mono text-[13px] font-semibold">{r.cls}</span>
              <span className="text-xs text-foreground-secondary">{r.px}</span>
              <span className="text-xs text-muted-foreground">{r.use}</span>
            </div>
          ))}
        </Demo>
      </Section>

      <Section title="Espaçamento" hint="p-4 = 16px, gap-2 = 8px, size-10 = 40px.">
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-6">
          {spaces.map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-24 font-mono text-xs text-foreground-secondary">
                spacing/{n} · {n * 4}px
              </span>
              <div className="h-4 rounded-2xs bg-primary" style={{ width: n * 4 }} />
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}
