import React, { ChangeEvent, FormEvent, useState } from "react";
import { categories } from "../data/categoryDB";
import { useExpense } from "../hooks/useExpense";

export default function FilterByCategory() {
  const { state, dispatch } = useExpense();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "filter-ID", payload: { id: e.target.value } });
  };

  return (
    <div className="bg-white max-w-2xl mx-auto py-4 mb-8 px-4 rounded-xl shadow-xl">
      <form action="" className="flex">
        <label htmlFor="categoryFilter basis-2 ">Filtrar categoria</label>
        <select
          name="categoryFilter"
          id="categoryFilter"
          className="w-full bg-slate-200 p-2 rounded-lg"
          onChange={handleChange}
        >
          <option value="">-- Todas las categorias --</option>
          {categories.map((category) => (
            <option key={category.id} id={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
