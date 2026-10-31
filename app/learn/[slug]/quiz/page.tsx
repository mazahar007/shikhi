"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getCourses, saveQuizResult } from "@/lib/demo";
import type { Course } from "@/lib/data";

export default function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    setCourse(getCourses().find((c) => c.slug === slug) || null);
  }, [slug]);

  if (!course) return <div className="wrap pt-10"><p>কোর্স পাওয়া যায়নি। <Link href="/courses">সব কোর্স দেখুন</Link></p></div>;
  if (course.quiz.length === 0) return <div className="wrap pt-10"><p>এই কোর্সের কুইজ এখনো তৈরি হয়নি।</p></div>;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const score = course!.quiz.filter((q) => answers[q.id] === q.correct_answer).length;
    setResult(score);
    saveQuizResult({ courseSlug: course!.slug, score, total: course!.quiz.length, date: new Date().toISOString() });
  }

  return (
    <div className="wrap pt-10 max-w-3xl">
      <Link href={`/courses/${course.slug}`}>← {course.title}</Link>
      <h1 className="text-3xl font-extrabold text-slate-900 mt-3">📝 ফাইনাল কুইজ — {course.title}</h1>
      <p className="text-slate-500">{course.quiz.length}টি প্রশ্ন · প্রতিটি প্রশ্নে একটি সঠিক উত্তর</p>

      {result === null ? (
        <form onSubmit={submit} className="flex flex-col gap-4 mt-6">
          {course.quiz.map((q, i) => (
            <fieldset key={q.id} className="card p-5">
              <legend className="font-bold">{i + 1}. {q.question}</legend>
              {(["A", "B", "C", "D"] as const).map((opt) => {
                const text = { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d }[opt];
                return (
                  <label key={opt} className="flex items-start gap-3 py-2 cursor-pointer text-[15px]">
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                      required
                      className="mt-1.5"
                    />
                    <span><strong>{opt}.</strong> {text}</span>
                  </label>
                );
              })}
            </fieldset>
          ))}
          <button className="btn btn-primary" type="submit">ফলাফল দেখুন</button>
        </form>
      ) : (
        <div className="card p-6 mt-6">
          <h2 className="text-2xl font-bold">ফলাফল: {result} / {course.quiz.length}</h2>
          <p className="text-slate-600 mt-2">
            {result === course.quiz.length
              ? "🎉 চমৎকার! সব উত্তর সঠিক।"
              : result >= Math.ceil(course.quiz.length / 2)
                ? "👍 ভালো হয়েছে! ভুল প্রশ্নগুলোর লেসন আবার দেখে নিতে পারেন।"
                : "💪 আবার চেষ্টা করুন — সংশ্লিষ্ট লেসনগুলো পুনরায় দেখুন।"}
          </p>
          <p className="text-sm text-slate-500 mt-2">ফলাফল ড্যাশবোর্ডে সংরক্ষিত হয়েছে (ডেমো — ব্রাউজার localStorage)।</p>
          <div className="flex gap-3 flex-wrap mt-4">
            <button className="btn" onClick={() => { setResult(null); setAnswers({}); }}>আবার কুইজ দিন</button>
            <Link className="btn btn-primary" href="/dashboard">ড্যাশবোর্ডে যান</Link>
          </div>
        </div>
      )}
    </div>
  );
}
