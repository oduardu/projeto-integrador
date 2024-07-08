'use client'

import { ModalCadastro } from "@/components/partials/produto/modal-cadastro";
import { ModalEditarProduto } from "@/components/partials/produto/modal-editar-produto";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CaretSortIcon,
  PlusIcon
} from "@radix-ui/react-icons";
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
} from "@tanstack/react-table";
import { EditIcon, TrashIcon } from "lucide-react";
import * as React from "react";

export type ProductType = {
  codigo: string;
  nome: string;
  descricao: string;
  quantidade_estoque: number;
};

export const DataTable: React.FC = () => {
  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [products, setProducts] = React.useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5672/product");
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (identifier: string) => {
    try {
      const response = await fetch(`http://localhost:5672/product/${identifier}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar produto");
      }
      setProducts(products.filter(product => product.codigo !== identifier));
      toast({
        title: "Sucesso",
        description: "Produto removido com sucesso",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Erro ao remover produto:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao remover o produto",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "codigo",
      header: "Código",
      cell: ({ row }) => <div className="text-left">{row.getValue("codigo")}</div>,
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }) => <div className="text-left">{row.getValue("nome")}</div>,
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: ({ row }) => <div className="text-left">{row.getValue("descricao")}</div>,
    },
    {
      accessorKey: "quantidade_estoque",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-center w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade Em Estoque (em litros)
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-center">{row.getValue("quantidade_estoque")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex justify-end space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button title={"Editar cadastro de " + product.nome} variant="ghost" className="shadow-sm">
                  <EditIcon className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <ModalEditarProduto product={product} />
            </Dialog>
            <Button title={"Deletar cadastro de " + product.nome} variant="ghost" className="shadow-sm" onClick={() => deleteProduct(product.codigo)}>
              <TrashIcon className="h-6 w-6" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
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
  });

  return (
    <div className="w-full">
      <div className="flex justify-between py-4">
        <Input
          placeholder="Pesquise pelo nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="ml-auto shadow-sm">
              Cadastrar <PlusIcon className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <ModalCadastro />
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-left">
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
                  className="h-12 text-center"
                >
                  Nenhum produto encontrado...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end space-x-2 py-4">
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
  );
};

export default DataTable;
