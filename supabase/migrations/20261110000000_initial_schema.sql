-- FisikaQuest Supabase schema. Auth owns users; profiles default to student.
create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'student' check (role in ('student','teacher')),
  created_at timestamptz not null default now()
);

create function public.create_student_profile() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles(id,role) values(new.id,'student') on conflict(id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.create_student_profile();

create function public.is_teacher() returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists(select 1 from public.profiles where id=(select auth.uid()) and role='teacher');
$$;

create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  topic text not null,
  duration_minutes integer not null default 15 check(duration_minutes between 1 and 180),
  expires_at timestamptz,
  created_by uuid not null references public.profiles(id) on delete cascade,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  position integer not null check(position >= 0),
  prompt text not null,
  options jsonb not null check(jsonb_typeof(options)='array' and jsonb_array_length(options) between 2 and 8),
  unique(quiz_id,position)
);
-- Keep correct answers out of the table students can read.
create table public.quiz_answers (
  question_id uuid primary key references public.quiz_questions(id) on delete cascade,
  correct_index integer not null check(correct_index >= 0),
  explanation text not null
);
create table public.quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  answers jsonb not null check(jsonb_typeof(answers)='object'),
  score numeric(5,2) not null check(score between 0 and 100),
  submitted_at timestamptz not null default now(),
  unique(quiz_id,student_id)
);
create index quizzes_created_by_idx on public.quizzes(created_by);
create index quiz_questions_quiz_position_idx on public.quiz_questions(quiz_id,position);
create index quiz_submissions_student_idx on public.quiz_submissions(student_id);
create index quiz_submissions_quiz_idx on public.quiz_submissions(quiz_id);

alter table public.profiles enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.quiz_submissions enable row level security;

create policy "Read profiles" on public.profiles for select to authenticated
using(id=(select auth.uid()) or (select public.is_teacher()));
create policy "Read published quizzes or own" on public.quizzes for select to authenticated
using(published or created_by=(select auth.uid()));
create policy "Teacher create quiz" on public.quizzes for insert to authenticated
with check((select public.is_teacher()) and created_by=(select auth.uid()));
create policy "Teacher update own quiz" on public.quizzes for update to authenticated
using((select public.is_teacher()) and created_by=(select auth.uid()))
with check((select public.is_teacher()) and created_by=(select auth.uid()));
create policy "Teacher delete own quiz" on public.quizzes for delete to authenticated
using((select public.is_teacher()) and created_by=(select auth.uid()));

create policy "Read questions for accessible quizzes" on public.quiz_questions for select to authenticated
using(exists(select 1 from public.quizzes q where q.id=quiz_id and (q.published or q.created_by=(select auth.uid()))));
create policy "Teachers manage own questions" on public.quiz_questions for all to authenticated
using((select public.is_teacher()) and exists(select 1 from public.quizzes q where q.id=quiz_id and q.created_by=(select auth.uid())))
with check((select public.is_teacher()) and exists(select 1 from public.quizzes q where q.id=quiz_id and q.created_by=(select auth.uid())));

create policy "Teachers read own answer keys" on public.quiz_answers for select to authenticated
using((select public.is_teacher()) and exists(
  select 1 from public.quiz_questions qq join public.quizzes q on q.id=qq.quiz_id
  where qq.id=question_id and q.created_by=(select auth.uid())
));
create policy "Teachers manage own answer keys" on public.quiz_answers for all to authenticated
using((select public.is_teacher()) and exists(
  select 1 from public.quiz_questions qq join public.quizzes q on q.id=qq.quiz_id
  where qq.id=question_id and q.created_by=(select auth.uid())
))
with check((select public.is_teacher()) and exists(
  select 1 from public.quiz_questions qq join public.quizzes q on q.id=qq.quiz_id
  where qq.id=question_id and q.created_by=(select auth.uid())
));
create policy "Read own submissions or own quiz results" on public.quiz_submissions for select to authenticated
using(student_id=(select auth.uid()) or exists(
  select 1 from public.quizzes q where q.id=quiz_id and q.created_by=(select auth.uid()) and (select public.is_teacher())
));

-- Score submissions in the database; clients cannot directly write a score.
create function public.submit_quiz(p_quiz_id uuid,p_answers jsonb) returns numeric
language plpgsql security definer set search_path = ''
as $$
declare
  v_student uuid := auth.uid();
  v_total integer;
  v_correct integer;
  v_score numeric(5,2);
begin
  if v_student is null then raise exception 'Authentication required'; end if;
  if public.is_teacher() then raise exception 'Only students can submit'; end if;
  if jsonb_typeof(p_answers)<>'object' then raise exception 'Answers must be an object'; end if;
  if not exists(select 1 from public.quizzes q where q.id=p_quiz_id and q.published and (q.expires_at is null or q.expires_at>now())) then
    raise exception 'Quiz unavailable or expired';
  end if;
  select count(*),count(*) filter(where (p_answers->>qq.id::text) ~ '^[0-9]+$'
    and (p_answers->>qq.id::text)::integer=a.correct_index)
    into v_total,v_correct from public.quiz_questions qq
    join public.quiz_answers a on a.question_id=qq.id where qq.quiz_id=p_quiz_id;
  if v_total=0 then raise exception 'Quiz has no complete answer key'; end if;
  if (select count(*) from public.quiz_questions where quiz_id=p_quiz_id)<>v_total then raise exception 'Incomplete answer key'; end if;
  if (select count(*) from jsonb_object_keys(p_answers))<>v_total
     or exists(select 1 from jsonb_object_keys(p_answers) as answer(question_id)
       where not exists(select 1 from public.quiz_questions qq where qq.quiz_id=p_quiz_id and qq.id::text=answer.question_id)) then
    raise exception 'Answer every question exactly once';
  end if;
  if exists(select 1 from jsonb_each_text(p_answers) a
    join public.quiz_questions qq on qq.id::text=a.key
    where qq.quiz_id=p_quiz_id and (a.value !~ '^[0-9]+$' or a.value::integer<0 or a.value::integer>=jsonb_array_length(qq.options))) then
    raise exception 'Choice out of range';
  end if;
  v_score:=round(v_correct::numeric*100/v_total,2);
  insert into public.quiz_submissions(quiz_id,student_id,answers,score)
    values(p_quiz_id,v_student,p_answers,v_score)
    on conflict(quiz_id,student_id) do update set answers=excluded.answers,score=excluded.score,submitted_at=now();
  return v_score;
end;
$$;

revoke all on function public.submit_quiz(uuid,jsonb) from public;
grant execute on function public.submit_quiz(uuid,jsonb) to authenticated;
grant select on public.profiles,public.quizzes,public.quiz_questions,public.quiz_answers,public.quiz_submissions to authenticated;
grant insert,update,delete on public.quizzes,public.quiz_questions,public.quiz_answers to authenticated;
revoke insert,update,delete on public.quiz_submissions from anon,authenticated;
revoke insert,update,delete on public.profiles from anon,authenticated;
