import { Alert, Avatar, Badge, Status, type AvatarSize } from "../../components/ui";
import { Demo, Example, Page, PropsTable, Section } from "../doc";

const badgeVariants = ["default", "secondary", "destructive", "outline", "success", "warning", "info"] as const;
const statusTypes = [
  ["success", "Aprovado"],
  ["warning", "Pendente"],
  ["error", "Reprovado"],
  ["info", "Em análise"],
  ["neutral", "Rascunho"],
] as const;
const avatarSizes: AvatarSize[] = ["2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"];

// Foto de exemplo embutida (sem depender de rede).
const demoPhoto =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#a7f3d0"/><circle cx="32" cy="26" r="12" fill="#00644e"/><path d="M8 64c2-16 14-24 24-24s22 8 24 24z" fill="#00644e"/></svg>',
  );

export function BadgePage() {
  return (
    <Page
      title="Badge"
      figma="11-403"
      description="Rótulo curto de status ou categoria, no estilo shadcn/ui. Use success, warning e info para estados do produto (aprovado, pendente, informativo)."
    >
      <Example
        title="Variantes"
        code={`<Badge>default</Badge>
<Badge variant="secondary">secondary</Badge>
<Badge variant="destructive">destructive</Badge>
<Badge variant="outline">outline</Badge>
<Badge variant="success">success</Badge>
<Badge variant="warning">warning</Badge>
<Badge variant="info">info</Badge>`}
      >
        {badgeVariants.map((v) => (
          <Badge key={v} variant={v}>
            {v}
          </Badge>
        ))}
      </Example>
      <Section title="Badge ou Status?" hint="Badge é categoria ou contagem. Status é o estado de um registro, com ponto e texto (veja a página Status).">
        <PropsTable
          rows={[
            { name: "variant", type: '"default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"', default: '"default"', description: "Estilo do badge.", figma: "Variant" },
            { name: "children", type: "ReactNode", description: "Texto curto.", figma: "Label" },
          ]}
        />
      </Section>
    </Page>
  );
}

export function StatusPage() {
  return (
    <Page
      title="Status"
      figma="181-88"
      description="Indicador do estado de um registro. Combina cor, ponto e texto: nunca depende só da cor. Use rótulos curtos e o mesmo tipo para o mesmo significado em todas as telas."
    >
      <Example
        title="Tag, Pill e Dot"
        demoClassName="flex-col items-start gap-5"
        code={`<Status type="success">Aprovado</Status>
<Status type="warning" appearance="pill">Pendente</Status>
<Status type="error" appearance="dot">Reprovado</Status>`}
      >
        {(["tag", "pill", "dot"] as const).map((a) => (
          <div key={a} className="flex flex-wrap items-center gap-3">
            <span className="w-12 text-xs font-medium text-foreground-secondary">{a}</span>
            {statusTypes.map(([t, label]) => (
              <Status key={t} type={t} appearance={a}>
                {label}
              </Status>
            ))}
          </div>
        ))}
      </Example>
      <Section
        title="Atenção ao tamanho"
        hint="No Figma o texto do Tag tem 9px e o do Pill e do Dot, 10px. É menor que o mínimo recomendado de leitura. Está registrado nos pontos de atenção do README para o design avaliar."
      >
        <PropsTable
          rows={[
            { name: "type", type: '"success" | "warning" | "error" | "info" | "neutral"', default: '"success"', description: "Significado do estado.", figma: "Type" },
            { name: "appearance", type: '"tag" | "pill" | "dot"', default: '"tag"', description: "Formato. Renomeado de Style para não colidir com a prop style do React.", figma: "Style" },
            { name: "children", type: "ReactNode", description: "Rótulo curto, de uma ou duas palavras.", figma: "Label" },
          ]}
        />
      </Section>
    </Page>
  );
}

export function AvatarPage() {
  return (
    <Page
      title="Avatar"
      figma="1-11694"
      description="Representa um usuário, equipe ou perfil por foto ou iniciais. Se a foto não existir ou falhar ao carregar, mostra as iniciais do nome."
    >
      <Example
        title="Tamanhos"
        hint="24 · 32 · 40 · 48 · 64 · 80 · 96 px (2xl a 8xl)."
        code={`<Avatar size="2xl" name="Maria da Silva" />
<Avatar size="5xl" name="Maria da Silva" />
<Avatar size="8xl" name="Maria da Silva" />`}
      >
        {avatarSizes.map((s) => (
          <Avatar key={s} size={s} name="Maria da Silva" />
        ))}
      </Example>

      <Example
        title="Formato e tipo"
        code={`<Avatar size="6xl" name="Maria da Silva" />
<Avatar size="6xl" name="Maria da Silva" shape="squircle" />
<Avatar size="6xl" src="/foto.jpg" name="Maria da Silva" />
<Avatar size="6xl" placeholder />`}
      >
        <Avatar size="6xl" name="Maria da Silva" />
        <Avatar size="6xl" name="Maria da Silva" shape="squircle" />
        <Avatar size="6xl" src={demoPhoto} name="João Pereira" />
        <Avatar size="6xl" placeholder />
      </Example>

      <Demo>
        <p className="text-sm text-foreground-secondary">
          O terceiro avatar usa uma foto de exemplo. Se a foto não existir ou falhar ao carregar, aparecem as iniciais do nome.
        </p>
      </Demo>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "name", type: "string", description: "Nome da pessoa: vira o texto alternativo e as iniciais (primeira e última palavra)." },
            { name: "src", type: "string", description: "URL da foto. Falhou ou ausente: iniciais.", figma: "Type = Image" },
            { name: "size", type: '"2xl" … "8xl"', default: '"2xl"', description: "Tamanho de 24 a 96px.", figma: "Size" },
            { name: "shape", type: '"circle" | "squircle"', default: '"circle"', description: "Formato.", figma: "Format" },
            { name: "placeholder", type: "boolean", description: 'Espaço reservado com "+".', figma: "Status = placeholder" },
          ]}
        />
      </Section>
    </Page>
  );
}

export function AlertPage() {
  return (
    <Page
      title="Alert"
      figma="241-7411"
      description="Alerta do app com ícone e mensagem, em quatro tons. Ocupa a largura disponível. Erros e avisos são anunciados na hora por leitores de tela."
    >
      <Example
        title="Tons"
        demoClassName="flex-col items-stretch max-w-xl"
        code={`<Alert tone="info">Uma nova versão do app está disponível.</Alert>
<Alert tone="warning">Suas férias vencem em 30 dias.</Alert>
<Alert tone="error">Não foi possível registrar o ponto. Tente novamente.</Alert>
<Alert tone="success">Documento enviado com sucesso.</Alert>`}
      >
        <Alert tone="info">Uma nova versão do app está disponível.</Alert>
        <Alert tone="warning">Suas férias vencem em 30 dias.</Alert>
        <Alert tone="error">Não foi possível registrar o ponto. Tente novamente.</Alert>
        <Alert tone="success">Documento enviado com sucesso.</Alert>
      </Example>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "tone", type: '"info" | "warning" | "error" | "success"', default: '"info"', description: "Tom do alerta (cor e ícone).", figma: "Tone" },
            { name: "icon", type: "ReactNode", description: "Troca o ícone padrão do tom.", figma: "Icon" },
            { name: "children", type: "ReactNode", description: "Mensagem.", figma: "Message" },
          ]}
        />
      </Section>
    </Page>
  );
}
