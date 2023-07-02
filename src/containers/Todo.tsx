import { TodosGroup } from "components/Todos";

import { makeTodoItem } from "../utils/factory/todoItem";
import React, { useState } from "react";

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const handleButtonDelete = (todoId: string) => {
    // deleteTodo
    const filteredTodos = todos.filter((todo) => todo.inputTextId !== todoId);
    setTodos(filteredTodos);
  };

  const handleCreateTodo = () => {
    // createTodo
    const newTodos = todos.map((todo) => {
      return { ...todo, ...makeTodoItem() };
    });
    setTodos(newTodos);
    // add to local storage
  };

  const handleInputTodoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;

    const mappedValues = todos.map((todo) => {
      if (todo.inputTextId === id) {
        return { ...todo, labelText: value };
      }
      return todo;
    });

    setTodos(mappedValues);
  };

  const handleInputTodoCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, checked } = event.target;

    const mappedValues = todos.map((todo) => {
      if (todo.checkBoxId === id) {
        return { ...todo, inputChecked: checked };
      }
      return todo;
    });

    setTodos(mappedValues);
  };

  return (
    <TodosGroup
      handleCreateTodo={handleCreateTodo}
      handleButtonDelete={handleButtonDelete}
      handleInputTodoChange={handleInputTodoChange}
      handleInputTodoCheckBox={handleInputTodoCheckBox}
      todoList={todos}
    />
  );
};

export default Todo;
