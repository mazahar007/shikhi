import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "শিখি — বাংলা ভাষায় প্র্যাকটিক্যাল স্কিল লার্নিং",
  description: "বাংলা ভাষায় প্র্যাকটিক্যাল স্কিল শিখুন — AI টুলস, YouTube Automation, CapCut, Canva ও ফ্রিল্যান্সিং। সব MVP কোর্স ফ্রি।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>
        <AuthProvider>
          <Header />
          <main className="pb-16">{children}</main>
          <footer className="border-t border-[#1e3a5f] bg-[#0b1220]">
            <div className="wrap py-8 text-slate-400 text-[15px]">
              <p className="font-bold text-white">শিখি (Shikhi) — বাংলা ভাষায় প্র্যাকটিক্যাল স্কিল লার্নিং</p>
              <p>সব MVP কোর্স লঞ্চের জন্য ফ্রি। পেইড/প্রিমিয়াম কোর্স পরে আসবে।</p>
              <p>
                <a href="https://www.facebook.com/mazahar007" target="_blank" rel="noreferrer">Facebook: mazahar007</a>
                {" · "}
                <a href="/contact">যোগাযোগ</a>
                {" · "}
                <a href="/admin">অ্যাডমিন</a>
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
