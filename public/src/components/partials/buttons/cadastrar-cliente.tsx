import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { ModalCadastro } from "@/components/partials/cliente/modal-cadastro";

export default function CadastrarCliente() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-auto shadow-sm">
          Cadastrar <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <ModalCadastro />
    </Dialog>
  )
}