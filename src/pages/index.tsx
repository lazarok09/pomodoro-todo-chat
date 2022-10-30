import { TodoType } from "components/Todo";
import { Todos } from "components/Todos";

import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const todos: TodoType[] = [
    {
      id: "123",
      labelText: `ler game of thrones`,
    },
    {
      id: `1234`,
      labelText: `eminem music`,
    },
  ];
  const [todoList, setTodoList] = useState<TodoType[]>(todos);

  const handleButtonDelete = (todoId: string) => {
    setTodoList((prevValues) => prevValues.filter((t) => t.id !== todoId));
  };

  const handleCreateTodo = () => {
    setTodoList((prevValues) => [
      ...prevValues,
      {
        id: (prevValues.length + 1).toString(),
        labelText: Math.random().toString(),
      },
    ]);
  };

  return (
    <div className={styles.container}>
      <Todos
        handleCreateTodo={handleCreateTodo}
        handleButtonDelete={handleButtonDelete}
        todoList={todoList}
      />
    </div>
  );
}
