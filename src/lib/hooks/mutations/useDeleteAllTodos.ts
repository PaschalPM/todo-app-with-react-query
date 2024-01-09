import { toast } from "@/components/ui/use-toast"
import { deleteAllTodos } from "@/lib/requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useDeleteAllTodos = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteAllTodos,
        onSuccess() {
            queryClient.setQueryData(['todos'], ()=>[])
            toast({
                title: "All todos deleted successfully",
            });
        }
    })
}

export default useDeleteAllTodos