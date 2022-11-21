import { getRandomId } from "../random";
export function makeTodoItem(labelText?: string): TodoItemType {
  return {
    checkBoxId: Date.now().toString(),
    inputTextId: Date.now().toString(),
    labelText: labelText ?? "",
    inputChecked: false,
  };
}
