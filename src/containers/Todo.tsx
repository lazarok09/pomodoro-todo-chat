import { TodoItemType } from "components/TodoItem";
import { Todos } from "components/Todos";
import React, { useCallback, useEffect, useState } from "react";
import { makeTodoItem } from "utils/factory/todoItem";

export const Todo = () => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const todoListStorage = JSON?.parse(
      localStorage?.getItem("todo-list") as string
    );
    if (Object.keys(todoList) !== Object.keys(todoListStorage)) {
      setTodoList(todoListStorage);
    }
  }, []);

  const handleButtonDelete = (todoId: string) => {
    setTodoList((prevValues) => {
      const filteredValues = prevValues?.filter((t) => t.checkBoxId !== todoId);
      addTodosOnLocalStorage(filteredValues);
      return filteredValues;
    });
  };

  const handleCreateTodo = () => {
    const todo = makeTodoItem();

    setTodoList((prevValues) => {
      const mappedValues = [...prevValues, todo];
      addTodosOnLocalStorage(mappedValues);
      return mappedValues;
    });
  };

  const addTodosOnLocalStorage = (todoList: TodoItemType[]) => {
    localStorage.setItem("todo-list", JSON.stringify(todoList));
  };

  const handleInputTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTextValue = event.target.value;
    const inputId = event.target.id;

    const newTodoList = todoList.map((t) => {
      if (t.inputTextId === inputId) {
        return {
          ...t,
          labelText: inputTextValue,
        };
      }
      return {
        ...t,
      };
    });
    setTodoList(newTodoList);
    addTodosOnLocalStorage(newTodoList);
  };

  return (
    <Todos
      handleCreateTodo={handleCreateTodo}
      handleButtonDelete={handleButtonDelete}
      handleInputTodo={handleInputTodo}
      todoList={todoList}
    />
  );
};

export default Todo;
