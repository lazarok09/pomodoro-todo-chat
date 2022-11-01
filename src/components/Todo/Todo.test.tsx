import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { makeTodo } from "utils/factory/todo";
import { renderTheme } from "utils/renderTheme";
import { Todo } from "../Todo";

describe("<Todo />", () => {
  it("should have a input with children text", () => {
    const { labelText, checkBoxId, inputTextId } = makeTodo("input");
    const handleButtonDelete = jest.fn();
    const handleInputTodo = jest.fn();
    const {
      container: { children },
    } = render(
      renderTheme(
        <Todo
          handleButtonDelete={handleButtonDelete}
          checkBoxId={checkBoxId}
          labelText={labelText}
          inputTextId={inputTextId}
          handleInputTodo={handleInputTodo}
        />
      )
    );

    const inputText = screen.getByPlaceholderText("digite");
    const todoCheckbox = screen.getByRole("checkbox", {
      name: labelText,
    });

    const todoDeleteButton = screen.getByTitle(`delete ${labelText}`);
    const todoDeleteButtonIcon = screen.getByAltText(`delete ${labelText}`);

    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveValue(labelText);
    expect(todoCheckbox).not.toBeChecked();
    expect(todoDeleteButton).toBeInTheDocument();
    expect(todoDeleteButtonIcon).toBeInTheDocument();
  });
  it("should check/uncheck a todo by click", () => {
    const { labelText, checkBoxId, inputTextId } = makeTodo();
    const handleButtonDelete = jest.fn();
    const handleInputTodo = jest.fn();

    const {
      container: { children },
    } = render(
      renderTheme(
        <Todo
          handleButtonDelete={handleButtonDelete}
          handleInputTodo={handleInputTodo}
          checkBoxId={checkBoxId}
          inputTextId={inputTextId}
          labelText={labelText}
        />
      )
    );

    const todoCheckbox = screen.getByRole("checkbox", {
      name: labelText,
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
    const { labelText, checkBoxId, inputTextId } = makeTodo();
    const handleButtonDelete = jest.fn();
    const handleInputTodo = jest.fn();

    const {
      container: { children },
    } = render(
      renderTheme(
        <Todo
          handleButtonDelete={handleButtonDelete}
          handleInputTodo={handleInputTodo}
          checkBoxId={checkBoxId}
          inputTextId={inputTextId}
          labelText={labelText}
        />
      )
    );

    const inputText = screen.getByPlaceholderText("digite");
    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveFocus();
  });
  it("should change style of input text when checkbox is marked", () => {
    const { labelText, checkBoxId, inputTextId } = makeTodo("specific input");
    const handleButtonDelete = jest.fn();
    const handleInputTodo = jest.fn();

    const {
      container: { children },
    } = render(
      renderTheme(
        <Todo
          handleButtonDelete={handleButtonDelete}
          handleInputTodo={handleInputTodo}
          checkBoxId={checkBoxId}
          inputTextId={inputTextId}
          labelText={labelText}
        />
      )
    );

    const todoCheckbox = screen.getByRole("checkbox", {
      name: "specific input",
    });
    const inputText = screen.getByPlaceholderText("digite");

    // First click
    fireEvent.click(todoCheckbox);

    expect(todoCheckbox).toBeChecked();
    expect(inputText).toHaveStyle({ "text-decoration": "line-through" });

    // Second click
    fireEvent.click(todoCheckbox);

    expect(todoCheckbox).not.toBeChecked();
    expect(inputText).not.toHaveStyle({ "text-decoration": "line-through" });
  });
  it("should double click the input and check the parent checkbox", () => {
    const { labelText, checkBoxId, inputTextId } = makeTodo("specific input");
    const handleButtonDelete = jest.fn();
    const handleInputTodo = jest.fn();

    const {
      container: { children },
    } = render(
      renderTheme(
        <Todo
          handleButtonDelete={handleButtonDelete}
          handleInputTodo={handleInputTodo}
          checkBoxId={checkBoxId}
          inputTextId={inputTextId}
          labelText={labelText}
        />
      )
    );

    const todoCheckbox = screen.getByRole("checkbox", {
      name: "specific input",
    });
    const inputText = screen.getByPlaceholderText("digite");

    // First click

    fireEvent.doubleClick(inputText);
    expect(inputText).toHaveStyle({ "text-decoration": "line-through" });
    expect(todoCheckbox).toBeChecked();
  });
});
