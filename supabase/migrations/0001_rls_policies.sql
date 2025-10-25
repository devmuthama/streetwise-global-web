-- Enable RLS for all tables
alter table public.profiles enable row level security;
alter table public.volunteers enable row level security;
alter table public.reports enable row level security;
alter table public.media enable row level security;
alter table public.donations enable row level security;

-- Helper function to get user role
create or replace function public.get_user_role(user_id uuid)
returns text
language plpgsql
security definer set search_path = public
as $$
declare
  user_role text;
begin
  select role into user_role from public.profiles where id = user_id;
  return user_role;
end;
$$;

-- Helper function to check for 'admin' role (MVP super-admin)
create or replace function public.is_admin(user_id uuid)
returns boolean
language plpgsql
security definer set search_path = public
as $$
begin
  return exists (
    select 1 from public.profiles
    where id = user_id and role = 'admin'
  );
end;
$$;


-- == PROFILES ==
-- Users can see their own profile
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);
-- Admins can see all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin(auth.uid()));

-- == VOLUNTEERS ==
-- ANYONE can submit a volunteer form
create policy "Allow public insert for volunteers"
  on public.volunteers for insert
  with check (true);
-- ADMINS can see all volunteers
create policy "Admins can select/update/delete volunteers"
  on public.volunteers for all
  using (public.is_admin(auth.uid()));

-- == REPORTS ==
-- ANYONE can see reports
create policy "Allow public read access to reports"
  on public.reports for select
  using (true);
-- ADMINS can create/update/delete reports
create policy "Admins can manage reports"
  on public.reports for all
  using (public.is_admin(auth.uid()));

-- == MEDIA ==
-- ANYONE can see media
create policy "Allow public read access to media"
  on public.media for select
  using (true);
-- ADMINS can create/update/delete media
create policy "Admins can manage media"
  on public.media for all
  using (public.is_admin(auth.uid()));

-- == DONATIONS ==
-- NOBODY can read donations except admins
create policy "Admins can view donations"
  on public.donations for select
  using (public.is_admin(auth.uid()));
-- (Donations are INSERTED by the webhook using SERVICE_ROLE_KEY, which bypasses RLS)


-- == STORAGE RLS ==
-- Allow public read on 'media' bucket
create policy "Allow public read on media"
  on storage.objects for select
  using (bucket_id = 'media');
-- Allow admin write on 'media' bucket
create policy "Allow admin write on media"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin(auth.uid()));
create policy "Allow admin delete on media"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin(auth.uid()));

-- Allow public read on 'reports' bucket
create policy "Allow public read on reports"
  on storage.objects for select
  using (bucket_id = 'reports');
-- Allow admin write on 'reports' bucket
create policy "Allow admin write on reports"
  on storage.objects for insert
  with check (bucket_id = 'reports' and public.is_admin(auth.uid()));
create policy "Allow admin delete on reports"
  on storage.objects for delete
  using (bucket_id = 'reports' and public.is_admin(auth.uid()));