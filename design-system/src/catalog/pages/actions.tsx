import * as React from "react";
import { ArrowRight, Pencil, Plus, Settings, Trash2 } from "lucide-react";
import { Button, IconButton } from "../../components/ui";
import { Demo, Example, Page, PropsTable, Section } from "../doc";

const variants = ["primary", "secondary", "tertiary", "destructive"] as const;
const sizes = ["xl", "lg", "md", "sm"] as const;
const label: Record<(typeof variants)[number], string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  destructive: "Destructive",
};

export function ButtonPage() {
  const [loading, setLoading] = React.useState(false);
  const save = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <Page
      title="Button"
      figma="18-81254"
      description="Executa ações e guia a navegação. Quatro tipos, quatro tamanhos, ícone opcional. Hover, foco, pressed e disabled vêm de CSS: passe o mouse e use Tab para ver."
    >
      <Example
        title="Tipos"
        hint="Primary é a ação principal da tela. Use Destructive só para ações que não dá para desfazer."
        code={`<Button variant="primary" size="md">Primary</Button>
<Button variant="secondary" size="md">Secondary</Button>
<Button variant="tertiary" size="md">Tertiary</Button>
<Button variant="destructive" size="md">Destructive</Button>`}
      >
        {variants.map((v) => (
          <Button key={v} variant={v} size="md">
            {label[v]}
          </Button>
        ))}
      </Example>

      <Example
        title="Tamanhos"
        hint="Xlarge 56px (padrão do Figma) · Large 48px · Medium 40px · Small 32px."
        code={`<Button size="xl">Xlarge</Button>
<Button size="lg">Large</Button>
<Button size="md">Medium</Button>
<Button size="sm">Small</Button>`}
      >
        {sizes.map((s) => (
          <Button key={s} size={s}>
            {s === "xl" ? "Xlarge" : s === "lg" ? "Large" : s === "md" ? "Medium" : "Small"}
          </Button>
        ))}
      </Example>

      <Example
        title="Com ícone"
        hint="Figma: Icon = Prefix ou Suffix. Passe um ícone do lucide-react; o tamanho acompanha o botão."
        code={`import { Plus, ArrowRight } from "lucide-react";

<Button size="md" startIcon={<Plus />}>Adicionar</Button>
<Button size="md" variant="secondary" endIcon={<ArrowRight />}>Continuar</Button>`}
      >
        <Button size="md" startIcon={<Plus className="size-4" />}>
          Adicionar
        </Button>
        <Button size="md" variant="secondary" endIcon={<ArrowRight className="size-4" />}>
          Continuar
        </Button>
        <Button size="md" variant="tertiary" startIcon={<Pencil className="size-4" />}>
          Editar
        </Button>
      </Example>

      <Section title="Estados" hint="Disabled usa os tokens disabled e disabled-foreground. Loading mantém a cor do botão e bloqueia o clique.">
        <Demo className="flex-col items-stretch gap-3">
          {variants.map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-3">
              <span className="w-28 text-xs font-medium text-foreground-secondary">{label[v]}</span>
              <Button variant={v} size="md">
                Default
              </Button>
              <Button variant={v} size="md" disabled>
                Disabled
              </Button>
              <Button variant={v} size="md" loading>
                Loading
              </Button>
            </div>
          ))}
        </Demo>
      </Section>

      <Example
        title="Loading interativo"
        hint="Clique no botão: ele mostra o spinner por 2 segundos e ignora novos cliques."
        code={`const [loading, setLoading] = React.useState(false);

<Button size="md" loading={loading} onClick={() => {
  setLoading(true);
  setTimeout(() => setLoading(false), 2000);
}}>
  Salvar alterações
</Button>`}
      >
        <Button size="md" loading={loading} onClick={save}>
          {loading ? "Salvando…" : "Salvar alterações"}
        </Button>
      </Example>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "variant", type: '"primary" | "secondary" | "tertiary" | "destructive"', default: '"primary"', description: "Estilo do botão.", figma: "Type" },
            { name: "size", type: '"xl" | "lg" | "md" | "sm"', default: '"xl"', description: "Altura 56 / 48 / 40 / 32px.", figma: "Size" },
            { name: "startIcon", type: "ReactNode", description: "Ícone antes do texto.", figma: "Icon = Prefix" },
            { name: "endIcon", type: "ReactNode", description: "Ícone depois do texto.", figma: "Icon = Suffix" },
            { name: "loading", type: "boolean", default: "false", description: "Mostra spinner, define aria-busy e bloqueia o clique.", figma: "State = Loading" },
            { name: "disabled", type: "boolean", default: "false", description: "Desabilita o botão (visual e foco).", figma: "State = Disabled" },
            { name: "...props", type: "ButtonHTMLAttributes", description: "Qualquer atributo de <button> (onClick, type, form…). O type padrão é button." },
          ]}
        />
      </Section>
    </Page>
  );
}

export function IconButtonPage() {
  return (
    <Page
      title="Icon button"
      figma="18-82644"
      description="Botão só com ícone, quadrado ou redondo. Como não tem texto, o aria-label é obrigatório."
    >
      <Example
        title="Formas e tipos"
        code={`<IconButton aria-label="Adicionar" icon={<Plus />} />
<IconButton aria-label="Configurações" icon={<Settings />} shape="rounded" />
<IconButton aria-label="Editar" icon={<Pencil />} variant="secondary" />
<IconButton aria-label="Excluir" icon={<Trash2 />} variant="secondary" shape="rounded" />`}
      >
        <IconButton aria-label="Adicionar" icon={<Plus />} size="md" />
        <IconButton aria-label="Configurações" icon={<Settings />} shape="rounded" size="md" />
        <IconButton aria-label="Editar" icon={<Pencil />} variant="secondary" size="md" />
        <IconButton aria-label="Excluir" icon={<Trash2 />} variant="secondary" shape="rounded" size="md" />
      </Example>

      <Example
        title="Tamanhos"
        hint="56 · 48 · 40 · 32 px."
        code={`<IconButton aria-label="Adicionar" icon={<Plus />} size="xl" />
<IconButton aria-label="Adicionar" icon={<Plus />} size="lg" />
<IconButton aria-label="Adicionar" icon={<Plus />} size="md" />
<IconButton aria-label="Adicionar" icon={<Plus />} size="sm" />`}
      >
        {sizes.map((s) => (
          <IconButton key={s} aria-label="Adicionar" icon={<Plus />} size={s} />
        ))}
      </Example>

      <Section title="Estados">
        <Demo>
          <IconButton aria-label="Adicionar" icon={<Plus />} size="md" />
          <IconButton aria-label="Adicionar (desabilitado)" icon={<Plus />} size="md" disabled />
          <IconButton aria-label="Carregando" icon={<Plus />} size="md" loading />
          <IconButton aria-label="Adicionar" icon={<Plus />} size="md" variant="secondary" />
          <IconButton aria-label="Adicionar (desabilitado)" icon={<Plus />} size="md" variant="secondary" disabled />
        </Demo>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "icon", type: "ReactNode", description: "Ícone do lucide-react.", figma: "Icon" },
            { name: "aria-label", type: "string", description: "Obrigatório. Descreve a ação para leitores de tela." },
            { name: "variant", type: '"primary" | "secondary"', default: '"primary"', description: "Estilo do botão.", figma: "Type" },
            { name: "shape", type: '"square" | "rounded"', default: '"square"', description: "Quadrado (raio 6px) ou redondo.", figma: "Shape" },
            { name: "size", type: '"xl" | "lg" | "md" | "sm"', default: '"xl"', description: "56 / 48 / 40 / 32px.", figma: "Size" },
            { name: "loading", type: "boolean", default: "false", description: "Spinner no lugar do ícone.", figma: "State = Loading" },
          ]}
        />
      </Section>
    </Page>
  );
}
