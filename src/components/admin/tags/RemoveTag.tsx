import { Button } from "@/components/ui/button";
import Modal, { ModalContent } from "../Modal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonForm from "@/components/components-general/ButtonForm";
import { useQueryClient } from "@tanstack/react-query";
import { deleteTag } from "@/services/tags.services";
import { toast } from "sonner";

export default function RemoveTag() {

   const [searchParams] = useSearchParams()
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const id = searchParams.get('removeid') 

   if(!id) return null

   const client = useQueryClient()

   const handleremoveItem = async() => {
    try {
        const data = await deleteTag(+id)
        toast.success(data)
        client.invalidateQueries({queryKey: ['tags']})
    } catch (error) {
            } finally{
        handleCancel()
    }
   }
   const handleCancel = () => navigate(pathname,{replace: true})
   

  return (
    <Modal defaultState={true} >
        <ModalContent changeOpen={handleCancel} title="Eliminar usuario" description="¿Estás seguro de que quieres eliminar este usuario?">
            <div className="flex justify-end items-center mt-6 gap-4">
                <Button variant={'outline'} onClick={handleCancel}>Cancelar</Button>
                <ButtonForm variant={'destructive'} onClick={handleremoveItem}> Eliminar</ButtonForm>
            </div>
        </ModalContent>
    </Modal>
  )
}
