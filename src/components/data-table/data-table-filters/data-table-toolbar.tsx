"use client";

import * as React from "react";
import Link from "next/link";
import { Cross2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-filters/data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-facete-filter";
import { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchParams } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  newRowLink?: string;
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>;
}

export function DataTableToolbar<TData>({
  table,
  newRowLink,
  deleteRowsAction,
  filterableColumns = [],
  searchableColumns,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams();
  const column = searchableColumns ? String(searchableColumns.id) : "";
  const searchParam = searchParams.get(column);

  const tableColumn =  table.getColumn(column);
  const columnValue = tableColumn?.getFilterValue() as string ?? "";
  const [searchValue, setSearchValue] = React.useState(columnValue);
  const debounceSearchValue = useDebounce<string>(searchValue, 250);


  React.useEffect(()=> {
    setSearchValue(searchParam ?? "")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(()=> {
    tableColumn?.setFilterValue(debounceSearchValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchValue])

  
  const handlerOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetHandler = () => {
    setSearchValue("");
  }

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns && (
              <Input
              placeholder={`Filter ${searchableColumns.title}...`}
              value={searchValue}
              onChange={handlerOnChangeSearch}
              className="h-8 w-[150px] lg:w-[250px]"
            />  
              )
          }
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  title={column.title}
                  options={column.options}
                />
              )
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={resetHandler}
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
          <Button
            aria-label="Delete selected rows"
            variant="outline"
            size="sm"
            className="h-8"
            onClick={(event) => {
              startTransition(() => {
                table.toggleAllPageRowsSelected(false);
                deleteRowsAction(event);
              });
            }}
            disabled={isPending}
          >
            <TrashIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Delete
          </Button>
        ) : newRowLink ? (
          <Link aria-label="Create new row" href={newRowLink}>
            <div
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "h-8",
                })
              )}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              New
            </div>
          </Link>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
