import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Grape } from 'lucide-react'

export type GrapeEstockType = {
  fullStock: string
}

export default function GrapeStockCard({ grapeStock }: { grapeStock: GrapeEstockType}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-zinc-700 dark:text-zinc-100">Estoque</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center gap-10">
        <Grape strokeWidth={1} absoluteStrokeWidth={true} size={24} color="#ff006e" />
        <p className="text-3xl text-zinc-700 dark:text-zinc-100"> {grapeStock.fullStock} kg</p>
      </CardContent>
    </Card>
  )
}