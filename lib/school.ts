// Shikhi — FREE school track, Classes 4–10.
// LEARNING STRUCTURE / OUTLINE ONLY: generic topic names written for this
// platform. This is NOT the official NCTB textbook chapter list and is NOT
// claimed to be the official syllabus. Full lessons, videos and quizzes are
// added step by step; every class, subject and chapter below is FREE.
// No video URLs, no teachers and no prices are invented here.

export interface SchoolSubject {
  slug: string;
  title: string;
  titleEn: string;
  chapters: string[];
}

export interface SchoolClass {
  classNo: number;
  stage: string;
  stageBn: string;
  subjects: SchoolSubject[];
}

function subj(slug: string, title: string, titleEn: string, chapters: string[]): SchoolSubject {
  return { slug, title, titleEn, chapters };
}

const BANG  = (ch: string[]) => subj("bangla", "বাংলা", "Bangla", ch);
const ENG   = (ch: string[]) => subj("english", "ইংরেজি", "English", ch);
const MATH  = (ch: string[]) => subj("mathematics", "গণিত", "Mathematics", ch);
const SCI   = (ch: string[]) => subj("science", "বিজ্ঞান", "Science", ch);
const BWS   = (ch: string[]) => subj("bangladesh-world-studies", "বাংলাদেশ ও বিশ্বপরিচয়", "Bangladesh & World Studies", ch);
const BGS   = (ch: string[]) => subj("bangladesh-global-studies", "বাংলাদেশ ও বিশ্বপরিচয়", "Bangladesh & Global Studies", ch);
const ICT   = (ch: string[]) => subj("ict", "তথ্য ও যোগাযোগ প্রযুক্তি", "ICT", ch);
const REL   = (ch: string[]) => subj("religion-moral-education", "ধর্ম ও নৈতিক শিক্ষা", "Religion & Moral Education", ch);

export const SCHOOL_CLASSES: SchoolClass[] = [
  {
    classNo: 4, stage: "Primary", stageBn: "প্রাথমিক",
    subjects: [
      BANG(["বর্ণ ও শব্দ", "বাক্য গঠন", "পড়া ও বোঝা", "লেখার অনুশীলন", "গল্প ও কবিতা পরিচিতি"]),
      ENG(["বর্ণ ও ধ্বনি", "সহজ শব্দ", "দৈনন্দিন বাক্য", "ছোট অনুচ্ছেদ পড়া", "বেসিক লেখা"]),
      MATH(["সংখ্যা ও গণনা", "যোগ ও বিয়োগ", "গুণ ও ভাগের ধারণা", "ভগ্নাংশের পরিচিতি", "জ্যামিতির মৌলিক আকৃতি", "পরিমাপের ধারণা"]),
      SCI(["আমাদের চারপাশ", "জীব ও জড়", "পানি ও বায়ু", "উদ্ভিদ ও প্রাণী", "আলো ও শব্দের ধারণা"]),
      BWS(["আমার পরিবার ও সমাজ", "বাংলাদেশের পরিচিতি", "মানচিত্রের ধারণা", "পরিবেশ ও পরিচ্ছন্নতা", "ভালো অভ্যাস"]),
    ],
  },
  {
    classNo: 5, stage: "Primary", stageBn: "প্রাথমিক",
    subjects: [
      BANG(["বাক্য ও অনুচ্ছেদ", "শব্দভাণ্ডার", "পড়ার দক্ষতা", "চিঠি ও আবেদন লেখা", "গল্প বিশ্লেষণ"]),
      ENG(["বাক্যের ধরন", "শব্দভাণ্ডার বাড়ানো", "পড়ে বোঝা", "সহজ অনুচ্ছেদ লেখা", "কথা বলার অনুশীলন"]),
      MATH(["বড় সংখ্যা", "ভগ্নাংশ ও দশমিক", "গড় ও অনুপাতের ধারণা", "ক্ষেত্রফল ও পরিমিতি", "তথ্য ও চার্ট"]),
      SCI(["বল ও গতি", "তাপ ও আলো", "মাটি ও পানি", "মানবদেহের ধারণা", "পরিবেশ সংরক্ষণ"]),
      BWS(["বাংলাদেশের ইতিহাসের ধারণা", "অর্থনীতি ও পেশা", "নাগরিক দায়িত্ব", "প্রাকৃতিক সম্পদ", "বিশ্বের পরিচিতি"]),
    ],
  },
  {
    classNo: 6, stage: "Junior Secondary", stageBn: "নিম্ন মাধ্যমিক",
    subjects: [
      BANG(["ব্যাকরণের ধারণা", "অনুচ্ছেদ ও রচনা", "পড়া ও বিশ্লেষণ", "সারাংশ লেখা", "সাহিত্য পরিচিতি"]),
      ENG(["Grammar basics", "Reading passages", "Vocabulary in use", "Paragraph writing", "Speaking and listening"]),
      MATH(["সংখ্যা পদ্ধতি", "ভগ্নাংশ ও দশমিক", "বীজগণিতের পরিচিতি", "জ্যামিতি", "অনুপাত ও শতকরা", "তথ্য ও চার্ট"]),
      SCI(["পদার্থ ও শক্তি", "জীবজগৎ", "পৃথিবী ও পরিবেশ", "আলো ও শব্দ", "রাসায়নিক পরিবর্তনের ধারণা", "বৈজ্ঞানিক অনুসন্ধান"]),
      ICT(["কম্পিউটার পরিচিতি", "হার্ডওয়্যার ও সফটওয়্যার", "ইন্টারনেটের ধারণা", "নিরাপদ ব্যবহার"]),
      BGS(["বাংলাদেশের ভূগোল", "ইতিহাসের ধারাবাহিকতা", "অর্থনীতি", "নাগরিকত্ব", "বিশ্বপরিচিতি"]),
      REL(["নৈতিক মূল্যবোধ", "ধর্মীয় শিক্ষার ধারণা", "সহনশীলতা", "ভালো আচরণ"]),
    ],
  },
  {
    classNo: 7, stage: "Junior Secondary", stageBn: "নিম্ন মাধ্যমিক",
    subjects: [
      BANG(["ব্যাকরণ প্রয়োগ", "রচনা ও প্রতিবেদন", "সাহিত্য বিশ্লেষণ", "সারমর্ম", "ভাষার ব্যবহার"]),
      ENG(["Grammar in use", "Comprehension", "Writing letters and emails", "Vocabulary expansion", "Presentation practice"]),
      MATH(["পূর্ণসংখ্যা ও ভগ্নাংশ", "বীজগাণিতিক রাশি", "সমীকরণের ধারণা", "জ্যামিতি ও কোণ", "পরিমিতি", "সম্ভাব্যতার ধারণা"]),
      SCI(["বল ও চাপ", "তাপ ও তাপমাত্রা", "জীবকোষের ধারণা", "উদ্ভিদের পুষ্টি", "পরিবেশ ও বাস্তুতন্ত্র", "রাসায়নিক বিক্রিয়া"]),
      ICT(["কম্পিউটার নেটওয়ার্কের ধারণা", "সফটওয়্যার ব্যবহার", "তথ্য সংরক্ষণ", "ইন্টারনেট নিরাপত্তা", "প্রেজেন্টেশন তৈরি"]),
      BGS(["রাষ্ট্র ও সরকার", "অর্থনৈতিক কার্যক্রম", "জনসংখ্যা ও পরিবেশ", "ইতিহাস ও সংস্কৃতি", "বৈশ্বিক যোগাযোগ"]),
      REL(["নৈতিক শিক্ষা", "ধর্মীয় মূল্যবোধ", "মানবিক গুণাবলি", "সমাজে ভালো আচরণ"]),
    ],
  },
  {
    classNo: 8, stage: "Junior Secondary", stageBn: "নিম্ন মাধ্যমিক",
    subjects: [
      BANG(["ব্যাকরণ ও প্রয়োগ", "প্রবন্ধ ও রচনা", "সাহিত্য পাঠ", "সারাংশ ও ভাবসম্প্রসারণ", "মিডিয়া ও ভাষা"]),
      ENG(["Advanced grammar", "Reading and analysis", "Essay writing", "Formal letters", "Speaking fluently"]),
      MATH(["বাস্তব সংখ্যা", "বীজগণিত", "জ্যামিতিক উপপাদ্যের ধারণা", "ত্রিকোণমিতির পরিচিতি", "পরিসংখ্যান", "লাভ-ক্ষতি ও সুদ"]),
      SCI(["গতি ও বল", "শব্দ ও আলো", "রাসায়নিক পদার্থ", "জীববিজ্ঞানের ভিত্তি", "পৃথিবী ও মহাকাশ", "পরিবেশ দূষণ ও প্রতিকার"]),
      ICT(["ডেটা ও তথ্য ব্যবস্থাপনা", "প্রোগ্রামিংয়ের ধারণা", "নেটওয়ার্ক ও ইন্টারনেট", "ডিজিটাল নিরাপত্তা", "মাল্টিমিডিয়া"]),
      BGS(["বাংলাদেশের অর্থনীতি", "রাজনৈতিক ব্যবস্থা", "জনসংখ্যা ও উন্নয়ন", "আন্তর্জাতিক সম্পর্ক", "টেকসই উন্নয়ন"]),
      REL(["নৈতিকতা ও জীবন", "ধর্মীয় শিক্ষা ও চর্চা", "সহমর্মিতা", "সামাজিক দায়িত্ব"]),
    ],
  },
  {
    classNo: 9, stage: "Secondary", stageBn: "মাধ্যমিক (SSC)",
    subjects: [
      BANG(["ব্যাকরণ", "গদ্য ও পদ্য বিশ্লেষণ", "রচনা", "সারাংশ ও প্রতিবেদন", "ভাষা ও সাহিত্য"]),
      ENG(["Grammar and usage", "Reading comprehension", "Writing essays and reports", "Vocabulary and phrases", "Speaking and listening skills"]),
      MATH(["সেট ও ফাংশন", "বীজগাণিতিক রাশি ও সূত্র", "জ্যামিতি", "ত্রিকোণমিতি", "পরিসংখ্যান ও সম্ভাব্যতা", "সূচক ও লগারিদমের ধারণা"]),
      subj("higher-mathematics", "উচ্চতর গণিত", "Higher Mathematics", ["বহুপদী", "জ্যামিতিক স্থানাঙ্ক", "ত্রিকোণমিতিক অনুপাত", "সীমা ও ধারাবাহিকতার ধারণা", "সম্ভাব্যতা"]),
      subj("physics", "পদার্থবিজ্ঞান", "Physics", ["গতি", "বল", "কাজ ও শক্তি", "চাপ", "আলো", "তড়িৎ ধারণা"]),
      subj("chemistry", "রসায়ন", "Chemistry", ["পদার্থের গঠন", "পর্যায় সারণির ধারণা", "রাসায়নিক বন্ধন", "অম্ল-ক্ষারক", "জৈব রসায়নের পরিচিতি", "রাসায়নিক বিক্রিয়া"]),
      subj("biology", "জীববিজ্ঞান", "Biology", ["জীবকোষ", "জীবের শ্রেণিবিন্যাস", "উদ্ভিদের শারীরতত্ত্ব", "প্রাণীর শারীরতত্ত্ব", "বংশগতি", "পরিবেশ ও বাস্তুতন্ত্র"]),
      ICT(["কম্পিউটার সিস্টেম", "ডেটাবেজের ধারণা", "প্রোগ্রামিং ভাষা", "ইন্টারনেট ও ওয়েব", "ডিজিটাল নিরাপত্তা ও নৈতিকতা"]),
      BGS(["বাংলাদেশের ইতিহাস", "অর্থনীতি ও উন্নয়ন", "নাগরিক অধিকার", "বৈশ্বিক রাজনীতি", "জলবায়ু ও পরিবেশ"]),
      REL(["নৈতিক শিক্ষা", "ধর্মীয় দর্শন", "মানবিক মূল্যবোধ", "সামাজিক শান্তি"]),
    ],
  },
  {
    classNo: 10, stage: "Secondary", stageBn: "মাধ্যমিক (SSC)",
    subjects: [
      BANG(["উন্নত ব্যাকরণ", "সাহিত্য সমালোচনা", "রচনা ও প্রবন্ধ", "সারমর্ম ও অনুবাদ ধারণা", "পরীক্ষা প্রস্তুতি"]),
      ENG(["Exam-focused grammar", "Comprehension strategies", "Essay and report writing", "Vocabulary mastery", "Revision and practice"]),
      MATH(["বীজগণিতের প্রয়োগ", "জ্যামিতি ও পরিমিতি", "ত্রিকোণমিতি", "পরিসংখ্যান", "সমীকরণ ও অসমতা", "সেট ও ফাংশনের প্রয়োগ"]),
      subj("higher-mathematics", "উচ্চতর গণিত", "Higher Mathematics", ["বহুপদী ও সমীকরণ", "স্থানাঙ্ক জ্যামিতি", "ত্রিকোণমিতি", "অন্তরীকরণের ধারণা", "সমাকলনের ধারণা", "সম্ভাব্যতা"]),
      subj("physics", "পদার্থবিজ্ঞান", "Physics", ["গতিবিদ্যা", "বল ও ভরবেগ", "শক্তি ও ক্ষমতা", "তরঙ্গ ও শব্দ", "আলোকবিজ্ঞান", "তড়িৎ ও চুম্বক"]),
      subj("chemistry", "রসায়ন", "Chemistry", ["পরমাণু ও অণু", "রাসায়নিক গণনা", "অম্ল-ক্ষার ও লবণ", "ধাতু ও অধাতু", "জৈব যৌগ", "পরিবেশ রসায়ন"]),
      subj("biology", "জীববিজ্ঞান", "Biology", ["কোষ বিভাজন", "উদ্ভিদ প্রজনন", "প্রাণী প্রজনন", "বংশগতিবিদ্যা", "রোগ ও প্রতিরোধ", "জীববৈচিত্র্য"]),
      ICT(["প্রোগ্রামিং অনুশীলন", "ডেটাবেজ প্রয়োগ", "ওয়েবের ধারণা", "সাইবার নিরাপত্তা", "প্রজেক্ট কাজ"]),
      BGS(["স্বাধীনতা ও মুক্তিযুদ্ধের ধারণা", "অর্থনৈতিক পরিকল্পনা", "গণতন্ত্র ও নাগরিকত্ব", "বৈশ্বিক চ্যালেঞ্জ", "টেকসই ভবিষ্যৎ"]),
      REL(["নৈতিকতা ও চরিত্র", "ধর্মীয় শিক্ষার প্রয়োগ", "শান্তি ও সহাবস্থান", "সামাজিক দায়বদ্ধতা"]),
    ],
  },
];

export function getSchoolClass(n: number): SchoolClass | undefined {
  return SCHOOL_CLASSES.find((c) => c.classNo === n);
}

export function getSchoolSubject(classNo: number, subjectSlug: string): SchoolSubject | undefined {
  return getSchoolClass(classNo)?.subjects.find((s) => s.slug === subjectSlug);
}

export const SCHOOL_VIDEO_PLACEHOLDER =
  "ভিডিও শিগগিরই যুক্ত হবে — Admin থেকে YouTube Unlisted লিংক যোগ করুন";

export const SCHOOL_OUTLINE_NOTE =
  "এটি একটি শেখার কাঠামো / আউটলাইন মাত্র — অফিসিয়াল পাঠ্যপুস্তকের অধ্যায় তালিকা নয়।";
