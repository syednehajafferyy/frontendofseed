import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const stats = await api.dashboard.getStats();
  const cards = [
    { label: "Total Products", value: stats.totalProducts },
    { label: "Published Products", value: stats.publishedProducts },
    { label: "Total Inquiries", value: stats.totalInquiries },
    { label: "Pending Inquiries", value: stats.pendingInquiries },
  ];

  return (
    <>
      <div className="flex items-center justify-between pb-4 border-b border-sand">
        <div>
          <h1 className="font-display text-3xl text-forest">Dashboard</h1>
          <p className="text-sm text-soil mt-1">Overview of your agricultural seed catalogue and customer inquiries.</p>
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-sand p-5">
            <dt className="text-sm text-soil">{c.label}</dt>
            <dd className="font-display text-3xl mt-1 text-forest">{c.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

