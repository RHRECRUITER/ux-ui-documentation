import * as React from "react";
import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";

/**
 * Tema Light/Dark: escolha na barra de ferramentas (ícone de círculo).
 * É a mesma classe `.dark` no <html> que o produto deve usar.
 */
function ThemeFrame({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return <div className="rounded-lg bg-background p-6 text-foreground">{children}</div>;
}

const preview: Preview = {
  // Gera a página "Docs" (props, descrição e todas as stories) de cada componente.
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      description: "Tema do design system",
      toolbar: {
        title: "Tema",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => (
      <ThemeFrame dark={context.globals.theme === "dark"}>
        <Story />
      </ThemeFrame>
    ),
  ],
  parameters: {
    layout: "centered",
    controls: { expanded: true, sort: "requiredFirst" },
    options: {
      storySort: {
        order: ["Início", "Ações", "Formulários", "Feedback e dados", "Navegação"],
      },
    },
  },
};

export default preview;
