import { createContext } from "react";
import { TodoAction } from "./Todo";

type TodosContextProps = {
  todos: TodoItemType[];
  dispatch: React.Dispatch<TodoAction>;
};
export const TODOS_CONTEXT_STATE: TodosContextProps = {
  dispatch: () => {},
  todos: [],
};
export const TodosContext =
  createContext<TodosContextProps>(TODOS_CONTEXT_STATE);
