import { useEffect, useMemo } from "react";
import { useExpense } from "./hooks/useExpense";
import ExpenseTracker from "./components/ExpenseTracker";
import BudgetForm from "./components/BudgetForm";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

function App() {
  const { state } = useExpense();

  const isEmpty = useMemo(() => state.budget === 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(state.budget));
  }, [state.budget]);

  return (
    <>
      <header className="max-w-2xl mx-auto pt-10">
        <h1 className="text-4xl text-center text-purple-600 font-bold border-b-2 border-b-purple-600 pb-8">
          Expense Tracker
        </h1>
      </header>

      <main className="max-w-2xl mx-auto py-10 px-6 md:px-2">
        {isEmpty ? <BudgetForm /> : <ExpenseTracker />}
      </main>

      <div className="max-w-3xl mx-auto px-6 md:px-2">
        {!isEmpty && (
          <>
            <FilterByCategory />
            <ExpenseList />
            <ExpenseModal />
          </>
        )}
      </div>
    </>
  );
}

export default App;
