import { TodoType } from "components/Todo";
import { Todos } from "components/Todos";

import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const handleButtonDelete = (todoId: string) => {
    setTodoList((prevValues) =>
      prevValues?.filter((t) => t.checkBoxId !== todoId)
    );
  };

  const handleCreateTodo = () => {
    setTodoList((prevValues) => [
      ...prevValues,
      {
        checkBoxId: (prevValues.length + 1).toString(),
        inputTextId: ((prevValues.length + 1) * Math.random()).toString(),
        labelText: Math.random().toString(),
      },
    ]);
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
  };

  return (
    <div className={styles.container}>
      <Todos
        handleCreateTodo={handleCreateTodo}
        handleButtonDelete={handleButtonDelete}
        handleInputTodo={handleInputTodo}
        todoList={todoList}
      />
    </div>
  );
}
