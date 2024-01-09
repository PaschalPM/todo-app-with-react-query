import { toast } from "@/components/ui/use-toast"
import { deleteTodo } from "@/lib/requests"
import  Todo  from "@/models/todo"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteTodo,
        onSuccess(_data, todoId: string) {
            queryClient.setQueryData(['todos'], (todos: Todo[]) => todos.filter((todo) => todo.id !== todoId))
            toast({
                title: "Todo deleted successfully",
            });
        },
        onError(){
            toast({
                variant: "destructive",
                title: "Oops!!! Something went wrong...",
            });
        }
    })
}

export default useDeleteTodoMutation