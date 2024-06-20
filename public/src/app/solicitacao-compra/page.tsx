"use client"

import { Header } from "@/components/partials/header";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import InformacoesCliente from "./components/step/informacoes-cliente";
import { Button } from "@/components/ui/button";
import DetalhesEmbalagem from "./components/step/detalhes-ebalagem";

export default function SolicitacaoCompra() {
  const [step, setStep] = useState<number>(1)

  return (
    <>
      <Header />
      <main className="flex min-h-full flex-col text-center justify-between p-24 gap-2">
        <div className="flex m-auto w-full text-4xl justify-center text-zinc-800 -tracking-tighter dark:text-zinc-100">
          <h1>Solicitação de Compra</h1>
        </div>
        <div className="flex justify-center">
          <Progress value={(step * 20)} className="w-[60%]" />
        </div>
          <div className="flex justify-center py-10">
            <div className="shadow-md rounded-lg w-[40%] p-16 space-y-10">
              <div className="w-full">
                <InformacoesCliente className={step === 1 ? "" : "hidden"} />
                <DetalhesEmbalagem className={step === 2 ? "" : "hidden"} />
                <InformacoesCliente className={step === 3 ? "" : "hidden"} />
                <InformacoesCliente className={step === 4 ? "" : "hidden"} />
                <InformacoesCliente className={step === 5 ? "" : "hidden"} />
              </div>

              <div className="flex w-full flex-row justify-between">
                <Button onClick={() => setStep(step - 1)} variant="default" disabled={!(step > 1)}>Voltar</Button>
                <Button onClick={() => setStep(step + 1)} variant="default" disabled={!(step < 5)}>Próxima</Button>
              </div>
            </div>
          </div>
      </main>
    </>
  )
}