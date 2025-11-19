# ContentPack SaaS

SaaS completo para criadores de conteúdo gerarem pacotes de posts semanais baseados em IA.

## Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes, OpenAI API
- **Database**: PostgreSQL (Neon), Prisma ORM
- **State**: Zustand, React Query
- **Auth**: NextAuth.js
- **Deploy**: Vercel

## Funcionalidades

- Geração de conteúdo via IA (OpenAI GPT-4)
- Seleção de nicho, plataforma e estilo
- Calendário semanal automático
- Scripts de vídeo e textos de posts
- Exportação para PDF
- Tema dark mode
- Interface moderna e responsiva

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```env
DATABASE_URL="postgresql://user:password@host:5432/contentpack"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-..."
```

## Database Setup

```bash
npx prisma generate
npx prisma db push
```

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Estrutura do Projeto

```
/app
  /api
    /generate       # Geração de conteúdo
    /auth          # Autenticação
  /dashboard       # Dashboard principal
/components        # Componentes reutilizáveis
/lib              # Utilidades e configurações
/types            # Definições TypeScript
/prisma           # Schema do banco
```

## Deploy na Vercel

1. Conecte o repositório
2. Configure as variáveis de ambiente
3. Deploy automático

## Licença

MIT
