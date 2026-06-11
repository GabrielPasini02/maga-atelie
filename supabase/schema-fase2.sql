-- ============================================================
--  Maga Ateliê — Fase 2: Preços (precificação dos vestidos)
--  Rode no Supabase → SQL Editor → New query → cole tudo → Run.
--  (Pode rodar de novo sem problema.)
-- ============================================================

-- ---------- Configuração base (privada: valor da hora) ----------
create table if not exists public.precos_config (
  id               integer primary key default 1,
  pro_labore       numeric not null default 1500,   -- salário desejado por mês
  dias_trabalhados numeric not null default 20,      -- dias trabalhados no mês
  horas_dia        numeric not null default 8,       -- horas por dia
  custo_fixo       numeric not null default 0,        -- contas fixas/mês (opcional)
  margem_padrao    numeric not null default 0.30,     -- 30%
  atualizado_em    timestamptz not null default now(),
  constraint precos_config_singleton check (id = 1)
);
insert into public.precos_config (id) values (1) on conflict (id) do nothing;

-- ---------- Precificação por vestido ----------
create table if not exists public.precificacao (
  vestido_id      text primary key references public.vestidos(id) on delete cascade,
  materiais       jsonb not null default '[]'::jsonb,  -- [{nome, valor, qtd}]
  horas           numeric not null default 0,
  margem          numeric not null default 0.30,
  custo_produto   numeric,
  preco_sugerido  numeric,
  atualizado_em   timestamptz not null default now()
);

-- ---------- Segurança: só a Maria logada vê/edita (dados internos) ----------
alter table public.precos_config enable row level security;
alter table public.precificacao  enable row level security;

drop policy if exists precos_config_rw on public.precos_config;
create policy precos_config_rw on public.precos_config
  for all to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists precificacao_rw on public.precificacao;
create policy precificacao_rw on public.precificacao
  for all to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
