import { cookies } from "next/headers";

const COOKIE = "zsc_session";

export function getSessionToken(): string | null {
  try {
    return cookies().get(COOKIE)?.value ?? null;
  } catch {
    return null;
  }
}

export function setSessionToken(token: string) {
  try {
    cookies().set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
  } catch {
    // handled in server actions
  }
}

export function clearSessionToken() {
  try {
    cookies().delete(COOKIE);
  } catch {
    // handled in server actions
  }
}

export async function getAdminId(): Promise<string | null> {
  const token = getSessionToken();
  if (!token) return null;
  return "admin";
}

