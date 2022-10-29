import { Fragment } from "react";

export type TodoType = {
  id: string;
  labelText: string;
};
export type TodoProps = {
  handleButtonDelete: () => void;
} & TodoType;

export const Todo = ({ labelText, id, handleButtonDelete }: TodoProps) => {
  return (
    <Fragment>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type={"checkbox"} title={labelText} />
      <button
        onClick={handleButtonDelete}
        title={`delete ${labelText}`}
      ></button>
    </Fragment>
  );
};
