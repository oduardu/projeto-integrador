"use client"

import AuthGuard from "@/components/authGuard";
import { Header } from "@/components/partials/header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import InformacoesCliente from "./components/step/informacoes-cliente";

export default function SolicitacaoCompra() {
  const [step, setStep] = useState<number>(1)

  return (
    <AuthGuard>
    <>
      <Header />
      <main className="flex min-h-full flex-col text-center justify-between py-10 sm:p-24 gap-2">
        <div className="flex sm:m-auto w-full text-4xl justify-center text-zinc-800 -tracking-tighter dark:text-zinc-100">
          <h1>Solicitação de Compra</h1>
        </div>
        <div className="flex justify-center">
          <Progress value={(step * 20)} className="w-[60%]" />
        </div>
          <div className="flex justify-center py-10">
            <div className="shadow-md rounded-lg lg:w-[40%] p-16 space-y-10">
              <div className="w-full">
                <InformacoesCliente className={step === 1 ? "" : "hidden"} />
              </div>

              <div className="flex w-full flex-row justify-between">
                <Button disabled>Voltar</Button>
                <Button disabled>Próxima</Button>
              </div>
            </div>
          </div>
      </main>
    </>
    </AuthGuard>
  )
}