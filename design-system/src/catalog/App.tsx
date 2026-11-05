import * as React from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "../lib/cn";
import { ThemeContext, type ThemeMode } from "./doc";
import { allPages, groups } from "./registry";

function readTheme(): ThemeMode {
  // Se quem abriu a página (visualizador) já definiu o tema, respeita.
  const host = document.documentElement.dataset.theme;
  if (host === "light" || host === "dark") return host;
  try {
    const saved = localStorage.getItem("rhlabs-ds-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* localStorage indisponível */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readHash() {
  const id = window.location.hash.replace(/^#\/?/, "");
  return allPages.some((p) => p.id === id) ? id : "inicio";
}

export function App() {
  const [theme, setTheme] = React.useState<ThemeMode>(readTheme);
  const [pageId, setPageId] = React.useState(readHash);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const mainRef = React.useRef<HTMLElement>(null);

  // A classe .dark no <html> troca todos os tokens (é assim que o produto também deve fazer).
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("rhlabs-ds-theme", theme);
    } catch {
      /* ignora */
    }
  }, [theme]);

  // Acompanha mudanças de tema feitas por fora (data-theme no <html>).
  React.useEffect(() => {
    const obs = new MutationObserver(() => {
      const t = document.documentElement.dataset.theme;
      if (t === "light" || t === "dark") setTheme(t);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const onHash = () => {
      setPageId(readHash());
      setMenuOpen(false);
      mainRef.current?.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const page = allPages.find((p) => p.id === pageId) ?? allPages[0];
  const PageComponent = page.component;

  const nav = (
    <nav aria-label="Componentes" className="flex flex-col gap-6">
      {groups.map((g) => (
        <div key={g.title} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{g.title}</p>
          {g.pages.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              aria-current={p.id === page.id ? "page" : undefined}
              className={cn(
                "rounded-xs px-3 py-1.5 text-sm font-medium outline-none transition-colors",
                "focus-visible:ring-2 focus-visible:ring-primary",
                p.id === page.id
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground-secondary hover:bg-muted hover:text-foreground",
              )}
            >
              {p.title}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );

  return (
    <ThemeContext.Provider value={theme}>
      <div className="flex h-full flex-col bg-background text-foreground">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xs p-1.5 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <a href="#inicio" className="flex items-center gap-2 font-heading text-base font-bold">
              <span className="grid size-7 place-items-center rounded-xs bg-primary text-sm text-primary-foreground">R</span>
              RHLabs <span className="hidden font-medium text-foreground-secondary sm:inline">Design System</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">v1.0</span>
            <button
              type="button"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="inline-flex items-center gap-2 rounded-xs border border-border px-3 py-1.5 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={theme === "dark" ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside
            className={cn(
              "w-64 shrink-0 overflow-y-auto border-r border-border bg-sidebar p-4",
              "max-lg:absolute max-lg:inset-y-14 max-lg:left-0 max-lg:z-40 max-lg:shadow-xl",
              menuOpen ? "max-lg:block" : "max-lg:hidden",
            )}
          >
            {nav}
          </aside>
          <main ref={mainRef} className="min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
              <PageComponent />
            </div>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
