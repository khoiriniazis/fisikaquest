alter table public.profiles add column if not exists display_name text;

update public.profiles p
set display_name = coalesce(nullif(trim(split_part(coalesce(u.email, ''), '@', 1)), ''), 'Pengguna')
from auth.users u
where p.id = u.id and (p.display_name is null or trim(p.display_name) = '');

alter table public.profiles alter column display_name set default 'Pengguna';
alter table public.profiles alter column display_name set not null;

create policy "Users update own profile" on public.profiles
for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

grant update (display_name) on public.profiles to authenticated;

create or replace function public.create_student_profile() returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  requested_role text := new.raw_user_meta_data->>'role';
  requested_name text := new.raw_user_meta_data->>'display_name';
begin
  insert into public.profiles(id, role, display_name)
  values (
    new.id,
    case when requested_role in ('student', 'teacher') then requested_role else 'student' end,
    coalesce(nullif(trim(requested_name), ''), nullif(trim(split_part(coalesce(new.email, ''), '@', 1)), ''), 'Pengguna')
  )
  on conflict(id) do nothing;
  return new;
end;
$$;
