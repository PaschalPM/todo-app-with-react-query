import todoContext from "@/contexts/todo";
import { PropsWithChildren, useState } from "react";

export default function TodoProvider({ children }: PropsWithChildren) {
  const [startWithLatest, setStartWithLatest] = useState(true);

  return (
    <todoContext.Provider value={{ startWithLatest, setStartWithLatest }}>
      {children}
    </todoContext.Provider>
  );
}
