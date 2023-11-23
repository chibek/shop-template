import { cn } from "@/lib/utils";
import { type Column } from "@tanstack/react-table";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

const SORT_OPTION = {
  desc: "desc",
  asc: "asc",
  default: "default",
} as const;

const BUTTON_ARIA_LABEL = {
  [SORT_OPTION.desc]: "Sorted descending. Click to sort ascending.",
  [SORT_OPTION.asc]: "Sorted ascending. Click to sort descending.",
  [SORT_OPTION.default]: "Not sorted. Click to sort ascending.",
} as const;

const SORT_ICONS = {
  [SORT_OPTION.desc]: (
    <ArrowDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
  ),
  [SORT_OPTION.asc]: (
    <ArrowUpIcon className="ml-2 h-4 w-4" aria-hidden="true" />
  ),
  [SORT_OPTION.default]: (
    <CaretSortIcon className="ml-2 h-4 w-4" aria-hidden="true" />
  ),
} as const;

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const isSorted =
    column.getIsSorted() === false ? "default" : column.getIsSorted();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              isSorted ? BUTTON_ARIA_LABEL[isSorted] : BUTTON_ARIA_LABEL.default
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {isSorted ? SORT_ICONS[isSorted] : SORT_ICONS.default}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="Sort ascending"
            onClick={() => column.toggleSorting(false)}
            className={cn(isSorted === SORT_OPTION.asc && "bg-accent")}
          >
            <ArrowUpIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Sort descending"
            onClick={() => column.toggleSorting(true)}
            className={cn(isSorted === SORT_OPTION.desc && "bg-accent")}
          >
            <ArrowDownIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Reset sorting"
            onClick={() => column.clearSorting()}
            className={cn(isSorted === SORT_OPTION.default && "bg-accent")}
          >
            <CaretSortIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Default
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Hide column"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeNoneIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
