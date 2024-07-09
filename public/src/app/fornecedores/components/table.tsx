'use client'

import { ModalCadastro } from "@/components/partials/fornecedor/modal-cadastro";
import { ModalEditarFornecedor } from "@/components/partials/fornecedor/modal-editar-fornecedor";
import ModalTodasInformacoes from "@/components/partials/fornecedor/modal-todas-informacoes";
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
import { EditIcon, InfoIcon, TrashIcon } from "lucide-react";
import * as React from "react";

export type SupplierType = {
  cnpj: string;
  nome: string;
  rua: string;
  numero: number;
  cidade: string;
  estado: string;
};

export const DataTable: React.FC = () => {
  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [suppliers, setSuppliers] = React.useState<SupplierType[]>([]);

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token não encontrado");
      }
  
      const response = await fetch("http://localhost:5672/supplier", {
        headers: {
          Authorization: `${token}`,
        },  
      });
  
      if (!response.ok) {
        throw new Error("Erro ao buscar fornecedores");
      }
  
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  React.useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (identifier: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token não encontrado");
      }
  
      const response = await fetch(`http://localhost:5672/supplier/${identifier}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao remover fornecedor");
      }
  
      setSuppliers(suppliers.filter(supplier => supplier.cnpj !== identifier));
      toast({
        title: "Sucesso",
        description: "Fornecedor removido com sucesso",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Erro ao deletar fornecedor:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao remover o fornecedor",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<SupplierType>[] = [
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="capitalize">{row.getValue("nome")}</div>
        </div>
      ),
    },
    {
      accessorKey: "cnpj",
      header: "CNPJ",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="capitalize">{row.getValue<string>("cnpj").replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</div>
        </div>
      ),
    },
    {
      accessorKey: "cidade",
      header: "Cidade",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="capitalize">{row.getValue("cidade")}</div>
        </div>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.getValue("estado")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const supplier = row.original;

        return (
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button title={"Todas informações de " + supplier.nome} variant="ghost" className="shadow-sm">
                  <InfoIcon className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <ModalTodasInformacoes supplier={supplier} />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button title={"Editar cadastro de " + supplier.nome} variant="ghost" className="shadow-sm">
                  <EditIcon className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <ModalEditarFornecedor supplier={supplier} />
            </Dialog>
            <Button title={"Deletar cadastro de " + supplier.nome} variant="ghost" className="shadow-sm"  onClick={() => deleteSupplier(supplier.cnpj)}>
              <TrashIcon className="h-6 w-6" />
            </Button>
          </div>
        );
      },
    },
  ];

  // Configuração da tabela usando o React Table
  const table = useReactTable({
    data: suppliers,
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
                  <TableHead key={header.id}>
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
                  className="h-12 text-center"
                >
                  Nenhum fornecedor encontrado...
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
  );
};

export default DataTable;
