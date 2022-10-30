import { Todo, TodoType } from "../Todo";

import styles from "./Todos.module.scss";

export type TodosProps = {
  todoList: TodoType[];
  handleButtonDelete: (id: TodoType["id"]) => void;
  handleCreateTodo: () => void;
};
export const Todos = ({
  todoList = [],
  handleButtonDelete,
  handleCreateTodo,
}: TodosProps) => {
  if (!todoList.length) return null;
  return (
    <section className={styles.todos}>
      {todoList.map((t) => (
        <Todo
          id={t.id}
          labelText={t.labelText}
          key={t.id}
          handleButtonDelete={() => handleButtonDelete(t.id)}
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
