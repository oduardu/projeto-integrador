import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DetalhesEmbalagem({...props}) {
  return (
    <div {...props}>
      <div className="mb-10">
        <h1 className="text-2xl">Detalhes de Embalagem</h1>
      </div>
      <div className="flex flex-col gap-5 w-full">
      <div className="grid w-full max-w-sm items-center gap-3.5 text-start">
        <Label htmlFor="typeBox">Tipo de Embalagem</Label>
        <Select>
          <SelectTrigger id="typeBox" className="w-[180px]">
            <SelectValue placeholder="Selecione Embalagem" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="box">Caixa</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-5">
          <div className="grid w-full max-w-sm items-center gap-3.5 text-start">
            <Label htmlFor="state">Estado</Label>
            <Input type="text" id="state" placeholder="Estado" className="w-[18rem]" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3.5 text-start">
            <Label htmlFor="cep">CEP</Label>
            <Input type="number" id="cep" placeholder="CEP" className="w-[8rem]" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3.5 text-start">
            <Label htmlFor="number">Número</Label>
            <Input type="number" id="number" placeholder="Número" className="w-[8rem]" />
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-3.5 text-start">
          <Label htmlFor="specialInstructions">Instruções Especiais</Label>
          <Textarea id="specialInstructions" placeholder="Instruções Especiais" className="resize-none" />
        </div>
      </div>
    </div>
  )
}