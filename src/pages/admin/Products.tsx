import { TabsProducts } from "@/components/admin/products/TabsProducts";

export default function Products() {


  

  return (
    <div className="max-w-6xl">
      <header className="flex  justify-between">
        <div>
          <h1 className="font-medium text-xl">Productos</h1>
          <p className="text-gray-400 text-sm">
            Aquí podrás gestionar todos los productos de tu negocio. Puedes crear, editar y eliminar productos.
          </p>
        </div>
      </header>
      <div className="mt-6">
        <TabsProducts />
      </div>
    </div>
  )
}
