import { FormCadastro } from "@/components/partials/fornecedor/form-cadastro"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"


export function ModalCadastro() {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Cadastrar Fornecedor</DialogTitle>
        <DialogDescription>
          Faça o cadastro de um fornecedor preenchendo os campos abaixo.
        </DialogDescription>
      </DialogHeader>

      <FormCadastro />
    </DialogContent>
  )
}
