import { TodoItem } from "components/TodoItem";
import Image from "next/image";
import React from "react";

import * as Styled from "./styles";

export type TodosGroup = {
  todoList: TodoItemType[];
  handleButtonDelete: (todoId: string) => void;
  handleInputTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputTodoCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateTodo: () => void;
};
export const TodosGroup = ({
  todoList = [],
  handleButtonDelete,
  handleCreateTodo,
  handleInputTodo,
  handleInputTodoCheckBox,
}: TodosGroup) => {
  return (
    <Styled.TodosGroup>
      {todoList.map((todo) => (
        <TodoItem
          checkBoxId={todo.checkBoxId}
          labelText={todo.labelText}
          key={todo.checkBoxId}
          handleButtonDelete={handleButtonDelete}
          handleInputTodoItem={handleInputTodo}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
          inputTextId={todo.inputTextId}
          inputChecked={todo.inputChecked}
        />
      ))}
      <Styled.Create
        onClick={handleCreateTodo}
        className={"todos__create_todo"}
        title={`create todo`}
      >
        <Image
          src={"/create.svg"}
          alt={`create new todo`}
          height={34}
          width={27}
        />
      </Styled.Create>
    </Styled.TodosGroup>
  );
};
