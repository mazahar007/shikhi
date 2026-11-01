import Link from "next/link";
import { COURSES } from "@/lib/data";
import { SCHOOL_CLASSES, getSchoolClass } from "@/lib/school";
import { SectionTitle } from "@/components/ui";

// Shikhi home — DARK design v3 (approved 2026-11-01): deep navy #0B1220 + sky accent,
// section order following the 10 Minute School homepage screenshot the user sent.
// STYLE ONLY: all headings, course names and counts are Shikhi's own. No copied
// slogans, feature names, testimonials, photos, app claims or live-class counts.
// School counts are computed from lib/school.ts, not hard-coded.

const FAQS = [
  { q: "কোর্সগুলো কি সত্যিই ফ্রি?", a: "হ্যাঁ — MVP লঞ্চের ৫টি কোর্সই ফ্রি। ভবিষ্যতে অ্যাডভান্সড/পেইড কোর্স এলে তা আলাদাভাবে জানানো হবে।" },
  { q: "ভিডিও কবে দেখতে পারব?", a: "লেসনের ভিডিও ধাপে ধাপে যুক্ত হচ্ছে। যে লেসনে ভিডিও এখনো নেই, সেখানে পরিষ্কারভাবে লেখা থাকবে — কোনো ভুয়া ভিডিও দেখানো হবে না।" },
  { q: "সার্টিফিকেট কি পাওয়া যাবে?", a: "MVP-তে সার্টিফিকেট নেই — এটি পরের ভার্সনের ফিচার। আপাতত কুইজ স্কোর ড্যাশবোর্ডে সংরক্ষিত থাকে।" },
  { q: "অ্যাকাউন্ট কি আসল?", a: "আপাতত ডেমো অ্যাকাউন্ট (ব্রাউজারেই সংরক্ষিত)। Supabase সংযুক্ত হলে আসল অ্যাকাউন্ট সিস্টেম চালু হবে।" },
  { q: "ক্লাস ৪-১০ এর পড়া কি ফ্রি?", a: "হ্যাঁ — স্কুল ট্র্যাকের সব ক্লাস, বিষয় ও অধ্যায়ের কাঠামো সম্পূর্ণ ফ্রি। ভবিষ্যতে পেইড অ্যাডভান্সড কোর্স এলে তা আলাদাভাবে লেবেল করা হবে।" },
];

function classStats(n: number) {
  const c = getSchoolClass(n);
  if (!c) return { subjects: 0, chapters: 0 };
  return { subjects: c.subjects.length, chapters: c.subjects.reduce((s, x) => s + x.chapters.length, 0) };
}

function combinedStats(ns: number[]) {
  return ns.reduce(
    (acc, n) => {
      const s = classStats(n);
      return { subjects: acc.subjects + s.subjects, chapters: acc.chapters + s.chapters };
    },
    { subjects: 0, chapters: 0 },
  );
}

const totalSubjects = SCHOOL_CLASSES.reduce((s, c) => s + c.subjects.length, 0);
const totalChapters = SCHOOL_CLASSES.reduce((s, c) => s + c.subjects.reduce((t, x) => t + x.chapters.length, 0), 0);

const HERO_BATCHES = [
  { label: "ক্লাস ১০", href: "/school/10", gradient: "linear-gradient(135deg,#38bdf8,#0284c7)", meta: `${classStats(10).subjects}টি বিষয়` },
  { label: "ক্লাস ৯", href: "/school/9", gradient: "linear-gradient(135deg,#22d3ee,#0891b2)", meta: `${classStats(9).subjects}টি বিষয়` },
  { label: "ক্লাস ৮", href: "/school/8", gradient: "linear-gradient(135deg,#818cf8,#6366f1)", meta: `${classStats(8).subjects}টি বিষয়` },
  { label: "ক্লাস ৬-৭", href: "/school", gradient: "linear-gradient(135deg,#a78bfa,#7c3aed)", meta: "৭টি করে বিষয়" },
  { label: "ক্লাস ৪-৫", href: "/school", gradient: "linear-gradient(135deg,#34d399,#059669)", meta: "৫টি করে বিষয়" },
  { label: "ফ্রিল্যান্সিং", href: "/courses", gradient: "linear-gradient(135deg,#fbbf24,#f59e0b)", meta: "৫টি কোর্স" },
];

const SUBJECT_ROWS = [
  { title: "বাংলা — ক্লাস ৪ থেকে ১০", href: "/school" },
  { title: "ইংরেজি — ক্লাস ৪ থেকে ১০", href: "/school" },
  { title: "গণিত — ক্লাস ৪ থেকে ১০", href: "/school" },
  { title: "বিজ্ঞান / পদার্থ / রসায়ন / জীববিজ্ঞান", href: "/school" },
  { title: "ICT — ক্লাস ৬ থেকে ১০", href: "/school" },
  { title: "বাংলাদেশ ও বিশ্বপরিচয়", href: "/school" },
];

function batchSubjects(ns: number[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const n of ns) {
    for (const s of getSchoolClass(n)?.subjects ?? []) {
      if (!seen.has(s.title)) {
        seen.add(s.title);
        out.push(s.title);
      }
    }
  }
  return out;
}

// Dark card used only on the home page (other pages keep the light .card).
const darkCard = "bg-[#16233a] border border-[#1e3a5f] rounded-[20px] shadow-[0_4px_18px_rgba(0,0,0,0.35)]";
const darkCardHover = `${darkCard} transition-transform duration-150 hover:-translate-y-1`;

export default function Home() {
  return (
    <div className="bg-[#0b1220] text-[#e0f2fe] -mb-16">
      {/* 1. Hero + batch cards (screenshot: hero, then 6 batch cards in a row) */}
      <section
        className="text-center"
        style={{ background: "radial-gradient(ellipse at top,#0c4a6e,#0b1220 65%)" }}
      >
        <div className="wrap pt-12 md:pt-16 pb-12">
          <span className="chip chip-free">সব কোর্স ফ্রি</span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-4 text-white">
            বাংলায় শিখুন,
            <br />
            বাস্তব স্কিল গড়ুন।
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            এক জায়গায় স্কুলের পড়া আর ফ্রিল্যান্সিং স্কিল — ছোট ছোট প্র্যাকটিক্যাল লেসনে,
            আপনার ভাষায়। প্রতিটি লেসন ৫–১৫ মিনিটের।
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 text-left">
            {HERO_BATCHES.map((b) => (
              <Link key={b.label} href={b.href} className={`${darkCardHover} overflow-hidden no-underline`}>
                <div
                  className="min-h-[64px] flex items-end p-3 text-white font-extrabold text-xl"
                  style={{ background: b.gradient }}
                >
                  {b.label}
                </div>
                <div className="p-3">
                  <span className="chip chip-free">ফ্রি</span>
                  <p className="text-slate-400 text-sm mt-2">{b.meta}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link className="btn btn-primary" href="/school">ফ্রি ক্লাস দেখুন →</Link>
          </div>
          <p className="text-sm text-slate-500 mt-4">কোনো কার্ড লাগবে না · ডেমো অ্যাকাউন্ট ব্রাউজারেই থাকে</p>
        </div>
      </section>

      {/* 2. Class-learning courses */}
      <section className="bg-[#0f172a]">
        <div className="wrap py-12">
          <SectionTitle dark title="ক্লাসে শেখার নতুন আনন্দ" sub="স্কুল আর স্কিল — দুই ট্র্যাকের কোর্স, এক জায়গায়।" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES.map((c) => {
              const totalMin = c.lessons.reduce((s, l) => s + l.durationMin, 0);
              return (
                <article key={c.slug} className={`${darkCardHover} flex flex-col overflow-hidden`}>
                  <div className="relative">
                    <div
                      className="flex items-center justify-center text-white font-extrabold text-5xl min-h-[150px]"
                      style={{ background: c.gradient }}
                    >
                      {c.initial}
                    </div>
                    <span className="absolute top-3 right-3 chip chip-free">ফ্রি</span>
                  </div>
                  <div className="p-5 flex flex-col gap-2 grow">
                    <span className="chip self-start">{c.levelBn}</span>
                    <h3 className="text-lg font-bold leading-snug text-white">{c.title}</h3>
                    <p className="text-sm text-slate-400">{c.titleEn}</p>
                    <p className="text-[15px] text-slate-400 grow">{c.description}</p>
                    <p className="text-sm text-slate-500">
                      {c.lessons.length}টি লেসন · মোট {totalMin} মিনিট · কুইজ {c.quiz.length} প্রশ্ন
                    </p>
                    <Link className="btn btn-primary mt-2 w-full" href={`/courses/${c.slug}`}>কোর্স দেখুন</Link>
                  </div>
                </article>
              );
            })}
            <article className={`${darkCardHover} flex flex-col overflow-hidden`}>
              <div className="flex items-center justify-center text-white font-extrabold text-5xl min-h-[150px] bg-gradient-to-br from-pink-500 to-rose-400">
                স্কুল
              </div>
              <div className="p-5 flex flex-col gap-2 grow">
                <span className="chip self-start">ক্লাস ৪-১০</span>
                <h3 className="text-lg font-bold leading-snug text-white">স্কুল (ক্লাস ৪-১০)</h3>
                <p className="text-sm text-slate-400">School Track</p>
                <p className="text-[15px] text-slate-400 grow">
                  শেখার কাঠামো / আউটলাইন — অফিসিয়াল পাঠ্যপুস্তকের অধ্যায় তালিকা নয়।
                </p>
                <p className="text-sm text-slate-500">{totalSubjects}টি বিষয় · {totalChapters}টি অধ্যায়</p>
                <Link className="btn btn-primary mt-2 w-full" href="/school">স্কুল দেখুন</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Subject rows (screenshot: horizontal course rows) */}
      <section className="wrap py-12">
        <SectionTitle dark title="ঘরে বসে অনলাইনেও শেখা চলুক নিরবচ্ছিন্ন" sub="নিজের সময়ে, নিজের গতিতে — বিষয় ধরে ধরে এগোন।" />
        <div className="flex flex-col gap-2">
          {SUBJECT_ROWS.map((r) => (
            <Link key={r.title} href={r.href} className={`${darkCardHover} flex justify-between items-center px-4 py-3 no-underline`}>
              <b className="text-[#e0f2fe]">{r.title}</b>
              <span className="text-[#38bdf8] text-sm font-bold">দেখুন →</span>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link className="btn btn-primary" href="/school">সব বিষয় দেখুন →</Link>
        </div>
      </section>

      {/* 4. Gradient banner: learn at your own pace */}
      <section className="bg-gradient-to-br from-[#0369a1] to-[#0ea5e9]">
        <div className="wrap py-12">
          <SectionTitle dark title="অনলাইনেই শেখা হোক নিজের গতিতে!" sub="রেকর্ডেড লেসন, কুইজ আর অগ্রগতি — সব অনলাইনে।" />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["রেকর্ডেড লেসন", "৫–১৫ মিনিটের ছোট লেসন, ধাপে ধাপে। ভিডিও যুক্ত হলে এখানেই দেখা যাবে।"],
              ["কুইজ প্র্যাকটিস", "প্রতি কোর্সে ৫টি প্রশ্ন — শেখা যাচাই করুন, দুর্বলতা ধরুন।"],
              ["ড্যাশবোর্ড পার্টনার", "লেসন শেষ করলে অগ্রগতি (%) ড্যাশবোর্ডে জমা থাকে, যেকোনো সময় দেখুন।"],
            ].map(([t, d]) => (
              <div key={t} className={darkCardHover + " p-5"}>
                <h3 className="font-bold text-lg text-white">{t}</h3>
                <p className="text-slate-400 text-[15px] mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Learn by doing */}
      <section className="bg-[#0f172a]">
        <div className="wrap py-12">
          <SectionTitle dark title="শুধু দেখা নয়, করে শেখা" />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["হাতে-কলমে প্র্যাকটিস", "টুল, টেমপ্লেট আর চেকলিস্ট দিয়ে কাজ করে শেখা।"],
              ["কুইজ দিয়ে যাচাই", "শুধু লেকচার নয় — কুইজে নিজেকে পরীক্ষা করুন।"],
              ["ধাপে ধাপে অগ্রগতি", "অধ্যায় ধরে ধরে এগোন, ড্যাশবোর্ডে অগ্রগতি দেখুন।"],
            ].map(([t, d]) => (
              <div key={t} className={darkCardHover + " p-5"}>
                <h3 className="font-bold text-lg text-white">{t}</h3>
                <p className="text-slate-400 text-[15px] mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. All batches */}
      <section className="wrap py-12">
        <SectionTitle dark title="Shikhi-র সব ব্যাচ" sub="ক্লাস আর স্কিল — দুই ধরনের ব্যাচ, সবই ফ্রি।" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "প্রাথমিক ব্যাচ · ক্লাস ৪-৫", href: "/school", subjects: batchSubjects([4, 5]) },
            { title: "জুনিয়র ব্যাচ · ক্লাস ৬-৮", href: "/school", subjects: batchSubjects([6, 7, 8]) },
            { title: "SSC ব্যাচ · ক্লাস ৯-১০", href: "/school", subjects: batchSubjects([9, 10]) },
          ].map((b) => (
            <Link key={b.title} href={b.href} className={`${darkCardHover} p-5 no-underline`}>
              <h3 className="font-bold text-lg text-white">{b.title}</h3>
              <div className="flex gap-2 flex-wrap mt-3">
                {b.subjects.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. What learners get (honest: no live classes, no app, no testimonials invented) */}
      <section className="bg-[#0f172a]">
        <div className="wrap py-12">
          <SectionTitle dark title="শিক্ষার্থীরা যা পাচ্ছে" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["ফ্রি লেসন কাঠামো", `${totalSubjects}টি বিষয়, ${totalChapters}টি অধ্যায়ের আউটলাইন।`],
              ["কুইজ", "প্রতি কোর্সে ৫টি প্রশ্ন।"],
              ["রিসোর্সের নাম", "প্রতি লেসনে রিসোর্সের নাম দেওয়া।"],
              ["রেকর্ডেড লেসন", "ভিডিও যুক্ত হলে এখানেই — কোনো ভুয়া ভিডিও নয়।"],
              ["ড্যাশবোর্ড", "অগ্রগতি ও কুইজ স্কোর এক জায়গায়।"],
              ["মোবাইল রেসপন্সিভ", "মোবাইল থেকেই পুরো কোর্স করা যায়।"],
            ].map(([t, d]) => (
              <div key={t} className={darkCard + " p-5"}>
                <h3 className="font-bold text-lg text-white">{t}</h3>
                <p className="text-slate-400 text-[15px] mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why Shikhi + FAQ */}
      <section className="wrap py-12">
        <SectionTitle dark title="কেন শিখি?" sub="বাংলা ভাষায়, প্র্যাকটিক্যাল, ছোট লেসন — কোনো ভুয়া দাবি ছাড়া।" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["বাংলা ভাষায়", "সব ব্যাখ্যা বাংলায়, ইংরেজি টার্ম পাশে দেওয়া — বুঝতে সহজ।"],
            ["প্র্যাকটিক্যাল", "প্রতিটি লেসনে হাতে-কলমে কাজ: টুল, টেমপ্লেট আর চেকলিস্ট।"],
            ["ছোট লেসন", "৫–১৫ মিনিটের লেসন — ব্যস্ত দিনেও একটা লেসন শেষ করা যায়।"],
          ].map(([t, d]) => (
            <div key={t} className={darkCardHover + " p-5"}>
              <h3 className="font-bold text-lg text-white">{t}</h3>
              <p className="text-slate-400 text-[15px] mt-1">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <SectionTitle dark title="সাধারণ প্রশ্ন" />
          <div className="flex flex-col gap-3">
            {FAQS.map((f) => (
              <details key={f.q} className={darkCard + " p-5"}>
                <summary className="font-bold cursor-pointer min-h-[44px] flex items-center text-white">{f.q}</summary>
                <p className="text-slate-400 text-[15px] mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="wrap pb-12">
        <div className="bg-[#082f49] border border-[#1e3a5f] rounded-[24px] p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">আজই ফ্রিতে শেখা শুরু করুন</h2>
          <p className="text-slate-400 mt-3">কোর্স বা স্কুল — যেটা দরকার, সেটাই বেছে নিন। সবকিছু ফ্রি।</p>
          <div className="flex gap-3 flex-wrap justify-center mt-6">
            <Link className="btn btn-primary" href="/courses">ফ্রি কোর্স শুরু করুন</Link>
            <Link className="btn" style={{ background: "transparent", borderColor: "rgba(125,211,252,.6)", color: "#e0f2fe" }} href="/school">
              স্কুল (ক্লাস ৪-১০) দেখুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
