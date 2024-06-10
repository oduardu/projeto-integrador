"use client"

import * as React from "react"
import {
  CaretSortIcon,
  PlusIcon,
  DotsHorizontalIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModalCadastro } from "./modal-cadastro"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

const data: ClientType[] = [
  {
    id: "m5gr84i9",
    fullName: "Eduardo Pazzini Zancanaro",
    email: "e.pazzini@icloud.com",
    avatar: "https://github.com/oduardu.png",
  },
]

export type ClientType = {
  id: string
  fullName: string
  avatar: string
  email: string
}

export const columns: ColumnDef<ClientType>[] = [
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => {
      return (
        <Avatar className="w-6 h-6">
          <AvatarImage src={row.getValue('avatar')} alt={`Foto de ${row.getValue('fullName')}`} />
          <AvatarFallback>
          {row.getValue('fullName') ? (row.getValue<string>('fullName').match(/(\b\S)?/g) || []).join("").match(/(^\S|\S$)?/g)?.join("").toUpperCase() : 'U'}
        </AvatarFallback>
      </Avatar>
      )
    },
  },
  {
    accessorKey: "fullName",
    header: "Nome",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="capitalize">{row.getValue("fullName")}</div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar Cadastro</DropdownMenuItem>
            <DropdownMenuItem>Todas Informações</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex justify-between py-4">
        <Input
          placeholder="Pesquise pelo nome..."
          value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fullName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="ml-auto shadow-sm">
              Cadastrar <PlusIcon className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <ModalCadastro />
        </Dialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum cliente encontrado...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeftIcon aria-placeholder="Voltar para página anterior" className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRightIcon aria-placeholder="Avançar para próxima página" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}