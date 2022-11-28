import { useDataFromLocalStorage } from "hooks/useLocalStorage";
import React, { useEffect, useReducer, useState } from "react";
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
  payload: typeof defaultTodosState[0];
  todoId?: TodoItemType["inputTextId"];
  newTodos?: TodoItemType[];
};

export const defaultTodosState = [makeTodoItem()];

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
export const addTodosOnLocalStorage = (todoList: TodoItemType[]) => {
  localStorage.setItem("todo-list", JSON.stringify(todoList));
};
export const TodosProvider = ({ children }: TodosProviderProps) => {
  const { data: todoList } =
    useDataFromLocalStorage<TodoItemType[]>("todo-list");

  const [todos, dispatch] = useReducer(reducer, todoList);

  useEffect(() => {
    dispatch({
      type: TodoActionsKind.SET_TODOS,
      newTodos: todoList,
      payload: makeTodoItem(),
    });
  }, [todoList]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
