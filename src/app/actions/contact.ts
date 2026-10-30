"use server";
import { z } from "zod";
import { api } from "@/lib/api";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(150),
  phone: z.string().trim().regex(/^[+0-9\s-]{7,20}$/, "Enter a valid phone number"),
  subject: z.string().trim().min(3, "Subject is required").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactState = { ok: boolean; message: string; errors?: Record<string, string[]> };

const recent = new Map<string, number>();

export async function submitInquiry(_: ContactState, fd: FormData): Promise<ContactState> {
  if (fd.get("website")) return { ok: true, message: "Thank you. We will be in touch." }; // honeypot
  const started = Number(fd.get("t"));
  if (!started || Date.now() - started < 3000) {
    return { ok: false, message: "Please take a moment to complete the form." };
  }
  const rawData = {
    name: fd.get("name"),
    email: fd.get("email"),
    phone: fd.get("phone"),
    subject: fd.get("subject"),
    message: fd.get("message"),
  };
  const parsed = schema.safeParse(rawData);
  if (!parsed.success) {
    return { ok: false, message: "Please correct the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }
  const key = parsed.data.email;
  if (Date.now() - (recent.get(key) ?? 0) < 30000) {
    return { ok: false, message: "Please wait before sending another inquiry." };
  }
  recent.set(key, Date.now());

  try {
    await api.inquiries.submit(parsed.data);
    return { ok: true, message: "Thank you. Your inquiry has been received." };
  } catch {
    return { ok: false, message: "Could not send inquiry. Please call or WhatsApp us." };
  }
}
