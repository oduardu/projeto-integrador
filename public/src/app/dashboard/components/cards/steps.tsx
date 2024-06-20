import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type EtapaType = {
  id: number
  name: string
  descr: string
  startDt: Date 
  endDt: Date
}

export default function CardEtapa({ etapa }: { etapa: EtapaType }) {
  return (
    <Card>
    <CardHeader>
      <CardTitle className="text-3xl">{etapa.name}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <p className="text-1xl text-gray-600 dark:text-gray-400">
        {etapa.descr}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500">
        {(etapa.startDt).toLocaleDateString()} até {(etapa.endDt).toLocaleDateString()}
      </p>
    </CardContent>
  </Card>
  )
}