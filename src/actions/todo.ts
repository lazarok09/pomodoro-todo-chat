import { TodoAction, TodoActionsKind } from "context/todo/Todo";
import { makeTodoItem } from "utils/factory/todoItem";

type DispatchAction = React.Dispatch<TodoAction>;

export const deleteTodo = (
  todoId: TodoItemType["inputTextId"],
  dispatch: DispatchAction
) => {
  dispatch({
    type: TodoActionsKind.DELETE_TODO,
    todoId: todoId,
    payload: {
      checkBoxId: "",
      inputChecked: false,
      inputTextId: "",
      labelText: "",
    },
  });
};

export const createTodo = (dispatch: DispatchAction) => {
  const todo = makeTodoItem();
  dispatch({
    type: TodoActionsKind.CREATE_TODO,
    payload: todo,
  });
};

export const updateTodo = (
  event: React.ChangeEvent<HTMLInputElement>,
  todo: TodoItemType,
  dispatch: DispatchAction
) => {
  const { id, value } = event.target;
  dispatch({
    type: TodoActionsKind.UPDATE_TODO,
    payload: { ...todo, labelText: value },
    todoId: id,
  });
};
