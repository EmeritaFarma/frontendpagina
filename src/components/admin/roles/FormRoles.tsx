import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useModal } from "@/hooks/use-modal"
import { createRole } from "@/services/rol.services"
import { rolesValidationSchema } from "@/validation/roles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


export default function FormRoles() {

    const {  closeModal } = useModal()
    const client = useQueryClient()
    const form = useForm<z.infer<typeof rolesValidationSchema>>({
        resolver: zodResolver(rolesValidationSchema),
        defaultValues: {
            type: "",
        },
    })

    const mutate = useMutation({
        mutationFn:createRole
    })
    
    const onSubmit = (data: z.infer<typeof rolesValidationSchema>) => {
        mutate.mutate(data,{
            onSuccess: (data) => {
                toast.success(data)
                client.invalidateQueries({queryKey: ['roles']})
                closeModal()
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <InputForm label="Nombre" name="type" control={form.control} placeholder="Ej. Administrador" />
                <div className="flex justify-end items-center mt-6 gap-4">
                    <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
                    <ButtonForm type="submit">Agregar</ButtonForm>
                </div>
            </form>
        </Form>
    )
}
