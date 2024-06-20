import CadastrarCliente from "@/components/partials/buttons/cadastrar-cliente";
import SelectClientes from "@/components/partials/selects/clientes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function InformacoesCliente({...props}) {
  return (
    <div {...props}>
      <div className="mb-10">
        <h1 className="text-2xl">Informações do Cliente</h1>
      </div>
      <div className="flex flex-col gap-5 w-full">
      <div className="grid w-full max-w-sm items-center gap-3.5 text-start">
        <Label htmlFor="customer">Cliente</Label>
          <div className="flex flex-row items-start gap-4">
            <SelectClientes />
            <CadastrarCliente />
          </div>
      </div>
      <div className="flex flex-row w-[15rem] items-center gap-2">
        <Separator /> ou <Separator />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3.5 text-start">
        <Label htmlFor="name">Nome</Label>
        <Input type="text" id="name" placeholder="Nome Completo" className="w-[18rem]" />
      </div>
      <div className="flex flex-row gap-5">
          <div className="grid w-full max-w-sm items-center gap-3.5 text-start">
            <Label htmlFor="phone">Telefone</Label>
            <Input type="number" id="phone" placeholder="Telefone" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3.5 text-start">
            <Label htmlFor="cpf">CPF</Label>
            <Input type="number" id="cpf" placeholder="CPF" />
          </div>
        </div>
      </div>
    </div>
  );
}