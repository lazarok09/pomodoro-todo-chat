import { createTodo, deleteTodo, updateTodo } from "actions/todo";
import { Todos } from "components/Todos";
import { TodosContext } from "context/todo/context";
import { TodoActionsKind, todoDefaultState } from "context/todo/Todo";

import React, { useContext } from "react";
import { makeTodoItem } from "utils/factory/todoItem";

export const Todo = () => {
  const { todos, dispatch } = useContext(TodosContext);

  const handleButtonDelete = (todoId: string) => {
    deleteTodo(todoId, dispatch);
    // addTodosOnLocalStorage(filteredValues);
  };

  const handleCreateTodo = () => {
    createTodo(dispatch);
  };

  const addTodosOnLocalStorage = (todoList: TodoItemType[]) => {
    localStorage.setItem("todo-list", JSON.stringify(todoList));
  };

  const handleInputTodoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const todoTarget = todos?.find((t) => {
      return t?.inputTextId === event.target.id;
    });
    if (!todoTarget) return;
    updateTodo(event, todoTarget, dispatch);

    // addTodosOnLocalStorage(newTodoList);
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
