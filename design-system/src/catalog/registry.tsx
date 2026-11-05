import type { ComponentType } from "react";
import { ButtonPage, IconButtonPage } from "./pages/actions";
import { AlertPage, AvatarPage, BadgePage, StatusPage } from "./pages/feedback";
import { Colors, Overview, RadiusSpacing, Typography } from "./pages/foundations";
import { CheckboxPage, InputPage, RadioPage, SelectPage, TextareaPage } from "./pages/forms";
import { AccordionPage, DropdownPage } from "./pages/navigation";

export interface CatalogPage {
  id: string;
  title: string;
  component: ComponentType;
}

export interface CatalogGroup {
  title: string;
  pages: CatalogPage[];
}

export const groups: CatalogGroup[] = [
  { title: "Começar", pages: [{ id: "inicio", title: "Início", component: Overview }] },
  {
    title: "Fundamentos",
    pages: [
      { id: "cores", title: "Cores", component: Colors },
      { id: "tipografia", title: "Tipografia", component: Typography },
      { id: "raio-espacamento", title: "Raio e espaçamento", component: RadiusSpacing },
    ],
  },
  {
    title: "Ações",
    pages: [
      { id: "button", title: "Button", component: ButtonPage },
      { id: "icon-button", title: "Icon button", component: IconButtonPage },
    ],
  },
  {
    title: "Formulários",
    pages: [
      { id: "input", title: "Input", component: InputPage },
      { id: "textarea", title: "Textarea", component: TextareaPage },
      { id: "select", title: "Select", component: SelectPage },
      { id: "checkbox", title: "Checkbox", component: CheckboxPage },
      { id: "radio", title: "Radio", component: RadioPage },
    ],
  },
  {
    title: "Feedback e dados",
    pages: [
      { id: "badge", title: "Badge", component: BadgePage },
      { id: "status", title: "Status", component: StatusPage },
      { id: "avatar", title: "Avatar", component: AvatarPage },
      { id: "alert", title: "Alert", component: AlertPage },
    ],
  },
  {
    title: "Navegação",
    pages: [
      { id: "accordion", title: "Accordion", component: AccordionPage },
      { id: "dropdown", title: "Dropdown", component: DropdownPage },
    ],
  },
];

export const allPages = groups.flatMap((g) => g.pages);
