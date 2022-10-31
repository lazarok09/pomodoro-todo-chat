import { TodoType } from "components/Todo";
import { getRandomId } from "../random";

export function makeTodo(labelText?: string): TodoType {
  return {
    checkBoxId: getRandomId().toString(),
    inputTextId: getRandomId().toString(),
    labelText: labelText ?? "",
  };
}
