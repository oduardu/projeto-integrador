import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { PersonIcon } from "@radix-ui/react-icons";
import { Link, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "recharts";
import { z, ZodError } from "zod";

type ReturnJsonApi = {
  title: string;
  description: string;
}

const formSchema = z.object({
  name: z.string().min(1, "Insira o nome."),
  email: z.string().email("Digite um email válido."),
  password: z.string().min(1, "Insira uma senha.")
});

export default function MyAccount() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5672/auth/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: ReturnJsonApi = await response.json();

      toast({
        title: data.title,
        description: data.description,
        type: "background",
        variant: response.ok ? "default" : "destructive",
      });

    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar usuário",
        type: "background",
        variant: "destructive",
      });
    }
  };


  return (
    <div>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2" title="Minha Conta">
          <PersonIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-100 dark:bg-zinc-900 p-10 rounded-md backdrop-filter shadow-2xl shadow-rose-300">
        <DialogHeader className="flex flex-col gap-2 mb-5">
          <DialogTitle className="text-lg">Delete seu Cadastro</DialogTitle>
          <DialogDescription>
            Preencha as informações para deletar seu cadastro.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-5"  onClick={handleSubmit}>
          <div className="grid items-center content-center gap-1.5">
            <Label className="text-zinc-200">Email</Label>
            <Input id="email" type="email" placeholder="nome@email.com" alt="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid items-center content-center gap-1.5">
            <Label htmlFor="password" className="text-zinc-200">Senha</Label>
            <Input id="password" type="password" placeholder="******" alt="Digite sua nova senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {formError && (
            <div className="text-red-500 text-sm mt-1">{formError}</div>
          )}
          <DialogFooter className="w-fullflex flex-row justify-between">
            <Button type="submit">Deletar Conta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
      </div>
  );
}