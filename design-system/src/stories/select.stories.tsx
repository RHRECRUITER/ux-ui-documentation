import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "../components/ui";

const options = [
  { value: "1-20", label: "1 a 20 colaboradores" },
  { value: "21-100", label: "21 a 100 colaboradores" },
  { value: "101-300", label: "101 a 300 colaboradores" },
  { value: "300+", label: "Mais de 300 colaboradores", disabled: true },
];

const meta = {
  title: "Formulários/Select",
  component: Select,
  decorators: [
    (Story) => (
      <div className="h-72 w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo que abre uma lista de opções e mostra o valor escolhido. Enter ou espaço abre, setas navegam, Esc fecha. " +
          "Para até 5 opções, prefira Radio ou Checkbox. Figma: [Input selected](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=29-131).",
      },
    },
  },
  args: { label: "Tamanho da empresa", options, size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["md", "lg"] },
    error: { control: "text" },
    helpText: { control: "text" },
    success: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Large: Story = { args: { size: "lg" } };

export const ComErro: Story = {
  name: "Com erro",
  args: { error: "Escolha uma opção." },
};

export const Desabilitado: Story = {
  name: "Desabilitado",
  args: { disabled: true },
};

/** Escolha uma opção e veja o valor aparecer abaixo. */
export const Controlado: Story = {
  name: "Controlado",
  render: (args) => {
    const [value, setValue] = React.useState<string>();
    return (
      <div className="flex flex-col gap-3">
        <Select {...args} value={value} onValueChange={setValue} />
        <p className="text-xs text-foreground-secondary">Valor escolhido: {value ?? "nenhum"}</p>
      </div>
    );
  },
};
