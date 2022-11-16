import React, { useReducer } from "react";
import { makeTodoItem } from "utils/factory/todoItem";
import { TodosContext } from "./context";

export enum TodoActionsKind {
  CREATE_TODO = "CREATE_TODO",
  UPDATE_TODO = "UPDATE_TODO",
  DELETE_TODO = "DELETE_TODO",
  SET_TODOS = "SET_TODOS",
}
export type TodoAction = {
  type: TodoActionsKind;
  payload: typeof todoDefaultState[0];
  todoId?: TodoItemType["inputTextId"];
  newTodos?: TodoItemType[];
};

export const todoDefaultState = [makeTodoItem()];

function reducer(state: TodoItemType[], action: TodoAction) {
  const { payload, type, todoId, newTodos } = action;

  switch (type) {
    case TodoActionsKind.CREATE_TODO:
      return [
        ...state,
        {
          ...payload,
        },
      ];
    case TodoActionsKind.UPDATE_TODO:
      if (!todoId) throw new Error("need a todo id");
      return state.map((t) => {
        if (t.inputTextId === todoId) {
          return payload;
        }
        return {
          ...t,
        };
      });

    case TodoActionsKind.DELETE_TODO:
      if (!todoId) throw new Error("need a todo id");

      return state.filter((t) => t.checkBoxId !== todoId);

    case TodoActionsKind.SET_TODOS:
      if (!newTodos) throw new Error("need a newTodos");

      return newTodos;

    default:
      return state;
  }
}

type TodosProviderProps = {
  children: React.ReactNode;
};
export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, dispatch] = useReducer(reducer, todoDefaultState);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
