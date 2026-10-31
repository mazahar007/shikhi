-- Shikhi (শিখি) — E-Learning Platform MVP
-- Supabase schema, exactly the roadmap tables.
-- Run this in Supabase Dashboard → SQL Editor → New query → Run.
-- NOTE: MVP v1 runs in DEMO mode (browser localStorage). This schema is the
-- v2 step: after running it and setting env vars, wire lib/ to Supabase.
-- Until then, nothing here is live — do not claim otherwise.

-- ============================== users ==============================
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

-- ============================== courses ==============================
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  thumbnail text not null default '', -- CSS gradient key or storage path; no fake photo URLs
  level text not null default 'Beginner',
  price numeric not null default 0, -- MVP launch: all courses free (price = 0)
  is_free boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================== lessons ==============================
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  video_url text not null default '', -- empty = not yet added; only REAL YouTube Unlisted URLs
  lesson_order integer not null default 1,
  resource_url text not null default '', -- resource name/path; never a fake URL
  created_at timestamptz not null default now()
);

-- ============================== enrollments ==============================
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- ============================== quizzes ==============================
create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_answer text not null check (correct_answer in ('A', 'B', 'C', 'D'))
);

-- ============================== quiz_results ==============================
create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  score integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================== RLS (Row Level Security) ==============================
-- MVP recommendation: enable RLS on all tables. Public read for courses,
-- lessons and quizzes (free MVP content); writes only for authenticated users
-- (enrollments / quiz_results own rows only); admin writes via service role
-- from the admin panel in v2. Adjust to your Supabase Auth setup before launch.
alter table users enable row level security;
alter table courses enable row level security;
alter table lessons enable row level security;
alter table enrollments enable row level security;
alter table quizzes enable row level security;
alter table quiz_results enable row level security;

create policy "public read courses" on courses for select using (true);
create policy "public read lessons" on lessons for select using (true);
create policy "public read quizzes" on quizzes for select using (true);
create policy "own enrollments" on enrollments for all using (auth.uid() = user_id);
create policy "own quiz results" on quiz_results for all using (auth.uid() = user_id);
create policy "own user row" on users for all using (auth.uid() = id);

-- ============================== Seed: 5 free MVP courses ==============================
-- Insert courses first, then lessons/quizzes referencing their ids.
-- All 5 are FREE (price 0, is_free true). Video URLs are intentionally empty:
-- add real YouTube Unlisted links from the Admin panel (v2) or here, never fake IDs.

insert into courses (title, slug, description, thumbnail, level, price, is_free) values
('ফ্রিল্যান্সারদের জন্য AI টুলস', 'ai-tools-freelancers', 'ChatGPT, Canva AI আর CapCut AI দিয়ে ক্লায়েন্টের কাজ দ্রুত, ভালোভাবে করার প্র্যাকটিক্যাল কোর্স।', 'gradient-teal', 'Beginner', 0, true),
('YouTube Automation', 'youtube-automation', 'নিজে ক্যামেরার সামনে না এসেও সিস্টেম দিয়ে ইউটিউব চ্যানেল চালানোর বাস্তব ধারণা।', 'gradient-red', 'Beginner', 0, true),
('CapCut ভিডিও এডিটিং', 'capcut-video-editing', 'CapCut দিয়ে পরিষ্কার, প্রফেশনাল ভিডিও এডিটিং — কাট, ক্যাপশন, সাউন্ড ও এক্সপোর্ট পর্যন্ত।', 'gradient-blue', 'Beginner', 0, true),
('Canva ডিজাইন', 'canva-design', 'Canva দিয়ে থাম্বনেইল, পোস্ট ও প্রেজেন্টেশন বানানোর প্র্যাকটিক্যাল কোর্স।', 'gradient-purple', 'Beginner', 0, true),
('ফ্রিল্যান্সিং বেসিকস', 'freelancing-basics', 'শূন্য থেকে ফ্রিল্যান্সিং শুরু — স্কিল বাছাই, প্রোফাইল, প্রথম ক্লায়েন্ট, দাম ও পেমেন্টের বাস্তব গাইড।', 'gradient-green', 'Beginner', 0, true)
on conflict (slug) do nothing;

-- Lesson + quiz seed rows: insert after courses exist, e.g.
-- insert into lessons (course_id, title, video_url, lesson_order, resource_url)
-- select id, 'পরিচিতি: AI দিয়ে ফ্রিল্যান্সিং শুরু', '', 1, 'কোর্স রোডম্যাপ (PDF — শিগগিরই)'
-- from courses where slug = 'ai-tools-freelancers';
-- Full per-course lesson/quiz lists live in lib/data.ts (the demo seed) and can be
-- copied into similar INSERTs once Supabase is connected. Keep video_url empty
-- until a real YouTube Unlisted link exists for that lesson.
