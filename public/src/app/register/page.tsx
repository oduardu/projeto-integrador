'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z, ZodError } from "zod";

type ReturnJsonApi = {
  title: string;
  description: string;
}

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Digite um email válido."),
  password: z.string().min(1, "Insira uma senha."),
});

export default function Register() {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validatedData = formSchema.parse({ name, email, password });

      const response = await fetch("http://localhost:5672/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const data: ReturnJsonApi = await response.json();

      toast({
        title: data.title,
        description: data.description,
        type: "background",
        variant: response.ok ? "default" : "destructive",
      });

      if (response.ok) {
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }

    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.errors.map(err => err.message).join("\n");
        setFormError(fieldErrors);
      } else {
        console.error(error);
        toast({
          title: "Erro",
          description: "Erro ao registrar usuário",
          type: "background",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="h-screen">
      <div className="w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="w-full h-screen flex items-center flex-col justify-center backdrop-blur-[1px]">
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-rose-50 to-rose-300 py-8 text-center">
            Dell Angelo<br/>Winehouse
          </p>
          <Card className="w-[340px]">
            <CardHeader>
              <CardTitle className="text-2xl">Cadastrar-se</CardTitle>
              <CardDescription>Preencha o formulário abaixo para criar sua conta.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid items-center content-center gap-1.5">
                  <Label htmlFor="name" className="text-zinc-200">Nome</Label>
                  <Input id="name" type="text" placeholder="Nome Completo" alt="Digite seu nome completo" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid items-center content-center gap-1.5">
                  <Label className="text-zinc-200">Mail</Label>
                  <Input id="email" type="email" placeholder="nome@email.com" alt="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid items-center content-center gap-1.5">
                  <Label htmlFor="password" className="text-zinc-200">Senha</Label>
                  <Input id="password" type="password" placeholder="" alt="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {formError && (
                  <div className="text-red-500 text-sm mt-1">{formError}</div>
                )}
                <div className="flex row items-stretch justify-center">
                  <Button type="submit" className="mx-auto w-32">Cadastrar</Button>
                  <Link href="/login" className="mx-auto w-32 flex justify-center items-center gap-1"><ChevronLeft className="w-5 h-5" /> Login</Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
