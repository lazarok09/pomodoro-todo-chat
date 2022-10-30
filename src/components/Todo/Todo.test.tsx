import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Todo } from "../Todo";

describe("<Todo />", () => {
  function makeTodo() {
    return {
      todoChildrenText: "ler game of thrones",
      todoId: "dont-matter-id",
    };
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
    const todoDeleteButtonIcon = screen.getByAltText(
      `delete ${todoChildrenText}`
    );

    expect(todoLabel).toBeInTheDocument();
    expect(todoCheckbox).not.toBeChecked();
    expect(todoDeleteButton).toBeInTheDocument();
    expect(todoDeleteButtonIcon).toBeInTheDocument();
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
});
