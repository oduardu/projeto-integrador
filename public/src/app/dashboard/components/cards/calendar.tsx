import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function calendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário da Produção</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mt-2">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-purple-500" />
              <span className="text-sm uppercase ">{'tag_1'}</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-red-500" />
              <span className="text-sm uppercase ">{'tag_2'}</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-blue-500" />
              <span className="text-sm uppercase ">{'tag_3'}</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-green-500" />
              <span className="text-sm uppercase ">{'tag_4'}</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-yellow-500" />
              <span className="text-sm uppercase ">{'tag_5'}</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-gray-500 dark:bg-gray-600" />
              <span className="text-sm uppercase ">{'tag_6'}</span>
            </div>
          </div>
          <div className="flex justify-center items-center col-span-6">
              Waiting backend...
          </div>
        </div>
        <Link href="/calendario">
          <Button variant="outline" className="w-fit text-xs text-gray-700 dark:text-gray-400 dark:border-gray-600 mt-4">
            Mais Informações
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}