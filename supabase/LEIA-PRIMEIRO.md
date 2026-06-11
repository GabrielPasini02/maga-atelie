# Supabase — Maga Ateliê (Fase 1)

Passo a passo pra ligar o banco de dados do painel da Maria.

## 1) Rodar o schema (cria as tabelas)
1. Abra o projeto no [Supabase](https://supabase.com) → menu **SQL Editor** → **New query**.
2. Cole TODO o conteúdo de `schema.sql` → **Run**.
   - Cria as tabelas `vestidos` e `config`, a segurança (RLS) e o bucket de fotos.

## 2) Rodar o seed (carrega os 19 vestidos + destaque)
1. Ainda no SQL Editor → **New query**.
2. Cole TODO o `seed.sql` → **Run**.
   - Pode rodar 1x só. Se rodar de novo, não duplica.

## 3) Criar o acesso da Maria (login)
1. Menu **Authentication** → **Users** → **Add user** → **Create new user**.
2. Preencha **e-mail** e **senha** da Maria.
3. **MARQUE "Auto Confirm User"** (pra não precisar confirmar e-mail).
4. Pronto — é com esse e-mail e senha que ela entra no painel.

## 4) Testar
- Abra `site/painel/index.html` no navegador → faça login.
- Devem aparecer os 20 vestidos. Tente editar um, mudar o destaque, etc.
- Abra `site/index.html` e `site/colecao.html?col=Jardim` → devem carregar do banco.

> As chaves usadas no site são as **públicas** (publishable). Quem protege os dados é
> o RLS: o público só lê; só quem loga (Maria) edita. A "secret key" não é usada aqui
> e não deve ir pro código.

Se alguma linha de **policy do storage** der erro no passo 1, não tem problema: o bucket
`vestidos` pode ser deixado como **público** em Storage → Buckets, que funciona igual.
