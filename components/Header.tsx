"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="wrap flex items-center justify-between gap-3 py-3">
        <Link href="/" className="text-xl font-extrabold text-slate-900 no-underline">
          শিখি <span className="text-teal-700">Shikhi</span>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4 flex-wrap text-[15px] font-semibold">
          <Link href="/courses" className="text-slate-700 no-underline">কোর্স</Link>
          <Link href="/school" className="text-slate-700 no-underline">স্কুল (৪-১০)</Link>
          <Link href="/dashboard" className="text-slate-700 no-underline">ড্যাশবোর্ড</Link>
          <Link href="/contact" className="text-slate-700 no-underline">যোগাযোগ</Link>
          {user ? (
            <>
              <span className="hidden sm:inline text-slate-500">👋 {user.name}</span>
              <button className="btn btn-ghost" onClick={logout}>লগআউট</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">লগইন</Link>
              <Link href="/register" className="btn btn-primary">ফ্রি রেজিস্টার</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
