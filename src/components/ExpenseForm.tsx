import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpenseType, Value } from "../types/type";
import { useExpense } from "../hooks/useExpense";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { categories } from "../data/categoryDB";
import ErrorMessage from "./ErrorMessage";

const initialState: DraftExpenseType = {
  expenseName: "",
  amount: 0,
  category: "",
  date: new Date(),
};

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpenseType>(initialState);
  const [error, setError] = useState<string>("");
  const { state, dispatch } = useExpense();

  useEffect(() => {
    if (state.editID) {
      const selectedExpense = state.expenses.find(
        (exp) => exp.id === state.editID
      );
      if (selectedExpense) {
        setExpense(selectedExpense);
      }
    }
  }, [state.editID, state.expenses]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumber = e.target.id === "amount";

    setExpense({
      ...expense,
      [e.target.id]: isNumber ? +e.target.value : e.target.value,
    });
  };

  const handleDateChange = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (expense.amount > state.budget) {
      setError("El monto ingresado supera su presupuesto");
      return;
    }

    if (state.editID) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editID, ...expense } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    setExpense(initialState);
    setError("");
  };

  return (
    <form
      action=""
      className="max-w-3xl bg-white rounded-xl"
      onSubmit={handleSubmit}
    >
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <legend className="text-xl font-bold text-center uppercase border-b-2 border-b-purple-600 pb-4 mb-6">
        {state.editID ? <>Editar gasto</> : <>Nuevo gasto</>}
      </legend>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="expenseName" className="font-bold">
            Nombre del gasto:
          </label>
          <input
            type="text"
            name="expenseName"
            id="expenseName"
            className="border-2 border-slate-200 p-2"
            value={expense.expenseName}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="amount" className="font-bold">
            Monto:
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="border-2 border-slate-200 p-2"
            value={expense.amount}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="category" className="font-bold">
            Categoría:
          </label>
          <select
            name="category"
            id="category"
            className="border-2 border-slate-200 p-2"
            value={expense.category}
            onChange={handleChange}
          >
            <option value="">-- Seleccione una categoría --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="">Fecha del gasto:</label>
          <DatePicker
            className="border-2 border-slate-200 p-2"
            value={expense.date}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="text-center text-white uppercase font-bold py-2 bg-purple-600 w-full mt-6"
      >
        {state.editID ? <>Guardar gasto</> : <>Agregar gasto</>}
      </button>
    </form>
  );
}
