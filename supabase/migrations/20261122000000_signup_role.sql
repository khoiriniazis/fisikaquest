-- Apply the signup-selected role once when an Auth user is created.
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
