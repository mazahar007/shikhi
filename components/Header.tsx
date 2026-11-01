"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-20 bg-[#0b1220] border-b border-[#1e3a5f] shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
      <div className="wrap flex items-center justify-between gap-3 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-white no-underline">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#0ea5e9] text-white text-lg">শি</span>
          শিখি <span className="text-[#38bdf8]">Shikhi</span>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4 flex-wrap text-[15px] font-semibold">
          <Link href="/courses" className="text-slate-300 no-underline">কোর্স</Link>
          <Link href="/school" className="text-slate-300 no-underline">স্কুল (৪-১০)</Link>
          <Link href="/dashboard" className="text-slate-300 no-underline">ড্যাশবোর্ড</Link>
          <Link href="/contact" className="text-slate-300 no-underline">যোগাযোগ</Link>
          {user ? (
            <>
              <span className="hidden sm:inline text-slate-400">{user.name}</span>
              <button className="text-slate-200 font-bold min-h-[44px] px-3 cursor-pointer bg-transparent border-0" onClick={logout}>লগআউট</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-slate-200 no-underline px-2 py-2">লগইন</Link>
              <Link href="/register" className="btn btn-primary">ফ্রি রেজিস্টার</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
