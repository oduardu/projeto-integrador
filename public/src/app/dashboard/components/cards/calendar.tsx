import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
              <span className="text-sm uppercase ">tag1</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-red-500" />
              <span className="text-sm uppercase ">tag1</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-blue-500" />
              <span className="text-sm uppercase ">tag1</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-green-500" />
              <span className="text-sm uppercase ">tag1</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-yellow-500" />
              <span className="text-sm uppercase ">tag1</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-6 h-6 mt-1 rounded-full bg-gray-500 dark:bg-gray-600" />
              <span className="text-sm uppercase ">tag1</span>
            </div>
          </div>
          <div className="bg-red-500 col-span-6">
            
          </div>
        </div>
        <Button variant="outline" className="w-fit text-xs text-gray-700 dark:text-gray-400 dark:border-gray-600 mt-4">
          Mais Informações
        </Button>
      </CardContent>
    </Card>
  )
}