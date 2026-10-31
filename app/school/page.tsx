import Link from "next/link";
import { SCHOOL_CLASSES, SCHOOL_OUTLINE_NOTE } from "@/lib/school";
import { SectionTitle } from "@/components/ui";

const STAGES = [
  { stageBn: "প্রাথমিক", classes: [4, 5], desc: "ভিত্তি মজবুত করার ধাপ — পড়া, লেখা, গণিত ও বিজ্ঞানের মৌলিক ধারণা।" },
  { stageBn: "নিম্ন মাধ্যমিক", classes: [6, 7, 8], desc: "বিষয়ভিত্তিক পড়াশোনা গভীর হয় — বীজগণিত, বিজ্ঞান, ICT ও বিশ্বপরিচয়।" },
  { stageBn: "মাধ্যমিক (SSC)", classes: [9, 10], desc: "SSC প্রস্তুতির ধাপ — পদার্থ, রসায়ন, জীববিজ্ঞান, উচ্চতর গণিতসহ সব বিষয়।" },
];

export default function SchoolPage() {
  return (
    <div className="wrap pt-10">
      <span className="chip chip-free">ক্লাস ৪-১০ — সম্পূর্ণ ফ্রি</span>
      <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900 mt-4">
        স্কুলের পড়া, ধাপে ধাপে — সম্পূর্ণ ফ্রিতে।
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mt-4">
        ক্লাস ৪ থেকে ১০ পর্যন্ত প্রতিটি ক্লাসের বিষয় ও অধ্যায়ের শেখার কাঠামো এখানে
        সাজানো আছে। নিজের ক্লাস বেছে বিষয় দেখুন, অধ্যায় ধরে ধরে এগোন।
      </p>
      <p className="notice mt-4">{SCHOOL_OUTLINE_NOTE} ভিডিও ও রিসোর্স ধাপে ধাপে যুক্ত হচ্ছে — কোনো ভুয়া ভিডিও দেখানো হবে না।</p>

      {STAGES.map((stage) => (
        <section key={stage.stageBn} className="py-8">
          <SectionTitle title={stage.stageBn} sub={stage.desc} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SCHOOL_CLASSES.filter((c) => stage.classes.includes(c.classNo)).map((c) => (
              <article key={c.classNo} className="card p-5 flex flex-col gap-2">
                <div className="flex gap-2 flex-wrap">
                  <span className="chip">{c.stageBn}</span>
                  <span className="chip chip-free">সম্পূর্ণ ফ্রি</span>
                </div>
                <h3 className="text-xl font-bold">ক্লাস {c.classNo}</h3>
                <p className="text-slate-600 text-[15px]">
                  {c.subjects.length}টি বিষয় · {c.subjects.reduce((s, x) => s + x.chapters.length, 0)}টি অধ্যায়ের আউটলাইন
                </p>
                <p className="text-[15px] text-slate-600 grow">{c.subjects.map((s) => s.title).join(" · ")}</p>
                <Link className="btn btn-primary mt-2" href={`/school/${c.classNo}`}>
                  ক্লাস {c.classNo} দেখুন
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="py-8">
        <SectionTitle title="শিক্ষার্থী ও অভিভাবকের জন্য কীভাবে কাজ করে?" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["১. ক্লাস বাছুন", "৪ থেকে ১০ — নিজের ক্লাসের কার্ডে ট্যাপ করুন।"],
            ["২. বিষয় ও অধ্যায় দেখুন", "বিষয় খুলে অধ্যায়ের তালিকা ধরে ধরে পড়ার পরিকল্পনা করুন।"],
            ["৩. ভিডিও এলে দেখুন", "প্রতিটি অধ্যায়ে ভিডিও যুক্ত হলে সেখানেই দেখা যাবে — সবই ফ্রি থাকবে।"],
          ].map(([t, d]) => (
            <div key={t} className="card p-5">
              <h3 className="font-bold text-lg">{t}</h3>
              <p className="text-slate-600 text-[15px] mt-1">{d}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-600 mt-6">
          নোট: এই ধাপে অধ্যায়ের কাঠামো ও আউটলাইন দেওয়া হয়েছে। পূর্ণ লেসন, ভিডিও ও কুইজ পরের ধাপে যুক্ত হবে।
          স্কুলের কোনো ক্লাস, বিষয় বা অধ্যায়ের জন্য কোনো ফি নেই।
        </p>
      </section>
    </div>
  );
}
