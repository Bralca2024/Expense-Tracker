import React, { useMemo } from "react";
import { useExpense } from "../hooks/useExpense";
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
  const { state } = useExpense();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  const filteredCategory = state.filterID
    ? state.expenses.filter((expense) => expense.category === state.filterID)
    : state.expenses;

  const emptyFilteredCategory = useMemo(
    () => filteredCategory.length === 0,
    [filteredCategory]
  );

  return (
    <div className="max-w-2xl mx-auto pb-16">
      {isEmpty ? (
        <>
          <div className="bg-white w-full rounded-xl py-10 shadow-xl">
            <p className="text-xl text-center">No hay gastos</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {emptyFilteredCategory ? (
              <>
                <div className="bg-white w-full rounded-xl py-10 shadow-xl">
                  <p className="text-xl text-center">
                    No hay gastos en esta categoria
                  </p>
                </div>
              </>
            ) : (
              <>
                {filteredCategory.map((expense) => (
                  <ExpenseDetails key={expense.id} expense={expense} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
