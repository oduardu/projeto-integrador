'use client'
 
import { ScanBarcode } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { ModeToggle } from './buttons/toggle-mode'
 
export function Header() {
  const pathname = usePathname()
  
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/fornecedores', label: 'Fornecedores' },
    { href: '/calendario', label: 'Calendário' },
    { href: '/estoque', label: 'Estoque' },
    { href: '/calculo', label: 'Calcúlos' },
  ]
  
  const user = {
    name: 'Eduardo Pazzini Zancanaro',
    photo: 'https://github.com/oduardu.png',
    role: 'Owner'
  }

  return (
    <nav className='p-4 border-b-2 border-zinc-300 flex items-center gap-4'>
      <Link href='/dashboard' className='flex flex-col justify-center items-center flex-[1]'>
        <span className='font-semibold'>Dell Angelo</span>
        <span className='font-extralight'>Winehouse</span>
      </Link>
      <div className='flex gap-3 flex-row flex-[3]'>
        {links.map((link) => (
              <Link key={link.label} href={link.href}>
                <Button
                size={'default'}
                  variant={pathname === link.href ? 'link_selected' : 'link'}
                >
                  {link.label}
                </Button>
              </Link>
          ))}
      </div>
      <div>
          <Link href={'/solicitacao-compra'}><Button size={'default'} variant={'outline'} className='flex flex-row gap-3'><ScanBarcode size={16} /> Solicitação de Compra</Button></Link>
      </div>
      <div>
          <ModeToggle />
      </div>
      <div>
          <Link href={'/logout'}><Button size={'default'} variant={'default'}>Sair</Button></Link>
      </div>
      
    </nav>
  )
}