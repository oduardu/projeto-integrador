import { Header } from "@/components/partials/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function() {
  return (
    <div>
      <Header />
      <div className="grid sm:grid-cols-3 gap-6 px-6 py-10">
        <Card className="lg:w-full">
          <CardContent className="flex flex-col justify-between h-64 py-2">
            <h3 className="text-lg font-semibold">Calculo 1</h3>
            <Button variant="default" className="w-fit left-0">Calcular</Button>
          </CardContent>
        </Card>
        <Card className="lg:w-full">
          <CardContent className="flex flex-col justify-between h-64 py-2">
            <h3 className="text-lg font-semibold">Calculo 2</h3>
            <Button variant="default" className="w-fit left-0">Calcular</Button>
          </CardContent>
        </Card>
        <Card className="lg:w-full">
          <CardContent className="flex flex-col justify-between h-64 py-2">
            <h3 className="text-lg font-semibold">Calculo 3</h3>
            <Button variant="default" className="w-fit left-0">Calcular</Button>
          </CardContent>
        </Card>
        <Card className="lg:w-full">
          <CardContent className="flex flex-col justify-between h-64 py-2">
            <h3 className="text-lg font-semibold">Calculo 4</h3>
            <Button variant="default" className="w-fit left-0">Calcular</Button>
          </CardContent>
        </Card>
        <Card className="lg:w-full">
          <CardContent className="flex flex-col justify-between h-64 py-2">
            <h3 className="text-lg font-semibold">Calculo 5</h3>
            <Button variant="default" className="w-fit left-0">Calcular</Button>
          </CardContent>
        </Card>
        <Card className="lg:w-full">
          <CardContent className="flex flex-col justify-between h-64 py-2">
            <h3 className="text-lg font-semibold">Calculo 6</h3>
            <Button variant="default" className="w-fit left-0">Calcular</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}