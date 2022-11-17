import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const todoListStorage = JSON?.parse(
      localStorage?.getItem("todo-list") as string
    );

    setTodoList(todoListStorage);
  }, []);
  return { todoList, setTodoList };
};
