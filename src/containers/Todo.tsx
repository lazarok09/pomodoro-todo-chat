import { TodosGroup } from "components/Todos";
import { TodosContext } from "context/todo/context";
import { addTodosOnLocalStorage } from "context/todo/Todo";
import { makeTodoItem } from "../utils/factory/todoItem";
import React, { useContext } from "react";

export const Todo = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleButtonDelete = (todoId: string) => {
    // deleteTodo
    const filteredTodos = todos.filter((todo) => todo.inputTextId !== todoId);
    setTodos(filteredTodos);
    addTodosOnLocalStorage(filteredTodos);
  };

  const handleCreateTodo = () => {
    // createTodo
    const newTodos = todos.map((todo) => {
      console.log("🚀 ~ file: Todo.tsx:22 ~ newTodos ~ todo", todo);
      return { ...todo, ...makeTodoItem() };
    });
    setTodos(newTodos);
    // add to local storage
    addTodosOnLocalStorage(newTodos);
  };
  console.log("🚀 ~ file: Todo.tsx:20 ~ handleCreateTodo ~ todos", todos);

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
