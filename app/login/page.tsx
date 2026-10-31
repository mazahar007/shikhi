"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@/lib/auth";

function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      login(email.trim(), password);
      router.push(next);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "লগইন ব্যর্থ হয়েছে।");
    }
  }

  return (
    <div className="wrap pt-12 max-w-md">
      <h1 className="text-3xl font-extrabold text-slate-900">লগইন</h1>
      <p className="notice mt-4">🧪 ডেমো লগইন — অ্যাকাউন্ট শুধু আপনার ব্রাউজারে (localStorage) থাকে। আসল Supabase Auth হলো v2 ধাপ।</p>
      {err ? <p className="error mt-4">{err}</p> : null}
      <form onSubmit={submit} className="card p-6 flex flex-col gap-4 mt-4">
        <div>
          <label className="label" htmlFor="email">ইমেইল</label>
          <input id="email" className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="password">পাসওয়ার্ড</label>
          <input id="password" className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">লগইন করুন</button>
        <p className="text-[15px] text-slate-600">অ্যাকাউন্ট নেই? <Link href="/register">ফ্রি রেজিস্টার করুন</Link></p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
