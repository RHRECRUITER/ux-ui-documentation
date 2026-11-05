import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui";

interface AccordionDemoProps {
  /** Um item aberto por vez ("single") ou vários ("multiple"). */
  type: "single" | "multiple";
  /** Figma: Size. */
  size: "default" | "compact";
}

const faq = [
  ["O registro de ponto exige GPS?", "O GPS é opcional e pode ser configurado conforme a política da sua empresa."],
  ["O RHDPeople é indicado para qual tipo de empresa?", "Para empresas de todos os portes, de startups a grandes corporações."],
  ["Posso exportar os dados para a contabilidade?", "Sim. A exportação é integrada e cada lançamento é rastreável."],
];

/** Wrapper só para as stories: o Accordion real recebe `type` e as props do Radix. */
function AccordionDemo({ type, size }: AccordionDemoProps) {
  const items = faq.map(([q, a], i) => (
    <AccordionItem key={q} value={`item-${i}`}>
      <AccordionTrigger>{q}</AccordionTrigger>
      <AccordionContent>{a}</AccordionContent>
    </AccordionItem>
  ));
  return type === "multiple" ? (
    <Accordion type="multiple" size={size} defaultValue={["item-0"]}>
      {items}
    </Accordion>
  ) : (
    <Accordion type="single" collapsible size={size} defaultValue="item-0">
      {items}
    </Accordion>
  );
}

const meta = {
  title: "Navegação/Accordion",
  component: AccordionDemo,
  decorators: [
    (Story) => (
      <div className="w-[560px] max-w-full">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Lista de perguntas e respostas que abre e fecha, usada nas FAQs da landing. Clique para ver a animação. " +
          "Teclado (Enter, espaço, setas) e `aria-expanded` vêm prontos do Radix. " +
          "Figma: [Accordion item](https://www.figma.com/design/THYVm23rQLtJB4rxUKVMUl/RHLabs?node-id=108-21534).",
      },
    },
  },
  args: { type: "single", size: "default" },
  argTypes: {
    type: { control: "inline-radio", options: ["single", "multiple"] },
    size: { control: "inline-radio", options: ["default", "compact"] },
  },
} satisfies Meta<typeof AccordionDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Um item aberto por vez. Abrir outro fecha o anterior. */
export const UmPorVez: Story = {
  name: "Um por vez",
  args: { type: "single" },
};

/** Vários itens abertos ao mesmo tempo. */
export const PermiteVarios: Story = {
  name: "Permite vários",
  args: { type: "multiple" },
};

export const Compacto: Story = {
  name: "Compacto",
  args: { size: "compact" },
};
