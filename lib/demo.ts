// Demo-mode store: browser localStorage ONLY. No backend, no real auth.
// Real Supabase Auth + database is the v2 step (see supabase/schema.sql
// and README-SETUP-BN.md). Everything here is clearly labelled "demo".
"use client";

import type { Course } from "./data";
import { COURSES } from "./data";

export interface DemoUser {
  name: string;
  email: string;
}

export interface QuizResult {
  courseSlug: string;
  score: number;
  total: number;
  date: string;
}

const K = {
  user: "shikhi_user",
  users: "shikhi_users",
  enrollments: "shikhi_enrollments",
  progress: "shikhi_progress",
  quizResults: "shikhi_quiz_results",
  courses: "shikhi_courses",
  contact: "shikhi_contact_messages",
  admin: "shikhi_admin",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Tiny non-cryptographic hash for the DEMO password check only (never for real auth).
function demoHash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return String(h);
}

export function getUser(): DemoUser | null {
  return read<DemoUser | null>(K.user, null);
}

export function registerUser(name: string, email: string, password: string): DemoUser {
  const users = read<Record<string, { name: string; hash: string }>>(K.users, {});
  if (users[email]) throw new Error("এই ইমেইলে ইতিমধ্যে একটি ডেমো অ্যাকাউন্ট আছে। লগইন করুন।");
  users[email] = { name, hash: demoHash(password) };
  write(K.users, users);
  const user = { name, email };
  write(K.user, user);
  return user;
}

export function loginUser(email: string, password: string): DemoUser {
  const users = read<Record<string, { name: string; hash: string }>>(K.users, {});
  const found = users[email];
  if (!found || found.hash !== demoHash(password)) {
    throw new Error("ইমেইল বা পাসওয়ার্ড মেলেনি (ডেমো অ্যাকাউন্ট)।");
  }
  const user = { name: found.name, email };
  write(K.user, user);
  return user;
}

export function logoutUser() {
  if (typeof window !== "undefined") localStorage.removeItem(K.user);
}

export function getEnrollments(): string[] {
  return read<string[]>(K.enrollments, []);
}

export function enroll(slug: string) {
  const list = getEnrollments();
  if (!list.includes(slug)) write(K.enrollments, [...list, slug]);
}

export function getProgress(): Record<string, string[]> {
  return read<Record<string, string[]>>(K.progress, {});
}

export function markComplete(courseSlug: string, lessonSlug: string) {
  const p = getProgress();
  const list = p[courseSlug] || [];
  if (!list.includes(lessonSlug)) {
    p[courseSlug] = [...list, lessonSlug];
    write(K.progress, p);
  }
}

export function getQuizResults(): QuizResult[] {
  return read<QuizResult[]>(K.quizResults, []);
}

export function saveQuizResult(r: QuizResult) {
  write(K.quizResults, [...getQuizResults(), r]);
}

export function saveContactMessage(m: { name: string; email: string; message: string; date: string }) {
  const list = read<typeof m[]>(K.contact, []);
  write(K.contact, [...list, m]);
}

export function isAdmin(): boolean {
  return read<boolean>(K.admin, false);
}

export function setAdmin(v: boolean) {
  write(K.admin, v);
}

/** Courses merged with admin demo edits (localStorage overrides seed). */
export function getCourses(): Course[] {
  const custom = read<Course[] | null>(K.courses, null);
  return custom && custom.length > 0 ? custom : COURSES;
}

export function saveCourses(courses: Course[]) {
  write(K.courses, courses);
}

export function resetCourses() {
  if (typeof window !== "undefined") localStorage.removeItem(K.courses);
}
