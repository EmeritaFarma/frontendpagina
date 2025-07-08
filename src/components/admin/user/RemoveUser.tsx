import { Button } from "@/components/ui/button";
import Modal, { ModalContent } from "../Modal";
import ButtonForm from "@/components/components-general/ButtonForm";
import { useIdParams } from "@/hooks/use-idparams";
import { useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/user.services";
import { toast } from "sonner";

export default function RemoveUser() {

    const { id, redirect } = useIdParams("removeid")
    if (!id) return null
    const idCurrent = id ? +id : 0

    const client = useQueryClient()

    const handleremoveItem = async () => {
        try {
            const message = await deleteUser(idCurrent)
            toast.success(message)
            client.invalidateQueries({ queryKey: ['users'] })
            redirect()

        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <Modal defaultState={true} >
            <ModalContent changeOpen={redirect} title="Eliminar usuario" description="¿Estás seguro de que quieres eliminar este usuario?">
                <div className="flex justify-end items-center mt-6 gap-4">
                    <Button variant={'outline'} onClick={redirect}>Cancelar</Button>
                    <ButtonForm variant={'destructive'} onClick={handleremoveItem}> Eliminar</ButtonForm>
                </div>
            </ModalContent>
        </Modal>
    )
}
