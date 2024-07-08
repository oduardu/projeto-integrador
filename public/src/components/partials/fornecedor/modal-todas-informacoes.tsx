import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react'; // Step 1: Import FC

type SupplierType = {
  cnpj: string;
  nome: string;
  rua: string;
  numero: number;
  cidade: string;
  estado: string;
};

// Step 2: Define the props for your component
type ModalTodasInformacoesProps = {
  supplier: SupplierType;
};

// Step 3: Use these props in your component
const ModalTodasInformacoes: FC<ModalTodasInformacoesProps> = ({ supplier }) => {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Informações de {supplier.nome}</DialogTitle>
      </DialogHeader>
      <div className="space-y-2">
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Nome</Label>
          <Input value={supplier.nome} className='col-span-3' readOnly />
        </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label className='text-right'>CNPJ</Label>
            <Input value={supplier.cnpj.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3\\$4-$5")} className='col-span-3' readOnly />
          </div> 
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Rua</Label>
          <Input value={supplier.rua} className='col-span-3' readOnly />
        </div>
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Número</Label>
          <Input value={supplier.numero} className='col-span-3' readOnly />
        </div>
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Cidade</Label>
          <Input value={supplier.cidade} className='col-span-3' readOnly />
        </div>
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className='text-right'>Estado</Label>
          <Input value={supplier.estado} className='col-span-3' readOnly />
        </div>
      </div>
      <DialogTrigger className='flex justify-end'>
        <Button variant="outline">Fechar</Button>
      </DialogTrigger>
    </DialogContent>
  );
};

export default ModalTodasInformacoes;