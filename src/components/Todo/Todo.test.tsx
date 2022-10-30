import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Todo } from "../Todo";

describe("<Todo />", () => {
  function makeTodo() {
    return {
      todoChildrenText: "ler game of thrones",
      todoId: "dont-matter-id",
      inputTextId: "1",
    };
  }

  it("should have a input with children text", () => {
    const { todoChildrenText, todoId, inputTextId } = makeTodo();
    const handleButtonDelete = jest.fn();
    const handleInputTodo = jest.fn();
    const {
      container: { children },
    } = render(
      <Todo
        handleButtonDelete={handleButtonDelete}
        checkBoxId={todoId}
        labelText={todoChildrenText}
        inputTextId={inputTextId}
        handleInputTodo={handleInputTodo}
      />
    );

    const inputText = screen.getByPlaceholderText("digite");
    const todoCheckbox = screen.getByRole("checkbox", {
      name: todoChildrenText,
    });

    const todoDeleteButton = screen.getByTitle(`delete ${todoChildrenText}`);
    const todoDeleteButtonIcon = screen.getByAltText(
      `delete ${todoChildrenText}`
    );

    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveValue(todoChildrenText);
    expect(todoCheckbox).not.toBeChecked();
    expect(todoDeleteButton).toBeInTheDocument();
    expect(todoDeleteButtonIcon).toBeInTheDocument();
  });
  it("should check/uncheck a todo by click", () => {
    const { todoChildrenText, todoId, inputTextId } = makeTodo();
    const handleButtonDelete = jest.fn();
    const handleInputTodo = jest.fn();

    const {
      container: { children },
    } = render(
      <Todo
        handleButtonDelete={handleButtonDelete}
        handleInputTodo={handleInputTodo}
        checkBoxId={todoId}
        inputTextId={inputTextId}
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
    const inputText = screen.getByPlaceholderText("digite");
    expect(inputText).toBeInTheDocument();
  });
  it("should auto focus input when created", () => {
    const { todoChildrenText, todoId, inputTextId } = makeTodo();
    const handleButtonDelete = jest.fn();
    const handleInputTodo = jest.fn();

    const {
      container: { children },
    } = render(
      <Todo
        handleButtonDelete={handleButtonDelete}
        handleInputTodo={handleInputTodo}
        checkBoxId={todoId}
        inputTextId={inputTextId}
        labelText={todoChildrenText}
      />
    );

    const inputText = screen.getByPlaceholderText("digite");
    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveFocus();
  });
});
