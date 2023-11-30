import { type DataTableSearchableColumn } from "@/types";
import { useCreateQueryString } from "./useCreateQueryString";
import { type ColumnFiltersState } from "@tanstack/react-table";
import { useEffect } from "react";

interface DataTableFilters<TData> {
  searchableColumns?: DataTableSearchableColumn<TData>;
  columnFilters: ColumnFiltersState;
}
export function useSearchFilter<TData>({
  searchableColumns,
  columnFilters,
}: DataTableFilters<TData>) {
  const { pathname, createQueryString, router } = useCreateQueryString();

  const column = columnFilters.find(
    (filter) => searchableColumns?.id === filter.id
  );


  useEffect(
    () => {
      if (column && typeof column.value === "string") {
        router.push(
          `${pathname}?${createQueryString({
            page: 1,
            [column.id]: typeof column.value === "string" ? column.value : null,
          })}`,
          {
            scroll: false,
          }
        );
      }
      if(searchableColumns && !column){
        router.push(
          `${pathname}?${createQueryString({
            page: 1,
            [searchableColumns.id]: null,
          })}`,
          {
            scroll: false,
          }
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column]
  );
}
