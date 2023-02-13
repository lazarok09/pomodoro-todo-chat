import React, { createContext } from "react";

type TodosContextProps = {
  todos: TodoItemType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
};
export const TODOS_CONTEXT_STATE: TodosContextProps = {
  setTodos: () => [],
  todos: [],
};
export const TodosContext =
  createContext<TodosContextProps>(TODOS_CONTEXT_STATE);
