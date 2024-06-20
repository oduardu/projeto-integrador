"use client"

import { Input } from "@/components/ui/input"
import { format } from "date-fns"
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
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

const formSchema = z.object({
  codeSupplier: z.string().min(3, { message: ''}).max(50),
  grapeType: z.string().min(3, { message: ''}).max(50),
  grapeStock: z.number().min(3, { message: ''}).positive(),
  reciveDt: z.date(),
})

export function FormCadastro() {
  const formRegister = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codeSupplier: "",
      grapeType: "",
      grapeStock: 0,
      reciveDt: undefined,
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
          name="codeSupplier"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Código do Fornecedor</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Código do Fornecedor" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={formRegister.control}
          name="grapeType"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Tipo da Uva</FormLabel>
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
          name="grapeStock"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel className="text-right">Quantidade De Uvas (KG)</FormLabel>
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
          name="reciveDt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="grid grid-cols-5 items-center gap-4">
                <FormLabel>Data de Recebimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[271px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a Data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              <FormMessage />
              </div>
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
