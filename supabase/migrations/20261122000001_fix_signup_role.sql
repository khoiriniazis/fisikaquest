-- Use the selected signup role for new profiles and repair profiles created
-- before the role-aware trigger was deployed.
create or replace function public.create_student_profile() returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  requested_role text := new.raw_user_meta_data->>'role';
begin
  insert into public.profiles(id, role)
  values(new.id, case when requested_role in ('student', 'teacher') then requested_role else 'student' end)
  on conflict(id) do nothing;
  return new;
end;
$$;

update public.profiles p
set role = u.raw_user_meta_data->>'role'
from auth.users u
where p.id = u.id
  and u.raw_user_meta_data->>'role' in ('student', 'teacher')
  and p.role is distinct from u.raw_user_meta_data->>'role';
