"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  code: z.string().min(1, "Digire o código.").max(50, "O código deve ter no máximo 50 caracteres."),
  name: z.string().min(1, "Digite o nome.").max(50, "O nome deve ter no máximo 50 caracteres."),
  description: z.string().min(1, "Digite a descrição.").max(50, "A descrição deve ter no máximo 50 caracteres."),
  stock: z.string().transform(value => parseInt(value, 10))
})

export function FormCadastro() {
  const { toast } = useToast();
  const formRegister = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      stock: 0,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch("http://localhost:5672/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || "Erro ao cadastrar produto");
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
    <Form {...formRegister}>
      <form className="space-y-2" onSubmit={formRegister.handleSubmit(onSubmit)}>
        <FormField
          control={formRegister.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Código</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Código do Produto" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={formRegister.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Nome</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={formRegister.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Descrição</FormLabel>
                <FormControl className="col-span-3">
                  <textarea maxLength={500}  className="flex h-24 w-full rounded-md resize-none border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Descrição do produto" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={formRegister.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Quantidade Em Estoque</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" min={0} placeholder="0" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        
        {/* <FormField
          control={formRegister.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Preço (R$)</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" min={0}  placeholder="0.00" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        <Separator className="w-full px-5" />
        <FormField
          control={formRegister.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Imagem</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="file" />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        /> */}
        
        <div className="flex items-end justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}