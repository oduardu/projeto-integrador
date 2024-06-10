"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useState } from "react"
import ReactInputMask from "react-input-mask"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(3, { message: ''}).max(50),
  email: z.string().min(3, { message: ''}).max(50),
  phone: z.string().min(2, { message: ''}).max(11),
  cpf: z.string().min(11, { message: ''}).max(11).optional(),
  cnpj: z.string().min(14, { message: ''}).max(14, { message: ''}).optional(),
  nameCompany: z.string().min(2).max(50).optional(),
})

export function FormCadastro() {
  const [identifier, changeIndetifier] = useState('cpf')

  const formRegister = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      cnpj: "",
      nameCompany: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Remover máscaras antes de enviar os dados
    const cleanedData = {
      ...data,
      phone: data.phone.replace(/\D/g, ''),
      cpf: data.cpf?.replace(/\D/g, ''),
      cnpj: data.cnpj?.replace(/\D/g, ''),
    }

    toast({
      title: "Você enviou os seguintes valores:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(cleanedData, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...formRegister}>
      <form className="space-y-2" onSubmit={formRegister.handleSubmit(onSubmit)}>
        <FormField
          control={formRegister.control}
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
          control={formRegister.control}
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
          control={formRegister.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Telefone</FormLabel>
                <FormControl className="col-span-3">
                  <ReactInputMask mask="(99) 99999-9999" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="(00) 00000-0000">
                    {(inputProps) => <Input {...inputProps} />}
                  </ReactInputMask>
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        
        <Separator className="w-full px-5" />

        <div className="grid grid-cols-5 items-center gap-4">
          <Label className="text-right">Identificação</Label>
          <Select defaultValue="cpf" onValueChange={(value) => changeIndetifier(value)}>
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
            control={formRegister.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-5 items-center gap-4">
                  <FormLabel className="text-right">CPF</FormLabel>
                  <FormControl className="col-span-3">
                    <ReactInputMask mask="999.999.999-99" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="000.000.000-00">
                      {(inputProps) => <Input {...inputProps} />}
                    </ReactInputMask>
                  </FormControl>
                </div>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={formRegister.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-5 items-center gap-4">
                  <FormLabel className="text-right">CNPJ</FormLabel>
                  <FormControl className="col-span-3">
                    <ReactInputMask mask="99.999.999/9999-99" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="00.000.000/0000-00">
                      {(inputProps) => <Input {...inputProps} />}
                    </ReactInputMask>
                  </FormControl>
                </div>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        )}

        <div className="flex items-end justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}
