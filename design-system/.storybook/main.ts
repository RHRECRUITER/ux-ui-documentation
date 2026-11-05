import type { StorybookConfig } from "@storybook/react-vite";

// Storybook do RHLabs Design System. Roda com `npm run storybook`.
// As stories ficam em src/stories, separadas de src/components/ui (que é a pasta que o time copia).
const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y", // checagem de acessibilidade em cada story
    "@storybook/addon-docs", // página de documentação gerada das props
  ],
  framework: "@storybook/react-vite",
};

export default config;
