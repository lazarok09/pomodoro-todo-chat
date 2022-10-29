import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Fragment, useState } from "react";

type Todo = {
  id: string;
  labelText: string;
};
type TodoProps = {
  handleButtonDelete: () => void;
} & Todo;

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

type TodosProps = {
  todoList: Todo[];
  handleButtonDelete: (id: Todo["id"]) => void;
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

describe("<Todo />", () => {
  function makeTodo() {
    return {
      todoChildrenText: "ler game of thrones",
      todoId: "dont-matter-id",
    };
  }
  function makeTodos() {
    return [
      {
        id: "random id " + Math.random().toString(),
        labelText: "ler harry potter",
      },
      {
        id: "random id" + Math.random().toString(),
        labelText: "ler game of thrones",
      },
    ];
  }
  it("should have a input with children text", () => {
    const { todoChildrenText, todoId } = makeTodo();
    const mockedDeleteFirstTodo = jest.fn();
    const {
      container: { children },
    } = render(
      <Todo
        handleButtonDelete={mockedDeleteFirstTodo}
        id={todoId}
        labelText={todoChildrenText}
      />
    );

    const todoLabel = screen.getByLabelText(todoChildrenText);
    const todoCheckbox = screen.getByRole("checkbox", {
      name: todoChildrenText,
    });
    const todoDeleteButton = screen.getByTitle(`delete ${todoChildrenText}`);

    expect(todoLabel).toBeInTheDocument();
    expect(todoCheckbox).not.toBeChecked();
    expect(todoDeleteButton).toBeInTheDocument();
  });
  it("should check/uncheck a todo by click", () => {
    const { todoChildrenText, todoId } = makeTodo();
    const mockedDeleteFirstTodo = jest.fn();

    const {
      container: { children },
    } = render(
      <Todo
        handleButtonDelete={mockedDeleteFirstTodo}
        id={todoId}
        labelText={todoChildrenText}
      />
    );

    const todoCheckbox = screen.getByRole("checkbox", {
      name: todoChildrenText,
    });
    // click on checkbox
    expect(todoCheckbox).not.toBeChecked();
    fireEvent.click(todoCheckbox);
    expect(todoCheckbox).toBeChecked();

    // click again on check box,
    fireEvent.click(todoCheckbox);
    expect(todoCheckbox).not.toBeChecked();

    // click on the label, and the checkbox must be checked now
    const todoLabel = screen.getByLabelText(todoChildrenText);
    fireEvent.click(todoLabel);
    expect(todoCheckbox).toBeChecked();
  });

  it("should verify if a todo delete has been clicked", () => {
    const todos = makeTodos();
    const mockedDeleteFirstTodo = jest.fn();
    const {
      container: { children },
    } = render(
      <Todos
        handleCreateTodo={() => {}}
        todoList={todos}
        handleButtonDelete={mockedDeleteFirstTodo}
      />
    );

    const todoDeleteButton = screen.getByTitle(`delete ${todos[0].labelText}`);
    expect(todoDeleteButton).toBeInTheDocument();

    // first click
    fireEvent.click(todoDeleteButton);
    expect(mockedDeleteFirstTodo).toHaveBeenCalledTimes(1);
  });
  it("should call create todo function when the button has been clicked", () => {
    const todos = makeTodos();
    const mockedDeleteFirstTodo = jest.fn();
    const mockedCreateTodo = jest.fn();
    const {
      container: { children },
    } = render(
      <Todos
        todoList={todos}
        handleButtonDelete={mockedDeleteFirstTodo}
        handleCreateTodo={mockedCreateTodo}
      />
    );

    const todoCreateButton = screen.getByTitle("create todo");
    expect(todoCreateButton).toBeInTheDocument();

    // first click
    fireEvent.click(todoCreateButton);
    expect(mockedCreateTodo).toHaveBeenCalledTimes(1);
  });
});
