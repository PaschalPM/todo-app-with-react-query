import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Todo from "@/models/todo";
import useCreateTodoMutation from "@/lib/hooks/mutations/useCreateTodo";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  task: z.string().min(2, {
    message: "Task must be at least 2 characters.",
  }),
});

type Task = z.infer<typeof FormSchema>;

export function AddTaskForm() {
  const form = useForm<Task>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      task: "",
    },
  });
  const { mutate: createTodo, isPending } = useCreateTodoMutation(form.reset);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    createTodo(new Todo(data.task));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-2 border-b-2 border-slate-300 pb-3"
      >
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Task</FormLabel>
              <FormControl>
                <Input placeholder="cooking..." {...field} className="bg-slate-50"/>
              </FormControl>
              <FormDescription>Add a new task here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center">
          <Button type="submit" disabled={isPending || !form.formState.isDirty}>
            {isPending ? (
              <>
                Adding <Loader2 className="animate-spin" />
              </>
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
