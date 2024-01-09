import { editTask } from "@/lib/requests"
import Todo from "@/models/todo"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useEditTodoTaskMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: editTask,
        onMutate: async (variables: Omit<Todo, "isComplete">) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] })
            const prevTodos = queryClient.getQueryData(['todos'])
            queryClient.setQueryData(['todos'], (oldTodos: Todo[]) => oldTodos.map((todo) => todo.id === variables.id ? { ...todo, task: variables.task } : todo)
            )
            return {
                prevTodos
            }
        },
        onError(_error, _variables, context) {
            queryClient.setQueryData(['todos'], () => context?.prevTodos)
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
}

export default useEditTodoTaskMutation