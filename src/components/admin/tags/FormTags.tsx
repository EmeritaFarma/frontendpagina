import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useModal } from "@/hooks/use-modal"
import { createTag } from "@/services/tags.services"
import { tagsValidationSchema } from "@/validation/tags"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


export default function FormTags() {

    const {  closeModal } = useModal()

    const client = useQueryClient()

    const mutation = useMutation({
        mutationFn:createTag
    })

    const form = useForm<z.infer<typeof tagsValidationSchema>>({
        resolver: zodResolver(tagsValidationSchema),
        defaultValues: {
            name: "",
        },
    })
    
    const onSubmit = (data: z.infer<typeof tagsValidationSchema>) => {
        mutation.mutate(data,{
            onSuccess: (data) => {
                toast.success(data)
                client.invalidateQueries({queryKey: ['tags']})
                closeModal()
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <InputForm label="Nombre" name="name" control={form.control} placeholder="Ingrese el nombre de la etiqueta" />
                </div>
                <div className="flex justify-end items-center mt-6 gap-4">
                    <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
                    <ButtonForm type="submit">Editar</ButtonForm>
                </div>
            </form>
        </Form>
    )
}
