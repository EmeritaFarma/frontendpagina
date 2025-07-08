import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Branch } from "@/lib/types/branch"
import { Product, ProductByBranch } from "@/lib/types/product"
import { Role } from "@/lib/types/rol"
import { User } from "@/lib/types/user"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Barcode, Box, Mail, MapPin, MoreHorizontal, Pencil, Tag, Trash, UserRound } from "lucide-react"
import { Link } from "react-router-dom"

type PaymentCategory = {
  id: string
  name: string
}

type PaymentRole = {
  id: string
  name: string
}

type PaymentTag = {
  id: number
  name: string
}

type PaymentProduct = {
  id: number;
  name: string;
  priceBase: number;
  priceDiscount: number | null;
  sku: string;
  category?: {
    id: number;
    name: string;
  };
  image: string;
  tags: {
    id: number;
    name: string;
  }[];
}


export type PaymentLocation = {
  id: number;
  street: string;
  number: string;
  betweenStreet: string;
  andBetweenStreet: string;
  zipCode: string;
  city: string;
  state: string;
  colony: string;
  latitude: number;
  longitude: number;
  branch: string;
};
export const rolesColumns: ColumnDef<Role>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Badge variant={'outline'} className="capitalize">
          <UserRound width={10} />
          {payment.type}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/admin/roles?editid=${payment.id}`}>
                <Pencil width={16} height={16} /> Editar

              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/admin/roles?removeid=${payment.id}`}>
                <Trash width={16} height={16} /> Eliminar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export const rolesData: PaymentRole[] = [
  {
    id: "1",
    name: "Administrador",
  },
  {
    id: "2",
    name: "Usuario",
  },
]

export const tagsColumns: ColumnDef<PaymentTag>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex items-center gap-2 capitalize">
          <Tag width={14} />
          {payment.name}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/admin/tags?editid=${payment.id}`}>
                <Pencil width={16} height={16} /> Editar

              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/admin/tags?removeid=${payment.id}`}>
                <Trash width={16} height={16} /> Eliminar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }

]

export const tagsData: PaymentTag[] = []


export const categoriesColumns: ColumnDef<PaymentCategory>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Badge variant={'outline'}>
          {payment.name}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/admin/categories?editid=${payment.id}`}>
                <Pencil width={16} height={16} /> Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/admin/categories?removeid=${payment.id}`}>
                <Trash width={16} height={16} /> Eliminar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


export const categoriesData: PaymentCategory[] = [
  {
    id: "1",
    name: "Bebes",
  },
  {
    id: "2",
    name: "Medicamentos",
  },
  {
    id: "3",
    name: "Dermatología",
  },
  {
    id: "4",
    name: "Terapia",
  }
]

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex items-center gap-3">
          {/* <UserRound width={14} /> */}
          <div className="flex items-center justify-center size-8 text-sm text-gray-500 font-medium rounded-full bg-gray-100">
            {payment.name.charAt(0).toUpperCase()}
          </div>
          {payment.name}
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex items-center gap-2">
          <Mail width={14} />
          {payment.email}
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Badge className="capitalize" variant={'outline'}>
          {payment.role.type}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/admin/users?editid=${payment.id}`}>
                <Pencil width={16} height={16} /> Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/admin/users?removeid=${payment.id}`}>
                <Trash width={16} height={16} /> Eliminar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]


export const branchsColumns: ColumnDef<Branch>[] = [
  {
    accessorKey: "branch",
    header: "Sucursal",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex gap-2 items-center">
          <MapPin width={14} />
          {payment.name}
        </div>
      )
    },
  },
  {
    accessorKey: "street",
    header: "Calle",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <p> Calle {payment?.location?.street}  #{payment?.location?.number} entre {payment?.location?.betweenStreet} y {payment?.location?.andBetweenStreet}</p>
      )
    },
  },
  {
    accessorKey: "colony",
    header: "Colonia",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <p>{payment?.location?.colony} </p>
      )
    },
  },

  {
    accessorKey: "city",
    header: "Ciudad",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <p>{payment?.location?.city} </p>
      )
    },
  },
  {
    accessorKey: "zipCode",
    header: "Código Postal",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <p>{payment?.location?.zipCode} </p>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/admin/branchs/edit/${payment.id}`}>
                <Pencil width={16} height={16} /> Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/admin/branchs?removeid=${payment.id}`}>
                <Trash width={16} height={16} /> Eliminar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown />
        </Button>
      )
    },
    enableSorting: true,

  },
  {
    accessorKey: "priceBase",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const payment = row.original
      const price = payment.priceBase
      return (
        <span className="font-medium">${price}</span>
      )
    },
  },
  {
    accessorKey: "priceDiscount",
    header: "Precio de Desc.",
    enableSorting: true,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <span className="text-gray-500">${payment.priceDiscount ? payment.priceDiscount : '0.00'}</span>
      )
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    enableSorting: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex items-center gap-2">
          <Barcode width={14} />
          {payment.sku}
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Categoría",
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Badge variant={'outline'}>
          {payment.category?.name ?? "Sin Categoría"}
        </Badge>
      )
    },
  },
  // {
  //   accessorKey: "image",
  //   header: "Imagen",
  //   enableSorting: false,
  //   cell: ({ row }) => {
  //     const payment = row.original
  //     return (
  //       <div className="flex items-center gap-2">
  //         <Image width={14} />

  //       </div>
  //     )
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/admin/products?editid=${payment.id}`}>
                <Pencil width={16} height={16} /> Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/admin/products?removeid=${payment.id}`}>
                <Trash width={16} height={16} /> Eliminar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }

]

export const productsColumnsByBranch: ColumnDef<ProductByBranch>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown />
        </Button>
      )
    },
    enableSorting: true,

  },
  {
    accessorKey: "amount",
    header: "Stock",
    cell: ({ row }) => {
      const amount = row.original.amount

      if(amount == 0) return <Badge variant={'withoutStock'} className=" flex items-center gap-1"> <Box width={14}/> Sin stock</Badge>

      return (
        <Badge variant={'secondary'} className="text-gray-500 flex items-center gap-1"> <Box width={14}/> {amount}</Badge>
      )
    },
  },
  {
    accessorKey: "priceBase",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const payment = row.original
      const price = payment.priceBase
      return (
        <span className="font-medium">${price}</span>
      )
    },
  },
  {
    accessorKey: "priceDiscount",
    header: "Precio de Desc.",
    enableSorting: true,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <span className="text-gray-500">${payment.priceDiscount ? payment.priceDiscount : '0.00'}</span>
      )
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    enableSorting: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex items-center gap-2">
          <Barcode width={14} />
          {payment.sku}
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Categoría",
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Badge variant={'outline'}>
          {payment.category?.name ?? "Sin Categoría"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/admin/products?editproductid=${payment.branchProduct}`}>
                <Pencil width={16} height={16} /> Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/admin/products?removeproduct=${payment.branchProduct}`}>
                <Trash width={16} height={16} /> Eliminar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }

]
export const productsData: PaymentProduct[] = [
  {
    id: 1,
    name: "Bebeza",
    priceBase: 100,
    priceDiscount: 10,
    sku: "123456",
    category: {
      id: 1,
      name: "Bebes",
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    tags: [
      {
        id: 1,
        name: "Bebes",
      },
      {
        id: 2,
        name: "Medicamentos",
      },
      {
        id: 3,
        name: "Dermatología",
      },
      {
        id: 4,
        name: "Terapia",
      },
    ],
  },
  {
    id: 2,
    name: "Medicamentos",
    priceBase: 220,
    priceDiscount: 20,
    sku: "123456",
    category: {
      id: 2,
      name: "Medicamentos",
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    tags: [
      {
        id: 1,
        name: "Bebes",
      },
      {
        id: 2,
        name: "Medicamentos",
      },
      {
        id: 3,
        name: "Dermatología",
      },
      {
        id: 4,
        name: "Terapia",
      },
    ],
  },
  {
    id: 3,
    name: "Dermatología",
    priceBase: 3000,
    priceDiscount: 20,
    sku: "123456",
    category: {
      id: 3,
      name: "Dermatología",
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    tags: [
      {
        id: 1,
        name: "Bebes",
      },
      {
        id: 2,
        name: "Medicamentos",
      },
      {
        id: 3,
        name: "Dermatología",
      },
      {
        id: 4,
        name: "Terapia",
      },
    ],
  },
  {
    id: 4,
    name: "Terapia",
    priceBase: 4000,
    priceDiscount: 200,
    sku: "123456",
    category: {
      id: 4,
      name: "Terapia",
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    tags: [
      {
        id: 1,
        name: "Bebes",
      },
      {
        id: 2,
        name: "Medicamentos",
      },
      {
        id: 3,
        name: "Dermatología",
      },
      {
        id: 4,
        name: "Terapia",
      },
    ],
  },
]