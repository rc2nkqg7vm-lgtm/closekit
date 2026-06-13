-- ─── Enable UUID extension ───────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Profiles ─────────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  plan text not null default 'free' check (plan in ('free', 'pro', 'lifetime')),
  stripe_customer_id text,
  docs_this_month integer not null default 0,
  brand_logo_url text,
  brand_color text not null default '#6366f1',
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Reset docs_this_month on first day of each month (via pg_cron or Edge Function)
-- create extension if not exists pg_cron;
-- select cron.schedule('0 0 1 * *', $$update public.profiles set docs_this_month = 0$$);

-- ─── Clients ──────────────────────────────────────────────────────────────────
create table public.clients (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  email text,
  company text,
  address text,
  created_at timestamp with time zone default now()
);

alter table public.clients enable row level security;

create policy "Users can manage own clients"
  on public.clients for all
  using (auth.uid() = user_id);

-- ─── Documents ────────────────────────────────────────────────────────────────
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null check (type in ('invoice', 'proposal')),
  title text not null default 'Untitled',
  status text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'accepted')),
  client_id uuid references public.clients(id) on delete set null,
  line_items jsonb not null default '[]',
  tax_rate numeric(5,2) not null default 0,
  notes text not null default '',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.documents enable row level security;

create policy "Users can manage own documents"
  on public.documents for all
  using (auth.uid() = user_id);

-- Update updated_at on change
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger documents_updated_at
  before update on public.documents
  for each row execute procedure public.set_updated_at();

-- ─── Leads ────────────────────────────────────────────────────────────────────
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  source text not null default 'free-tool',
  created_at timestamp with time zone default now()
);

-- Leads table: service role only (no RLS bypass needed for anon inserts via API)
alter table public.leads enable row level security;

create policy "Service role manages leads"
  on public.leads for all
  using (true)
  with check (true);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index documents_user_id_idx on public.documents(user_id);
create index documents_created_at_idx on public.documents(created_at desc);
create index clients_user_id_idx on public.clients(user_id);
