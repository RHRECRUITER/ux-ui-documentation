import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui";

interface DropdownDemoProps {
  /** Texto do botão que abre o menu. */
  trigger: string;
}

/** Wrapper só para a story: monta um menu de conta completo. */
function DropdownDemo({ trigger }: DropdownDemoProps) {
  const [team, setTeam] = React.useState(true);
  const [reports, setReports] = React.useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="md" endIcon={<ChevronDown className="size-4" />}>
          {trigger}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Maria da Silva</DropdownMenuLabel>
        <DropdownMenuItem icon={<User />}>Meu perfil</DropdownMenuItem>
        <DropdownMenuItem icon={<Settings />}>Configurações</DropdownMenuItem>
        <DropdownMenuCheckboxItem checked={team} onCheckedChange={setTeam}>
          Equipe RH
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={reports} onCheckedChange={setReports}>
          Relatórios
        </DropdownMenuCheckboxItem>
        <DropdownMenuItem disabled>Indisponível</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<LogOut />}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const meta = {
  title: "Navegação/Dropdown",
  component: DropdownDemo,
  decorators: [
    (Story) => (
      <div className="h-80 w-64">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Menu suspenso para escolher uma ação ou opção. Setas navegam, Enter seleciona e Esc fecha. O item marcado ganha um check, além da cor. " +
          "Figma: [Dropdown](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=30-2112).",
      },
    },
  },
  args: { trigger: "Minha conta" },
} satisfies Meta<typeof DropdownDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Clique no botão e navegue com as setas. */
export const MenuDeConta: Story = { name: "Menu de conta" };
