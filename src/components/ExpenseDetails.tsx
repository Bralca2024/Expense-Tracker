import React, { useMemo } from "react";
import { ExpenseType } from "../types/type";
import { formatDate, formatNumber } from "../helpers";
import { categories } from "../data/categoryDB";

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useExpense } from "../hooks/useExpense";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

type ExpenseDetailsProps = {
  expense: ExpenseType;
};

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  const { id, expenseName, amount, category, date } = expense;

  const { state, dispatch } = useExpense();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({ type: "edit-ID", payload: { id: id } })}
      >
        <div className="flex flex-col items-center justify-center font-bold bg-green-600 text-white uppercase">
          <PencilSquareIcon className="h-12 w-12" />
          <span className="block">Edit</span>
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          dispatch({ type: "delete-expense", payload: { id: id } })
        }
      >
        <div className="flex flex-col items-center justify-center font-bold bg-red-600 text-white uppercase">
          <TrashIcon className="h-12 w-12" />
          <span className="block">Delete</span>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  const categoryInfo = useMemo(
    () => categories.filter((item) => item.id === category),
    [expense]
  )[0];

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="flex items-center w-full bg-white shadow-xl rounded-xl justify-between p-4">
          <div className="flex gap-4">
            <img
              src={`img/icono_${categoryInfo.icon}.svg`}
              alt=""
              className="w-16 md:w-20"
            />
            <div>
              <h3 className="text-lg mb-2">{categoryInfo.name}</h3>
              <p className="text-md md:text-lg font-bold mb-2">{expenseName}</p>
              <p className="text-md md:text-xl font-bold">
                {formatDate(date!.toString())}
              </p>
            </div>
          </div>
          <div>
            <p className="font-extrabold text-xl">{formatNumber(+amount)}</p>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
