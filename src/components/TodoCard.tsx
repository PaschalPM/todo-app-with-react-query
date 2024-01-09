import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2Icon as Trash, Edit, Save, X, Loader2 } from "lucide-react";
import ButtonWithToolTip from "./ButtonWithToolTip";
import Todo from "@/models/todo";
import useToggleTodoStatusMutation from "@/lib/hooks/mutations/useToggleTodoStatus";
import useDeleteTodoMutation from "@/lib/hooks/mutations/useDeleteTodo";
import useEditTodoTaskMutation from "@/lib/hooks/mutations/useEditTodoTask";
import { cn } from "@/lib/utils";

type Props = {
  todo: Todo;
};

const TodoCard = ({ todo }: Props) => {
  const { mutate: editTodoTaskMutate } = useEditTodoTaskMutation();
  const { mutate: toggleStatusMutate } = useToggleTodoStatusMutation();
  const { mutate: deleteTodoMutate, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();
  const [editing, setEditing] = useState(false);
  const [taskValue, setTaskValue] = useState(todo.task);
  const startEditing = () => {
    setEditing(true);
  };
  const cancelEditing = () => {
    setEditing(false);
  };
  const handleToggleStatus = (newStatus: boolean) => {
    toggleStatusMutate({ ...todo, isComplete: newStatus });
  };

  const handleDeleteTodo = (todoId: string) => {
    deleteTodoMutate(todoId);
  };

  const handleSavingTodo = (newTask: string) => {
    editTodoTaskMutate({...todo, task: newTask });
    setEditing(false);
  };
  return (
    <div className="flex justify-between items-center p-2 py-4 shadow-slate-400 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 pr-2 w-full" onDoubleClick={startEditing}>
        <Checkbox
          checked={todo.isComplete}
          onClick={() => handleToggleStatus(!todo.isComplete)}
        />
        {editing ? (
          <input
            type="text"
            value={taskValue}
            
            onKeyUp={(ev) => {
              if (ev.keyCode === 13){
                handleSavingTodo(taskValue)
              }
            }}
            onChange={(ev) =>
              setTaskValue((ev.target as HTMLInputElement).value)
            }
            className="bg-transparent ring-1 ring-slate-400 p-1 rounded-sm bg-slate-100  w-full"
          />
        ) : (
          <h3 className={cn("text-lg", {"line-through": todo.isComplete})}> {todo.task} </h3>
        )}
      </div>
      <div className="flex gap-2">
        {editing && (
          <>
            <ButtonWithToolTip
              handleClick={cancelEditing}
              className="bg-transparent ring-red-700 ring-1 text-red-700 hover:bg-red-700 hover:text-white"
              toolTip="Exit"
            >
              <X width={12.5} />
            </ButtonWithToolTip>
            <ButtonWithToolTip
              className="bg-green-900"
              toolTip="Save"
              handleClick={() => handleSavingTodo(taskValue)}
            >
              <Save width={12.5} />
            </ButtonWithToolTip>
          </>
        )}
        {!editing && (
          <>
            <ButtonWithToolTip
              className="p-2 py-1 h-fit"
              handleClick={startEditing}
              toolTip="Edit todo"
            >
              <Edit width={12.5} />
            </ButtonWithToolTip>
            <ButtonWithToolTip
              className="bg-red-700"
              toolTip="Delete"
              handleClick={() => handleDeleteTodo(todo.id as string)}
            >
              {isDeleteTodoPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash width={12.5} />
              )}
            </ButtonWithToolTip>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
