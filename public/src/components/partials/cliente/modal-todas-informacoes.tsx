import React, { FC } from 'react'; // Step 1: Import FC
import { DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { FormCadastro } from "./form-cadastro";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type ClientType = {
  nome: string;
  email: string;
  telefone: number;
  rua: string;
  numero: number;
  cidade: string;
  estado: string;
  cpf: string;
  cnpj: string;
};

// Step 2: Define the props for your component
type ModalTodasInformacoesProps = {
  client: ClientType;
};

// Step 3: Use these props in your component
const ModalTodasInformacoes: FC<ModalTodasInformacoesProps> = ({ client }) => {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Informações de {client.nome}</DialogTitle>
      </DialogHeader>
      <div className="space-y-2">
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Nome</Label>
          <Input value={client.nome} className='col-span-3' disabled />
        </div>
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Mail</Label>
          <Input value={client.email} className='col-span-3' disabled />
        </div>
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Telefone</Label>
          <Input value={client.telefone.toString().replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")} className='col-span-3' disabled />
        </div>
        {client.cpf != null && client.cnpj == null ? (
          <div className="grid grid-cols-5 items-center gap-4">
            <Label className='text-right'>Cpf</Label>
            <Input value={client.cpf.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")} className='col-span-3' disabled />
          </div>
        ) : (
          <div className="grid grid-cols-5 items-center gap-4">
            <Label className='text-right'>Cnpj</Label>
            <Input value={client.cnpj.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3\\$4-$5")} className='col-span-3' disabled />
          </div>  
        )}
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Rua</Label>
          <Input value={client.rua} className='col-span-3' disabled />
        </div>
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Cidade</Label>
          <Input value={client.cidade} className='col-span-3' disabled />
        </div>
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Estado</Label>
          <Input value={client.estado} className='col-span-3' disabled />
        </div>
      </div>
      <DialogTrigger className='flex justify-end'>
        <Button variant="outline">Close</Button>
      </DialogTrigger>
    </DialogContent>
  );
};

export default ModalTodasInformacoes;