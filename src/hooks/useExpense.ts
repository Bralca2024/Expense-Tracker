import { useContext, useMemo } from "react";
import { ExpenseContext } from "../context/expenseContext";

export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useBudget must be used within BudgetProvider");
  }
  const { state } = context;

  const budget = useMemo(() => state.budget, [state.budget]);

  const spentBudget = useMemo(
    () => state.expenses.reduce((acc, curr) => acc + curr.amount, 0),
    [state.expenses]
  );

  const remainingBudget = budget - spentBudget;

  return { ...context, budget, spentBudget, remainingBudget };
}
