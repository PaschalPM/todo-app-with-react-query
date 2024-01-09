import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PropsWithChildren } from "react";

type Props = {
  action: () => void;
} & PropsWithChildren;

export function DeleteAllTodoBtnWithModal({ children, action }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
        {/* <Button variant="outline">Show Dialog</Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your
            todos from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={action}>Yes</AlertDialogAction>
          <AlertDialogCancel>No</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
