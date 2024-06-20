"use client"

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  code: z.string().min(3, { message: ''}).max(10),
  name: z.string().min(3, { message: ''}).max(50),
  description: z.string().min(3, { message: ''}).max(50),
  bottlesStock: z.number().min(3, { message: ''}).positive(),
  image: z.string().min(2, { message: ''}).max(15),
  price: z.number().min(1).positive(),
})

export function FormCadastro() {
  const formRegister = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      bottlesStock: 0,
      image: "",
      price: 0
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    toast({
      title: "Você enviou os seguintes valores:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

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
          name="bottlesStock"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Quantidade De Garrafas</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" min={0} placeholder="0" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        
        <FormField
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
        />
        
        <div className="flex items-end justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}
