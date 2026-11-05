import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, Settings, Trash2 } from "lucide-react";
import { IconButton } from "../components/ui";

const sizes = ["xl", "lg", "md", "sm"] as const;

const meta = {
  title: "Ações/Icon button",
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          "Botão só com ícone, quadrado ou redondo. Como não tem texto, o `aria-label` é obrigatório. " +
          "Figma: [Icon button](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=18-82644).",
      },
    },
  },
  args: { icon: <Plus />, "aria-label": "Adicionar", size: "md", variant: "primary", shape: "square" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary"] },
    shape: { control: "inline-radio", options: ["square", "rounded"] },
    size: { control: "inline-radio", options: sizes },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    icon: { control: false },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FormasETipos: Story = {
  name: "Formas e tipos",
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} aria-label="Adicionar" icon={<Plus />} />
      <IconButton {...args} aria-label="Configurações" icon={<Settings />} shape="rounded" />
      <IconButton {...args} aria-label="Excluir" icon={<Trash2 />} variant="secondary" />
      <IconButton {...args} aria-label="Excluir" icon={<Trash2 />} variant="secondary" shape="rounded" />
    </div>
  ),
};

export const Tamanhos: Story = {
  name: "Tamanhos",
  render: (args) => (
    <div className="flex items-center gap-4">
      {sizes.map((s) => (
        <IconButton key={s} {...args} size={s} />
      ))}
    </div>
  ),
};
