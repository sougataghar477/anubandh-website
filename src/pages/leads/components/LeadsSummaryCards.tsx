const SUMMARY_CARDS = [
  {
    title: "Total Leads",
    amount: "1,248",
    note: "+12% this month",
    badgeClass: "text-emerald-300",
  },
  {
    title: "Active Leads",
    amount: "912",
    note: "73% of pipeline",
    badgeClass: "text-sky-300",
  },
  {
    title: "New Leads",
    amount: "314",
    note: "26 added this week",
    badgeClass: "text-amber-300",
  },
  {
    title: "Pipeline Value",
    amount: "$124.8k",
    note: "Estimated revenue",
    badgeClass: "text-lime-primary",
  },
];

export default function LeadsSummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {SUMMARY_CARDS.map((card) => (
        <div
          key={card.title}
          className="rounded-[28px] border border-[#2A2A30] bg-[#16161A] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            {card.title}
          </p>
          <p className="mt-5 text-4xl font-semibold text-white">{card.amount}</p>
          <span className={`mt-3 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold ${card.badgeClass}`}>
            {card.note}
          </span>
        </div>
      ))}
    </div>
  );
}
