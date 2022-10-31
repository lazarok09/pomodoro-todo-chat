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
import * as Styled from "./styles";

export const Todo = ({
  labelText,
  checkBoxId,
  inputTextId,
  handleButtonDelete,
  handleInputTodo,
}: TodoProps) => {
  return (
    <Styled.Todo>
      <input id={checkBoxId} type={"checkbox"} title={labelText} />
      <Styled.Label htmlFor={checkBoxId}>
        <input
          type="text"
          value={labelText}
          id={inputTextId}
          placeholder={"digite"}
          onChange={handleInputTodo}
          autoFocus={true}
        />
      </Styled.Label>
      <Styled.Delete
        onClick={() => handleButtonDelete(checkBoxId)}
        title={`delete ${labelText}`}
      >
        <img src={"/delete.svg"} alt={`delete ${labelText}`} />
      </Styled.Delete>
    </Styled.Todo>
  );
};
