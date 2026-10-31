import Link from "next/link";
import { COURSES } from "@/lib/data";
import { CourseCard, SectionTitle } from "@/components/ui";

const FAQS = [
  { q: "কোর্সগুলো কি সত্যিই ফ্রি?", a: "হ্যাঁ — MVP লঞ্চের ৫টি কোর্সই ফ্রি। ভবিষ্যতে অ্যাডভান্সড/পেইড কোর্স এলে তা আলাদাভাবে জানানো হবে।" },
  { q: "ভিডিও কবে দেখতে পারব?", a: "লেসনের ভিডিও ধাপে ধাপে যুক্ত হচ্ছে। যে লেসনে ভিডিও এখনো নেই, সেখানে পরিষ্কারভাবে লেখা থাকবে — কোনো ভুয়া ভিডিও দেখানো হবে না।" },
  { q: "সার্টিফিকেট কি পাওয়া যাবে?", a: "MVP-তে সার্টিফিকেট নেই — এটি পরের ভার্সনের ফিচার। আপাতত কুইজ স্কোর ড্যাশবোর্ডে সংরক্ষিত থাকে।" },
  { q: "অ্যাকাউন্ট কি আসল?", a: "আপাতত ডেমো অ্যাকাউন্ট (ব্রাউজারেই সংরক্ষিত)। Supabase সংযুক্ত হলে আসল অ্যাকাউন্ট সিস্টেম চালু হবে।" },
  { q: "ক্লাস ৪-১০ এর পড়া কি ফ্রি?", a: "হ্যাঁ — স্কুল ট্র্যাকের সব ক্লাস, বিষয় ও অধ্যায়ের কাঠামো সম্পূর্ণ ফ্রি। ভবিষ্যতে পেইড অ্যাডভান্সড কোর্স এলে তা আলাদাভাবে লেবেল করা হবে।" },
];

export default function Home() {
  return (
    <div>
      <section className="wrap pt-12 md:pt-16 pb-10">
        <span className="chip chip-free">🎓 লঞ্চ অফার — সব কোর্স ফ্রি</span>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 mt-4">
          বাংলায় শিখুন,
          <br />
          বাস্তব স্কিল গড়ুন।
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mt-4">
          ফ্রিল্যান্সিং, AI টুলস, ভিডিও এডিটিং আর ডিজাইন — ছোট ছোট প্র্যাকটিক্যাল লেসনে,
          আপনার ভাষায়। প্রতিটি লেসন ৫–১৫ মিনিটের।
        </p>
        <div className="flex gap-3 flex-wrap mt-6">
          <Link className="btn btn-primary" href="/courses">কোর্স দেখুন</Link>
          <Link className="btn" href="/register">ফ্রি অ্যাকাউন্ট খুলুন</Link>
        </div>
        <p className="text-sm text-slate-500 mt-4">কোনো কার্ড লাগবে না · ডেমো অ্যাকাউন্ট ব্রাউজারেই থাকে</p>
      </section>

      <section className="wrap py-10">
        <SectionTitle
          title="স্কুল (ক্লাস ৪-১০) — সম্পূর্ণ ফ্রি"
          sub="প্রাথমিক, নিম্ন মাধ্যমিক ও মাধ্যমিক (SSC) — নিজের ক্লাস বেছে বিষয় ও অধ্যায়ের আউটলাইন দেখুন। এটি একটি শেখার কাঠামো, অফিসিয়াল পাঠ্যপুস্তকের অধ্যায় তালিকা নয়।"
        />
        <div className="flex gap-2 flex-wrap">
          {[4, 5, 6, 7, 8, 9, 10].map((n) => (
            <Link key={n} className="btn" href={`/school/${n}`}>
              ক্লাস {n}
            </Link>
          ))}
          <Link className="btn btn-primary" href="/school">সব ক্লাস দেখুন</Link>
        </div>
      </section>

      <section className="wrap py-10">
        <SectionTitle title="কেন শিখির সাথে শিখবেন?" sub="বড় কোর্সের ভিড় নয় — কাজে লাগে এমন স্কিল, ধাপে ধাপে।" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["🇧🇩 বাংলা ভাষায়", "সব ব্যাখ্যা বাংলায়, ইংরেজি টার্ম পাশে দেওয়া — বুঝতে সহজ।"],
            ["🛠️ প্র্যাকটিক্যাল", "প্রতিটি লেসনে হাতে-কলমে কাজ: টুল, টেমপ্লেট আর চেকলিস্ট।"],
            ["⏱️ ছোট লেসন", "৫–১৫ মিনিটের লেসন — ব্যস্ত দিনেও একটা লেসন শেষ করা যায়।"],
          ].map(([t, d]) => (
            <div key={t} className="card p-5">
              <h3 className="font-bold text-lg">{t}</h3>
              <p className="text-slate-600 text-[15px] mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap py-10">
        <SectionTitle title="ফিচার্ড কোর্স" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      <section className="wrap py-10">
        <SectionTitle title="কীভাবে কাজ করে?" />
        <ol className="grid md:grid-cols-3 gap-4 list-none p-0">
          {[
            ["১. অ্যাকাউন্ট খুলুন", "ফ্রি রেজিস্টার করুন (ডেমো) — ১ মিনিটের কাজ।"],
            ["২. কোর্সে এনরোল করুন", "পছন্দের কোর্স বেছে এনরোল করুন, লেসন ধরে ধরে এগোন।"],
            ["৩. কুইজ দিন ও এগিয়ে যান", "প্রতিটি কোর্স শেষে কুইজ দিন, অগ্রগতি ড্যাশবোর্ডে দেখুন।"],
          ].map(([t, d]) => (
            <li key={t} className="card p-5">
              <h3 className="font-bold text-lg">{t}</h3>
              <p className="text-slate-600 text-[15px] mt-1">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap py-10">
        <SectionTitle title="শিক্ষার্থীদের জন্য সুবিধা" />
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "মোবাইল থেকেই পুরো কোর্স করা যায় — রেসপন্সিভ ডিজাইন।",
            "লেসন শেষ করলে অগ্রগতি (%) ড্যাশবোর্ডে জমা থাকে।",
            "প্রতি কোর্সে রিসোর্সের নাম ও কুইজ — শেখা যাচাই করা যায়।",
            "ভবিষ্যতে আসছে: সার্টিফিকেট, পেইড অ্যাডভান্সড কোর্স ও bKash/Nagad পেমেন্ট।",
          ].map((t) => (
            <div key={t} className="card p-5 text-[15px]">✅ {t}</div>
          ))}
        </div>
      </section>

      <section className="wrap py-10">
        <SectionTitle title="সাধারণ প্রশ্ন" />
        <div className="flex flex-col gap-3">
          {FAQS.map((f) => (
            <details key={f.q} className="card p-5">
              <summary className="font-bold cursor-pointer min-h-[44px] flex items-center">{f.q}</summary>
              <p className="text-slate-600 text-[15px] mt-2">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link className="btn btn-primary" href="/courses">ফ্রি কোর্স শুরু করুন</Link>
        </div>
      </section>
    </div>
  );
}
