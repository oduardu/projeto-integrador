import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon, InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-zinc-100 px-4 pt-2 lg:px-6 h-24 flex items-center w-full shadow-sm xl:fixed">
      <Link href='/' className='flex flex-col justify-center items-center text-2xl'>
        <span className='font-semibold'>Dell Angelo</span>
        <span className='font-extralight'>Winehouse</span>
      </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-zinc-700"
            prefetch={false}
          >
            Vinhos
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-zinc-700"
            prefetch={false}
          >
            Sobre
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-zinc-700"
            prefetch={false}
          >
            Visitar
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-zinc-700"
            prefetch={false}
          >
            Contato
          </Link>
          <Link 
            href="/login"
            className="text-sm w-fit flex flex-row-reverse gap-2 font-medium hover:underline underline-offset-4 text-zinc-700"
            prefetch={false}
          >
            <ArrowRightIcon /> Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-zinc-100">
          <div className="container grid max-w-[1300px] mx-auto gap-4 p-4 sm:p-6 md:p-10 md:grid-cols-2 md:gap-16 shadow-sm">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-zinc-800">
                Descubra os vinhos premiados da Dell Angelo Winehouse
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-600 md:text-xl dark:text-zinc-600">
                Tradição, qualidade e paixão pelo vinho em cada garrafa.
              </p>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="inline-flex h-16 items-center justify-center rounded-md bg-zinc-50 px-4 py-2 text-xl font-medium text-zinc-800 shadow transition-colors hover:bg-zinc-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-200 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Comprar Vinhos
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-200/55">
          <div className="container max-w-[1200px] px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter text-zinc-800 sm:text-4xl md:text-5xl">
                  A História da Dell Angelo Winehouse
                </h2>
                <p className="mt-4 text-zinc-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Fundada em 1956 por Angelo Dell, a Dell Angelo Winehouse é uma vinícola familiar que se dedica à
                  produção de vinhos de alta qualidade. Passada de geração em geração, a empresa mantém a tradição e o
                  cuidado artesanal em cada etapa do processo de vinificação.
                </p>
                <p className="mt-4 text-zinc-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nossos vinhos são elaborados com as melhores uvas da região, colhidas com atenção e cuidado para
                  preservar a autenticidade e o sabor único de cada variedade. Ao longo dos anos, a Dell Angelo
                  Winehouse conquistou diversos prêmios e reconhecimentos por sua excelência.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1554598286-ed7bfd1dedca?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="600"
                height="400"
                alt="Dell Angelo Winehouse Vineyard"
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100">
          <div className="container max-w-[1200px] px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-zinc-800 sm:text-4xl md:text-5xl">
                Nossos Vinhos Premiados
              </h2>
              <p className="mt-4 mx-auto max-w-[700px] text-zinc-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Conheça os vinhos que conquistaram os principais prêmios e reconhecimentos da indústria vinícola.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card>
                <CardContent className="flex flex-col gap-3 items-center justify-center bg-[url('https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                  <img
                    src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width="300"
                    height="300"
                    alt="Foto de uma garrafa de vinho tinto"
                    className="rounded-lg object-cover"
                  />
                  <div className="bg-gradient-to-r from-slate-300 to-slate-300 backdrop-blur-sm w-full p-3 shadow-sm rounded-sm">
                    <h3 className="mt-4 text-xl font-bold text-zinc-800">Dell Angelo Classico</h3>
                    <p className="mt-2 text-zinc-700">Melhor Vinho Tinto do Ano pela Revista Adega</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-3 items-center justify-center bg-[url('https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                  <img
                    src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width="300"
                    height="300"
                    alt="Foto de uma garrafa de vinho tinto"
                    className="rounded-lg object-cover"
                  />
                  <div className="bg-gradient-to-r from-slate-300 to-slate-300 backdrop-blur-sm w-full p-3 shadow-sm rounded-sm">
                    <h3 className="mt-4 text-xl font-bold text-zinc-800">Dell Angelo Classico</h3>
                    <p className="mt-2 text-zinc-700">Melhor Vinho Tinto do Ano pela Revista Adega</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-3 items-center justify-center bg-[url('https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                  <img
                    src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width="300"
                    height="300"
                    alt="Foto de uma garrafa de vinho tinto"
                    className="rounded-lg object-cover"
                  />
                  <div className="bg-gradient-to-r from-slate-300 to-slate-300 backdrop-blur-sm w-full p-3 shadow-sm rounded-sm">
                    <h3 className="mt-4 text-xl font-bold text-zinc-800">Dell Angelo Classico</h3>
                    <p className="mt-2 text-zinc-700">Melhor Vinho Tinto do Ano pela Revista Adega</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100">
          <div className="container max-w-[1200px] px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter text-zinc-700 sm:text-4xl md:text-5xl">
                  Venha nos visitar
                </h2>
                <p className="mt-4 text-zinc-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubra a autenticidade e a paixão por trás de cada garrafa de vinho da Dell Angelo Winehouse. Agende
                  uma visita à nossa vinícola e desfrute de uma experiência única, com degustação de nossos vinhos
                  premiados e um tour pelos nossos vinhedos.
                </p>
              </div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.488389921103!2d-52.413058199999995!3d-26.8879911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e4c3cfbed12535%3A0xd8836ed465a1f5f!2sR.%20Henrique%20Dias%2C%20349%20-%20Matinho%2C%20Xanxer%C3%AA%20-%20SC%2C%2089820-000!5e0!3m2!1spt-BR!2sbr!4v1717888214717!5m2!1spt-BR!2sbr" width="600" height="450" className="b-0" loading="lazy"></iframe>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-zinc-100 p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 gap-8 text-sm">
          <div className="grid gap-1 col-span-1 justify-start">
            <h3 className="font-semibold text-zinc-800">Informações</h3>
            <Link href="#" className="text-zinc-800 hover:underline underline-offset-4" prefetch={false}>
              Localização
            </Link>
            <Link href="#" className="text-zinc-800 hover:underline underline-offset-4" prefetch={false}>
              Horário de Funcionamento
            </Link>
            <Link href="#" className="text-zinc-800 hover:underline underline-offset-4" prefetch={false}>
              Eventos
            </Link>
            <Link href="#" className="text-zinc-800 hover:underline underline-offset-4" prefetch={false}>
              Clube de Vinhos
            </Link>
          </div>
          <div className="grid gap-1 col-span-1 justify-end">
            <h3 className="font-semibold text-zinc-800">Siga-nos</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-800 hover:underline underline-offset-4" prefetch={false}>
                <InstagramLogoIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-zinc-800 hover:underline underline-offset-4" prefetch={false}>
                <TwitterLogoIcon className="w-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
