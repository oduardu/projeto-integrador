'use client'
 
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon, ScanBarcode } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ModeToggle } from './buttons/toggle-mode'
 
export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/fornecedores', label: 'Fornecedores' },
    { href: '/calendario', label: 'Calendário' },
    { href: '/estoque', label: 'Estoque' },
    { href: '/calculo', label: 'Calcúlos' },
  ]

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5672/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, 
        },
        body: JSON.stringify({}), 
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao fazer logout: ${response.status} - ${response.statusText}`);
      }
  
      localStorage.removeItem('token');
      
      router.push('/');
    } catch (error: any) {
      console.error(error.message);
    }
  };
  
  return (
    <header className='p-4 border-b-2 border-zinc-300 flex items-center gap-4'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/dashboard" className="mr-6 flex-col justify-center items-center flex" prefetch={false}>
            <span className='font-semibold'>Dell Angelo</span>
            <span className='font-extralight'>Winehouse</span>
          </Link>
          <div className="grid gap-2 py-6">
          {links.map((link) => (
                <Link key={link.label} href={link.href} className="flex w-full items-center py-2 text-lg font-semibold">
                  <Button
                  size={'default'}
                    variant={pathname === link.href ? 'link_selected' : 'link'}
                  >
                    {link.label}
                  </Button>
                </Link>
          ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-[150px]">
        <Link href="/dashboard" className="mr-6 hidden lg:flex-col lg:justify-center lg:items-center lg:flex" prefetch={false}>
          <span className='font-semibold'>Dell Angelo</span>
          <span className='font-extralight'>Winehouse</span>
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuLink asChild>
                <Link key={link.label} href={link.href}>
                  <Button
                  size={'default'}
                    variant={pathname === link.href ? 'link_selected' : 'link'}
                  >
                    {link.label}
                  </Button>
                </Link>
              </NavigationMenuLink>
          ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
          <Link href={'/solicitacao-compra'}><Button size={'default'} variant={'outline'} className='flex flex-row gap-3'><ScanBarcode size={16} /> Solicitação de Compra</Button></Link>
      </div>
      <div>
          <ModeToggle />
      </div>
      <div>
        <Button size={'default'} variant={'default'} className='ml-auto' onClick={handleLogout}>Sair</Button>
      </div>
    </header>
  )
}