import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodosGroup } from "../Todos";
import { renderTheme } from "utils/renderTheme";

describe("<Todos />", () => {
  function makeTodos(): TodoItemType[] {
    return [
      {
        labelText: "ler harry potter",
        checkBoxId: "6234",
        inputTextId: "1634",
        inputChecked: false,
      },
      {
        labelText: "ler game of thrones",
        checkBoxId: "65234",
        inputTextId: "434",
        inputChecked: false,
      },
    ];
  }

  it("should verify if a todo delete has been clicked", () => {
    const todos = makeTodos();
    const mockedDeleteFirstTodo = jest.fn();
    const handleInputTodo = jest.fn();
    const handleInputTodoCheckBox = jest.fn();

    render(
      renderTheme(
        <TodosGroup
          handleCreateTodo={() => {}}
          handleInputTodo={handleInputTodo}
          todoList={todos}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
          handleButtonDelete={mockedDeleteFirstTodo}
        />
      )
    );

    const todoDeleteButton = screen.getByTitle(`delete ${todos[0].labelText}`);
    const todoCreateButton = screen.getByAltText(`create new todo`);

    expect(todoDeleteButton).toBeInTheDocument();
    expect(todoCreateButton).toBeInTheDocument();

    // first click
    fireEvent.click(todoDeleteButton);
    expect(mockedDeleteFirstTodo).toHaveBeenCalledTimes(1);
  });
  it("should call create todo function when the button has been clicked", () => {
    const todos = makeTodos();
    const mockedDeleteFirstTodo = jest.fn();
    const mockedCreateTodo = jest.fn();
    const handleInputTodo = jest.fn();
    const handleInputTodoCheckBox = jest.fn();

    render(
      renderTheme(
        <TodosGroup
          todoList={todos}
          handleInputTodo={handleInputTodo}
          handleButtonDelete={mockedDeleteFirstTodo}
          handleCreateTodo={mockedCreateTodo}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
        />
      )
    );

    const todoCreateButton = screen.getByTitle("create todo");
    expect(todoCreateButton).toBeInTheDocument();

    // first click
    fireEvent.click(todoCreateButton);
    expect(mockedCreateTodo).toHaveBeenCalledTimes(1);
  });
  it("should return nothing if no todo-list is provided", () => {
    const mockedDeleteFirstTodo = jest.fn();
    const mockedCreateTodo = jest.fn();
    const handleInputTodo = jest.fn();
    const handleInputTodoCheckBox = jest.fn();

    render(
      renderTheme(
        <TodosGroup
          todoList={[]}
          handleInputTodo={handleInputTodo}
          handleButtonDelete={mockedDeleteFirstTodo}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
          handleCreateTodo={mockedCreateTodo}
        />
      )
    );
    const inputText = screen.queryByPlaceholderText("digite");

    expect(inputText).not.toBeInTheDocument();
  });

  it("should start todo with saved todo's on local storage", () => {
    const mockedDeleteFirstTodo = jest.fn();
    const mockedCreateTodo = jest.fn();
    const handleInputTodo = jest.fn();
    const handleInputTodoCheckBox = jest.fn();

    render(
      renderTheme(
        <TodosGroup
          todoList={[]}
          handleInputTodo={handleInputTodo}
          handleButtonDelete={mockedDeleteFirstTodo}
          handleInputTodoCheckBox={handleInputTodoCheckBox}
          handleCreateTodo={mockedCreateTodo}
        />
      )
    );

    const inputText = screen.queryByPlaceholderText("digite");

    expect(inputText).not.toBeInTheDocument();
  });
});
