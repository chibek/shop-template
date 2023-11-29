"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/db/schema";
import { catchError, catchPromiseError, formatDate, formatPrice } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { startTransition, useMemo, useState, useTransition } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { toast } from "sonner";
import { deleteProduct } from "@/app/api/products/service";

interface ProductsTableShellProps {
  data: Product[];
  pageCount: number;
}

export default function ProductsTable({
  data,
  pageCount,
}: ProductsTableShellProps) {
  const [isPending, startTransition] = useTransition()
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const columns = useMemo<ColumnDef<Product, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row.id)
              );
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.id]
                  : prev.filter((id) => id !== row.original.id)
              );
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
      },
      {
        accessorKey: "stock",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Stock" />
        ),
      },
      {
        accessorKey: "rating",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rating" />
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        id: "actions",
        cell: ({ row }) => <ProductTableActions row={row} isPending={isPending}/>
      }
    ],
    [data, isPending]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      searchableColumns={{id: "name", title: "name"}}
      newRowLink="/admin/products/new"
    />
  );
}

interface ProductTableActions {
  row: Row<Product>,
  isPending: boolean
}

function ProductTableActions({row,isPending}:ProductTableActions){
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        aria-label="Open menu"
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-[160px]">
      <DropdownMenuItem asChild>
        <Link
          href={`/admin/products/${row.original.id}`}
        >
          Edit
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={`/product/${row.original.id}`}>View</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => {
          startTransition(() => {
            row.toggleSelected(false)
            toast.promise(
              deleteProduct({
                id: row.original.id,
              }),
              {
                loading: "Deleting...",
                success: () => "Product deleted successfully.",
                error: (err: unknown) => catchPromiseError(err),
              }
            )
          })
        }}
        disabled={isPending}
      >
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}