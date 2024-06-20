"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SearchIcon } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const clientes = [
  { label: "Jonas", value: "cliente1" },
  { label: "Cliente 2", value: "cliente2" },
  { label: "Cliente 3", value: "cliente3" },
  { label: "Cliente 4", value: "cliente4" },
  { label: "Cliente 5", value: "cliente5" },
]


export default function SelectClientes() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? clientes.find((cliente) => cliente.value === value)?.label
              : "Selecione o cliente..."}
            <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Procure pelo cliente..." />
            <CommandEmpty>Nenhum cliente encontrado</CommandEmpty>
            <CommandList>
              {clientes && clientes.map((cliente) => (
                cliente && (
                  <>
                    <CommandItem
                      key={cliente.value}
                      value={cliente.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    > 
                      {cliente.label}
                    </CommandItem>
                    <CommandSeparator />
                  </>
                )
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  )
}