export type ExpenseType = {
  id: string;
  expenseName: string;
  amount: number;
  category: string;
  date: Value;
};

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type DraftExpenseType = Omit<ExpenseType, "id">;

export type CategoryType = {
  id: string;
  name: string;
  icon: string;
};
