import { Todo, TodoType } from "../Todo";
import { Fragment } from "react";

export type TodosProps = {
  todoList: TodoType[];
  handleButtonDelete: (id: TodoType["id"]) => void;
  handleCreateTodo: () => void;
};
export const Todos = ({
  todoList,
  handleButtonDelete,
  handleCreateTodo,
}: TodosProps) => {
  return (
    <Fragment>
      {todoList.map((t) => (
        <Todo
          id={t.id}
          labelText={t.labelText}
          key={t.id}
          handleButtonDelete={() => handleButtonDelete(t.id)}
        />
      ))}
      <button onClick={handleCreateTodo} title={`create todo`}>
        +
      </button>
    </Fragment>
  );
};
