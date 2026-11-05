import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" deixa o build do catálogo funcionar em qualquer caminho (GitHub Pages, intranet, pasta local).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
