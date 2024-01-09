import { addTodos } from "@/lib/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Todo from "@/models/todo";
import { toast } from "@/components/ui/use-toast";

const useCreateTodoMutation = (formReset: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addTodos,
        onSuccess(data: Todo) {
            queryClient.setQueryData(['todos'], (todos: Todo[]) => {
                return [data, ...todos]
            })
            toast({
                title: "Todo created successfully.",
            });
            formReset()
        },
        onError(){
            toast({
                variant: "destructive",
                title: "Oops!! Something went wrong...",
            });
        }
    })
}

export default useCreateTodoMutation