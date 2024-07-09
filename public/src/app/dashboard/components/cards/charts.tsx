"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Bar, BarChart, TooltipProps } from "recharts";

type ProductType = {
  codigo: string;
  nome: string;
  descricao: string;
  quantidade_estoque: number;
};

const chartConfig = {
  produtos: {
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig;

export function Component() {
  const [chartData, setChartData] = useState<{ product: string, produtos: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token não encontrado");
      }

      const response = await fetch("http://localhost:5672/product", {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data: ProductType[] = await response.json();
      const formattedData = data.map((item: ProductType) => ({
        product: item.nome,
        produtos: item.quantidade_estoque
      }));
      setChartData(formattedData);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar os dados: {error.message}</p>;
  }

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].payload.product} : ${payload[0].value} garrafas`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-zinc-700 dark:text-zinc-100">Gráfico Produtos</CardTitle>
      </CardHeader>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={chartData}>
          <ChartTooltip content={<CustomTooltip />} />
          <Bar dataKey="produtos" fill="var(--color-produtos)" radius={25} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
