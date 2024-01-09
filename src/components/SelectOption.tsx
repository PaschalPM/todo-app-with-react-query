import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  handleValueChange: (value: string) => void;
};
export function SelectOption({ handleValueChange }: Props) {
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-slate-50">
        <SelectValue placeholder="Filter Tasks" />
      </SelectTrigger>
      <SelectContent className="bg-slate-50">
        <SelectGroup>
          <SelectLabel>Filter</SelectLabel>
          <SelectItem value={'0'}>All</SelectItem>
          <SelectItem value={'1'}>Unfulfilled</SelectItem>
          <SelectItem value={'2'}>Completed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
