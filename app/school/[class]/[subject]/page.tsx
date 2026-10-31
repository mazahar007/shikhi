import Link from "next/link";
import { SCHOOL_CLASSES, getSchoolClass, getSchoolSubject, SCHOOL_VIDEO_PLACEHOLDER, SCHOOL_OUTLINE_NOTE } from "@/lib/school";

export function generateStaticParams() {
  return SCHOOL_CLASSES.flatMap((c) =>
    c.subjects.map((s) => ({ class: String(c.classNo), subject: s.slug })),
  );
}

export default async function SchoolSubjectPage({ params }: { params: Promise<{ class: string; subject: string }> }) {
  const { class: classParam, subject: subjectSlug } = await params;
  const classNo = Number(classParam);
  const cls = getSchoolClass(classNo);
  const subject = getSchoolSubject(classNo, subjectSlug);
  if (!cls || !subject) {
    return (
      <div className="wrap pt-10">
        <h1 className="text-2xl font-extrabold">এই বিষয়টি পাওয়া যায়নি</h1>
        <p className="text-slate-600 mt-2">ক্লাস ও বিষয় ঠিক আছে কি না দেখে আবার চেষ্টা করুন।</p>
        <Link className="btn btn-primary mt-4" href="/school">স্কুল পেজে ফিরুন</Link>
      </div>
    );
  }
  return (
    <div className="wrap pt-10">
      <Link href={`/school/${cls.classNo}`}>← ক্লাস {cls.classNo}</Link>
      <div className="flex gap-2 flex-wrap mt-4">
        <span className="chip">ক্লাস {cls.classNo} · {cls.stageBn}</span>
        <span className="chip chip-free">সম্পূর্ণ ফ্রি</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">{subject.title}</h1>
      <p className="text-slate-500">{subject.titleEn} · {subject.chapters.length}টি অধ্যায়</p>
      <p className="notice mt-4">{SCHOOL_OUTLINE_NOTE} অধ্যায়ের পূর্ণ লেসন ও কুইজ পরের ধাপে আসবে।</p>
      <section className="py-8">
        <h2 className="text-2xl font-extrabold mb-6">অধ্যায়ের তালিকা</h2>
        <div className="flex flex-col gap-4">
          {subject.chapters.map((chapter, i) => {
            const duration = 8 + ((i * 3) % 8); // 8–15 min, stated duration only
            return (
              <article key={chapter} className="card p-5">
                <div className="flex gap-2 flex-wrap">
                  <span className="chip">অধ্যায় {i + 1}</span>
                  <span className="chip chip-free">ফ্রি</span>
                  <span className="chip">{duration} মিনিট</span>
                </div>
                <h3 className="text-lg font-bold mt-3">{chapter}</h3>
                <p className="text-slate-600 text-[15px] mt-1">{SCHOOL_VIDEO_PLACEHOLDER}</p>
              </article>
            );
          })}
        </div>
        <div className="flex gap-3 flex-wrap mt-8">
          <Link className="btn btn-primary" href={`/school/${cls.classNo}`}>ক্লাস {cls.classNo}-এর সব বিষয়</Link>
          <Link className="btn" href="/school">সব ক্লাস</Link>
        </div>
      </section>
    </div>
  );
}
