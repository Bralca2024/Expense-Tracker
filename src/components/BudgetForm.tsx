import { ChangeEvent, FormEvent, useState } from "react";
import { useExpense } from "../hooks/useExpense";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useExpense();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "add-budget", payload: { budget: budget } });

    setBudget(0);
  };

  const isValid = (): boolean => {
    return budget > 0;
  };
  return (
    <form
      action=""
      className="flex flex-col bg-white p-8 rounded-xl shadow-xl"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="budget"
        className="text-3xl text-center text-purple-600 font-bold mb-4"
      >
        Definir presupuesto
      </label>
      <input
        type="number"
        name="budget"
        id="budget"
        className="border-2 border-slate-200 p-1 mb-6"
        value={budget}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={`text-center font-bold text-white uppercase bg-purple-600 py-2 rounded-xl transition duration-300 ${
          isValid()
            ? "bg-purple-600 hover:bg-purple-600/80 cursor-pointer"
            : "bg-purple-600/80 cursor-not-allowed"
        }`}
        disabled={!isValid}
      >
        Agregar gasto
      </button>
    </form>
  );
}
