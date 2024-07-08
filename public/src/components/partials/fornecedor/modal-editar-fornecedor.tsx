import { FormEditarCadastro } from "@/components/partials/fornecedor/form-editar-cadastro";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

type SupplierType = {
  cnpj: string;
  nome: string;
  rua: string;
  numero: number;
  cidade: string;
  estado: string;
};

export function ModalEditarFornecedor({ supplier }: { supplier: SupplierType }) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Editar Fornecedor</DialogTitle>
        <DialogDescription>
          Edite o cadastro de um fornecedor preenchendo os campos abaixo.
        </DialogDescription>
      </DialogHeader>

      <FormEditarCadastro supplier={supplier} />
    </DialogContent>
  )
}
