import Link from "next/link";
import { SCHOOL_CLASSES, getSchoolClass, SCHOOL_OUTLINE_NOTE } from "@/lib/school";
import { SectionTitle } from "@/components/ui";

export function generateStaticParams() {
  return SCHOOL_CLASSES.map((c) => ({ class: String(c.classNo) }));
}

export default async function SchoolClassPage({ params }: { params: Promise<{ class: string }> }) {
  const { class: classParam } = await params;
  const cls = getSchoolClass(Number(classParam));
  if (!cls) {
    return (
      <div className="wrap pt-10">
        <h1 className="text-2xl font-extrabold">এই ক্লাসটি পাওয়া যায়নি</h1>
        <p className="text-slate-600 mt-2">স্কুল ট্র্যাকে ক্লাস ৪ থেকে ১০ পর্যন্ত আছে।</p>
        <Link className="btn btn-primary mt-4" href="/school">স্কুল পেজে ফিরুন</Link>
      </div>
    );
  }
  return (
    <div className="wrap pt-10">
      <Link href="/school">← স্কুল (৪-১০)</Link>
      <div className="flex gap-2 flex-wrap mt-4">
        <span className="chip">{cls.stageBn}</span>
        <span className="chip chip-free">সম্পূর্ণ ফ্রি</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">ক্লাস {cls.classNo}</h1>
      <p className="text-slate-600 mt-2">
        {cls.subjects.length}টি বিষয় · {cls.subjects.reduce((s, x) => s + x.chapters.length, 0)}টি অধ্যায়ের আউটলাইন
      </p>
      <p className="notice mt-4">{SCHOOL_OUTLINE_NOTE}</p>
      <section className="py-8">
        <SectionTitle title="বিষয়সমূহ" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cls.subjects.map((s) => (
            <article key={s.slug} className="card p-5 flex flex-col gap-2">
              <span className="chip chip-free self-start">ফ্রি</span>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="text-sm text-slate-500">{s.titleEn}</p>
              <p className="text-[15px] text-slate-600 grow">{s.chapters.length}টি অধ্যায়</p>
              <Link className="btn btn-primary mt-2" href={`/school/${cls.classNo}/${s.slug}`}>
                অধ্যায় দেখুন
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
