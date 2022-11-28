export type TodoItemProps = {
  handleButtonDelete: (TodoItemId: string) => void;
  handleInputTodoItem: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputTodoCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TodoItemType;

import Image from "next/image";
import React, { useRef } from "react";
import * as Styled from "./styles";

export const TodoItem = ({
  labelText,
  checkBoxId,
  inputTextId,
  inputChecked = false,
  handleButtonDelete,
  handleInputTodoItem,
  handleInputTodoCheckBox,
}: TodoItemProps) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Styled.TodoItem>
      <input
        id={checkBoxId}
        type={"checkbox"}
        title={labelText}
        onChange={handleInputTodoCheckBox}
        ref={ref}
        defaultChecked={inputChecked}
      />
      <Styled.Label htmlFor={checkBoxId}>
        <input
          type="text"
          value={labelText}
          id={inputTextId}
          placeholder={"digite"}
          onChange={handleInputTodoItem}
          autoFocus={true}
          onDoubleClick={() => {
            ref.current?.click();
          }}
        />
      </Styled.Label>
      <Styled.Delete
        onClick={() => handleButtonDelete(checkBoxId)}
        title={`delete ${labelText}`}
      >
        <Image
          src={"/delete.svg"}
          width={19}
          height={18}
          alt={`delete ${labelText}`}
        />
      </Styled.Delete>
    </Styled.TodoItem>
  );
};
