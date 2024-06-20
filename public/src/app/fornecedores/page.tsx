import { Header } from "@/components/partials/header";
import { Separator } from "@/components/ui/separator";

export default function Fornecedores() {
  return (
    <>
      <Header />
      <main className="flex min-h-full flex-col  justify-between p-24 gap-2">
        <div className="flex m-auto text-start w-full text-4xl text-zinc-800 font-bold tracking-widest dark:text-zinc-100">
          <h1>Fornecedores</h1>
        </div>
        <Separator className="w-72" />
        {/* <DataTable /> */}
      </main>
    </>
  );
}