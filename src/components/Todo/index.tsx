export type TodoType = {
  checkBoxId: string;
  labelText: string;
  inputTextId: string;
};
export type TodoProps = {
  handleButtonDelete: (todoId: string) => void;
  handleInputTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TodoType;

import Image from "next/image";
import React, { useRef } from "react";
import * as Styled from "./styles";

export const Todo = ({
  labelText,
  checkBoxId,
  inputTextId,
  handleButtonDelete,
  handleInputTodo,
}: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);

  function dragstart_handler(ev: any) {
    // Adiciona os dados do arraste (drag)
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.setData("text/html", "<p>Parágrafo de exemplo</p>");
    ev.dataTransfer.setData("text/uri-list", "http://developer.mozilla.org");
  }
  return (
    <Styled.Todo>
      <input id={checkBoxId} type={"checkbox"} title={labelText} ref={ref} />
      <Styled.Label htmlFor={checkBoxId}>
        <input
          type="text"
          value={labelText}
          id={inputTextId}
          placeholder={"digite"}
          onChange={handleInputTodo}
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
    </Styled.Todo>
  );
};
