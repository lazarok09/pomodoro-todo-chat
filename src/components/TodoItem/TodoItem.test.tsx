import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { makeTodoItem } from "utils/factory/todoItem";

import { renderTheme } from "utils/renderTheme";
import { TodoItem } from ".";

describe("<TodoItem />", () => {
  it("should have a input with children text", () => {
    const { labelText, checkBoxId, inputTextId } = makeTodoItem("input");
    const handleButtonDelete = jest.fn();
    const handleInputTodoItem = jest.fn();
    const handleInputTodoCheckBox = jest.fn();
    const {
      container: { children },
    } = render(
      renderTheme(
        <TodoItem
          handleButtonDelete={handleButtonDelete}
          checkBoxId={checkBoxId}
          labelText={labelText}
          inputTextId={inputTextId}
          handleInputTodoItem={handleInputTodoItem}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
          inputChecked={false}
        />
      )
    );

    const inputText = screen.getByPlaceholderText("digite");
    const TodoItemCheckbox = screen.getByRole("checkbox", {
      name: labelText,
    });

    const TodoItemDeleteButton = screen.getByTitle(`delete ${labelText}`);
    const TodoItemDeleteButtonIcon = screen.getByAltText(`delete ${labelText}`);

    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveValue(labelText);
    expect(TodoItemCheckbox).not.toBeChecked();
    expect(TodoItemDeleteButton).toBeInTheDocument();
    expect(TodoItemDeleteButtonIcon).toBeInTheDocument();
  });
  it("should check/uncheck a TodoItem by click", () => {
    const { labelText, checkBoxId, inputTextId } = makeTodoItem();
    const handleButtonDelete = jest.fn();
    const handleInputTodoItem = jest.fn();
    const handleInputTodoCheckBox = jest.fn();

    const {
      container: { children },
    } = render(
      renderTheme(
        <TodoItem
          handleButtonDelete={handleButtonDelete}
          handleInputTodoItem={handleInputTodoItem}
          checkBoxId={checkBoxId}
          inputTextId={inputTextId}
          labelText={labelText}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
          inputChecked={false}
        />
      )
    );

    const TodoItemCheckbox = screen.getByRole("checkbox", {
      name: labelText,
    });
    // click on checkbox
    expect(TodoItemCheckbox).not.toBeChecked();
    fireEvent.click(TodoItemCheckbox);
    expect(TodoItemCheckbox).toBeChecked();

    // click again on check box,
    fireEvent.click(TodoItemCheckbox);
    expect(TodoItemCheckbox).not.toBeChecked();

    // click on the label, and the checkbox must be checked now
    const inputText = screen.getByPlaceholderText("digite");
    expect(inputText).toBeInTheDocument();
  });
  it("should auto focus input when created", () => {
    const { labelText, checkBoxId, inputTextId } = makeTodoItem();
    const handleButtonDelete = jest.fn();
    const handleInputTodoItem = jest.fn();
    const handleInputTodoCheckBox = jest.fn();

    const {
      container: { children },
    } = render(
      renderTheme(
        <TodoItem
          handleButtonDelete={handleButtonDelete}
          handleInputTodoItem={handleInputTodoItem}
          checkBoxId={checkBoxId}
          inputTextId={inputTextId}
          labelText={labelText}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
          inputChecked={false}
        />
      )
    );

    const inputText = screen.getByPlaceholderText("digite");
    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveFocus();
  });
  it("should change style of input text when checkbox is marked", () => {
    const { labelText, checkBoxId, inputTextId } =
      makeTodoItem("specific input");
    const handleButtonDelete = jest.fn();
    const handleInputTodoItem = jest.fn();
    const handleInputTodoCheckBox = jest.fn();

    const {
      container: { children },
    } = render(
      renderTheme(
        <TodoItem
          handleButtonDelete={handleButtonDelete}
          handleInputTodoItem={handleInputTodoItem}
          checkBoxId={checkBoxId}
          inputTextId={inputTextId}
          labelText={labelText}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
          inputChecked={false}
        />
      )
    );

    const TodoItemCheckbox = screen.getByRole("checkbox", {
      name: "specific input",
    });
    const inputText = screen.getByPlaceholderText("digite");

    // First click
    fireEvent.click(TodoItemCheckbox);

    expect(TodoItemCheckbox).toBeChecked();
    expect(inputText).toHaveStyle({ "text-decoration": "line-through" });

    // Second click
    fireEvent.click(TodoItemCheckbox);

    expect(TodoItemCheckbox).not.toBeChecked();
    expect(inputText).not.toHaveStyle({ "text-decoration": "line-through" });
  });
  it("should double click the input and check the parent checkbox", () => {
    const { labelText, checkBoxId, inputTextId } =
      makeTodoItem("specific input");
    const handleButtonDelete = jest.fn();
    const handleInputTodoItem = jest.fn();
    const handleInputTodoCheckBox = jest.fn();

    const {
      container: { children },
    } = render(
      renderTheme(
        <TodoItem
          handleButtonDelete={handleButtonDelete}
          handleInputTodoItem={handleInputTodoItem}
          checkBoxId={checkBoxId}
          inputTextId={inputTextId}
          labelText={labelText}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
          inputChecked={false}
        />
      )
    );

    const TodoItemCheckbox = screen.getByRole("checkbox", {
      name: "specific input",
    });
    const inputText = screen.getByPlaceholderText("digite");

    // First click

    fireEvent.doubleClick(inputText);
    expect(inputText).toHaveStyle({ "text-decoration": "line-through" });
    expect(TodoItemCheckbox).toBeChecked();
  });
});
