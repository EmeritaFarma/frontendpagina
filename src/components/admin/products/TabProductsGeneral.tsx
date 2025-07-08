
import { CirclePlus } from 'lucide-react'
import Modal, { ModalButton, ModalContent } from "@/components/admin/Modal";
import FormProduct from './FormProduct';
import { DataTableProducts } from '@/payments/data-table';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/product.services';
import { productsColumns } from '@/payments/columns';
import RemoveProduct from './RemoveProduct';
import { useIdParams } from '@/hooks/use-idparams';
import EditProduct from './EditProduct';
import { getCategories } from '@/services/category.services';

export default function TabProductsGeneral() {

  const { data } = useQuery({ queryKey: ['products'], queryFn: () => getProducts()})
  const { id } = useIdParams("editid")


  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getCategories })

  return (
   <>
       <div className="flex justify-between items-center gap-4 mb-4 mt-6">
        {/* <Button variant={'notion'}>
          <Filter />
          Filtrar
        </Button> */}
        <div className=" flex justify-end gap-4">
          {/* <Button variant={'notion'}> <CloudUpload /> Subir Excel</Button> */}
          {/* <Button variant={'notion'}> <Download /> Exportar </Button> */}
          <Modal>
            <ModalButton variant="dashboard"> <CirclePlus /> Agregar</ModalButton>
            <ModalContent title="Agregar Producto" description="Crea un nuevo producto">
              <FormProduct />
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className="mt-4">
        {/* {isLoading && <Loading />} */}
        {id && <EditProduct  categories={categories ?? []} />}
        {data && <DataTableProducts options={[]} columns={productsColumns} data={data} />}
      </div>
      <RemoveProduct />

   </>
  )
}
