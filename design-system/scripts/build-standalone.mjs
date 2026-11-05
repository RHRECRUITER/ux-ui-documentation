// Gera dist-standalone/catalog.html: o catálogo inteiro em UM arquivo HTML.
// Abre com duplo clique (file://), sem servidor e sem `npm install`.
// Uso: npm run build:standalone
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const read = (file) => readFileSync(join(dist, file), "utf8");

let html = read("index.html");

// CSS: troca <link rel="stylesheet" href="./assets/x.css"> por <style> inline.
html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/g, (_, file) => {
  return `<style>${read(file)}</style>`;
});

// JS: troca <script type="module" src="./assets/x.js"> por script inline.
// "</script" dentro do código precisa ser escapado para não fechar a tag antes da hora.
html = html.replace(/<script type="module"[^>]*src="\.\/(assets\/[^"]+\.js)"[^>]*><\/script>/g, (_, file) => {
  return `<script type="module">${read(file).replace(/<\/script/gi, "<\\/script")}</script>`;
});

mkdirSync("dist-standalone", { recursive: true });
writeFileSync(join("dist-standalone", "catalog.html"), html);
console.log(`dist-standalone/catalog.html  ${(html.length / 1024).toFixed(0)} kB`);
