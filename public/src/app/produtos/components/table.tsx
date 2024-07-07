"use client"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DotsHorizontalIcon,
  PlusIcon
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
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ModalCadastro } from "./modal-cadastro"

export type ClientType = {
  codigo: string
  name: string 
  descricao: string
  quantidade_estoque: number
}

export const columns: ColumnDef<ClientType>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <div className="text-center">
          Nome
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {row.getValue("nome")}
      </div>
    ),
  },
  {
    accessorKey: "descricao",
    header: ({ column }) => {
      return (
        <div className="text-center">
          Descrição
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {row.getValue("descricao")}
      </div>
    ),
  },
  {
    accessorKey: "quantidade_estoque",
    header: ({ column }) => {
      return (
        <div className="text-center">
          Quantidade em Estoque (Garrafa)
        </div>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("quantidade_estoque")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-4 p-0">
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
  const [data, setData] = React.useState<ClientType[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5672/product")
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
      }
    }
    fetchData()
  }, [])

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
      <div className="flex justify-end py-4">
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
