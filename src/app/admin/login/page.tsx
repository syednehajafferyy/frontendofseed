"use client";
import { useFormState } from "react-dom";
import { signIn } from "@/app/actions/auth";

export default function Login() {
  const [s, action] = useFormState(signIn, {} as { error?: string });
  return (
    <main className="min-h-screen grid place-items-center px-6">
      <form action={action} className="w-full max-w-sm grid gap-4 bg-white border border-sand p-8 shadow-sm">
        <h1 className="font-display text-2xl text-forest">Admin Sign In</h1>
        <p className="text-xs text-soil">Sign in to manage products, categories, and inquiries.</p>
        <label className="grid gap-1">
          <span className="text-xs text-soil">Email</span>
          <input name="email" type="email" required placeholder="admin@example.com" className="border border-sand px-3 py-2" />
        </label>
        <label className="grid gap-1">
          <span className="text-xs text-soil">Password</span>
          <input name="password" type="password" required placeholder="••••••••" className="border border-sand px-3 py-2" />
        </label>
        {s.error && <p role="alert" className="text-sm text-red-800">{s.error}</p>}
        <button className="bg-forest text-paper py-3 hover:bg-olive transition-colors mt-2">Sign In</button>
      </form>
    </main>
  );
}

