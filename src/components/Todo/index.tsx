export type TodoType = {
  checkBoxId: string;
  labelText: string;
  inputTextId: string;
};
export type TodoProps = {
  handleButtonDelete: (todoId: string) => void;
  handleInputTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TodoType;

import React from "react";
import styles from "./Todo.module.scss";

export const Todo = ({
  labelText,
  checkBoxId,
  inputTextId,
  handleButtonDelete,
  handleInputTodo,
}: TodoProps) => {
  return (
    <article className={styles.todo}>
      <input
        id={checkBoxId}
        type={"checkbox"}
        className={styles.todo__checkbox}
        title={labelText}
      />
      <label htmlFor={checkBoxId} className={styles.todo__label}>
        <input
          type="text"
          value={labelText}
          id={inputTextId}
          placeholder={"digite"}
          onChange={handleInputTodo}
          autoFocus={true}
        />
      </label>
      <button
        onClick={() => handleButtonDelete(checkBoxId)}
        title={`delete ${labelText}`}
        className={styles.todo__delete}
      >
        <img src={"/delete.svg"} alt={`delete ${labelText}`} />
      </button>
    </article>
  );
};
