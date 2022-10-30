export type TodoType = {
  id: string;
  labelText: string;
};
export type TodoProps = {
  handleButtonDelete: () => void;
} & TodoType;

import styles from "./Todo.module.scss";

export const Todo = ({ labelText, id, handleButtonDelete }: TodoProps) => {
  return (
    <article className={styles.todo}>
      <input
        id={id}
        type={"checkbox"}
        className={styles.todo__checkbox}
        title={labelText}
      />
      <label htmlFor={id} className={styles.todo__label}>
        {labelText}
      </label>
      <button
        onClick={handleButtonDelete}
        title={`delete ${labelText}`}
        className={styles.todo__delete}
      >
        <img src={"/delete.svg"} alt={`delete ${labelText}`} />
      </button>
    </article>
  );
};
