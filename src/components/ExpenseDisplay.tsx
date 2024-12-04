import { formatNumber } from "../helpers";

type ExpenseDisplayProps = {
  label: string;
  amount: number;
};

export default function ExpenseDisplay({ label, amount }: ExpenseDisplayProps) {
  return (
    <div>
      <p className="text-2xl text-purple-600 font-bold">
        {label}: <span className="text-black">{formatNumber(+amount)}</span>
      </p>
    </div>
  );
}
