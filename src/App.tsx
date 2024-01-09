import { AddTaskForm } from "./components/AddTaskForm";
import TodoList from "./components/TodoList";
import useTodosQuery from "./lib/hooks/queries/useTodos";
import Todo from "./models/todo";
import { Toaster } from "./components/ui/toaster";
import LoaderErrorCheck from "./components/LoaderErrorCheck";

function App() {
  const { data: todos, isLoading, error } = useTodosQuery();

  return (
    <>
      <div className="bg-slate-300 min-h-screen p-2 overflow-hidden flex justify-center">
        <div className="w-full sm:w-3/4 md:w-1/2 ">
          <h2 className="text-2xl text-center"> The Task App</h2>
          <div className="my-2">
            <AddTaskForm />
            <LoaderErrorCheck isLoading={isLoading} error={error}>
              <TodoList todos={todos as Todo[]} />
            </LoaderErrorCheck>
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}

export default App;
