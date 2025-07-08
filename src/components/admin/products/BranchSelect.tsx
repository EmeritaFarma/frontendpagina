"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { getBranchs } from "@/services/branch.services"
import { useBranch } from "@/hooks/use-branch"




export function BranchSelect() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<null | string>(null)
  const { setBranchId } = useBranch()

  const { data: branchs } = useQuery({ queryKey: ['branchs'], queryFn: getBranchs })


    const data = branchs?.map((branch) => ({
      value: branch.name.toLowerCase(),
      label: branch.name,
      id: branch.id,
    })) ?? []

    React.useEffect(() => {
        if (data.length > 0 && value == null) {
            setValue(data[0].value)
            setBranchId(Number(data[0].id))
            setBranchId(Number(data[0].id))
        }
    }, [data])

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
            ? data.find((framework) => framework.value === value)?.label
            : "Seleccionar sucursal"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar sucursal" />
          <CommandList>
            <CommandEmpty>No se encontro la sucursal</CommandEmpty>
            <CommandGroup>
              {data.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    setBranchId(framework.id)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
