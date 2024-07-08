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

export function FormCadastro() {
  const { toast } = useToast();

  const [identifier, changeIdentifier] = useState('cpf');
  const [selectedState, setSelectedState] = useState("AC");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      cnpj: "",
      street: "",
      number: "",
      state: "",
      district: "",
      city: "",
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
      const response = await fetch('http://localhost:5672/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Erro ao cadastrar cliente");
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
      console.error("Erro ao cadastrar produto:", error);
      
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
                  <Input placeholder="mail@mail.com" {...field} />
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
                  <ReactInputMask mask="(99) 99999-9999" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="(00) 00000-0000">
                    {(inputProps: Props) => <Input {...inputProps} />}
                  </ReactInputMask>
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-5 items-center gap-4">
          <Label className="text-right">Identificação</Label>
          <Select defaultValue="cpf" onValueChange={(value) => changeIdentifier(value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecione a identificação" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="cpf">CPF</SelectItem>
                <SelectItem value="cnpj">CNPJ</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {identifier === 'cpf' ? (
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-5 items-center gap-4">
                  <FormLabel className="text-right">CPF</FormLabel>
                  <FormControl className="col-span-3">
                    <ReactInputMask mask="999.999.999-99" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="000.000.000-00">
                      {(inputProps: Props ) => <Input {...inputProps} />}
                    </ReactInputMask>
                  </FormControl>
                </div>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-5 items-center gap-4">
                  <FormLabel className="text-right">CNPJ</FormLabel>
                  <FormControl className="col-span-3">
                    <ReactInputMask mask="99.999.999/9999-99" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="00.000.000/0000-00">
                      {(inputProps: Props) => <Input {...inputProps} />}
                    </ReactInputMask>
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
                  <Input placeholder="Bairo Exemplo" {...field} />
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
