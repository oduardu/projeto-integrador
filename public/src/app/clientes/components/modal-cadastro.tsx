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
              <DialogTitle>Cadastrar Cliente</DialogTitle>
              <DialogDescription>
                Faça o cadastro de um cliente preenchendo os campos abaixo.
              </DialogDescription>
            </DialogHeader>
            
            <FormCadastro />
          </DialogContent>
  )
}
