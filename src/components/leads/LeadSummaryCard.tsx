interface LeadSummaryCardProps {
  title: string;
  amount: string | number;
  note: string;
}

const LeadSummaryCard = ({
  title,
  amount,
}: LeadSummaryCardProps) => {
  return (
    <div className="rounded-[28px] bg-white p-8 shadow-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
        {title}
      </p>

      <p className="mt-5 text-4xl font-semibold text-black">
        {amount}
      </p>


    </div>
  );
};

export default LeadSummaryCard;