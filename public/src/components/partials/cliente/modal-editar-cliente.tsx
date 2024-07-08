import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FormEditarCliente } from "../cliente/form-editar-cadastro";

type ClientType = {
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

export function ModalEditarCliente({ client }: { client: ClientType }) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogDescription>
          Faça o cadastro de um cliente preenchendo os campos abaixo.
        </DialogDescription>
      </DialogHeader>

      <FormEditarCliente client={client} />
    </DialogContent>
  )
}
