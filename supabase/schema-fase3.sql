-- ============================================================
--  Maga Ateliê — Fase 3: Contratos
--  Rode no Supabase → SQL Editor → New query → cole tudo → Run.
-- ============================================================

create table if not exists public.contratos (
  id              uuid primary key default gen_random_uuid(),
  tipo            text not null default 'compra',   -- 'compra' (sob medida) ou 'aluguel'
  cliente_nome    text not null default '',
  cliente_cpf     text,
  cliente_tel     text,
  cliente_endereco text,
  vestido_id      text references public.vestidos(id) on delete set null,
  vestido_nome    text,                              -- nome livre (caso não seja do catálogo)
  valor_total     numeric not null default 0,
  sinal           numeric not null default 0,
  forma_pagamento text,
  data_evento     date,
  data_retirada   date,                              -- aluguel
  data_devolucao  date,                              -- aluguel
  observacoes     text,
  criado_em       timestamptz not null default now()
);

-- só a Maria logada vê/edita (dados de clientes — privado)
alter table public.contratos enable row level security;

drop policy if exists contratos_rw on public.contratos;
create policy contratos_rw on public.contratos
  for all to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
