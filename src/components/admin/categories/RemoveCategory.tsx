import { Button } from "@/components/ui/button";
import Modal, { ModalContent } from "../Modal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonForm from "@/components/components-general/ButtonForm";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/services/category.services";
import { toast } from "sonner";

export default function RemoveCategory() {

   const client = useQueryClient()
   const [searchParams] = useSearchParams()
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const id = searchParams.get('removeid') 

   
   if(!id) return null
   
   const handleremoveItem = async() => {
       
    try {
        const data = await deleteCategory(+id)
        toast.success(data)
        client.invalidateQueries({queryKey: ['categories']})
        handleCancel()
    } catch (error) {
        toast.error("Error al eliminar el rol")
    }
   }
   const handleCancel = () => navigate(pathname,{replace: true})
   

  return (
    <Modal defaultState={true} >
        <ModalContent changeOpen={handleCancel} title="Eliminar categoría" description="¿Estás seguro de que quieres eliminar esta categoría?">
            <div className="flex justify-end items-center mt-6 gap-4">
                <Button variant={'outline'} onClick={handleCancel}>Cancelar</Button>
                <ButtonForm variant={'destructive'} onClick={handleremoveItem}> Eliminar</ButtonForm>
            </div>
        </ModalContent>
    </Modal>
  )
}
