import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

type Props = PropsWithChildren & {
  className: string;
  toolTip?: string;
  handleClick?: () => void;
};
export default function ButtonWithToolTip({
  children,
  className,
  toolTip,
  handleClick,
}: Props) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={cn("bg-slate-900 text-white rounded-sm p-2 py-1 h-fit", className)}
            onClick={handleClick}
          >
            {children}
          </TooltipTrigger>
          <TooltipContent>
            <p className="bg-slate-800 text-slate-50 p-1 px-2 rounded-sm">
              {toolTip}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
