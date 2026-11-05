import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Pencil, Plus } from "lucide-react";
import { Button } from "../components/ui";

const variants = ["primary", "secondary", "tertiary", "destructive"] as const;
const sizes = ["xl", "lg", "md", "sm"] as const;

const meta = {
  title: "Ações/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Executa ações e guia a navegação. Hover, foco, pressed e disabled vêm de CSS (passe o mouse e use Tab). " +
          "Só `loading` é prop. Medidas e tokens vêm do Figma: [Button Contained](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=18-81254).",
      },
    },
  },
  args: { children: "Button text", variant: "primary", size: "md" },
  argTypes: {
    variant: { control: "select", options: variants, description: "Figma: Type" },
    size: { control: "inline-radio", options: sizes, description: "Figma: Size (xl 56px, lg 48px, md 40px, sm 32px)" },
    loading: { control: "boolean", description: "Mostra spinner e bloqueia o clique" },
    disabled: { control: "boolean" },
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Mude as props no painel Controls, embaixo. */
export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {variants.map((v) => (
        <Button key={v} {...args} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((s) => (
        <Button key={s} {...args} size={s}>
          {s}
        </Button>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} startIcon={<Plus className="size-4" />}>
        Adicionar
      </Button>
      <Button {...args} variant="secondary" endIcon={<ArrowRight className="size-4" />}>
        Continuar
      </Button>
      <Button {...args} variant="tertiary" startIcon={<Pencil className="size-4" />}>
        Editar
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {variants.map((v) => (
        <div key={v} className="flex items-center gap-3">
          <span className="w-24 text-xs text-foreground-secondary">{v}</span>
          <Button {...args} variant={v}>
            Default
          </Button>
          <Button {...args} variant={v} disabled>
            Disabled
          </Button>
          <Button {...args} variant={v} loading>
            Loading
          </Button>
        </div>
      ))}
    </div>
  ),
};

/** Clique: mostra o spinner por 2 segundos e ignora novos cliques. */
export const LoadingInterativo: Story = {
  name: "Loading interativo",
  render: (args) => {
    const [loading, setLoading] = React.useState(false);
    return (
      <Button
        {...args}
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      >
        {loading ? "Salvando…" : "Salvar alterações"}
      </Button>
    );
  },
};
