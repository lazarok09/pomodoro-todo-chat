import { useDataFromLocalStorage } from "hooks/useLocalStorage";
import React, { useEffect, useReducer, useState } from "react";
import { makeTodoItem } from "utils/factory/todoItem";
import { TodosContext } from "./context";

export const defaultTodosState = [makeTodoItem()];

type TodosProviderProps = {
  children: React.ReactNode;
};
export const addTodosOnLocalStorage = (todoList: TodoItemType[]) => {
  localStorage.setItem("todo-list", JSON.stringify(todoList));
};
export const TodosProvider = ({ children }: TodosProviderProps) => {
  const { data: todosFromLocalStorage } =
    useDataFromLocalStorage<TodoItemType[]>("todo-list");

  const [todos, setTodos] = useState(todosFromLocalStorage);

  useEffect(() => {
    // initialize 1 todo
    if (!Boolean(todos?.length)) {
      setTodos((todos) => [...todos, makeTodoItem()]);
    }
  }, [todosFromLocalStorage]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
