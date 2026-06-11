-- ============================================================
--  Maga Ateliê — Banco de dados (Fase 1: Catálogo + Destaque)
--  Como usar: abra o Supabase → SQL Editor → New query →
--  cole TUDO isto → Run. Pode rodar de novo sem problema.
-- ============================================================

-- ---------- Tabela de vestidos ----------
create table if not exists public.vestidos (
  id          text primary key,            -- ex: 'classico-1' (slug)
  nome        text not null,               -- ex: 'Jasmim'
  colecao     text not null,               -- Jardim / Maré / Brisa / Florescer / Estação / Destaque
  tag         text,                        -- estilo (etiqueta): Clássico, Sereia...
  preco       integer not null default 0,  -- valor de COMPRA em R$ (aluguel = 60%)
  descricao   text,
  fotos       jsonb   not null default '[]'::jsonb,  -- lista de caminhos/URLs das fotos
  em_destaque boolean not null default false,
  ativo       boolean not null default true,
  ordem       integer not null default 0,  -- ordem de exibição
  criado_em   timestamptz not null default now()
);

-- ---------- Config (linha única) — controla o destaque da home ----------
create table if not exists public.config (
  id               integer primary key default 1,
  destaque_id      text references public.vestidos(id) on delete set null,
  destaque_titulo  text,
  destaque_texto   text,
  atualizado_em    timestamptz not null default now(),
  constraint config_singleton check (id = 1)
);

insert into public.config (id) values (1) on conflict (id) do nothing;

-- ============================================================
--  Segurança (RLS): público só LÊ; quem está logado (Maria) edita
-- ============================================================
alter table public.vestidos enable row level security;
alter table public.config   enable row level security;

-- vestidos: público vê só os ativos; logado vê todos
drop policy if exists vestidos_select on public.vestidos;
create policy vestidos_select on public.vestidos
  for select using (ativo = true or auth.role() = 'authenticated');

drop policy if exists vestidos_write on public.vestidos;
create policy vestidos_write on public.vestidos
  for all to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- config: todos leem; só logado escreve
drop policy if exists config_select on public.config;
create policy config_select on public.config for select using (true);

drop policy if exists config_write on public.config;
create policy config_write on public.config
  for all to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
--  Storage: bucket público pras fotos NOVAS que a Maria subir
-- ============================================================
insert into storage.buckets (id, name, public)
values ('vestidos', 'vestidos', true)
on conflict (id) do nothing;

-- qualquer um lê as fotos; só logado sobe/edita/apaga
drop policy if exists vestidos_storage_read on storage.objects;
create policy vestidos_storage_read on storage.objects
  for select using (bucket_id = 'vestidos');

drop policy if exists vestidos_storage_write on storage.objects;
create policy vestidos_storage_write on storage.objects
  for all to authenticated
  using (bucket_id = 'vestidos' and auth.role() = 'authenticated')
  with check (bucket_id = 'vestidos' and auth.role() = 'authenticated');
