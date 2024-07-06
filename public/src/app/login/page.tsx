'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';

export default function Login() {
  // const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5672/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); 

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
      <main className="flex">
        <div className="flex-[1] bg-[url('https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] min-h-screen backdrop:blur-sm flex-col justify-center items-center text-7xl overflow-hidden text-zinc-100 md:flex hidden">
          <div className="backdrop-blur-[1.25px] flex flex-col p-5">
            <span className='font-semibold'>Dell Angelo</span>
            <span className='font-extralight'>Winehouse</span>
          </div>
        </div>
        <div className="flex-[1] min-h-screen flex items-center justify-center dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        <div className="backdrop-blur-[1px]">
            <Card className="w-[340px]">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Digite seu e-mail abaixo para fazer login em sua conta.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                  <div className="grid items-center content-center gap-4">
                    <Label htmlFor="email" className="text-zinc-200">Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nome@email.com"
                      alt="Digite seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid items-center gap-4">
                    <Label htmlFor="password" className="text-zinc-200">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Senha"
                      alt="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex row items-stretch justify-center">
                    <Button type="submit" className="mx-auto w-32">Entrar</Button>
                    <Link href="/register" className="mx-auto w-32 flex justify-center items-center gap-1 hover:text-zinc-300">Registrar-se <ChevronRight className="w-5 h-5" /></Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
