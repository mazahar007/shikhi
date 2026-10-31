"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getCourses, getProgress, markComplete } from "@/lib/demo";
import { VIDEO_PLACEHOLDER as PH, youtubeIdFromUrl } from "@/lib/data";
import type { Course } from "@/lib/data";

export default function LearnPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const { slug, lesson: lessonSlug } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [justDone, setJustDone] = useState(false);

  useEffect(() => {
    setCourse(getCourses().find((c) => c.slug === slug) || null);
    setDone(getProgress()[slug] || []);
    setJustDone(false);
  }, [slug, lessonSlug]);

  if (!course) return <div className="wrap pt-10"><p>কোর্স পাওয়া যায়নি। <Link href="/courses">সব কোর্স দেখুন</Link></p></div>;
  const idx = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = course.lessons[idx];
  if (!lesson) return <div className="wrap pt-10"><p>লেসন পাওয়া যায়নি। <Link href={`/courses/${course.slug}`}>কোর্সে ফিরুন</Link></p></div>;

  const vid = youtubeIdFromUrl(lesson.video_url || "");
  const isDone = done.includes(lesson.slug);
  const prev = course.lessons[idx - 1];
  const next = course.lessons[idx + 1];
  const progress = Math.round((done.length / course.lessons.length) * 100);

  function onComplete() {
    markComplete(course!.slug, lesson.slug);
    setDone([...done, lesson.slug]);
    setJustDone(true);
  }

  return (
    <div className="wrap pt-10">
      <Link href={`/courses/${course.slug}`}>← {course.title}</Link>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3">{lesson.title}</h1>
      <p className="text-slate-500">{lesson.titleEn} · {lesson.durationMin} মিনিট · অগ্রগতি {progress}%</p>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-2">
          {vid ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-black" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${vid}`}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center min-h-[280px] flex flex-col items-center justify-center gap-3">
              <span className="text-5xl">🎬</span>
              <p className="font-bold text-lg">{PH}</p>
              <p className="text-slate-500 text-[15px]">এই লেসনের ভিডিও এখনো আপলোড/যুক্ত হয়নি — তবে আপনি লেসনটি সম্পন্ন হিসেবে চিহ্নিত করে এগিয়ে যেতে পারবেন।</p>
            </div>
          )}

          <div className="card p-5 mt-5">
            <h2 className="font-bold text-lg">রিসোর্স</h2>
            {lesson.resources.length ? (
              <ul className="text-[15px] text-slate-700 mt-2">
                {lesson.resources.map((r) => (
                  <li key={r}>📄 {r}</li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-[15px] mt-2">এই লেসনে কোনো রিসোর্স তালিকাভুক্ত নেই।</p>
            )}
            <p className="text-sm text-slate-400 mt-2">রিসোর্স ফাইল যুক্ত হলে এখান থেকে ডাউনলোড লিংক দেওয়া হবে (ভুয়া লিংক দেওয়া হয় না)।</p>
          </div>

          <div className="flex gap-3 flex-wrap mt-5">
            {isDone || justDone ? (
              <span className="success">✅ লেসন সম্পন্ন</span>
            ) : (
              <button className="btn btn-primary" onClick={onComplete}>✓ Mark Complete — লেসন সম্পন্ন করুন</button>
            )}
            {prev ? <Link className="btn" href={`/learn/${course.slug}/${prev.slug}`}>← আগের লেসন</Link> : null}
            {next ? (
              <Link className="btn btn-dark" href={`/learn/${course.slug}/${next.slug}`}>পরের লেসন →</Link>
            ) : (
              <Link className="btn btn-dark" href={`/learn/${course.slug}/quiz`}>ফাইনাল কুইজ →</Link>
            )}
          </div>
        </div>

        <aside className="card p-4 h-fit">
          <h2 className="font-bold">লেসন তালিকা</h2>
          <div className="flex flex-col gap-2 mt-3">
            {course.lessons.map((l, i) => (
              <Link
                key={l.slug}
                href={`/learn/${course.slug}/${l.slug}`}
                className={`p-3 rounded-xl no-underline text-[15px] ${l.slug === lesson.slug ? "bg-teal-50 text-teal-800 font-bold" : "text-slate-700 hover:bg-slate-50"}`}
              >
                {done.includes(l.slug) ? "✅ " : ""}{i + 1}. {l.title} <span className="text-slate-400">({l.durationMin} মি.)</span>
              </Link>
            ))}
          </div>
          <Link className="btn w-full mt-4" href={`/learn/${course.slug}/quiz`}>📝 ফাইনাল কুইজ</Link>
        </aside>
      </div>
    </div>
  );
}
