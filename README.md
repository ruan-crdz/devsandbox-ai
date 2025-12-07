# 🧪 DevSandbox AI — Laboratório de Código com IA

O **DevSandbox AI** é um laboratório interativo de código, onde você pode:

- Escrever código em um editor estilo VS Code
- Executar o código diretamente no navegador
- Ver a saída em um console integrado
- Conversar com uma IA que entende o seu código:
  - Explica arquivos e funções
  - Sugere refatorações
  - Gera testes
  - Aponta possíveis problemas

Feito para estudo, experimentação e demonstração de habilidades avançadas em **Front-end**, **execução de código no browser** e **IA aplicada ao desenvolvimento**.

---

## 🎯 Objetivos do projeto

- Criar uma experiência similar a uma mini-IDE no navegador
- Integrar IA como assistente de código, não como produto principal
- Demonstrar domínio de:
  - Next.js + TypeScript
  - Tailwind + design de layout complexo
  - Monaco Editor
  - Execução de código em sandbox (iframe / Web Worker)
  - Integração com modelo de linguagem (Groq/LLM)

---

## 🚀 Tecnologias Utilizadas

- **Next.js 14 (App Router, `/app`)**
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui**
- **Monaco Editor (`@monaco-editor/react`)**
- **IA (Groq API ou outro LLM)**
- **Execução de código em sandbox (iframe ou Web Worker)**

---

## 🎨 Branding & Identidade Visual

- **Nome:** DevSandbox AI  
- **Tagline:** *Escreva código. Rode. Pergunte. Aprenda.*  

**Paleta de cores:**

| Elemento                | Cor        |
|------------------------|------------|
| Fundo principal        | `#050816`  |
| Painéis / Cards        | `#0B1020`  |
| Bordas / Divisores     | `#1E293B`  |
| Texto primário         | `#E5E7EB`  |
| Texto secundário       | `#9CA3AF`  |
| Ação/primária (ciano)  | `#38BDF8`  |
| IA/acentuação (roxo)   | `#A855F7`  |
| Erro                   | `#F97373`  |
| Sucesso                | `#22C55E`  |

**Fontes:**

- Interface: `Inter`
- Código: `JetBrains Mono`

---

## 🧱 Arquitetura (Visão Geral)

```

src/
├── app/
│   ├── layout.tsx
│   └── page.tsx          // Workbench principal
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   └── TopBar.tsx
│   ├── editor/
│   │   └── EditorPanel.tsx
│   ├── console/
│   │   └── ConsolePanel.tsx
│   ├── ai/
│   │   └── AIPanel.tsx
│   └── files/
│       └── FileExplorer.tsx
│
├── core/
│   ├── editor/
│   │   └── useEditorState.ts
│   ├── runtime/
│   │   ├── runInIframe.ts
│   │   └── types.ts
│   ├── ai/
│   │   ├── aiClient.ts
│   │   ├── prompts.ts
│   │   └── types.ts
│   └── config/
│       └── theme.ts
│
├── app/api/
│   └── ai/route.ts       // rota server-side que chama o LLM
│
└── styles/
└── globals.css

````

---

## 🛠 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/devsandbox-ai.git
cd devsandbox-ai
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure sua chave da IA

Crie o arquivo `.env.local` na raiz:

```env
GROQ_API_KEY=sua_chave_aqui
```

### 4. Rode o projeto

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## 🧩 Roadmap

### MVP (versão inicial)

* [ ] Editor com Monaco (JS/TS)
* [ ] Execução de código em sandbox com console
* [ ] Painel de IA lendo o código atual
* [ ] Ações rápidas: explicar, refatorar, gerar testes
* [ ] Templates iniciais

### Futuro

* [ ] Multi-arquivos com árvore real
* [ ] Execução usando WebContainers (Node no browser)
* [ ] Execução de testes automatizados
* [ ] Compartilhar sandbox por URL
* [ ] Suporte a outras linguagens
* [ ] Chat contextual com histórico por arquivo

---

## 🧑‍💻 Autor

**Ruan Cardozo — Front-end Developer**
Criando ferramentas para desenvolver melhor, não só sites bonitos.
