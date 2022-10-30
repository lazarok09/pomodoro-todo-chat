import { TodoType } from "components/Todo";
import { getRandomId } from "utils/random";

export function makeTodo(): TodoType {
  return {
    checkBoxId: getRandomId().toString(),
    inputTextId: getRandomId().toString(),
    labelText: "",
  };
}
