import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WineIcon } from "lucide-react";

export type WineStockType = {
  bottle: number
}

export default function BottleStock ({ wineStock } : { wineStock: WineStockType}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-zinc-700 dark:text-zinc-100">Vinhos Produzidos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center gap-10">
        <WineIcon strokeWidth={1} absoluteStrokeWidth={true} size={24} color="#ff006e" />
        <p className="text-3xl text-zinc-700 dark:text-zinc-100">{wineStock.bottle} Garrafas</p>
      </CardContent>
    </Card>
  )
}