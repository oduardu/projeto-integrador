import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FormCadastro } from "@/components/partials/cliente/form-cadastro"

type ClienteType = {
  nome: string;
  email: string;
  telefone: number;
  rua: string;
  numero: number;
  cidade: string;
  estado: string;
  cpf: string | null;
  cnpj: string | null;
}

export function ModalEditarCliente({ cliente }: { cliente: ClienteType }) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogDescription>
          Faça o cadastro de um cliente preenchendo os campos abaixo.
        </DialogDescription>
      </DialogHeader>

      <FormCadastro cliente={cliente} />
    </DialogContent>
  )
}
