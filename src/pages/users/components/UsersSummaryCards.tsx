import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Crown,
  ShieldCheck,
  UserRoundCheck,
  UserRoundX,
  Users,
} from "lucide-react";

type UsersSummaryCardsProps = {
  users: Array<{
    role: string;
    status: string;
  }>;
};

export default function UsersSummaryCards({
  users,
}: UsersSummaryCardsProps) {
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status?.toLowerCase() === "active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status?.toLowerCase() === "inactive"
  ).length;

  const adminUsers = users.filter(
    (user) => user.role?.toLowerCase() === "admin"
  ).length;

  const activePercentage =
    totalUsers > 0
      ? Math.round((activeUsers / totalUsers) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {/* =====================================================
          TOTAL USERS
      ====================================================== */}
     <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.10] bg-white/[0.04] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:bg-lime-400/[0.08] hover:shadow-[0_20px_55px_rgba(163,230,53,0.12)]">

        {/* Glow */}
        <div className="absolute right-[-35px] top-[-35px] h-32 w-32 rounded-full bg-lime-400/10 blur-3xl transition-all duration-300 group-hover:bg-lime-400/15" />

        <div className="relative">

          {/* Icon + Badge */}
          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-lime-400/15">
              <Users className="h-5 w-5 text-lime-300" />
            </div>

            <div className="rounded-lg border border-lime-400/10 bg-lime-400/10 px-2 py-1 text-[10px] font-bold tracking-wider text-lime-300">
              TOTAL
            </div>

          </div>

          {/* Label */}
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Total Users
          </p>

          {/* Value */}
          <div className="mt-1 flex items-end justify-between">

            <h3 className="text-3xl font-bold tracking-tight text-black">
              {totalUsers}
            </h3>

            <ArrowUpRight className="mb-1 h-4 w-4 text-lime-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

          </div>

        </div>
      </div>

      {/* =====================================================
          ACTIVE ACCOUNTS
      ====================================================== */}
<div className="group relative overflow-hidden rounded-[24px] border border-white/[0.10] bg-white/[0.04] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-emerald-400/40 hover:bg-emerald-400/[0.08] hover:shadow-[0_22px_60px_rgba(52,211,153,0.14)]">
        {/* Glow */}
        <div className="absolute right-[-35px] top-[-35px] h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl transition-all duration-300 group-hover:bg-emerald-400/15" />

        <div className="relative">

          {/* Icon + Percentage */}
          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-400/15">
              <UserRoundCheck className="h-5 w-5 text-emerald-300" />
            </div>

            <div className="rounded-lg border border-emerald-400/10 bg-emerald-400/10 px-2 py-1 text-[10px] font-bold tracking-wider text-emerald-300">
              {activePercentage}%
            </div>

          </div>

          {/* Label */}
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Active Accounts
          </p>

          {/* Value */}
          <div className="mt-1 flex items-end justify-between">

            <h3 className="text-3xl font-bold tracking-tight text-black">
              {activeUsers}
            </h3>

            <CheckCircle2 className="mb-1 h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />

          </div>

        </div>
      </div>

      {/* =====================================================
          INACTIVE ACCOUNTS
      ====================================================== */}
<div className="group relative overflow-hidden rounded-[24px] border border-white/[0.10] bg-white/[0.04] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-orange-400/40 hover:bg-orange-400/[0.08] hover:shadow-[0_22px_60px_rgba(251,146,60,0.14)]">
        {/* Glow */}
        <div className="absolute right-[-35px] top-[-35px] h-32 w-32 rounded-full bg-orange-400/10 blur-3xl transition-all duration-300 group-hover:bg-orange-400/15" />

        <div className="relative">

          {/* Icon + Badge */}
          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-400/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-400/15">
              <UserRoundX className="h-5 w-5 text-orange-300" />
            </div>

            <div className="rounded-lg border border-orange-400/10 bg-orange-400/10 px-2 py-1 text-[10px] font-bold tracking-wider text-orange-300">
              INACTIVE
            </div>

          </div>

          {/* Label */}
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Inactive Accounts
          </p>

          {/* Value */}
          <div className="mt-1 flex items-end justify-between">

            <h3 className="text-3xl font-bold tracking-tight text-black">
              {inactiveUsers}
            </h3>

            <Activity className="mb-1 h-4 w-4 text-orange-400 transition-transform duration-300 group-hover:scale-110" />

          </div>

        </div>
      </div>

      {/* =====================================================
          ADMINISTRATORS
      ====================================================== */}
<div className="group relative overflow-hidden rounded-[24px] border border-white/[0.10] bg-white/[0.04] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-purple-400/40 hover:bg-purple-400/[0.08] hover:shadow-[0_22px_60px_rgba(192,132,252,0.14)]">
        {/* Glow */}
        <div className="absolute right-[-35px] top-[-35px] h-32 w-32 rounded-full bg-purple-400/10 blur-3xl transition-all duration-300 group-hover:bg-purple-400/15" />

        <div className="relative">

          {/* Icon + Badge */}
          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-purple-400/15">
              <Crown className="h-5 w-5 text-purple-300" />
            </div>

            <div className="rounded-lg border border-purple-400/10 bg-purple-400/10 px-2 py-1 text-[10px] font-bold tracking-wider text-purple-300">
              ADMIN
            </div>

          </div>

          {/* Label */}
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Administrators
          </p>

          {/* Value */}
          <div className="mt-1 flex items-end justify-between">

            <h3 className="text-3xl font-bold tracking-tight text-black">
              {adminUsers}
            </h3>

            <ShieldCheck className="mb-1 h-4 w-4 text-purple-400 transition-transform duration-300 group-hover:scale-110" />

          </div>

        </div>
      </div>

    </div>
  );
}