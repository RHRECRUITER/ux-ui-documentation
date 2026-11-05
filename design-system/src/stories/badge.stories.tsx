import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../components/ui";

const variants = ["default", "secondary", "destructive", "outline", "success", "warning", "info"] as const;

const meta = {
  title: "Feedback e dados/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "Rótulo curto de status ou categoria, no estilo shadcn/ui. Use success, warning e info para estados do produto. " +
          "Badge é categoria ou contagem; para o estado de um registro use Status. " +
          "Figma: [Badge](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=11-403).",
      },
    },
  },
  args: { children: "Badge", variant: "default" },
  argTypes: { variant: { control: "select", options: variants } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variantes: Story = {
  name: "Variantes",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((v) => (
        <Badge key={v} {...args} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
};
