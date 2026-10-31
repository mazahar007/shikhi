"use client";

import { useEffect, useState } from "react";
import { getCourses, isAdmin, resetCourses, saveCourses, setAdmin } from "@/lib/demo";
import type { Course, Lesson, QuizQuestion } from "@/lib/data";

type Tab = "courses" | "lessons" | "quiz";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<Tab>("courses");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selSlug, setSelSlug] = useState("");
  const [note, setNote] = useState("");

  // Course form
  const [ctitle, setCtitle] = useState("");
  const [ctitleEn, setCtitleEn] = useState("");
  const [cdesc, setCdesc] = useState("");
  const [clevel, setClevel] = useState("Beginner");
  const [editSlug, setEditSlug] = useState<string | null>(null);

  // Lesson form
  const [ltitle, setLtitle] = useState("");
  const [ltitleEn, setLtitleEn] = useState("");
  const [ldur, setLdur] = useState(10);
  const [lvideo, setLvideo] = useState("");
  const [lres, setLres] = useState("");

  // Quiz form
  const [qtext, setQtext] = useState("");
  const [qa, setQa] = useState("");
  const [qb, setQb] = useState("");
  const [qc, setQc] = useState("");
  const [qd, setQd] = useState("");
  const [qcorrect, setQcorrect] = useState<"A" | "B" | "C" | "D">("A");

  useEffect(() => {
    if (isAdmin()) {
      setUnlocked(true);
      const cs = getCourses();
      setCourses(cs);
      setSelSlug(cs[0]?.slug || "");
    }
  }, []);

  function persist(cs: Course[], msg: string) {
    setCourses(cs);
    saveCourses(cs);
    setNote(msg);
  }

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() === "1234") {
      setAdmin(true);
      setUnlocked(true);
      const cs = getCourses();
      setCourses(cs);
      setSelSlug(cs[0]?.slug || "");
    } else {
      setErr("ভুল পাসকোড।");
    }
  }

  if (!unlocked) {
    return (
      <div className="wrap pt-12 max-w-md">
        <h1 className="text-3xl font-extrabold text-slate-900">অ্যাডমিন প্যানেল</h1>
        <p className="notice mt-4">🧪 ডেমো অ্যাডমিন — পাসকোড 1234। এডিট শুধু এই ব্রাউজারে থাকবে, Supabase সংযুক্ত হলে সবার জন্য সংরক্ষিত হবে।</p>
        {err ? <p className="error mt-4">{err}</p> : null}
        <form onSubmit={unlock} className="card p-6 flex flex-col gap-4 mt-4">
          <div>
            <label className="label" htmlFor="code">পাসকোড</label>
            <input id="code" className="input" type="password" inputMode="numeric" required value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit">প্রবেশ করুন</button>
        </form>
      </div>
    );
  }

  const sel = courses.find((c) => c.slug === selSlug) || courses[0];

  function saveCourse(e: React.FormEvent) {
    e.preventDefault();
    const slug = editSlug || ctitleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `course-${Date.now()}`;
    const grads = [
      "linear-gradient(135deg,#0f766e,#14b8a6 55%,#f59e0b)",
      "linear-gradient(135deg,#1e3a8a,#3b82f6 55%,#22d3ee)",
      "linear-gradient(135deg,#7c3aed,#a855f7 55%,#ec4899)",
      "linear-gradient(135deg,#065f46,#059669 55%,#f59e0b)",
      "linear-gradient(135deg,#b91c1c,#ef4444 55%,#f59e0b)",
    ];
    const existing = courses.find((c) => c.slug === slug);
    const course: Course = {
      id: existing?.id || `course-${Date.now()}`,
      slug,
      title: ctitle,
      titleEn: ctitleEn,
      description: cdesc,
      level: (clevel as Course["level"]) || "Beginner",
      levelBn: clevel === "Intermediate" ? "ইন্টারমিডিয়েট" : clevel === "Advanced" ? "অ্যাডভান্সড" : "বিগিনার",
      price: 0,
      is_free: true,
      gradient: existing?.gradient || grads[courses.length % grads.length],
      initial: ctitle.trim().charAt(0) || "শ",
      lessons: existing?.lessons || [],
      quiz: existing?.quiz || [],
    };
    const cs = existing ? courses.map((c) => (c.slug === slug ? course : c)) : [...courses, course];
    persist(cs, existing ? "✅ কোর্স আপডেট হয়েছে (ডেমো)।" : "✅ নতুন কোর্স যুক্ত হয়েছে (ডেমো)।");
    setEditSlug(null);
    setCtitle("");
    setCtitleEn("");
    setCdesc("");
    setSelSlug(slug);
  }

  function deleteCourse(slug: string) {
    if (!confirm("এই কোর্সটি মুছবেন? (ডেমো — শুধু এই ব্রাউজারে)")) return;
    persist(courses.filter((c) => c.slug !== slug), "🗑️ কোর্স মোছা হয়েছে (ডেমো)।");
  }

  function addLesson(e: React.FormEvent) {
    e.preventDefault();
    if (!sel) return;
    const order = sel.lessons.length + 1;
    const lesson: Lesson = {
      id: `${sel.slug}-l${order}-${Date.now()}`,
      slug: ltitleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `lesson-${order}`,
      title: ltitle,
      titleEn: ltitleEn,
      durationMin: ldur,
      video_url: lvideo.trim(),
      resources: lres.split("\n").map((s) => s.trim()).filter(Boolean),
      lesson_order: order,
    };
    persist(
      courses.map((c) => (c.slug === sel.slug ? { ...c, lessons: [...c.lessons, lesson] } : c)),
      "✅ লেসন যুক্ত হয়েছে (ডেমো)। ভিডিও URL দিলে লেসন পেজে YouTube এমবেড হবে।",
    );
    setLtitle("");
    setLtitleEn("");
    setLvideo("");
    setLres("");
  }

  function deleteLesson(lessonSlug: string) {
    if (!sel) return;
    persist(
      courses.map((c) => (c.slug === sel.slug ? { ...c, lessons: c.lessons.filter((l) => l.slug !== lessonSlug) } : c)),
      "🗑️ লেসন মোছা হয়েছে (ডেমো)।",
    );
  }

  function addQuiz(e: React.FormEvent) {
    e.preventDefault();
    if (!sel) return;
    const qq: QuizQuestion = {
      id: `${sel.slug}-q${sel.quiz.length + 1}-${Date.now()}`,
      question: qtext,
      option_a: qa,
      option_b: qb,
      option_c: qc,
      option_d: qd,
      correct_answer: qcorrect,
    };
    persist(
      courses.map((c) => (c.slug === sel.slug ? { ...c, quiz: [...c.quiz, qq] } : c)),
      "✅ কুইজ প্রশ্ন যুক্ত হয়েছে (ডেমো)।",
    );
    setQtext("");
    setQa("");
    setQb("");
    setQc("");
    setQd("");
  }

  function deleteQuiz(id: string) {
    if (!sel) return;
    persist(
      courses.map((c) => (c.slug === sel.slug ? { ...c, quiz: c.quiz.filter((q) => q.id !== id) } : c)),
      "🗑️ প্রশ্ন মোছা হয়েছে (ডেমো)।",
    );
  }

  return (
    <div className="wrap pt-10">
      <h1 className="text-3xl font-extrabold text-slate-900">অ্যাডমিন প্যানেল</h1>
      <p className="notice mt-4">
        ⚠️ ডেমো মোড: সব এডিট শুধু এই ব্রাউজারে (localStorage) থাকবে। Supabase সংযুক্ত হলে এডিট সবার জন্য সংরক্ষিত হবে।
        ভিডিওর জন্য শুধু আসল YouTube Unlisted লিংক দিন — ভুয়া ID কখনো দেবেন না।
      </p>
      {note ? <p className="success mt-4">{note}</p> : null}

      <div className="flex gap-2 flex-wrap mt-5">
        {(["courses", "lessons", "quiz"] as Tab[]).map((t) => (
          <button key={t} className={`btn ${tab === t ? "btn-dark" : ""}`} onClick={() => setTab(t)}>
            {t === "courses" ? "কোর্স" : t === "lessons" ? "লেসন" : "কুইজ"}
          </button>
        ))}
        <button
          className="btn"
          onClick={() => {
            resetCourses();
            setCourses(getCourses());
            setNote("🔄 সিড ডেটায় ফিরে যাওয়া হয়েছে।");
          }}
        >
          সিড ডেটায় ফিরুন
        </button>
      </div>

      <div className="mt-5">
        <label className="label" htmlFor="sel">কোর্স বাছুন (লেসন/কুইজ ট্যাবের জন্য)</label>
        <select id="sel" className="input" style={{ maxWidth: 420 }} value={sel?.slug || ""} onChange={(e) => setSelSlug(e.target.value)}>
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>{c.title}</option>
          ))}
        </select>
      </div>

      {tab === "courses" && (
        <div className="mt-6">
          <form onSubmit={saveCourse} className="card p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg">{editSlug ? "কোর্স এডিট করুন" : "নতুন কোর্স যুক্ত করুন"}</h2>
            <div>
              <label className="label" htmlFor="ct">কোর্সের নাম (বাংলা)</label>
              <input id="ct" className="input" required value={ctitle} onChange={(e) => setCtitle(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="cte">English Title (slug তৈরিতে ব্যবহৃত হবে)</label>
              <input id="cte" className="input" required value={ctitleEn} onChange={(e) => setCtitleEn(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="cd">বিবরণ</label>
              <textarea id="cd" className="input" rows={3} required value={cdesc} onChange={(e) => setCdesc(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="cl">লেভেল</label>
              <select id="cl" className="input" value={clevel} onChange={(e) => setClevel(e.target.value)}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">{editSlug ? "আপডেট করুন" : "কোর্স যুক্ত করুন"}</button>
          </form>
          <div className="flex flex-col gap-3 mt-6">
            {courses.map((c) => (
              <div key={c.slug} className="card p-4 flex justify-between gap-3 flex-wrap">
                <span><strong>{c.title}</strong> <span className="text-slate-500 text-sm">({c.lessons.length} লেসন · {c.quiz.length} প্রশ্ন)</span></span>
                <span className="flex gap-2">
                  <button
                    className="btn"
                    onClick={() => {
                      setEditSlug(c.slug);
                      setCtitle(c.title);
                      setCtitleEn(c.titleEn);
                      setCdesc(c.description);
                      setClevel(c.level);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    এডিট
                  </button>
                  <button className="btn" onClick={() => deleteCourse(c.slug)}>মুছুন</button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "lessons" && sel && (
        <div className="mt-6">
          <form onSubmit={addLesson} className="card p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg">লেসন যুক্ত করুন — {sel.title}</h2>
            <div>
              <label className="label" htmlFor="lt">লেসনের নাম (বাংলা)</label>
              <input id="lt" className="input" required value={ltitle} onChange={(e) => setLtitle(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="lte">English Title</label>
              <input id="lte" className="input" required value={ltitleEn} onChange={(e) => setLtitleEn(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="ld">সময়কাল (মিনিট, ৫–১৫)</label>
              <input id="ld" className="input" type="number" min={1} max={60} required value={ldur} onChange={(e) => setLdur(Number(e.target.value))} />
            </div>
            <div>
              <label className="label" htmlFor="lv">YouTube Unlisted URL (খালি রাখলে প্লেসহোল্ডার দেখাবে)</label>
              <input id="lv" className="input" type="url" placeholder="https://www.youtube.com/watch?v=..." value={lvideo} onChange={(e) => setLvideo(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="lr">রিসোর্সের নাম (প্রতি লাইনে একটি, URL নয়)</label>
              <textarea id="lr" className="input" rows={3} value={lres} onChange={(e) => setLres(e.target.value)} />
            </div>
            <button className="btn btn-primary" type="submit">লেসন যুক্ত করুন</button>
          </form>
          <div className="flex flex-col gap-3 mt-6">
            {sel.lessons.map((l) => (
              <div key={l.slug} className="card p-4 flex justify-between gap-3 flex-wrap">
                <span><strong>{l.lesson_order}. {l.title}</strong> <span className="text-slate-500 text-sm">({l.durationMin} মি. · {l.video_url ? "ভিডিও যুক্ত" : "ভিডিও নেই"})</span></span>
                <button className="btn" onClick={() => deleteLesson(l.slug)}>মুছুন</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "quiz" && sel && (
        <div className="mt-6">
          <form onSubmit={addQuiz} className="card p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg">কুইজ প্রশ্ন যুক্ত করুন — {sel.title}</h2>
            <div>
              <label className="label" htmlFor="qt">প্রশ্ন</label>
              <input id="qt" className="input" required value={qtext} onChange={(e) => setQtext(e.target.value)} />
            </div>
            {([["A", qa, setQa], ["B", qb, setQb], ["C", qc, setQc], ["D", qd, setQd]] as const).map(([opt, val, set]) => (
              <div key={opt}>
                <label className="label" htmlFor={`q${opt}`}>অপশন {opt}</label>
                <input id={`q${opt}`} className="input" required value={val} onChange={(e) => set(e.target.value)} />
              </div>
            ))}
            <div>
              <label className="label" htmlFor="qc2">সঠিক উত্তর</label>
              <select id="qc2" className="input" value={qcorrect} onChange={(e) => setQcorrect(e.target.value as "A" | "B" | "C" | "D")}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">প্রশ্ন যুক্ত করুন</button>
          </form>
          <div className="flex flex-col gap-3 mt-6">
            {sel.quiz.map((q) => (
              <div key={q.id} className="card p-4 flex justify-between gap-3 flex-wrap">
                <span><strong>{q.question}</strong> <span className="text-slate-500 text-sm">(সঠিক: {q.correct_answer})</span></span>
                <button className="btn" onClick={() => deleteQuiz(q.id)}>মুছুন</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
