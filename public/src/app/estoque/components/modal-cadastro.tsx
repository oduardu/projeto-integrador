import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FormCadastro } from "./form-cadastro"


export function ModalCadastro() {
  return (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Recebimento</DialogTitle>
              <DialogDescription>
                Faça o cadastro de novos recebimentos de uva.
              </DialogDescription>
            </DialogHeader>
            <FormCadastro />
          </DialogContent>
  )
}
