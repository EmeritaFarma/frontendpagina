import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useIdParams } from "@/hooks/use-idparams"
import { rolesValidationSchema } from "@/validation/roles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Modal, { ModalContent } from "../Modal"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getRole, updateRole } from "@/services/rol.services"
import { toast } from "sonner"
import { useEffect } from "react"


export default function EditRoles() {

    const { id, redirect } = useIdParams("editid")

    const  client = useQueryClient()
    const idCurrent = id ? +id : 0

    const { data } = useQuery({ queryKey: ['roles', id], queryFn: () => getRole(idCurrent) })
    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof rolesValidationSchema>) => updateRole(idCurrent, data),
    });

    const form = useForm<z.infer<typeof rolesValidationSchema>>({
        resolver: zodResolver(rolesValidationSchema),
        defaultValues: {
            type: "",
        },
    })

    useEffect(() => {
        if (data) {
            form.setValue("type", data.type)
        }
    }, [data])


    const onSubmit = (data: z.infer<typeof rolesValidationSchema>) => {
        mutation.mutate(data, {
            onSuccess: (message) => {
                toast.success(message);
                client.invalidateQueries({ queryKey: ['roles'] });
                redirect();
            },
            onError: (_error) => {
                toast.error("Error al actualizar el rol");
            }
        })
    }

    return (
        <Modal defaultState={true}>
            <ModalContent changeOpen={redirect} title="Editar Rol" description="Edita la información del rol">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <InputForm label="Nombre" name="type" control={form.control} placeholder="Ej. Administrador" />
                            <div className="flex justify-end items-center mt-6 gap-4">
                                <Button type="button" variant="outline" onClick={redirect}>Cancelar</Button>
                                <ButtonForm type="submit">Editar</ButtonForm>
                            </div>
                        </form>
                    </Form>
                </div>
            </ModalContent>
        </Modal>

    )
}
