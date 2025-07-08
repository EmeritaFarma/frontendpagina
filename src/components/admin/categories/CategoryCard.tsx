import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Box, MoreVertical, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types/category";

interface Props extends Category {
  
}

export default function CategoryCard({ name, id }: Props) {
  return (
    <article className="p-2 flex justify-between gap-4 shadow  rounded-md border border-gray-300 items-center">
      <div className="flex items-center gap-4">
        <div className="bg-gray-50 size-10 rounded-md text-gray-500 flex items-center justify-center">
          <Box width={16} height={16} />
        </div>
        <h2 className=" text-sm text-slate-600 font-medium">{name}</h2>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={`/admin/categories?editid=${id}`}>
              <Pencil width={16} height={16} /> Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/admin/categories?removeid=${id}`}>
              <Trash width={16} height={16} /> Eliminar
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  )
}
