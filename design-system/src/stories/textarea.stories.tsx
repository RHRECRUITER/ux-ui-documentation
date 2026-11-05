import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../components/ui";

const meta = {
  title: "Formulários/Textarea",
  component: Textarea,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Campo de várias linhas para comentários, justificativas e descrições. Altura mínima de 96px, com alça para redimensionar. " +
          "Mesmos estados e validação do Input. Figma: [Text area](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=26-131).",
      },
    },
  },
  args: { label: "Justificativa", placeholder: "Digite aqui…" },
  argTypes: {
    error: { control: "text" },
    helpText: { control: "text" },
    success: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ComAjuda: Story = {
  name: "Com ajuda",
  args: { helpText: "Explique o motivo do ajuste." },
};

export const ComErro: Story = {
  name: "Com erro",
  args: { defaultValue: "Texto curto", error: "Descreva com pelo menos 20 caracteres." },
};

export const ComContador: Story = {
  name: "Com contador",
  render: (args) => {
    const max = 200;
    const [text, setText] = React.useState("");
    return (
      <Textarea
        {...args}
        label="Observação"
        maxLength={max}
        value={text}
        onChange={(e) => setText(e.target.value)}
        helpText={`${text.length} de ${max} caracteres`}
      />
    );
  },
};
