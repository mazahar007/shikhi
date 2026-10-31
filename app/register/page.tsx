"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      register(name.trim(), email.trim(), password);
      router.push("/dashboard");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "রেজিস্টার ব্যর্থ হয়েছে।");
    }
  }

  return (
    <div className="wrap pt-12 max-w-md">
      <h1 className="text-3xl font-extrabold text-slate-900">ফ্রি রেজিস্টার</h1>
      <p className="notice mt-4">🧪 ডেমো অ্যাকাউন্ট — শুধু আপনার ব্রাউজারে থাকে, কোনো সার্ভারে যায় না। আসল অ্যাকাউন্ট Supabase সংযুক্ত হলে চালু হবে।</p>
      {err ? <p className="error mt-4">{err}</p> : null}
      <form onSubmit={submit} className="card p-6 flex flex-col gap-4 mt-4">
        <div>
          <label className="label" htmlFor="name">নাম</label>
          <input id="name" className="input" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="email">ইমেইল</label>
          <input id="email" className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="password">পাসওয়ার্ড</label>
          <input id="password" className="input" type="password" required minLength={4} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">অ্যাকাউন্ট তৈরি করুন</button>
        <p className="text-[15px] text-slate-600">ইতিমধ্যে অ্যাকাউন্ট আছে? <Link href="/login">লগইন করুন</Link></p>
      </form>
    </div>
  );
}
