import {
  fireEvent,
  queryAllByRole,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Todos } from "../Todos";
import { TodoType } from "components/Todo";
import { ThemeProvider } from "styled-components";
import { renderTheme } from "utils/renderTheme";

describe("<Todos />", () => {
  function makeTodos(): TodoType[] {
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
});
