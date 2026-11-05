import * as React from "react";
import { Eye, Mail, User } from "lucide-react";
import { Checkbox, Input, RadioGroup, RadioGroupItem, Select, Textarea } from "../../components/ui";
import { Demo, Example, Page, PropsTable, Section } from "../doc";

const planOptions = [
  { value: "1-20", label: "1 a 20 colaboradores" },
  { value: "21-100", label: "21 a 100 colaboradores" },
  { value: "101-300", label: "101 a 300 colaboradores" },
  { value: "300+", label: "Mais de 300 colaboradores", disabled: true },
];

export function InputPage() {
  const [email, setEmail] = React.useState("maria@empresa");
  const invalid = email.length > 0 && !/^\S+@\S+\.\S+$/.test(email);

  return (
    <Page
      title="Input"
      figma="18-77197"
      description="Campo de texto de uma linha. Rótulo claro acima, placeholder curto, feedback de validação sempre próximo do campo. Foco, erro e sucesso usam anel de 3px."
    >
      <Example
        title="Básico"
        demoClassName="flex-col items-stretch max-w-sm"
        code={`<Input label="Nome completo" placeholder="Como no documento" required />
<Input label="E-mail" placeholder="voce@empresa.com" helpText="Usamos só para avisos do ponto." />`}
      >
        <Input label="Nome completo" placeholder="Como no documento" required />
        <Input label="E-mail" placeholder="voce@empresa.com" helpText="Usamos só para avisos do ponto." />
      </Example>

      <Example
        title="Estados"
        hint="Clique em um campo para ver o foco (Active). Erro e sucesso aparecem com ícone, nunca só com cor."
        demoClassName="flex-col items-stretch max-w-sm"
        code={`<Input label="Campo com erro" defaultValue="Maria 123" error="Nome inválido. Digite apenas letras." />
<Input label="Campo com sucesso" defaultValue="Maria da Silva" success helpText="Tudo certo." />
<Input label="Campo desabilitado" placeholder="Não editável" disabled />`}
      >
        <Input label="Campo com erro" defaultValue="Maria 123" error="Nome inválido. Digite apenas letras." />
        <Input label="Campo com sucesso" defaultValue="Maria da Silva" success helpText="Tudo certo." />
        <Input label="Campo desabilitado" placeholder="Não editável" disabled />
      </Example>

      <Example
        title="Tamanhos"
        hint="Medium 38px · Large 48px · Xlarge 60px (com borda de 2px)."
        demoClassName="flex-col items-stretch max-w-sm"
        code={`<Input size="md" label="Medium" placeholder="38px" />
<Input size="lg" label="Large" placeholder="48px" />
<Input size="xl" label="Xlarge" placeholder="60px" />`}
      >
        <Input size="md" label="Medium" placeholder="38px" />
        <Input size="lg" label="Large" placeholder="48px" />
        <Input size="xl" label="Xlarge" placeholder="60px" />
      </Example>

      <Example
        title="Com ícones"
        demoClassName="flex-col items-stretch max-w-sm"
        code={`import { Mail, Eye, User } from "lucide-react";

<Input label="Usuário" startIcon={<User />} placeholder="seu.usuario" />
<Input label="E-mail" startIcon={<Mail />} placeholder="voce@empresa.com" />
<Input label="Senha" type="password" endIcon={<Eye />} placeholder="••••••••" />`}
      >
        <Input label="Usuário" startIcon={<User />} placeholder="seu.usuario" />
        <Input label="E-mail" startIcon={<Mail />} placeholder="voce@empresa.com" />
        <Input label="Senha" type="password" endIcon={<Eye />} placeholder="••••••••" />
      </Example>

      <Example
        title="Validação ao vivo"
        hint="Apague o final do e-mail e veja o erro aparecer."
        demoClassName="flex-col items-stretch max-w-sm"
        code={`const [email, setEmail] = React.useState("");
const invalid = email.length > 0 && !/^\\S+@\\S+\\.\\S+$/.test(email);

<Input
  label="E-mail"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={invalid ? "Digite um e-mail válido." : undefined}
  success={!invalid && email.length > 0}
/>`}
      >
        <Input
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={invalid ? "Digite um e-mail válido." : undefined}
          success={!invalid && email.length > 0}
        />
      </Example>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "string", description: "Rótulo acima do campo. Já fica ligado ao input por htmlFor.", figma: "Label text" },
            { name: "helpText", type: "string", description: "Mensagem de ajuda abaixo do campo.", figma: "Help text" },
            { name: "error", type: "string | boolean", description: "true só pinta o erro. Uma string também mostra a mensagem em vermelho (com role=alert).", figma: "State = Error" },
            { name: "success", type: "boolean", description: "Borda e mensagem de sucesso.", figma: "State = Success" },
            { name: "size", type: '"md" | "lg" | "xl"', default: '"md"', description: "Altura 38 / 48 / 60px.", figma: "Size" },
            { name: "startIcon / endIcon", type: "ReactNode", description: "Ícones dentro do campo.", figma: "Icon = Prefix / Suffix" },
            { name: "required", type: "boolean", description: "Mostra * em vermelho e marca o campo como obrigatório.", figma: "Mandatory" },
            { name: "disabled", type: "boolean", description: "Desabilita o campo.", figma: "State = Disabled" },
            { name: "...props", type: "InputHTMLAttributes", description: "Qualquer atributo de <input> (type, value, onChange, placeholder…)." },
          ]}
        />
      </Section>
    </Page>
  );
}

export function TextareaPage() {
  const [text, setText] = React.useState("");
  const max = 200;
  return (
    <Page
      title="Textarea"
      figma="26-131"
      description="Campo de várias linhas para comentários, justificativas e descrições. Altura mínima de 96px, com alça para redimensionar. Mesmos estados e validação do Input."
    >
      <Example
        title="Básico"
        demoClassName="flex-col items-stretch max-w-md"
        code={`<Textarea label="Justificativa" placeholder="Digite aqui…" helpText="Explique o motivo do ajuste." />
<Textarea label="Com erro" defaultValue="Texto curto" error="Descreva com pelo menos 20 caracteres." />`}
      >
        <Textarea label="Justificativa" placeholder="Digite aqui…" helpText="Explique o motivo do ajuste." />
        <Textarea label="Com erro" defaultValue="Texto curto" error="Descreva com pelo menos 20 caracteres." />
      </Example>

      <Example
        title="Com contador de caracteres"
        hint="Mostre o limite antes de o usuário atingi-lo."
        demoClassName="flex-col items-stretch max-w-md"
        code={`const max = 200;
const [text, setText] = React.useState("");

<Textarea
  label="Observação"
  maxLength={max}
  value={text}
  onChange={(e) => setText(e.target.value)}
  helpText={text.length + " de " + max + " caracteres"}
/>`}
      >
        <Textarea
          label="Observação"
          maxLength={max}
          value={text}
          onChange={(e) => setText(e.target.value)}
          helpText={`${text.length} de ${max} caracteres`}
        />
      </Example>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "label / helpText / error / success", type: "—", description: "Iguais às do Input." },
            { name: "required / disabled", type: "boolean", description: "Iguais às do Input." },
            { name: "...props", type: "TextareaHTMLAttributes", description: "Qualquer atributo de <textarea> (rows, maxLength, value…)." },
          ]}
        />
      </Section>
    </Page>
  );
}

export function SelectPage() {
  const [value, setValue] = React.useState<string>();
  return (
    <Page
      title="Select"
      figma="29-131"
      description="Campo que abre uma lista de opções e mostra o valor escolhido. Enter ou espaço abre, setas navegam, Esc fecha. Para até 5 opções, prefira Radio ou Checkbox."
    >
      <Example
        title="Básico"
        demoClassName="flex-col items-stretch max-w-sm"
        code={`const options = [
  { value: "1-20", label: "1 a 20 colaboradores" },
  { value: "21-100", label: "21 a 100 colaboradores" },
  { value: "300+", label: "Mais de 300", disabled: true },
];

<Select label="Tamanho da empresa" options={options} value={value} onValueChange={setValue} />`}
      >
        <Select label="Tamanho da empresa" options={planOptions} value={value} onValueChange={setValue} />
        <p className="text-xs text-foreground-secondary">Valor escolhido: {value ?? "nenhum"}</p>
      </Example>

      <Example
        title="Tamanhos e estados"
        demoClassName="flex-col items-stretch max-w-sm"
        code={`<Select size="lg" label="Large" options={options} />
<Select label="Com erro" options={options} error="Escolha uma opção." />
<Select label="Desabilitado" options={options} disabled />`}
      >
        <Select size="lg" label="Large" options={planOptions} />
        <Select label="Com erro" options={planOptions} error="Escolha uma opção." />
        <Select label="Desabilitado" options={planOptions} disabled />
      </Example>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "options", type: "{ value: string; label: string; disabled?: boolean }[]", description: "Lista de opções." },
            { name: "value / defaultValue / onValueChange", type: "string / string / (v) => void", description: "Controlado ou não controlado." },
            { name: "label / helpText / error / success", type: "—", description: "Iguais às do Input." },
            { name: "placeholder", type: "string", default: '"Selecione uma opção"', description: "Texto quando nada foi escolhido.", figma: "Placeholder text" },
            { name: "size", type: '"md" | "lg"', default: '"md"', description: "Altura 38 / 48px.", figma: "Size" },
          ]}
        />
      </Section>
    </Page>
  );
}

export function CheckboxPage() {
  const [accepted, setAccepted] = React.useState<boolean | "indeterminate">(false);
  return (
    <Page
      title="Checkbox"
      figma="11-350"
      description="Seleção múltipla ou escolha binária isolada (ex.: Aceito os termos). Use Checkbox quando a ação exige um botão de confirmação depois, como um formulário de envio."
    >
      <Example
        title="Estados"
        hint="Use Tab para ver o foco e a barra de espaço para marcar."
        code={`<Checkbox label="Aceito os termos de uso" />
<Checkbox label="Marcado" defaultChecked />
<Checkbox label="Indeterminado" checked="indeterminate" />
<Checkbox label="Com erro" error />
<Checkbox label="Desabilitado" disabled />`}
      >
        <Checkbox label="Aceito os termos de uso" />
        <Checkbox label="Marcado" defaultChecked />
        <Checkbox label="Indeterminado" checked="indeterminate" />
        <Checkbox label="Com erro" error />
        <Checkbox label="Desabilitado" disabled />
      </Example>

      <Example
        title="Controlado"
        code={`const [accepted, setAccepted] = React.useState(false);

<Checkbox
  label="Li e aceito a Política de Privacidade"
  checked={accepted}
  onCheckedChange={setAccepted}
  error={!accepted}
/>`}
      >
        <Checkbox
          label="Li e aceito a Política de Privacidade"
          checked={accepted}
          onCheckedChange={setAccepted}
          error={accepted === false}
        />
      </Example>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "ReactNode", description: "Texto ao lado da caixa. Sem ele, passe aria-label.", figma: "Label" },
            { name: "checked / defaultChecked", type: 'boolean | "indeterminate"', description: "Estado marcado.", figma: "Checked" },
            { name: "onCheckedChange", type: "(checked) => void", description: "Chamado ao marcar ou desmarcar." },
            { name: "error", type: "boolean", default: "false", description: "Borda e halo vermelhos.", figma: "State = Error" },
            { name: "disabled", type: "boolean", default: "false", description: "Opacidade de 50%.", figma: "State = Disabled" },
          ]}
        />
      </Section>
    </Page>
  );
}

export function RadioPage() {
  const [plan, setPlan] = React.useState("mensal");
  return (
    <Page
      title="Radio"
      figma="1-11475"
      description="Escolhe uma única opção entre várias. Setas do teclado trocam a opção dentro do grupo."
    >
      <Example
        title="Grupo"
        code={`const [plan, setPlan] = React.useState("mensal");

<RadioGroup value={plan} onValueChange={setPlan} aria-label="Plano">
  <RadioGroupItem value="mensal" label="Mensal" />
  <RadioGroupItem value="anual" label="Anual" />
  <RadioGroupItem value="enterprise" label="Enterprise (indisponível)" disabled />
</RadioGroup>`}
      >
        <div className="flex flex-col gap-3">
          <RadioGroup value={plan} onValueChange={setPlan} aria-label="Plano">
            <RadioGroupItem value="mensal" label="Mensal" />
            <RadioGroupItem value="anual" label="Anual" />
            <RadioGroupItem value="enterprise" label="Enterprise (indisponível)" disabled />
          </RadioGroup>
          <p className="text-xs text-foreground-secondary">Escolhido: {plan}</p>
        </div>
      </Example>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "RadioGroup · value / defaultValue / onValueChange", type: "string / string / (v) => void", description: "Controle do grupo." },
            { name: "RadioGroupItem · value", type: "string", description: "Valor da opção." },
            { name: "RadioGroupItem · label", type: "ReactNode", description: "Texto ao lado do círculo.", figma: "Label" },
            { name: "RadioGroupItem · disabled", type: "boolean", description: "Opacidade de 50%.", figma: "Status = Disabled" },
          ]}
        />
      </Section>

      <Section title="Quer ver tudo junto?">
        <Demo className="flex-col items-stretch gap-4 max-w-md">
          <Input label="Nome" placeholder="Maria da Silva" required />
          <Select label="Tamanho da empresa" options={planOptions} />
          <Textarea label="Mensagem" placeholder="Conte o que você precisa…" />
          <Checkbox label="Aceito os termos de uso" />
        </Demo>
      </Section>
    </Page>
  );
}
