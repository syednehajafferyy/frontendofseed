import { api } from "@/lib/api";
import { setInquiryStatus, deleteInquiry } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

const statusList = ["PENDING", "READ", "RESOLVED"] as const;

export default async function Inquiries() {
  const list = await api.inquiries.getAll();

  return (
    <>
      <div className="pb-4 border-b border-sand">
        <h1 className="font-display text-3xl text-forest">Inquiries</h1>
        <p className="text-sm text-soil mt-1">Direct inquiries received through the website contact form.</p>
      </div>

      {list.length === 0 && <p className="mt-8 text-soil">No inquiries yet.</p>}

      <ul className="mt-6 grid gap-3">
        {list.map((q) => (
          <li key={q.id} className="bg-white border border-sand">
            <details>
              <summary className="p-4 cursor-pointer flex flex-wrap justify-between gap-2">
                <span>
                  <strong>{q.subject}</strong> from {q.name}
                </span>
                <span className="text-sm text-soil">
                  {q.status.toLowerCase()} • {new Date(q.createdAt).toLocaleDateString("en-GB")}
                </span>
              </summary>
              <div className="px-4 pb-4 grid gap-3 border-t border-sand/40 pt-3">
                <p className="whitespace-pre-line text-soil">{q.message}</p>
                <p className="text-sm text-soil">
                  Email: <a href={`mailto:${q.email}`} className="underline text-forest">{q.email}</a> • Phone: <a href={`tel:${q.phone}`} className="underline text-forest">{q.phone}</a>
                </p>
                <div className="flex flex-wrap gap-4 text-sm mt-2">
                  {statusList.map((s) => (
                    <form key={s} action={setInquiryStatus.bind(null, q.id, s)}>
                      <button
                        disabled={q.status === s}
                        className="underline text-soil hover:text-forest disabled:no-underline disabled:text-soil/40"
                      >
                        Mark {s.toLowerCase()}
                      </button>
                    </form>
                  ))}
                  <form action={deleteInquiry.bind(null, q.id)}>
                    <button className="underline text-red-800">Delete</button>
                  </form>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}

