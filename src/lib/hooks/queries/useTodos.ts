import {getTodos} from "@/lib/requests";
import Todo from "@/models/todo";
import { useQuery } from "@tanstack/react-query";

const useTodosQuery = () => useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: getTodos
}) 

export default useTodosQuery