import { Loader2 as Loader } from "lucide-react";
import { PropsWithChildren } from "react";

type Props = {
  isLoading: boolean;
  error: Error | null;
} & PropsWithChildren;

const LoaderErrorCheck = ({ isLoading, error, children }: Props) => {
  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  if (error) {
    return error.message;
  }

  return <> {children} </>;
};

export default LoaderErrorCheck;
