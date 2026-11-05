import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "../components/ui";

const meta = {
  title: "Formulários/Radio",
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          "Escolhe uma única opção entre várias. As setas do teclado trocam a opção dentro do grupo. " +
          "Figma: [Radio Button](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=1-11475).",
      },
    },
  },
  args: { "aria-label": "Plano", defaultValue: "mensal" },
  argTypes: { disabled: { control: "boolean" } },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="mensal" label="Mensal" />
      <RadioGroupItem value="anual" label="Anual" />
      <RadioGroupItem value="enterprise" label="Enterprise (indisponível)" disabled />
    </RadioGroup>
  ),
};

/** Escolha uma opção e veja o valor abaixo. */
export const Controlado: Story = {
  name: "Controlado",
  render: (args) => {
    const [plan, setPlan] = React.useState("mensal");
    return (
      <div className="flex flex-col gap-3">
        <RadioGroup {...args} value={plan} onValueChange={setPlan}>
          <RadioGroupItem value="mensal" label="Mensal" />
          <RadioGroupItem value="anual" label="Anual" />
        </RadioGroup>
        <p className="text-xs text-foreground-secondary">Escolhido: {plan}</p>
      </div>
    );
  },
};
