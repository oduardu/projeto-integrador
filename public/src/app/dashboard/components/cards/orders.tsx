import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export type OrdersType = {
  id: number
  client: string
  quantity: number
  payment: string
}

export default function Orders(
  { orders } : { orders: OrdersType[] }
) {
  return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Solicitações de Compra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row space-x-24">
            <div>
              <p className="text-xs uppercase text-zinc-700">Cliente</p>
            </div>
            <div className="flex flex-row space-x-3">
              <p className="text-xs uppercase text-zinc-700">Quantidade (L.)</p>
              <p className="text-xs uppercase text-zinc-700">Pagamento</p>
            </div>
          </div>

          <Separator className="mb-4" />

          {orders.map((order) => (
            <div key={order.id}>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 dark:text-gray-200">{order.client}</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{order.quantity}</div>
                  <div className="text-gray-600 dark:text-gray-400">{order.payment}</div>
                </div>
              </div>
              <Separator className="my-2" />
            </div>
          ))}


          <Link href="#" className="text-sm text-gray-700 underline dark:text-gray-400 mt-4" prefetch={false}>
            Veja mais aqui...
          </Link>
        </CardContent>
      </Card>
  )
}