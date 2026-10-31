"use client";

import { useState } from "react";
import { saveContactMessage } from "@/lib/demo";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    saveContactMessage({ name, email, message, date: new Date().toISOString() });
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="wrap pt-10 max-w-xl">
      <h1 className="text-3xl font-extrabold text-slate-900">যোগাযোগ / সাপোর্ট</h1>
      <p className="text-slate-600 mt-2">প্রশ্ন, সমস্যা বা কোর্সের অনুরোধ জানান। ডেমোতে মেসেজ আপনার ব্রাউজারেই সংরক্ষিত হয়।</p>
      <p className="mt-3">
        Facebook:{" "}
        <a href="https://www.facebook.com/mazahar007" target="_blank" rel="noreferrer">
          facebook.com/mazahar007
        </a>
      </p>
      {sent ? <p className="success mt-4">✅ ধন্যবাদ! আপনার মেসেজ সংরক্ষিত হয়েছে (ডেমো)। শিগগিরই উত্তর দেওয়া হবে।</p> : null}
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
          <label className="label" htmlFor="message">মেসেজ</label>
          <textarea id="message" className="input" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">মেসেজ পাঠান</button>
      </form>
    </div>
  );
}
