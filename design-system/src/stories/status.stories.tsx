import type { Meta, StoryObj } from "@storybook/react-vite";
import { Status } from "../components/ui";

const types = [
  ["success", "Aprovado"],
  ["warning", "Pendente"],
  ["error", "Reprovado"],
  ["info", "Em análise"],
  ["neutral", "Rascunho"],
] as const;

const meta = {
  title: "Feedback e dados/Status",
  component: Status,
  parameters: {
    docs: {
      description: {
        component:
          "Indicador do estado de um registro. Combina cor, ponto e texto: nunca depende só da cor. Use rótulos curtos e o mesmo tipo para o mesmo significado em todas as telas. " +
          "Atenção: no Figma o texto tem 9 a 10px, abaixo do mínimo recomendado de leitura. " +
          "Figma: [Status](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=181-88).",
      },
    },
  },
  args: { children: "Aprovado", type: "success", appearance: "tag" },
  argTypes: {
    type: { control: "select", options: ["success", "warning", "error", "info", "neutral"] },
    appearance: { control: "inline-radio", options: ["tag", "pill", "dot"] },
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TagPillDot: Story = {
  name: "Tag, Pill e Dot",
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(["tag", "pill", "dot"] as const).map((a) => (
        <div key={a} className="flex flex-wrap items-center gap-3">
          <span className="w-10 text-xs text-foreground-secondary">{a}</span>
          {types.map(([t, label]) => (
            <Status key={t} {...args} type={t} appearance={a}>
              {label}
            </Status>
          ))}
        </div>
      ))}
    </div>
  ),
};
