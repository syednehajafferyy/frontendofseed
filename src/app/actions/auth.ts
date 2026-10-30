"use server";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { setSessionToken, clearSessionToken } from "@/lib/auth";

export async function signIn(_: { error?: string }, fd: FormData) {
  const email = String(fd.get("email") ?? "").trim();
  const password = String(fd.get("password") ?? "");

  const result = await api.auth.login(email, password);
  if (!result.ok || !result.token) {
    return { error: result.error || "Email or password is incorrect." };
  }

  setSessionToken(result.token);
  redirect("/admin/dashboard");
}

export async function signOut() {
  await api.auth.logout();
  clearSessionToken();
  redirect("/admin/login");
}

