import Link from "next/link";
import type { Course } from "@/lib/data";

export function Thumb({ course, big = false }: { course: Course; big?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center text-white font-extrabold ${
        big ? "text-7xl min-h-[220px]" : "text-5xl min-h-[150px]"
      }`}
      style={{ background: course.gradient }}
      aria-label={`${course.title} থাম্বনেইল`}
    >
      {course.initial}
    </div>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const totalMin = course.lessons.reduce((s, l) => s + l.durationMin, 0);
  return (
    <article className="card card-hover flex flex-col overflow-hidden">
      <div className="relative">
        <Thumb course={course} />
        <span className="absolute top-3 right-3 chip chip-free">ফ্রি</span>
      </div>
      <div className="p-5 flex flex-col gap-2 grow">
        <div className="flex gap-2 flex-wrap">
          <span className="chip">{course.levelBn}</span>
        </div>
        <h3 className="text-lg font-bold leading-snug">{course.title}</h3>
        <p className="text-sm text-slate-500">{course.titleEn}</p>
        <p className="text-[15px] text-slate-600 grow">{course.description}</p>
        <p className="text-sm text-slate-500">
          {course.lessons.length}টি লেসন · মোট {totalMin} মিনিট · কুইজ {course.quiz.length} প্রশ্ন
        </p>
        <Link className="btn btn-primary mt-2 w-full" href={`/courses/${course.slug}`}>
          কোর্স দেখুন
        </Link>
      </div>
    </article>
  );
}

export function SectionTitle({ title, sub, dark = false }: { title: string; sub?: string; dark?: boolean }) {
  return (
    <div className="mb-6">
      <h2 className={`text-2xl md:text-3xl font-extrabold ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {sub ? <p className={dark ? "text-slate-400 mt-2" : "text-slate-600 mt-2"}>{sub}</p> : null}
    </div>
  );
}
