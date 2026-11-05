import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../components/ui";

const meta = {
  title: "Formulários/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          "Seleção múltipla ou escolha binária isolada (ex.: Aceito os termos). Use Checkbox quando a ação exige um botão de confirmação depois. " +
          "Figma: [Checkbox](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=11-350).",
      },
    },
  },
  args: { label: "Aceito os termos de uso" },
  argTypes: {
    checked: { control: "select", options: [false, true, "indeterminate"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Marcado: Story = {
  name: "Marcado",
  args: { defaultChecked: true },
};

export const Indeterminado: Story = {
  name: "Indeterminado",
  args: { checked: "indeterminate" },
};

export const ComErro: Story = {
  name: "Com erro",
  args: { error: true },
};

export const Desabilitado: Story = {
  name: "Desabilitado",
  args: { disabled: true, defaultChecked: true },
};

/** Desmarque para ver o estado de erro. */
export const Controlado: Story = {
  name: "Controlado",
  render: (args) => {
    const [accepted, setAccepted] = React.useState<boolean | "indeterminate">(true);
    return (
      <Checkbox
        {...args}
        label="Li e aceito a Política de Privacidade"
        checked={accepted}
        onCheckedChange={setAccepted}
        error={accepted === false}
      />
    );
  },
};
