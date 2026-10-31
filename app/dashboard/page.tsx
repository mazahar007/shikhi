"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getCourses, getEnrollments, getProgress, getQuizResults } from "@/lib/demo";
import { Thumb } from "@/components/ui";
import type { Course } from "@/lib/data";

export default function DashboardPage() {
  const { user, ready } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, string[]>>({});
  const [results, setResults] = useState<ReturnType<typeof getQuizResults>>([]);

  useEffect(() => {
    setCourses(getCourses());
    setEnrolled(getEnrollments());
    setProgress(getProgress());
    setResults(getQuizResults());
  }, []);

  if (!ready) return <div className="wrap pt-10"><p>লোড হচ্ছে…</p></div>;
  if (!user) {
    return (
      <div className="wrap pt-12 max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">ড্যাশবোর্ড</h1>
        <p className="text-slate-600 mt-3">এনরোল করা কোর্স ও অগ্রগতি দেখতে লগইন করুন।</p>
        <div className="flex gap-3 justify-center mt-5">
          <Link className="btn btn-primary" href="/login">লগইন</Link>
          <Link className="btn" href="/register">ফ্রি রেজিস্টার</Link>
        </div>
      </div>
    );
  }

  const mine = courses.filter((c) => enrolled.includes(c.slug));
  const totalDone = Object.values(progress).flat().length;
  const totalLessons = courses.reduce((s, c) => s + c.lessons.length, 0);

  return (
    <div className="wrap pt-10">
      <h1 className="text-3xl font-extrabold text-slate-900">👋 স্বাগতম, {user.name}</h1>
      <p className="text-slate-600">এনরোল করা কোর্স: {mine.length}টি · সম্পন্ন লেসন: {totalDone} / {totalLessons}টি</p>

      {mine.length === 0 ? (
        <div className="card p-6 mt-6">
          <p>এখনো কোনো কোর্সে এনরোল করেননি।</p>
          <Link className="btn btn-primary mt-3" href="/courses">ফ্রি কোর্স দেখুন</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          {mine.map((c) => {
            const done = progress[c.slug] || [];
            const pct = c.lessons.length ? Math.round((done.length / c.lessons.length) * 100) : 0;
            const nextLesson = c.lessons.find((l) => !done.includes(l.slug)) || c.lessons[0];
            return (
              <article key={c.slug} className="card p-5">
                <Thumb course={c} />
                <h2 className="font-bold text-lg mt-4">{c.title}</h2>
                <p className="text-sm text-slate-500">{done.length} / {c.lessons.length} লেসন সম্পন্ন · {pct}%</p>
                <div className="h-2.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <Link className="btn btn-primary mt-4" href={`/learn/${c.slug}/${nextLesson.slug}`}>
                  {pct >= 100 ? "আবার দেখুন" : "শেখা চালিয়ে যান"}
                </Link>
              </article>
            );
          })}
        </div>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">কুইজ ফলাফল</h2>
      {results.length === 0 ? (
        <p className="text-slate-600">এখনো কোনো কুইজ দেওয়া হয়নি। কোর্স শেষে ফাইনাল কুইজ দিন।</p>
      ) : (
        <div className="flex flex-col gap-3">
          {results.slice().reverse().map((r, i) => {
            const c = courses.find((x) => x.slug === r.courseSlug);
            return (
              <div key={i} className="card p-4 flex justify-between gap-3">
                <span>{c ? c.title : r.courseSlug}</span>
                <span className="font-bold whitespace-nowrap">{r.score} / {r.total}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
