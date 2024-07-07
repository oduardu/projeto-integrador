"use client"

import { Bar, BarChart } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { product: "Vinho Doce", produtos: 1 },
  { product: "Vinho Seco", produtos: 2 },
  { product: "Vinho Sei la", produtos: 4 },
  { product: "Vinho Sei la", produtos: 2 },
  { product: "Vinho Sei la", produtos: 1 },
]

const chartConfig = {
  produtos: {
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-zinc-700 dark:text-zinc-100">Gráfico Produtos</CardTitle>
      </CardHeader>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="produtos" fill="var(--color-produtos)" radius={25} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
