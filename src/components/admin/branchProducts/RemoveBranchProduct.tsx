import { Button } from "@/components/ui/button";
import Modal, { ModalContent } from "../Modal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonForm from "@/components/components-general/ButtonForm";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProductBranch } from "@/services/productBranch";
import { useBranch } from "@/hooks/use-branch";

export default function RemoveBranchProducts() {

   const [searchParams] = useSearchParams()
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const id = searchParams.get('removeproduct') 
   const client = useQueryClient()
   const { branchId } = useBranch()
   if(!id) return null

   const handleremoveItem = async() => {
           
    try {
        const data = await deleteProductBranch(+id)
        toast.success(data)
        client.invalidateQueries({queryKey: ['productsBranch',branchId]})
    } catch (error) {
        
    } finally{
        handleCancel()
    }
   }
   const handleCancel = () => navigate(pathname,{replace: true})
   

  return (
    <Modal defaultState={true} >
        <ModalContent changeOpen={handleCancel} title="Eliminar Producto" description="¿Estás seguro que quiere eliminar el producto?"> 
            <div className="flex justify-end items-center mt-6 gap-4">
                <Button variant={'outline'} onClick={handleCancel}>Cancelar</Button>
                <ButtonForm variant={'destructive'} onClick={handleremoveItem}> Eliminar</ButtonForm>
            </div>
        </ModalContent>
    </Modal>
  )
}
