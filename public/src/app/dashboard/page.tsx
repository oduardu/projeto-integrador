"use client";

import { Header } from "@/components/partials/header";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import GrapeStockCard from "./components/cards/grape-stock";
import BottleStock from "./components/cards/bottles-stock";
import CardEtapa from "./components/cards/steps";
import Orders from "./components/cards/orders";
import Calendar from "./components/cards/calendar";

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
    <>
      <div className="min-h-screen">
        <Header />
        <main className="flex flex-col items-center">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="col-span-2 md:col-span-2">
              <Calendar />
            </div>
            <div className="md:col-span-1 col-span-2">
              <Orders orders={orders} />
            </div>
          </div>
          <div className="grid gap-4 mt-4 md:grid-cols-3">
            <BottleStock wineStock={{bottle: 100}} />
            <GrapeStockCard grapeStock={{ fullStock: "1000" }} />
            <CardEtapa etapa={{ id: 1, name: "Etapa 1", descr: "Etapa 1", startDt: new Date(), endDt: new Date() }} />
          </div>
        </main>
      </div>
    </>
  );
}
