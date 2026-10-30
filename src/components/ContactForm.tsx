"use client";
import { useFormState, useFormStatus } from "react-dom";
import { submitInquiry, type ContactState } from "@/app/actions/contact";
const init: ContactState = { ok: false, message: "" };
function Send() { const { pending } = useFormStatus();
  return <button disabled={pending} className="bg-forest text-paper px-6 py-3 hover:bg-olive transition-colors disabled:opacity-60">{pending ? "Sending" : "Send inquiry"}</button>; }
export default function ContactForm() {
  const [s, action] = useFormState(submitInquiry, init);
  const f = (n: string, label: string, type = "text") => (
    <label className="block"><span className="text-sm text-soil">{label}</span>
      <input name={n} type={type} required className="mt-1 w-full border border-sand bg-white px-3 py-2" />
      {s.errors?.[n] && <span role="alert" className="text-sm text-red-800">{s.errors[n]![0]}</span>}</label>);
  return (
    <form action={action} className="grid gap-4" noValidate>
      {f("name", "Full name")}{f("email", "Email", "email")}{f("phone", "Phone", "tel")}{f("subject", "Subject")}
      <label className="block"><span className="text-sm text-soil">Message</span>
        <textarea name="message" rows={5} required className="mt-1 w-full border border-sand bg-white px-3 py-2" />
        {s.errors?.message && <span role="alert" className="text-sm text-red-800">{s.errors.message[0]}</span>}</label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="t" value={Date.now() - 4000} />
      <Send />
      {s.message && <p role="status" className={s.ok ? "text-forest" : "text-red-800"}>{s.message}</p>}
    </form>);
}
