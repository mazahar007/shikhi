// Shikhi (শিখি) — E-Learning Platform MVP seed data.
// All 5 launch courses are FREE (is_free: true, price: 0). Freemium/paid is a later step.
// Seed lessons have NO video_url on purpose: no fake YouTube IDs are ever invented.
// When an admin adds a real YouTube Unlisted URL, the lesson page embeds it.
// Types mirror supabase/schema.sql.

export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  durationMin: number; // 5–15 per roadmap
  video_url: string; // empty = not yet added; never a fake ID
  resources: string[]; // resource NAMES only, not fake URLs
  lesson_order: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  level: Level;
  levelBn: string;
  price: number;
  is_free: boolean;
  gradient: string; // CSS gradient for the thumbnail (no external images)
  initial: string; // Bengali initial shown on the thumbnail
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

function lesson(
  course: string,
  order: number,
  slug: string,
  title: string,
  titleEn: string,
  durationMin: number,
  resources: string[],
): Lesson {
  return { id: `${course}-l${order}`, slug, title, titleEn, durationMin, video_url: "", resources, lesson_order: order };
}

function q(
  course: string,
  n: number,
  question: string,
  a: string,
  b: string,
  c: string,
  d: string,
  correct: "A" | "B" | "C" | "D",
): QuizQuestion {
  return { id: `${course}-q${n}`, question, option_a: a, option_b: b, option_c: c, option_d: d, correct_answer: correct };
}

export const COURSES: Course[] = [
  {
    id: "course-ai-tools",
    slug: "ai-tools-freelancers",
    title: "ফ্রিল্যান্সারদের জন্য AI টুলস",
    titleEn: "AI Tools for Freelancers",
    description:
      "ChatGPT, Canva AI আর CapCut AI দিয়ে ক্লায়েন্টের কাজ দ্রুত, ভালোভাবে করার প্র্যাকটিক্যাল কোর্স। প্রতিটি লেসনে হাতে-কলমে উদাহরণ থাকবে।",
    level: "Beginner",
    levelBn: "বিগিনার",
    price: 0,
    is_free: true,
    gradient: "linear-gradient(135deg,#0f766e,#14b8a6 55%,#f59e0b)",
    initial: "এ",
    lessons: [
      lesson("ai", 1, "introduction", "পরিচিতি: AI দিয়ে ফ্রিল্যান্সিং শুরু", "Introduction", 8, ["কোর্স রোডম্যাপ (PDF — শিগগিরই)"]),
      lesson("ai", 2, "chatgpt-content-writing", "ChatGPT দিয়ে কনটেন্ট রাইটিং", "ChatGPT for Content Writing", 12, ["প্রম্পট চিটশিট (PDF — শিগগিরই)", "নমুনা আর্টিকেল ব্রিফ"]),
      lesson("ai", 3, "canva-ai-design", "Canva AI দিয়ে ডিজাইন", "Canva AI for Design", 10, ["Canva টেমপ্লেট গাইড (PDF — শিগগিরই)"]),
      lesson("ai", 4, "capcut-ai-video", "CapCut AI দিয়ে ভিডিও এডিটিং", "CapCut AI for Video Editing", 14, ["এডিটিং চেকলিস্ট (PDF — শিগগিরই)"]),
      lesson("ai", 5, "client-work-automation", "ক্লায়েন্টের কাজ অটোমেশন", "Client Work Automation", 12, ["অটোমেশন ওয়ার্কফ্লো নোট", "টুল তুলনা তালিকা"]),
      lesson("ai", 6, "final-review", "রিভিশন ও পরের ধাপ", "Final Review", 7, ["পরের কোর্সের সাজেশন"]),
    ],
    quiz: [
      q("ai", 1, "ChatGPT-কে ভালো আউটপুট দেওয়ার জন্য সবচেয়ে জরুরি কোনটি?", "লম্বা প্রশ্ন", "স্পষ্ট ও সুনির্দিষ্ট প্রম্পট", "বারবার একই প্রশ্ন", "ইংরেজিতে লেখা", "B"),
      q("ai", 2, "ক্লায়েন্টের কাজে AI ব্যবহারের সময় কোনটি অবশ্যই করতে হবে?", "আউটপুট যাচাই না করে পাঠানো", "আউটপুট যাচাই ও সম্পাদনা করা", "সোর্স লুকানো", "দাম বাড়ানো", "B"),
      q("ai", 3, "Canva AI মূলত কী কাজে ব্যবহার হয়?", "কোড লেখা", "দ্রুত ডিজাইন তৈরি", "ভিডিও রেন্ডার", "অ্যাকাউন্ট খোলা", "B"),
      q("ai", 4, "CapCut AI-এর একটি সাধারণ ব্যবহার কোনটি?", "অটো ক্যাপশন তৈরি", "ওয়েবসাইট হোস্টিং", "পেমেন্ট নেওয়া", "ইমেইল পাঠানো", "A"),
      q("ai", 5, "অটোমেশন দিয়ে ফ্রিল্যান্সার মূলত কী বাঁচায়?", "সময় ও পুনরাবৃত্তিমূলক কাজ", "ক্লায়েন্ট", "ইন্টারনেট", "পোর্টফোলিও", "A"),
    ],
  },
  {
    id: "course-youtube-automation",
    slug: "youtube-automation",
    title: "YouTube Automation",
    titleEn: "YouTube Automation",
    description:
      "নিজে ক্যামেরার সামনে না এসেও সিস্টেম দিয়ে ইউটিউব চ্যানেল চালানোর বাস্তব ধারণা — নিশ, কনটেন্ট সিস্টেম, টিম ও ধারাবাহিকতা।",
    level: "Beginner",
    levelBn: "বিগিনার",
    price: 0,
    is_free: true,
    gradient: "linear-gradient(135deg,#b91c1c,#ef4444 55%,#f59e0b)",
    initial: "ই",
    lessons: [
      lesson("yt", 1, "what-is-automation", "YouTube Automation আসলে কী?", "What Is Automation?", 9, ["নিশ বাছাই চেকলিস্ট (PDF — শিগগিরই)"]),
      lesson("yt", 2, "niche-research", "নিশ ও অডিয়েন্স রিসার্চ", "Niche Research", 11, ["রিসার্চ টেমপ্লেট"]),
      lesson("yt", 3, "content-system", "কনটেন্ট সিস্টেম ও স্ক্রিপ্ট", "Content System & Scripting", 13, ["স্ক্রিপ্ট টেমপ্লেট (PDF — শিগগিরই)"]),
      lesson("yt", 4, "voice-editing-workflow", "ভয়েস ও এডিটিং ওয়ার্কফ্লো", "Voice & Editing Workflow", 12, ["এডিটিং চেকলিস্ট"]),
      lesson("yt", 5, "publishing-seo", "পাবলিশ, টাইটেল ও SEO", "Publishing & SEO", 10, ["SEO চেকলিস্ট (PDF — শিগগিরই)"]),
      lesson("yt", 6, "consistency-monetization", "ধারাবাহিকতা ও মনিটাইজেশন ধারণা", "Consistency & Monetization", 8, ["৯০ দিনের প্ল্যান নোট"]),
    ],
    quiz: [
      q("yt", 1, "YouTube Automation-এর প্রথম ধাপ কোনটি?", "ভিডিও কেনা", "সঠিক নিশ বাছাই", "বিজ্ঞাপন দেওয়া", "লোগো বানানো", "B"),
      q("yt", 2, "ধারাবাহিক কনটেন্টের জন্য কী দরকার?", "একটি কনটেন্ট সিস্টেম", "দামি ক্যামেরা", "বড় টিম", "ভাইরাল ভাগ্য", "A"),
      q("yt", 3, "ভালো টাইটেলের কাজ কী?", "ক্লিক বাড়ানো ও বিষয় বোঝানো", "ভিডিও লম্বা করা", "সাবস্ক্রাইবার কেনা", "কমেন্ট বন্ধ করা", "A"),
      q("yt", 4, "স্ক্রিপ্ট কেন জরুরি?", "ভিডিও গোছানো ও স্পষ্ট থাকে", "ভিডিও ছোট হয়", "অ্যালগরিদম খুশি হয়", "এডিট লাগে না", "A"),
      q("yt", 5, "মনিটাইজেশনের আগে সবচেয়ে জরুরি কী?", "নিয়মিত ভালো কনটেন্ট", "বিজ্ঞাপন", "স্পনসর", "লাইভ করা", "A"),
    ],
  },
  {
    id: "course-capcut",
    slug: "capcut-video-editing",
    title: "CapCut ভিডিও এডিটিং",
    titleEn: "CapCut Video Editing",
    description:
      "মোবাইল ও কম্পিউটারে CapCut দিয়ে পরিষ্কার, প্রফেশনাল ভিডিও এডিটিং — কাট, ক্যাপশন, সাউন্ড ও এক্সপোর্ট পর্যন্ত।",
    level: "Beginner",
    levelBn: "বিগিনার",
    price: 0,
    is_free: true,
    gradient: "linear-gradient(135deg,#1e3a8a,#3b82f6 55%,#22d3ee)",
    initial: "ক",
    lessons: [
      lesson("cc", 1, "getting-started", "CapCut পরিচিতি ও সেটআপ", "Getting Started", 7, ["সেটআপ গাইড (PDF — শিগগিরই)"]),
      lesson("cc", 2, "cuts-timeline", "কাট ও টাইমলাইন বেসিক", "Cuts & Timeline", 12, ["শর্টকাট চিটশিট"]),
      lesson("cc", 3, "captions-text", "ক্যাপশন ও টেক্সট", "Captions & Text", 10, ["ক্যাপশন স্টাইল গাইড"]),
      lesson("cc", 4, "sound-music", "সাউন্ড ও মিউজিক", "Sound & Music", 9, ["সাউন্ড সোর্স তালিকা"]),
      lesson("cc", 5, "transitions-effects", "ট্রানজিশন ও এফেক্ট", "Transitions & Effects", 11, ["এফেক্ট চেকলিস্ট"]),
      lesson("cc", 6, "export-publish", "এক্সপোর্ট ও পাবলিশ সেটিং", "Export & Publish", 6, ["এক্সপোর্ট চেকলিস্ট (PDF — শিগগিরই)"]),
    ],
    quiz: [
      q("cc", 1, "টাইমলাইনে ক্লিপ ছোট-বড় করার কাজ কী?", "কাট/ট্রিম", "এক্সপোর্ট", "ফিল্টার", "শেয়ার", "A"),
      q("cc", 2, "ভিডিওতে ক্যাপশন কেন দেওয়া হয়?", "দর্শক সহজে বুঝতে পারে", "ভিডিও ভারী হয়", "সাউন্ড বাড়ে", "রঙ বদলায়", "A"),
      q("cc", 3, "এক্সপোর্টের আগে কী পরীক্ষা করা উচিত?", "রেজোলিউশন ও সাউন্ড", "শুধু নাম", "শুধু থাম্বনেইল", "কিছুই না", "A"),
      q("cc", 4, "বেশি এফেক্ট ব্যবহার করলে কী হয়?", "ভিডিও পরিষ্কার হয়", "মনোযোগ নষ্ট হতে পারে", "সাউন্ড ভালো হয়", "ফাইল ছোট হয়", "B"),
      q("cc", 5, "ভালো এডিটের মূল নীতি কোনটি?", "গল্প পরিষ্কার রাখা", "সব এফেক্ট ব্যবহার", "লম্বা ভিডিও", "দ্রুত কাট", "A"),
    ],
  },
  {
    id: "course-canva",
    slug: "canva-design",
    title: "Canva ডিজাইন",
    titleEn: "Canva Design",
    description:
      "ডিজাইনার না হয়েও Canva দিয়ে থাম্বনেইল, পোস্ট ও প্রেজেন্টেশন বানানোর প্র্যাকটিক্যাল কোর্স — লেআউট, রঙ ও ফন্টের বেসিকসহ।",
    level: "Beginner",
    levelBn: "বিগিনার",
    price: 0,
    is_free: true,
    gradient: "linear-gradient(135deg,#7c3aed,#a855f7 55%,#ec4899)",
    initial: "ক",
    lessons: [
      lesson("cv", 1, "canva-basics", "Canva পরিচিতি ও ক্যানভাস", "Canva Basics", 8, ["ক্যানভাস সাইজ গাইড"]),
      lesson("cv", 2, "layout-color", "লেআউট, রঙ ও ফন্ট", "Layout, Color & Fonts", 12, ["রঙের প্যালেট নোট (PDF — শিগগিরই)"]),
      lesson("cv", 3, "thumbnail-design", "ইউটিউব থাম্বনেইল ডিজাইন", "Thumbnail Design", 13, ["থাম্বনেইল চেকলিস্ট"]),
      lesson("cv", 4, "social-posts", "সোশ্যাল মিডিয়া পোস্ট", "Social Media Posts", 10, ["পোস্ট সাইজ গাইড"]),
      lesson("cv", 5, "presentation-export", "প্রেজেন্টেশন ও এক্সপোর্ট", "Presentation & Export", 9, ["এক্সপোর্ট চেকলিস্ট"]),
    ],
    quiz: [
      q("cv", 1, "ভালো ডিজাইনে সবচেয়ে জরুরি কোনটি?", "অনেক রঙ", "পরিষ্কার লেআউট", "অনেক ফন্ট", "বড় ছবি", "B"),
      q("cv", 2, "থাম্বনেইলে মূল বার্তা কেমন হওয়া উচিত?", "স্পষ্ট ও অল্প শব্দে", "অনেক লাইনে", "ছোট ফন্টে", "কোণায় লুকানো", "A"),
      q("cv", 3, "একটি ডিজাইনে কয়টি ফন্ট ব্যবহার ভালো?", "১–২টি", "৫–৬টি", "যত বেশি তত ভালো", "ফন্ট লাগে না", "A"),
      q("cv", 4, "রঙ বাছাইয়ের সময় কী খেয়াল রাখতে হয়?", "ব্র্যান্ড ও পাঠযোগ্যতা", "শুধু পছন্দ", "শুধু ট্রেন্ড", "শুধু উজ্জ্বলতা", "A"),
      q("cv", 5, "পোস্ট এক্সপোর্টের আগে কী দেখতে হয়?", "টেক্সট কাটা যাচ্ছে কি না", "শুধু ফাইল নাম", "শুধু সাইজ", "কিছুই না", "A"),
    ],
  },
  {
    id: "course-freelancing-basics",
    slug: "freelancing-basics",
    title: "ফ্রিল্যান্সিং বেসিকস",
    titleEn: "Freelancing Basics",
    description:
      "শূন্য থেকে ফ্রিল্যান্সিং শুরু — স্কিল বাছাই, প্রোফাইল, প্রথম ক্লায়েন্ট, দাম নির্ধারণ ও পেমেন্টের বাস্তব গাইড।",
    level: "Beginner",
    levelBn: "বিগিনার",
    price: 0,
    is_free: true,
    gradient: "linear-gradient(135deg,#065f46,#059669 55%,#f59e0b)",
    initial: "ফ",
    lessons: [
      lesson("fb", 1, "start-right", "শুরুটা সঠিকভাবে", "Starting Right", 9, ["স্কিল বাছাই চেকলিস্ট (PDF — শিগগিরই)"]),
      lesson("fb", 2, "profile-portfolio", "প্রোফাইল ও পোর্টফোলিও", "Profile & Portfolio", 12, ["পোর্টফোলিও টেমপ্লেট গাইড"]),
      lesson("fb", 3, "first-client", "প্রথম ক্লায়েন্ট পাওয়া", "Getting Your First Client", 11, ["প্রপোজাল টেমপ্লেট (PDF — শিগগিরই)"]),
      lesson("fb", 4, "pricing-communication", "দাম ও কমিউনিকেশন", "Pricing & Communication", 12, ["দাম নির্ধারণ নোট"]),
      lesson("fb", 5, "delivery-payment", "ডেলিভারি ও পেমেন্ট", "Delivery & Payment", 10, ["ডেলিভারি চেকলিস্ট"]),
      lesson("fb", 6, "grow-sustain", "টিকিয়ে রাখা ও বড় হওয়া", "Growing Sustainably", 8, ["মাসিক রুটিন নোট"]),
    ],
    quiz: [
      q("fb", 1, "ফ্রিল্যান্সিং শুরুর প্রথম ধাপ কোনটি?", "একটি চাহিদাসম্পন্ন স্কিল শেখা", "অফিস ভাড়া", "বিজ্ঞাপন", "লোগো", "A"),
      q("fb", 2, "পোর্টফোলিওতে কী থাকা উচিত?", "বাস্তব কাজের নমুনা", "শুধু সার্টিফিকেট", "শুধু ছবি", "শুধু বায়ো", "A"),
      q("fb", 3, "ক্লায়েন্টকে প্রপোজালে কী বোঝাতে হয়?", "তার সমস্যার সমাধান", "নিজের জীবনী", "নিজের দামি টুল", "নিজের শিডিউল", "A"),
      q("fb", 4, "দাম নির্ধারণে কী বিবেচনা করতে হয়?", "সময়, স্কিল ও মান", "শুধু প্রতিযোগী", "শুধু অনুমান", "শুধু ক্লায়েন্টের বাজেট", "A"),
      q("fb", 5, "দীর্ঘমেয়াদে টিকে থাকতে কী লাগে?", "ভালো কাজ ও যোগাযোগ", "কম দাম", "বেশি বিড", "দ্রুত ডেলিভারি", "A"),
    ],
  },
];

export const VIDEO_PLACEHOLDER =
  "ভিডিও শিগগিরই যুক্ত হবে — Admin থেকে YouTube Unlisted লিংক যোগ করুন";

/** Extract a YouTube video ID from watch / youtu.be / embed / shorts URLs. Returns null for anything else. */
export function youtubeIdFromUrl(url: string): string | null {
  const m =
    url.match(/[?&]v=([A-Za-z0-9_-]{6,})/) ||
    url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
    url.match(/embed\/([A-Za-z0-9_-]{6,})/) ||
    url.match(/shorts\/([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
