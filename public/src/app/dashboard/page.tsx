"use client";

import AuthGuard from "@/components/authGuard";
import { Header } from "@/components/partials/header";
import BottleStock from "./components/cards/bottles-stock";
import Calendar from "./components/cards/calendar";
import { Component as Chart } from "./components/cards/charts";
import GrapeStockCard from "./components/cards/grape-stock";
import Orders from "./components/cards/orders";
import CardEtapa from "./components/cards/steps";

export default function Home() {

  const orders = [{
    id: 1,
    client: "Filipe",
    quantity: 4321,
    payment: "Card"
  },
  {
    id: 2,
    client: "Lucas",
    quantity: 1234,
    payment: "Cash"
  },
  {
    id: 3,
    client: "João",
    quantity: 5678,
    payment: "Card"
  },
  {
    id: 4,
    client: "Maria",
    quantity: 8765,
    payment: "Cash"
  }
  ];

  return (
    <AuthGuard>
    <>
      <div className="min-h-screen">
        <Header />
        <main className="flex flex-col items-center">
          <div className="grid gap-4 md:grid-cols-3 w-full p-4">
            <div className="md:col-span-2">
              <Calendar />
            </div>
            <div className="md:col-span-1">
              <Orders orders={orders} />
            </div>
          </div>
          <div className="grid w-full p-4 gap-4 mt-4 md:grid-cols-3">
            <Chart />
            <BottleStock wineStock={{bottle: 100}} />
            <GrapeStockCard grapeStock={{ fullStock: "1000" }} />
            <CardEtapa etapa={{ id: 1, name: "Etapa 1", descr: "Etapa 1", startDt: new Date(), endDt: new Date() }} />
          </div>
        </main>
      </div>
    </>
    </AuthGuard>
  );
}
