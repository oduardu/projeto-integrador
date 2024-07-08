// Importações necessárias
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

// Esquema de validação para o formulário
const formSchema = z.object({
  code: z.string().min(3, { message: ''}).max(10),
  name: z.string().min(3, { message: ''}).max(50),
  description: z.string().min(3, { message: ''}).max(50),
  stock: z.string()
})

type ProductType = {
  codigo: string;
  nome: string;
  descricao: string;
  quantidade_estoque: number;
};

export function FormEditarCadastro({ product }: { product: ProductType }) {
  const { toast } = useToast();
  const formRegister = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: product.codigo, 
      name: product.nome, 
      description: product.descricao, 
      stock: product.quantidade_estoque.toString(), 
    },
  })

  // Função para lidar com o envio do formulário
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const cleanedData = {
      ...data,
      stock: parseInt(data.stock, 10)
    };

    try {
      const response = await fetch(`http://localhost:5672/product/${product.codigo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

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
      console.error("Erro ao editar produto:", error);
      
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
        {/* Campos do formulário */}
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
        
        <div className="flex items-end justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}
