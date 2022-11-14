import { TodoItemType } from "components/TodoItem";
import { getRandomId } from "../random";

export function makeTodoItem(labelText?: string): TodoItemType {
  return {
    checkBoxId: getRandomId().toString(),
    inputTextId: getRandomId().toString(),
    labelText: labelText ?? "",
  };
}
