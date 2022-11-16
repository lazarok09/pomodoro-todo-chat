import { useEffect, useState } from "react";

export const useStorageTodoList = () => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const todoListStorage = JSON?.parse(
      localStorage?.getItem("todo-list") as string
    );
    if (Object?.keys(todoList) !== Object?.keys(todoListStorage)) {
      setTodoList(todoListStorage);
    }
  }, []);

  return { todoList, setTodoList };
};
