# Imobiliária da Lucia

Site imobiliário responsivo para Toronto, com catálogo público, pesquisa, formulários, WhatsApp e painel administrativo. Esta versão usa Next.js nativo na Vercel e Supabase para banco de dados, autenticação e fotos.

## Recursos

- Imóveis para compra, aluguel e temporada com filtros avançados
- Página de detalhes, galeria, imóveis semelhantes e WhatsApp
- Formulários de interesse persistidos como leads
- Login administrativo por e-mail e senha, com recuperação de senha
- Cadastro, edição, duplicação, publicação, destaque, venda, aluguel e exclusão
- Upload múltiplo de imagens para Supabase Storage
- Histórico de alterações e autorização administrativa revalidada no servidor
- SEO, Open Graph, sitemap, acessibilidade e layout responsivo

## Configurar o Supabase

1. Crie um projeto em [Supabase](https://supabase.com/).
2. Abra **SQL Editor**, cole o conteúdo de `supabase/schema.sql` e execute.
3. Em **Authentication > Users**, crie o usuário administrador com e-mail e senha.
4. Copie `.env.example` para `.env.local`.
5. Em **Project Settings > API**, copie a URL, a chave anônima e a chave `service_role` para as variáveis correspondentes.
6. Defina `ADMIN_EMAILS` com o mesmo e-mail criado no Authentication. Vários e-mails podem ser separados por vírgula.

Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no navegador ou em um repositório público.

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. Se o Supabase ainda não estiver configurado, o catálogo usa os seis imóveis de demonstração; o painel administrativo informa quais variáveis estão faltando.

## Publicar na Vercel

1. Importe o repositório do GitHub na Vercel.
2. Mantenha o framework **Next.js** e não configure manualmente um Output Directory.
3. Em **Settings > Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAILS`
4. Faça um novo deployment.

O primeiro acesso com o Supabase configurado inclui automaticamente os seis imóveis de demonstração caso a tabela esteja vazia.
