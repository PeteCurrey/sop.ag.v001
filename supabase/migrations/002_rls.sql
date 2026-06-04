-- ═══════════════════════════════════════════════════════
-- Procedra RLS Policies — Migration 002
-- ═══════════════════════════════════════════════════════

-- Enable RLS on all tables
alter table organisations enable row level security;
alter table profiles enable row level security;
alter table departments enable row level security;
alter table sops enable row level security;
alter table sop_versions enable row level security;
alter table sop_steps enable row level security;
alter table sop_assignments enable row level security;
alter table sop_signoffs enable row level security;
alter table ai_generation_log enable row level security;
alter table audit_log enable row level security;

-- Helper function to get user's org
create or replace function get_user_org_id()
returns uuid as $$
  select organisation_id from profiles where id = auth.uid()
$$ language sql security definer stable;

-- Helper function to get user's role
create or replace function get_user_role()
returns text as $$
  select role from profiles where id = auth.uid()
$$ language sql security definer stable;

-- ─── Organisations ────────────────────────────────────
create policy "Users can view their own organisation"
  on organisations for select
  using (id = get_user_org_id());

create policy "Admins can update their organisation"
  on organisations for update
  using (id = get_user_org_id() and get_user_role() = 'admin');

-- ─── Profiles ─────────────────────────────────────────
create policy "Users can view profiles in their org"
  on profiles for select
  using (organisation_id = get_user_org_id() or id = auth.uid());

create policy "Users can update their own profile"
  on profiles for update
  using (id = auth.uid());

create policy "Admins can update profiles in their org"
  on profiles for update
  using (organisation_id = get_user_org_id() and get_user_role() = 'admin');

create policy "Allow insert during signup"
  on profiles for insert
  with check (id = auth.uid());

-- ─── Departments ──────────────────────────────────────
create policy "Users can view departments in their org"
  on departments for select
  using (organisation_id = get_user_org_id());

create policy "Admins can manage departments"
  on departments for all
  using (organisation_id = get_user_org_id() and get_user_role() = 'admin');

-- ─── SOPs ─────────────────────────────────────────────
create policy "Users can view SOPs in their org"
  on sops for select
  using (organisation_id = get_user_org_id());

create policy "Members and admins can create SOPs"
  on sops for insert
  with check (
    organisation_id = get_user_org_id()
    and get_user_role() in ('admin', 'member')
  );

create policy "Members can update their own SOPs, admins can update all"
  on sops for update
  using (
    organisation_id = get_user_org_id()
    and (
      get_user_role() = 'admin'
      or (get_user_role() = 'member' and created_by = auth.uid())
    )
  );

create policy "Admins can delete SOPs"
  on sops for delete
  using (organisation_id = get_user_org_id() and get_user_role() = 'admin');

-- ─── SOP Versions ─────────────────────────────────────
create policy "Users can view versions of their org's SOPs"
  on sop_versions for select
  using (
    sop_id in (select id from sops where organisation_id = get_user_org_id())
  );

create policy "Members and admins can create versions"
  on sop_versions for insert
  with check (
    sop_id in (select id from sops where organisation_id = get_user_org_id())
    and get_user_role() in ('admin', 'member')
  );

-- ─── SOP Steps ────────────────────────────────────────
create policy "Users can view steps"
  on sop_steps for select
  using (
    sop_version_id in (
      select sv.id from sop_versions sv
      join sops s on sv.sop_id = s.id
      where s.organisation_id = get_user_org_id()
    )
  );

-- ─── SOP Assignments ──────────────────────────────────
create policy "Users can view assignments in their org"
  on sop_assignments for select
  using (
    sop_id in (select id from sops where organisation_id = get_user_org_id())
  );

create policy "Admins can manage assignments"
  on sop_assignments for all
  using (
    sop_id in (select id from sops where organisation_id = get_user_org_id())
    and get_user_role() in ('admin', 'member')
  );

-- ─── Sign-offs ────────────────────────────────────────
create policy "Users can view signoffs in their org"
  on sop_signoffs for select
  using (
    sop_id in (select id from sops where organisation_id = get_user_org_id())
  );

create policy "Any authenticated user can sign off assigned SOPs"
  on sop_signoffs for insert
  with check (user_id = auth.uid());

-- ─── AI Generation Log ────────────────────────────────
create policy "Users can view their org's AI log"
  on ai_generation_log for select
  using (organisation_id = get_user_org_id());

create policy "Members and admins can create AI log entries"
  on ai_generation_log for insert
  with check (
    organisation_id = get_user_org_id()
    and get_user_role() in ('admin', 'member')
  );

-- ─── Audit Log ────────────────────────────────────────
create policy "Users can view their org's audit log"
  on audit_log for select
  using (organisation_id = get_user_org_id());

-- Audit log inserts are done via service role only
