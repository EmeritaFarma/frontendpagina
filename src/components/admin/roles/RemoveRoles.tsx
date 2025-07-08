import { Button } from "@/components/ui/button";
import Modal, { ModalContent } from "../Modal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonForm from "@/components/components-general/ButtonForm";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteRole } from "@/services/rol.services";

export default function RemoveRoles() {

   const [searchParams] = useSearchParams()
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const id = searchParams.get('removeid') 
   const client = useQueryClient()
   if(!id) return null

   const handleremoveItem = async() => {
           
    try {
        const data = await deleteRole(+id)
        toast.success(data)
        client.invalidateQueries({queryKey: ['roles']})
    } catch (error) {
           
    } finally{
        handleCancel()
    }
   }
   const handleCancel = () => navigate(pathname,{replace: true})
   

  return (
    <Modal defaultState={true} >
        <ModalContent changeOpen={handleCancel} title="Eliminar rol" description="¿Estás seguro de que quieres eliminar este rol?">
            <div className="flex justify-end items-center mt-6 gap-4">
                <Button variant={'outline'} onClick={handleCancel}>Cancelar</Button>
                <ButtonForm variant={'destructive'} onClick={handleremoveItem}> Eliminar</ButtonForm>
            </div>
        </ModalContent>
    </Modal>
  )
}
