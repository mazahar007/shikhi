"use client";

import { useEffect, useMemo, useState } from "react";
import { getCourses } from "@/lib/demo";
import { CourseCard, SectionTitle } from "@/components/ui";
import type { Course } from "@/lib/data";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (level !== "all" && c.level !== level) return false;
      if (q && !(c.title + c.titleEn + c.description).toLowerCase().includes(q)) return false;
      return true;
    });
  }, [courses, query, level]);

  return (
    <div className="wrap pt-10">
      <SectionTitle title="সব কোর্স" sub="লঞ্চের সব কোর্স ফ্রি। খুঁজুন বা লেভেল দিয়ে ফিল্টার করুন।" />
      <div className="flex gap-3 flex-wrap mb-6">
        <input
          className="input"
          style={{ maxWidth: 420 }}
          placeholder="কোর্স খুঁজুন… যেমন: AI, CapCut"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="কোর্স খুঁজুন"
        />
        <select className="input" style={{ maxWidth: 220 }} value={level} onChange={(e) => setLevel(e.target.value)} aria-label="লেভেল ফিল্টার">
          <option value="all">সব লেভেল</option>
          <option value="Beginner">বিগিনার</option>
          <option value="Intermediate">ইন্টারমিডিয়েট</option>
          <option value="Advanced">অ্যাডভান্সড</option>
        </select>
        <label className="flex items-center gap-2 font-semibold text-[15px]">
          <input type="checkbox" checked disabled /> ফ্রি কোর্স
        </label>
      </div>
      {filtered.length === 0 ? (
        <p className="text-slate-600">কোনো কোর্স মেলেনি। অন্য শব্দ দিয়ে খুঁজুন।</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
