import { Button } from "@/components/ui/button";
import Modal, { ModalContent } from "../Modal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonForm from "@/components/components-general/ButtonForm";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteBranch } from "@/services/branch.services";

export default function RemoveBranch() {

   const [searchParams] = useSearchParams()
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const id = searchParams.get('removeid') 
   const client = useQueryClient()
   if(!id) return null

   const handleremoveItem = async() => {
           
    try {
        const data = await deleteBranch(+id)
        toast.success(data)
        client.invalidateQueries({queryKey: ['branchs']})
    } catch (error) {
            
    } finally{
        handleCancel()
    }
   }
   const handleCancel = () => navigate(pathname,{replace: true})
   

  return (
    <Modal defaultState={true} >
        <ModalContent changeOpen={handleCancel} title="Eliminar Sucursal" description="¿Estás seguro de que quieres eliminar esta sucursal?">
            <div className="flex justify-end items-center mt-6 gap-4">
                <Button variant={'outline'} onClick={handleCancel}>Cancelar</Button>
                <ButtonForm variant={'destructive'} onClick={handleremoveItem}> Eliminar</ButtonForm>
            </div>
        </ModalContent>
    </Modal>
  )
}
