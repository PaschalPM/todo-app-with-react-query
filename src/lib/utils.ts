import Todo from "@/models/todo"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const todoFilters = [
  (todo:Todo)=>todo,
  (todo:Todo)=>!todo.isComplete, 
  (todo:Todo)=>todo.isComplete, 
]