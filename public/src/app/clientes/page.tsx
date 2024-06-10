import * as React from "react"
import { Header } from "@/components/partials/header"
import { DataTable } from "./components/table"
import { Separator } from "@/components/ui/separator";

export default function Cliente() {
  return (
    <>
      <Header />
      <main className="flex min-h-full flex-col  justify-between p-24 gap-2">
        <div className="flex m-auto text-start w-full text-4xl text-zinc-800 font-bold tracking-widest">
          <h1>Clientes</h1>
        </div>
        <Separator className="w-44" />
        <DataTable />
      </main>
    </>
  );
}
