import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Todos } from "../Todos";
import { renderTheme } from "utils/renderTheme";
import { TodoItemType } from "components/TodoItem";

describe("<Todos />", () => {
  function makeTodos(): TodoItemType[] {
    return [
      {
        labelText: "ler harry potter",
        checkBoxId: "6234",
        inputTextId: "1634",
      },
      {
        labelText: "ler game of thrones",
        checkBoxId: "65234",
        inputTextId: "434",
      },
    ];
  }

  it("should verify if a todo delete has been clicked", () => {
    const todos = makeTodos();
    const mockedDeleteFirstTodo = jest.fn();
    const handleInputTodo = jest.fn();
    const {
      container: { children },
    } = render(
      renderTheme(
        <Todos
          handleCreateTodo={() => {}}
          handleInputTodo={handleInputTodo}
          todoList={todos}
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
    const {
      container: { children },
    } = render(
      renderTheme(
        <Todos
          todoList={todos}
          handleInputTodo={handleInputTodo}
          handleButtonDelete={mockedDeleteFirstTodo}
          handleCreateTodo={mockedCreateTodo}
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

    const {
      container: { children },
    } = render(
      renderTheme(
        <Todos
          todoList={[]}
          handleInputTodo={handleInputTodo}
          handleButtonDelete={mockedDeleteFirstTodo}
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

    const {
      container: { children },
    } = render(
      renderTheme(
        <Todos
          todoList={[]}
          handleInputTodo={handleInputTodo}
          handleButtonDelete={mockedDeleteFirstTodo}
          handleCreateTodo={mockedCreateTodo}
        />
      )
    );

    const inputText = screen.queryByPlaceholderText("digite");

    expect(inputText).not.toBeInTheDocument();
  });
});
