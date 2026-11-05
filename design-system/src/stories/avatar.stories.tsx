import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, type AvatarSize } from "../components/ui";

const sizes: AvatarSize[] = ["2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"];

// Foto de exemplo embutida (sem depender de rede).
const demoPhoto =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#a7f3d0"/><circle cx="32" cy="26" r="12" fill="#00644e"/><path d="M8 64c2-16 14-24 24-24s22 8 24 24z" fill="#00644e"/></svg>',
  );

const meta = {
  title: "Feedback e dados/Avatar",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          "Representa um usuário, equipe ou perfil por foto ou iniciais. Se a foto não existir ou falhar ao carregar, mostra as iniciais do nome. " +
          "Figma: [Avatar](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=1-11694).",
      },
    },
  },
  args: { name: "Maria da Silva", size: "5xl", shape: "circle" },
  argTypes: {
    size: { control: "select", options: sizes, description: "24, 32, 40, 48, 64, 80 e 96px" },
    shape: { control: "inline-radio", options: ["circle", "squircle"] },
    src: { control: "text" },
    placeholder: { control: "boolean" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tamanhos: Story = {
  name: "Tamanhos",
  render: (args) => (
    <div className="flex items-center gap-4">
      {sizes.map((s) => (
        <Avatar key={s} {...args} size={s} />
      ))}
    </div>
  ),
};

export const FormatoETipo: Story = {
  name: "Formato e tipo",
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} size="6xl" />
      <Avatar {...args} size="6xl" shape="squircle" />
      <Avatar {...args} size="6xl" name="João Pereira" src={demoPhoto} />
      <Avatar {...args} size="6xl" placeholder />
    </div>
  ),
};
