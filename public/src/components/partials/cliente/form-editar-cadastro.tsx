import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email().min(3).max(50),
  phone: z.string(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  city: z.string(),
  state: z.string(),
  street: z.string(),
  district: z.string(),
  number: z.string().min(1).max(5)
});

type ClientType = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
  cidade: string;
  estado: string;
  bairro: string;
  cpf: string | undefined;
  cnpj: string | undefined;
};

export function FormEditarCliente({ client }: { client: ClientType }) {
  const { toast } = useToast();
  const EstadosBrasil = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ];

  const [selectedState, setSelectedState] = useState(client.estado);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client.nome,
      email: client.email,
      phone: client.telefone,
      cpf: client.cpf,
      cnpj: client.cnpj,
      street: client.rua,
      number: client.numero.toString(),
      city: client.cidade,
      district: client.bairro,
      state: client.estado
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const finalData = {
      ...data,
      number: parseInt(data.number, 10),
      phone: parseInt(data.phone.replace(/\D/g, ""), 10),
      state: selectedState,
    };

    try {
      const response = await fetch(`http://localhost:5672/client/${client.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar cliente");
      }

      const responseData = await response.json();

      toast({
        title: responseData.title,
        description: responseData.description,
        type: "background",
        variant: "default",
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error: any) {
      console.error("Erro ao editar cliente:", error);

      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro inesperado.",
        type: "background",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Nome</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Nome Completo" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Email</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="email@exemplo.com" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Telefone</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        {client.cpf && (
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-5 items-center gap-4">
                  <FormLabel className="text-right">CPF</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="000.000.000-00" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        )}

        {client.cnpj && (
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-5 items-center gap-4">
                  <FormLabel className="text-right">CNPJ</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="00.000.000/0000-00" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        )}

        <Separator className="w-full px-5" />

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Rua</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Rua A" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Número</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" placeholder="123" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Bairro</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Bairro Exemplo" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Cidade</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Chapecó" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-5 items-center gap-4">
          <Label className="text-right">Estado</Label>
          <Select
            defaultValue={selectedState}
            onValueChange={(value) => setSelectedState(value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {EstadosBrasil.map((estado) => (
                  <SelectItem
                    key={estado.value}
                    value={estado.value}
                  >
                    {estado.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        

        <div className="flex items-end justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  );
}
