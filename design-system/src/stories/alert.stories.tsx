import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "../components/ui";

const meta = {
  title: "Feedback e dados/Alert",
  component: Alert,
  decorators: [
    (Story) => (
      <div className="w-[480px] max-w-full">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Alerta do app com ícone e mensagem, em quatro tons. Ocupa a largura disponível. Erros e avisos são anunciados na hora por leitores de tela. " +
          "Figma: [Alert](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=241-7411).",
      },
    },
  },
  args: { tone: "info", children: "Uma nova versão do app está disponível." },
  argTypes: {
    tone: { control: "inline-radio", options: ["info", "warning", "error", "success"] },
    icon: { control: false },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tons: Story = {
  name: "Tons",
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert tone="info">Uma nova versão do app está disponível.</Alert>
      <Alert tone="warning">Suas férias vencem em 30 dias.</Alert>
      <Alert tone="error">Não foi possível registrar o ponto. Tente novamente.</Alert>
      <Alert tone="success">Documento enviado com sucesso.</Alert>
    </div>
  ),
};
