'use client'

import AuthGuard from "@/components/authGuard";
import { Header } from "@/components/partials/header";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Calendario() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <AuthGuard>
    <>
      <Header />
      <main className="flex min-h-max flex-row items-center justify-between p-3 gap-2">
        <div className="flex-1">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow w-fit"
            />
            <div className="flex flex-col gap-5 py-5">
              <Badge variant="default">Badge</Badge>
              <Badge variant="default">Badge</Badge>
              <Badge variant="default">Badge</Badge>
              <Badge variant="default">Badge</Badge>
              <Badge variant="default">Badge</Badge>
              <div className="border-2 border-transparent rounded-md hover:border-zinc-200 p-3 hover:animate-pulse">
                <Badge variant="clear_day">🧹</Badge> <span className="text-sm uppercase tracking-wide"> -  Limpeza </span>
              </div>
            </div>
          </div>
            </div>
        <div className="flex-[3]">
          
        </div>
      </main>
    </>
    </AuthGuard>
  );
}
