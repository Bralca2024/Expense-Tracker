import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import {
  ExpenseActions,
  expenseReducer,
  ExpenseState,
  initialState,
} from "../reducers/expenseReducer";

type ExpenseContextProps = {
  state: ExpenseState;
  dispatch: Dispatch<ExpenseActions>;
};

export const ExpenseContext = createContext<ExpenseContextProps>(null!);

export default function ExpenseProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
}
