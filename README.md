This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Supabase database

The initial Supabase schema and row-level security policies are in `supabase/migrations`. Apply them to a Supabase project before connecting the application:

1. Create a Supabase project and copy its project URL and publishable (or anon) key.
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Install the Supabase CLI and link this folder with `supabase link --project-ref <project-ref>`.
4. Apply the schema with `supabase db push`.
5. Register a user through Supabase Auth. New profiles are students by default. Promote a trusted teacher from the Supabase SQL editor:

```sql
update public.profiles p
set role = 'teacher'
from auth.users u
where u.id = p.id and u.email = 'teacher@example.com';
```

The migration stores quiz metadata, questions, answer keys, and the latest submission per student and quiz. Students cannot read the answer-key table or directly write scores; submissions are scored by the `submit_quiz` database function. Teachers can manage only their own quizzes and see results for those quizzes.

This commit prepares the database layer only. The current app still authenticates against its local JSON file and stores quizzes/attempts in browser `localStorage`; the UI must be migrated to Supabase Auth and database queries before those records use this schema. Do not put a Supabase service-role key in browser code.
