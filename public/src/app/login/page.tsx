"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react";

export default function Login() {
  const { toast } = useToast()

  return (
    <>
      <main className="flex">
        <div className="flex-[1] bg-[url('https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] min-h-screen backdrop:blur-sm flex flex-col justify-center items-center text-7xl overflow-hidden text-zinc-100">
          <div className="backdrop-blur-[1.25px] flex flex-col p-5">
            <span className='font-semibold'>Dell Angelo</span>
            <span className='font-extralight'>Winehouse</span>
          </div>
        </div>
        <div className="flex-[1] min-h-screen flex items-center justify-center">
          <Card className="w-[340px]">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Digite seu e-mail abaixo para fazer login em sua conta.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <div className="grid items-center content-center gap-4 text-zinc-800">
                  <Input type="email" placeholder="nome@email.com" alt="Digite seu email" />
                </div>
                <div className="grid items-center gap-4 text-zinc-800">
                  <Input type="password" placeholder="Senha" alt="Digite sua senha" />
                </div>
                <Button type="submit" className="mx-auto w-32">Entrar</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
