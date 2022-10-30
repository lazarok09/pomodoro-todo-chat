import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Todos } from "../Todos";

describe("<Todos />", () => {
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
