import { createTodo, deleteTodo, updateTodo } from "actions/todo";
import { Todos } from "components/Todos";
import { TodosContext } from "context/todo/context";
import { addTodosOnLocalStorage } from "context/todo/Todo";

import React, { useContext } from "react";

export const Todo = () => {
  const { todos, dispatch } = useContext(TodosContext);

  const handleButtonDelete = (todoId: string) => {
    deleteTodo(todoId, dispatch);
    addTodosOnLocalStorage(todos);
  };

  const handleCreateTodo = () => {
    createTodo(dispatch);
    addTodosOnLocalStorage(todos);
  };

  const handleInputTodoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const todoTarget = todos?.find((t) => {
      return t?.inputTextId === event.target.id;
    });
    if (!todoTarget) return;
    updateTodo(event, todoTarget, dispatch);
    addTodosOnLocalStorage(todos);
  };

  return (
    <Todos
      handleCreateTodo={handleCreateTodo}
      handleButtonDelete={handleButtonDelete}
      handleInputTodo={handleInputTodoChange}
      todoList={todos}
    />
  );
};

export default Todo;
