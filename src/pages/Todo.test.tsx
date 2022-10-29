import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Fragment } from "react";

type TodoProps = {
  id: string;
  labelText: string;
};
export const Todo = ({ labelText, id }: TodoProps) => {
  return (
    <Fragment>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type={"checkbox"} title={labelText} />
    </Fragment>
  );
};

function makeTodo() {
  return {
    todoChildrenText: "ler game of thrones",
    todoId: "1",
  };
}
describe("<Todo />", () => {
  it("should have a input with children text", () => {
    const { todoChildrenText, todoId } = makeTodo();
    const {
      container: { children },
    } = render(<Todo id={todoId} labelText={todoChildrenText} />);

    const todoLabel = screen.getByLabelText(todoChildrenText);
    const todoCheckbox = screen.getByRole("checkbox", {
      name: todoChildrenText,
    });

    expect(todoLabel).toBeInTheDocument();
    expect(todoCheckbox).not.toBeChecked();
  });
  it("should check/uncheck a todo by click", () => {
    const { todoChildrenText, todoId } = makeTodo();
    const {
      container: { children },
    } = render(<Todo id={todoId} labelText={todoChildrenText} />);

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
