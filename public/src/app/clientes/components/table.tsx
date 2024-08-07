'use client'

import { ModalCadastro } from "@/components/partials/cliente/modal-cadastro";
import { ModalEditarCliente } from "@/components/partials/cliente/modal-editar-cliente";
import ModalTodasInformacoes from "@/components/partials/cliente/modal-todas-informacoes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

export type ClientType = {
  id: string;
  nome: string;
  email: string;
  telefone: number;
  rua: string;
  numero: number;
  cidade: string;
  bairro: string;
  estado: string;
  cpf: string | null;
  cnpj: string | null;
};

export const DataTable: React.FC = () => {
  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [clients, setClients] = React.useState<ClientType[]>([]);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token não encontrado");
      }
  
      const response = await fetch("http://localhost:5672/client", {
        headers: {
          Authorization: `${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
  
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } 
  };

  React.useEffect(() => {
    fetchClients();
  }, []);

  const deleteClient = async (identifier: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token não encontrado");
      }
  
      const response = await fetch(`http://localhost:5672/client/${identifier}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao deletar cliente");
      }
  
      setClients(clients.filter(client => client.id !== identifier));
      toast({
        title: "Sucesso",
        description: "Cliente removido com sucesso",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Erro ao remover cliente:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao remover o cliente",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<ClientType>[] = [
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
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div>{row.getValue("email")}</div>
        </div>
      ),
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div>{row.getValue<number>("telefone").toString().replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")}</div>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original;

        return (
          <div className="flex justify-end space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button title={"Todas informações de " + client.nome} variant="ghost" className="shadow-sm">
                  <InfoIcon className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <ModalTodasInformacoes client={client} />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button title={"Editar cadastro de " + client.nome} variant="ghost" className="shadow-sm">
                  <EditIcon className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <ModalEditarCliente client={client} />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button title={"Deletar cadastro de " + client.nome} variant="ghost" className="shadow-sm">
                  <TrashIcon className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[325px]">
                <DialogHeader>
                  <DialogTitle>Deletar cliente</DialogTitle>
                  <DialogDescription>
                    Deseja realmente deletar o cliente <strong>{client.nome}</strong>?
                  </DialogDescription>
                </DialogHeader>
                <DialogClose className="flex flex-row justify-between">
                  <Button variant="default">Cancelar</Button>
                  <Button onClick={() => deleteClient(client.id)} variant="destructive">Deletar</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: clients,
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
                    <TableCell key={cell.id} className="py-2 px-4">
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
  );
};

export default DataTable;
