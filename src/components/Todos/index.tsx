import React from "react";
import { Todo, TodoType } from "../Todo";

import styles from "./Todos.module.scss";

export type TodosProps = {
  todoList: TodoType[];
  handleButtonDelete: (todoId: string) => void;
  handleInputTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateTodo: () => void;
};
export const Todos = ({
  todoList = [],
  handleButtonDelete,
  handleCreateTodo,
  handleInputTodo,
}: TodosProps) => {
  return (
    <section className={styles.todos}>
      {todoList.map((t) => (
        <Todo
          checkBoxId={t.checkBoxId}
          labelText={t.labelText}
          key={t.checkBoxId}
          handleButtonDelete={handleButtonDelete}
          handleInputTodo={handleInputTodo}
          inputTextId={t.inputTextId}
        />
      ))}
      <button
        onClick={handleCreateTodo}
        className={styles.todos__create_todo}
        title={`create todo`}
      >
        <img src={"/create.svg"} alt={`create new todo`} height={24} />
      </button>
    </section>
  );
};
