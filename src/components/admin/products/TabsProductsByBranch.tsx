
import { useQuery } from "@tanstack/react-query"
import { BranchSelect } from "./BranchSelect"
import { getProductsByBranch } from "@/services/product.services"
import { DataTableProducts } from "@/payments/data-table"
import { productsColumnsByBranch } from "@/payments/columns"
import Modal, { ModalButton, ModalContent } from "../Modal"
import { CirclePlus } from "lucide-react"
import AddBranchProduct from "../branchProducts/AddBranchProduct"
import RemoveBranchProducts from "../branchProducts/RemoveBranchProduct"
import { useBranch } from "@/hooks/use-branch"
import { useIdParams } from "@/hooks/use-idparams"
import EditBranchProduct from "../branchProducts/EditBranchProduct"

export default function TabsProductsByBranch() {

    const { branchId } = useBranch()
    const { data } = useQuery({ queryKey: ['productsBranch', branchId], queryFn: () => getProductsByBranch(branchId ?? 1) })
    const { id } = useIdParams('editproductid')
    return (
        <div className="py-6">
            <div className="mb-4">
                <header className="flex justify-between gap-4">
                    <div>
                        <h2 className="text-sm font-medium text-gray-500 mb-2">Sucursales</h2>
                        <BranchSelect />
                    </div>
                    <div>
                        <Modal>
                            <ModalButton variant="dashboard"> <CirclePlus /> Agregar</ModalButton>
                            <ModalContent title="Agregar Producto" description="Crea un nuevo producto">
                                <AddBranchProduct />
                            </ModalContent>
                        </Modal>
                    </div>
                </header>
                <RemoveBranchProducts />
                { id && <EditBranchProduct />}
                {data && <DataTableProducts options={[]} columns={productsColumnsByBranch} data={data} />}
            </div>

        </div>
    )
}
