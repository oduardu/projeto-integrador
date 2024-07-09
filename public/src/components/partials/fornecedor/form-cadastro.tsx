import { EstadosBrasil } from "@/components/estados-brasil";
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
import ReactInputMask, { Props } from "react-input-mask";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Digite o nome.").max(50, "O nome deve ter no máximo 50 caracteres"),
  cnpj: z.string().min(18, "O CNPJ deve ter 18 caracteres").max(18, "O CNPJ deve ter 18 caracteres"),
  city: z.string().min(1, "Digite a cidade.").max(50, "A cidade deve ter no máximo 50 caracteres."),
  state: z.string(),
  street: z.string().min(1, "Digite a rua.").max(50, "A rua deve ter no máximo 60 caracteres."),
  district: z.string().min(1, "Digite o bairro.").max(50, "O bairro deve ter no máximo 50 caracteres."),
  number: z.string().min(1, "Digite o número."),
});

export function FormCadastro() {
  const { toast } = useToast();

  const [selectedState, setSelectedState] = useState("SC");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cnpj: "",
      street: "",
      number: "",
      district: "",
      state: "",
      city: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const cleanedData = {
      ...data,
      number: parseInt(data.number, 10),
      state: selectedState, 
    };

    try {
      const response = await fetch("http://localhost:5672/supplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar fornecedor");
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Erro ao cadastrar fornecedor");
      }

      toast({
        title: responseData.title,
        description: responseData.description,
        type: "background",
        variant: "default", 
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000); 

    } catch (error: any) {
      console.error("Erro ao cadastrar fornecedor:", error);
      
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
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">CNPJ</FormLabel>
                <FormControl className="col-span-3">
                  <ReactInputMask
                    mask="99.999.999/9999-99"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="00.000.000/0000-00"
                  >
                    {(inputProps: Props) => <Input {...inputProps} />}
                  </ReactInputMask>
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <Separator className="w-full px-5" />
        
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Rua</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Rua Exemplo" {...field} />
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
                  <Input placeholder="123" {...field} />
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