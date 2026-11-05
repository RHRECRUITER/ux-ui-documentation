import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Eye, Mail, User } from "lucide-react";
import { Input } from "../components/ui";

const meta = {
  title: "Formulários/Input",
  component: Input,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Campo de texto de uma linha. Rótulo claro acima, placeholder curto e feedback de validação sempre próximo do campo. " +
          "Foco, erro e sucesso usam anel de 3px. Figma: [Basic input](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=18-77197).",
      },
    },
  },
  args: { label: "Nome completo", placeholder: "Como no documento", size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["md", "lg", "xl"], description: "Figma: Size (38 / 48 / 60px)" },
    error: { control: "text", description: "Texto do erro. Vazio = sem erro" },
    helpText: { control: "text" },
    success: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ComAjuda: Story = {
  name: "Com ajuda",
  args: { label: "E-mail", placeholder: "voce@empresa.com", helpText: "Usamos só para avisos do ponto." },
};

export const Obrigatorio: Story = {
  name: "Obrigatório",
  args: { required: true },
};

export const ComErro: Story = {
  name: "Com erro",
  args: { defaultValue: "Maria 123", error: "Nome inválido. Digite apenas letras." },
};

export const ComSucesso: Story = {
  name: "Com sucesso",
  args: { defaultValue: "Maria da Silva", success: true, helpText: "Tudo certo." },
};

export const Desabilitado: Story = {
  name: "Desabilitado",
  args: { placeholder: "Não editável", disabled: true },
};

export const Tamanhos: Story = {
  name: "Tamanhos",
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} size="md" label="Medium (38px)" />
      <Input {...args} size="lg" label="Large (48px)" />
      <Input {...args} size="xl" label="Xlarge (60px)" />
    </div>
  ),
};

export const ComIcones: Story = {
  name: "Com ícones",
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} label="Usuário" startIcon={<User />} placeholder="seu.usuario" />
      <Input {...args} label="E-mail" startIcon={<Mail />} placeholder="voce@empresa.com" />
      <Input {...args} label="Senha" type="password" endIcon={<Eye />} placeholder="••••••••" />
    </div>
  ),
};

/** Apague o final do e-mail e veja o erro aparecer. */
export const ValidacaoAoVivo: Story = {
  name: "Validação ao vivo",
  render: (args) => {
    const [email, setEmail] = React.useState("maria@empresa");
    const invalid = email.length > 0 && !/^\S+@\S+\.\S+$/.test(email);
    return (
      <Input
        {...args}
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={invalid ? "Digite um e-mail válido." : undefined}
        success={!invalid && email.length > 0}
      />
    );
  },
};
