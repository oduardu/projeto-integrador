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
      <main className="flex min-h-max flex-col sm:flex-row items-center justify-between p-3 gap-2">
        <div className="flex-1 w-full">
          <div className="flex flex-col items-center">
            <div className="w-fit">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow"/>
            </div>
            <div className="flex flex-col gap-5 p-5 w-full">
              <Badge variant="default" className="w-fit dark:hover:border-zinc-200 hover:border-zinc-600 hover:animate-pulse">{'TAG_1'}</Badge>
              <Badge variant="default" className="w-fit dark:hover:border-zinc-200 hover:border-zinc-600 hover:animate-pulse">{'TAG_2'}</Badge>
              <Badge variant="default" className="w-fit dark:hover:border-zinc-200 hover:border-zinc-600 hover:animate-pulse">{'TAG_3'}</Badge>
              <Badge variant="default" className="w-fit dark:hover:border-zinc-200 hover:border-zinc-600 hover:animate-pulse">{'TAG_4'}</Badge>
              <Badge variant="default" className="w-fit dark:hover:border-zinc-200 hover:border-zinc-600 hover:animate-pulse">{'TAG_5'}</Badge>
              <div className="border-2 border-transparent rounded-md hover:border-zinc-600 dark:hover:border-zinc-200 p-3 hover:animate-pulse w-fit">
                <Badge variant="clear_day">🧹</Badge> <span className="text-sm uppercase tracking-wide"> -  Limpeza </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[3] w-full">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className="flex cursor-pointer items-center justify-center bg-card text-card-foreground rounded-md aspect-square border-[1px] dark:border-zinc-50/10 dark:hover:border-zinc-50/20 hover:animate-pulse"
              >
                <div className="text-2xl font-bold">{day}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
    </AuthGuard>
  );
}
