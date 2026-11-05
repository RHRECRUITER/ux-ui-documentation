import * as React from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui";
import { Example, Page, PropsTable, Section } from "../doc";

export function AccordionPage() {
  return (
    <Page
      title="Accordion"
      figma="108-21534"
      description="Lista de perguntas e respostas que abre e fecha, usada nas FAQs da landing. Teclado (Enter, espaço, setas) e aria-expanded já vêm prontos."
    >
      <Example
        title="Default"
        demoClassName="flex-col items-stretch"
        code={`<Accordion type="single" collapsible defaultValue="a">
  <AccordionItem value="a">
    <AccordionTrigger>O registro de ponto exige GPS?</AccordionTrigger>
    <AccordionContent>O GPS é opcional e pode ser configurado conforme a política da empresa.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Para qual tipo de empresa?</AccordionTrigger>
    <AccordionContent>Para empresas de todos os portes, de startups a grandes corporações.</AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion type="single" collapsible defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>O registro de ponto exige GPS?</AccordionTrigger>
            <AccordionContent>O GPS é opcional e pode ser configurado conforme a política da sua empresa.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>O RHDPeople é indicado para qual tipo de empresa?</AccordionTrigger>
            <AccordionContent>Para empresas de todos os portes, de startups a grandes corporações.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Example>

      <Example
        title="Compact"
        demoClassName="max-w-sm flex-col items-stretch"
        code={`<Accordion type="single" collapsible size="compact">…</Accordion>`}
      >
        <Accordion type="single" collapsible size="compact" defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>Pergunta frequente</AccordionTrigger>
            <AccordionContent>Resposta curta para telas pequenas.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Example>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "Accordion · type", type: '"single" | "multiple"', description: "Um item aberto por vez ou vários." },
            { name: "Accordion · collapsible", type: "boolean", description: "Permite fechar o item aberto (no modo single)." },
            { name: "Accordion · size", type: '"default" | "compact"', default: '"default"', description: "Pergunta 16px ou 14px.", figma: "Size" },
            { name: "AccordionItem · value", type: "string", description: "Identificador do item." },
            { name: "AccordionTrigger", type: "ReactNode", description: "Pergunta.", figma: "Question" },
            { name: "AccordionContent", type: "ReactNode", description: "Resposta.", figma: "Answer" },
          ]}
        />
      </Section>
    </Page>
  );
}

export function DropdownPage() {
  const [team, setTeam] = React.useState(true);
  const [reports, setReports] = React.useState(false);
  return (
    <Page
      title="Dropdown"
      figma="30-2112"
      description="Menu suspenso para escolher uma ação ou opção. Setas navegam, Enter seleciona e Esc fecha. O item marcado ganha um check, além da cor."
    >
      <Example
        title="Menu de conta"
        hint="Clique no botão, depois navegue com as setas."
        demoClassName="min-h-72 items-start"
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary" size="md" endIcon={<ChevronDown className="size-4" />}>Minha conta</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Maria da Silva</DropdownMenuLabel>
    <DropdownMenuItem icon={<User />}>Meu perfil</DropdownMenuItem>
    <DropdownMenuItem icon={<Settings />}>Configurações</DropdownMenuItem>
    <DropdownMenuCheckboxItem checked={team} onCheckedChange={setTeam}>Equipe RH</DropdownMenuCheckboxItem>
    <DropdownMenuItem disabled>Indisponível</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<LogOut />}>Sair</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="md" endIcon={<ChevronDown className="size-4" />}>
              Minha conta
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
      </Example>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "DropdownMenuItem · icon", type: "ReactNode", description: "Ícone à esquerda.", figma: "Leading icon" },
            { name: "DropdownMenuItem · disabled", type: "boolean", description: "Item indisponível (texto a 60%).", figma: "State = Disabled" },
            { name: "DropdownMenuCheckboxItem · checked", type: "boolean", description: "Item marcado, com check à direita.", figma: "State = Selected" },
            { name: "DropdownMenuSeparator / Label", type: "—", description: "Divisor e título de grupo." },
          ]}
        />
      </Section>
    </Page>
  );
}
