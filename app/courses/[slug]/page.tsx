"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enroll, getCourses, getEnrollments, getProgress } from "@/lib/demo";
import { Thumb } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import type { Course } from "@/lib/data";

export default function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const c = getCourses().find((x) => x.slug === slug) || null;
    setCourse(c);
    if (c) {
      setEnrolled(getEnrollments().includes(c.slug));
      setDoneCount((getProgress()[c.slug] || []).length);
    }
  }, [slug]);

  if (!course) return <div className="wrap pt-10"><p>কোর্স পাওয়া যায়নি। <Link href="/courses">সব কোর্স দেখুন</Link></p></div>;

  const first = course.lessons[0];
  const progress = course.lessons.length ? Math.round((doneCount / course.lessons.length) * 100) : 0;

  function onEnroll() {
    if (!user) {
      router.push(`/login?next=/courses/${course!.slug}`);
      return;
    }
    enroll(course!.slug);
    setEnrolled(true);
    setMsg("✅ এনরোল সম্পন্ন! ড্যাশবোর্ডে কোর্সটি দেখতে পাবেন।");
  }

  return (
    <div className="wrap pt-10">
      <Link href="/courses">← সব কোর্স</Link>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <Thumb course={course} big />
        <div>
          <span className="chip">{course.levelBn}</span> <span className="chip chip-free ml-2">ফ্রি</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">{course.title}</h1>
          <p className="text-slate-500">{course.titleEn}</p>
          <p className="text-slate-700 mt-3">{course.description}</p>
          <p className="text-slate-600 text-[15px] mt-3">
            {course.lessons.length}টি লেসন · কুইজ {course.quiz.length} প্রশ্ন
            {enrolled ? ` · অগ্রগতি ${progress}%` : ""}
          </p>
          {msg ? <p className="success mt-3">{msg}</p> : null}
          <div className="flex gap-3 flex-wrap mt-4">
            {enrolled && first ? (
              <Link className="btn btn-primary" href={`/learn/${course.slug}/${first.slug}`}>শেখা চালিয়ে যান</Link>
            ) : (
              <button className="btn btn-primary" onClick={onEnroll}>ফ্রিতে এনরোল করুন</button>
            )}
            {enrolled ? <Link className="btn" href="/dashboard">ড্যাশবোর্ড</Link> : null}
          </div>
          {!user ? <p className="text-sm text-slate-500 mt-2">এনরোল করতে একটি ফ্রি ডেমো অ্যাকাউন্ট লাগবে (ব্রাউজারেই সংরক্ষিত)।</p> : null}
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">লেসন তালিকা</h2>
      <div className="flex flex-col gap-3">
        {course.lessons.map((l, i) => (
          <Link key={l.slug} href={`/learn/${course.slug}/${l.slug}`} className="card p-4 flex justify-between gap-3 no-underline text-slate-900">
            <span><strong>{i + 1}. {l.title}</strong><br /><span className="text-sm text-slate-500">{l.titleEn}</span></span>
            <span className="text-sm text-slate-500 whitespace-nowrap">{l.durationMin} মিনিট</span>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Link className="btn" href={`/learn/${course.slug}/quiz`}>📝 ফাইনাল কুইজ দিন ({course.quiz.length} প্রশ্ন)</Link>
      </div>
    </div>
  );
}
