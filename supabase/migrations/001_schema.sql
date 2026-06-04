-- ═══════════════════════════════════════════════════════
-- Procedra Database Schema — Migration 001
-- Run against your Supabase project
-- ═══════════════════════════════════════════════════════

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── Organisations ────────────────────────────────────
create table organisations (
  id                    uuid primary key default gen_random_uuid(),
  name                  text not null,
  slug                  text unique not null,
  logo_url              text,
  plan_tier             text default 'trial' check (plan_tier in ('trial','starter','growth','enterprise')),
  subscription_status   text default 'trialing' check (subscription_status in ('active','trialing','past_due','cancelled')),
  subscription_end_date timestamptz,
  trial_ends_at         timestamptz default (now() + interval '14 days'),
  stripe_customer_id    text,
  created_at            timestamptz default now()
);

-- ─── Profiles ─────────────────────────────────────────
create table profiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  organisation_id       uuid references organisations(id) on delete set null,
  full_name             text,
  email                 text,
  role                  text default 'member' check (role in ('admin','member','viewer')),
  avatar_url            text,
  created_at            timestamptz default now()
);

-- ─── Departments ──────────────────────────────────────
create table departments (
  id                    uuid primary key default gen_random_uuid(),
  organisation_id       uuid references organisations(id) on delete cascade not null,
  name                  text not null,
  created_at            timestamptz default now()
);

-- ─── SOPs ─────────────────────────────────────────────
create table sops (
  id                    uuid primary key default gen_random_uuid(),
  organisation_id       uuid references organisations(id) on delete cascade not null,
  title                 text not null,
  description           text,
  category              text,
  department_id         uuid references departments(id) on delete set null,
  status                text default 'draft' check (status in ('draft','active','archived','under_review')),
  version               integer default 1,
  current_version_id    uuid,
  review_frequency_days integer,
  next_review_date      date,
  share_token           text unique,
  created_by            uuid references profiles(id) on delete set null,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

-- ─── SOP Versions ─────────────────────────────────────
create table sop_versions (
  id                    uuid primary key default gen_random_uuid(),
  sop_id                uuid references sops(id) on delete cascade not null,
  version_number        integer not null,
  content               jsonb not null default '{}',
  change_summary        text,
  published_by          uuid references profiles(id) on delete set null,
  published_at          timestamptz,
  created_at            timestamptz default now()
);

-- Add FK back from sops to sop_versions
alter table sops add constraint sops_current_version_id_fkey
  foreign key (current_version_id) references sop_versions(id) on delete set null;

-- ─── SOP Steps ────────────────────────────────────────
create table sop_steps (
  id                    uuid primary key default gen_random_uuid(),
  sop_version_id        uuid references sop_versions(id) on delete cascade not null,
  step_number           integer not null,
  title                 text not null,
  description           text,
  responsible_role      text,
  warning               text,
  is_critical           boolean default false,
  created_at            timestamptz default now()
);

-- ─── SOP Assignments ──────────────────────────────────
create table sop_assignments (
  id                    uuid primary key default gen_random_uuid(),
  sop_id                uuid references sops(id) on delete cascade not null,
  assigned_to_user      uuid references profiles(id) on delete cascade,
  assigned_to_dept      uuid references departments(id) on delete cascade,
  assigned_by           uuid references profiles(id) on delete set null,
  due_date              date,
  created_at            timestamptz default now()
);

-- ─── Sign-offs ────────────────────────────────────────
create table sop_signoffs (
  id                    uuid primary key default gen_random_uuid(),
  sop_id                uuid references sops(id) on delete cascade not null,
  sop_version_id        uuid references sop_versions(id) on delete cascade not null,
  user_id               uuid references profiles(id) on delete cascade not null,
  signed_at             timestamptz default now(),
  ip_address            text,
  notes                 text,
  unique(sop_version_id, user_id)
);

-- ─── AI Generation Log ────────────────────────────────
create table ai_generation_log (
  id                    uuid primary key default gen_random_uuid(),
  organisation_id       uuid references organisations(id) on delete cascade not null,
  user_id               uuid references profiles(id) on delete set null,
  prompt_input          text,
  generated_content     jsonb,
  sop_id                uuid references sops(id) on delete set null,
  tokens_used           integer,
  created_at            timestamptz default now()
);

-- ─── Audit Log ────────────────────────────────────────
create table audit_log (
  id                    uuid primary key default gen_random_uuid(),
  organisation_id       uuid references organisations(id) on delete cascade not null,
  user_id               uuid references profiles(id) on delete set null,
  action                text not null,
  entity_type           text,
  entity_id             uuid,
  metadata              jsonb,
  created_at            timestamptz default now()
);

-- ─── Indexes ──────────────────────────────────────────
create index idx_sops_organisation on sops(organisation_id);
create index idx_sops_status on sops(status);
create index idx_sops_department on sops(department_id);
create index idx_sops_updated on sops(updated_at desc);
create index idx_sop_versions_sop on sop_versions(sop_id);
create index idx_sop_steps_version on sop_steps(sop_version_id);
create index idx_assignments_sop on sop_assignments(sop_id);
create index idx_signoffs_sop on sop_signoffs(sop_id);
create index idx_signoffs_user on sop_signoffs(user_id);
create index idx_audit_org on audit_log(organisation_id, created_at desc);
create index idx_ai_log_org on ai_generation_log(organisation_id, created_at desc);

-- ─── Updated_at trigger ───────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger sops_updated_at
  before update on sops
  for each row execute function update_updated_at();

-- ─── Auto-create profile on signup ───────────────────
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
