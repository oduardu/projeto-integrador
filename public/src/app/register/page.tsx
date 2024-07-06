import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";


export default function Register() {
  return (
    <div className="h-screen">
      <div className="w-full dark:bg-black bg-white  dark:bg-grid-white/[0.6] bg-grid-black/[0.6] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="w-full h-screen flex items-center justify-center backdrop-blur-[1px]">
          <Card className="w-[340px]">
            <CardHeader>
              <CardTitle className="text-2xl">Cadastrar-se</CardTitle>
              <CardDescription>Digite seu e-mail abaixo para fazer login em sua conta.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <div className="grid items-center content-center gap-1.5">
                  <Label htmlFor="name" className="text-zinc-200">Nome</Label>
                  <Input id="name" type="text" placeholder="Nome Completo" alt="Digite seu nome completo" />
                </div>
                <div className="grid items-center content-center gap-1.5">
                  <Label htmlFor="email" className="text-zinc-200">Mail</Label>
                  <Input id="email" type="email" placeholder="nome@email.com" alt="Digite seu email" />
                </div>
                <div className="grid items-center content-center gap-1.5">
                  <Label htmlFor="password" className="text-zinc-200">Senha</Label>
                  <Input id="password" type="password" placeholder="" alt="Digite sua senha" />
                </div>
                <div className="flex row items-stretch justify-center">
                  <Button type="submit" className="mx-auto w-32">Entrar</Button>
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