import Todo from "@/models/todo";
import TodoCard from "./TodoCard";
import { Trash2Icon } from "lucide-react";
import { DeleteAllTodoBtnWithModal } from "./DeleteAllTodoBtnWithModal";
import useDeleteAllTodos from "@/lib/hooks/mutations/useDeleteAllTodos";
import { cn, todoFilters } from "@/lib/utils";
import { SelectOption } from "./SelectOption";
import { useMemo, useState } from "react";

type Props = {
  todos: Todo[];
};
const TodoList = ({ todos }: Props) => {
  const [filterValue, setFilterValue] = useState(0);

  const { mutate: deleteAllTodosMutate } = useDeleteAllTodos();
  const filteredTodos = useMemo(
    () => todos.filter(todoFilters[filterValue]),
    [todos, filterValue]
  );
  return (
    <>
      <div
        className={cn("flex justify-between items-center my-2 space-x-2 py-2", {
          hidden: todos.length === 0,
        })}
      >
        <SelectOption
          handleValueChange={(newValue) => setFilterValue(+newValue)}
        />
        <DeleteAllTodoBtnWithModal action={() => deleteAllTodosMutate(todos)}>
          <Trash2Icon className="cursor-pointer active:scale-90" />
        </DeleteAllTodoBtnWithModal>
      </div>
      <div className="space-y-3 my-3">
        {filteredTodos.length === 0
          ? "No todos available..."
          : filteredTodos.map((todo) => <TodoCard todo={todo} key={todo.id} />)}
      </div>
    </>
  );
};

export default TodoList;
