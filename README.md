# Imobiliária da Lucia

Site imobiliário completo para Toronto, com catálogo público, filtros, páginas de detalhes, formulários de interesse, WhatsApp e painel administrativo protegido.

## Recursos

- Catálogo responsivo com compra, aluguel e temporada
- Filtros por localização, tipo, preço, quartos, banheiros, vagas, área e comodidades
- Galeria, mapa aproximado, imóveis semelhantes e WhatsApp com mensagem automática
- Leads persistidos e gerenciados por status
- Painel protegido por login com permissões por e-mail
- Cadastro, edição, duplicação, publicação, desativação, venda, aluguel, destaque e exclusão
- Upload múltiplo seguro para R2
- Histórico de alterações, validação e consultas preparadas via Drizzle/D1
- SEO, Open Graph, sitemap, robots e dados acessíveis

## Instalação local

1. Use Node.js 22.13 ou superior.
2. Instale as dependências com `npm install`.
3. Copie `.env.example` para `.env.local` e defina `ADMIN_EMAILS`.
4. Gere as migrações com `npm run db:generate`.
5. Aplique a migração local com `npx wrangler d1 migrations apply site-creator-d1 --local`.
6. Inicie o projeto com a variável `WRANGLER_LOG_PATH=.wrangler/wrangler.log` e `vinext dev` (PowerShell: `$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; npx vinext dev`).

O ambiente local permite o administrador de demonstração `admin@imobiliariadalucia.ca`. Em produção, `/admin` exige login com ChatGPT e o e-mail deve estar em `ADMIN_EMAILS`.

## Dados e armazenamento

O primeiro acesso à API popula seis imóveis de demonstração em Toronto. Imóveis, leads e auditoria ficam no Cloudflare D1; imagens ficam no Cloudflare R2. As ligações lógicas `DB` e `IMAGES` estão em `.openai/hosting.json` e os recursos reais são gerenciados pelo Sites.

## Segurança

Autenticação é delegada ao fluxo seguro do Sites/ChatGPT. A autorização é revalidada no servidor em toda ação administrativa. O sistema usa ORM e statements parametrizados, valida tamanho e MIME de uploads, limita quantidade de arquivos e não renderiza HTML fornecido por usuários. Sessões e CSRF são tratados pelo dispatcher da plataforma.

## Produção

Configure `ADMIN_EMAILS` no ambiente do Sites. O D1 e o R2 são provisionados e conectados automaticamente durante a publicação.
