import {
    Dispatch,
    createContext,
    SetStateAction,
    useContext,
} from "react";

type TodoContext = {
    startWithLatest: boolean;
    setStartWithLatest: Dispatch<SetStateAction<boolean>>;
};
const todoContext = createContext({} as TodoContext);

export const useTodoContext = () => useContext(todoContext)

export default todoContext