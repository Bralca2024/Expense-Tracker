import { DraftExpenseType, ExpenseType } from "../types/type";
import { v4 as uuid } from "uuid";

export type ExpenseActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "add-expense"; payload: { expense: DraftExpenseType } }
  | { type: "open-modal" }
  | { type: "close-modal" }
  | { type: "edit-ID"; payload: { id: ExpenseType["id"] } }
  | { type: "filter-ID"; payload: { id: ExpenseType["id"] } }
  | { type: "delete-expense"; payload: { id: ExpenseType["id"] } }
  | { type: "update-expense"; payload: { expense: ExpenseType } }
  | { type: "clear-expenses" };

export type ExpenseState = {
  expenses: ExpenseType[];
  budget: number;
  editID: string;
  filterID: string;
  modal: boolean;
};

const initialBudget = () => {
  const budgetStorage = localStorage.getItem("budget");
  return budgetStorage ? JSON.parse(budgetStorage) : 0;
};

const localStorageExpense = (): ExpenseType[] => {
  const expensesStorage = localStorage.getItem("expenses");
  return expensesStorage ? JSON.parse(expensesStorage) : [];
};

export const initialState: ExpenseState = {
  expenses: localStorageExpense(),
  budget: initialBudget(),
  editID: "",
  filterID: "",
  modal: false,
};

const createExpense = (draftExpense: DraftExpenseType): ExpenseType => {
  return {
    ...draftExpense,
    id: uuid(),
  };
};

export const expenseReducer = (
  state: ExpenseState = initialState,
  action: ExpenseActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "open-modal") {
    return {
      ...state,
      editID: "",
      modal: true,
    };
  }

  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
    };
  }

  if (action.type === "add-expense") {
    const newExpense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
      modal: false,
    };
  }

  if (action.type === "edit-ID") {
    return {
      ...state,
      editID: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "filter-ID") {
    return {
      ...state,
      filterID: action.payload.id,
    };
  }

  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === state.editID ? action.payload.expense : expense
      ),
      modal: false,
      editID: "",
    };
  }

  if (action.type === "delete-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }

  if (action.type === "clear-expenses") {
    return {
      expenses: [],
      budget: 0,
      editID: "",
      filterID: "",
      modal: false,
    };
  }

  return state;
};
