type UsersSummaryCardsProps = {
  users: Array<{
    role: string;
    status: string;
  }>;
};

export default function UsersSummaryCards({ users }: UsersSummaryCardsProps) {
  const totalUsers = users.length;
  const activeAccounts = users.filter((user) => user.status?.toLowerCase() === "active").length;
  const admins = users.filter((user) => user.role?.toLowerCase() === "admin").length;

  const cards = [
    { label: "Total Users", value: totalUsers.toString() },
    { label: "Active Accounts", value: activeAccounts.toString() },
    { label: "Admins", value: admins.toString() },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-[24px] border border-[#2A2A30] bg-[#111115] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.25)]"
        >
          <p className="text-sm text-gray-500">{card.label}</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">{card.value}</h3>
        </div>
      ))}
    </div>
  );
}
