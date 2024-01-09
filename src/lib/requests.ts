import Todo from "@/models/todo"
import axios from "axios"

const { VITE_BASE_URL = "http://localhost:3000" } = import.meta.env

const axiosClient = axios.create({
    baseURL: VITE_BASE_URL
})

export async function getTodos() {
    const params = {} as { orderBy: string, order: string }
    params.orderBy = "createdAt"
    params.order = "desc"
    return (await axiosClient.get('/todos', { params })).data
}

export async function addTodos(newTodo: Todo) {
    return (await axiosClient.post('/todos', newTodo)).data
}

export async function toggleStatus(todo: Todo) {
    return (await axiosClient.put(`/todos/${todo.id}`, todo)).data
}

export async function editTask(todo: Todo) {
    return (await axiosClient.put(`/todos/${todo.id}`, todo)).data
}

export async function deleteTodo(todoId: string) {
    return (await axiosClient.delete(`/todos/${todoId}`)).data
}

export async function deleteAllTodos(todos: Todo[]) {

    return await Promise.all(todos.map(async (todo: Todo) => {
        return (await axiosClient.delete(`/todos/${todo.id}`)).data
    }))
}