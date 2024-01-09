import { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TodoProvider from "./TodoProvider";

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoProvider>{children}</TodoProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
