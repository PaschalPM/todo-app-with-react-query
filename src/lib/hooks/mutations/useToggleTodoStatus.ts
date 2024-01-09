import { toggleStatus } from "@/lib/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Todo from "@/models/todo";


const useToggleTodoStatusMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: toggleStatus,
        onMutate: async (data: Omit<Todo, 'task'>) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] })
            const prevTodos = queryClient.getQueryData(['todos'])
            queryClient.setQueryData(['todos'], (todos: Todo[]) => {
                return todos.map((todo) => todo.id === data.id ? { ...todo, isComplete: data.isComplete } : todo)
            })
            return {
                prevTodos
            }
        },
        onError(_error, _data, context) {
            return queryClient.setQueryData(['todos'], () => context?.prevTodos)
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
}

export default useToggleTodoStatusMutation