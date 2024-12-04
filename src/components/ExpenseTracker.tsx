import { useMemo } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ExpenseDisplay from "./ExpenseDisplay";
import { useExpense } from "../hooks/useExpense";

export default function ExpenseTracker() {
  const { dispatch, budget, spentBudget, remainingBudget } = useExpense();

  const percentage = useMemo(
    () => (spentBudget / budget) * 100,
    [spentBudget, budget]
  ).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center max-w-4xl mx-auto bg-white p-4 shadow-xl">
      <div className="w-full flex justify-center items-center">
        <CircularProgressbar
          value={+percentage}
          text={`${+percentage}%`}
          styles={buildStyles({
            textColor: "#9333EA",
            pathColor: "#9333EA",
          })}
          strokeWidth={7}
          className="w-60"
        />
      </div>
      <div>
        <button
          type="button"
          className="text-white text-center font-bold uppercase w-full bg-purple-600 py-2 rounded-xl mb-6"
          onClick={() => dispatch({ type: "clear-expenses" })}
        >
          Resetear app
        </button>
        <div className="flex flex-col gap-4">
          <ExpenseDisplay label="Presupuesto" amount={budget} />
          <ExpenseDisplay label="Gastado" amount={spentBudget} />
          <ExpenseDisplay label="Total" amount={remainingBudget} />
        </div>
      </div>
    </div>
  );
}
