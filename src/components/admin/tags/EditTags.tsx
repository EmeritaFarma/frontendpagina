import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useIdParams } from "@/hooks/use-idparams"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Modal, { ModalContent } from "../Modal"
import { tagsValidationSchema } from "@/validation/tags"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTag, updateTag } from "@/services/tags.services"
import { toast } from "sonner"


export default function EditTags() {

    const { id, redirect } = useIdParams("editid")
    const idCurrent = id ? +id : 0

    const client = useQueryClient()

    const { data } = useQuery({ queryKey: ['tags', id], queryFn: () => getTag(idCurrent) })
    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof tagsValidationSchema>) => updateTag(idCurrent, data),
    });

    const form = useForm<z.infer<typeof tagsValidationSchema>>({
        resolver: zodResolver(tagsValidationSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = (data: z.infer<typeof tagsValidationSchema>) => {
        mutation.mutate(data, {
            onSuccess: (message) => {
                toast.success(message);
                client.invalidateQueries({ queryKey: ['tags'] });
                redirect();
            },
            onError: () => {
                toast.error("Error al actualizar la etiqueta");
            }
        })
    }

    useEffect(() => {

        if (data) {
            form.setValue("name", data.name)
        }
    }, [data])


    return (
        <Modal defaultState={true}>
            <ModalContent changeOpen={redirect} title="Editar Etiqueta" description="Editar la información de la etiqueta">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <InputForm label="Nombre" name="name" control={form.control} placeholder="Nombre de la categoría" />
                            <div className="flex justify-end items-center mt-6 gap-4">
                                <Button type="button" variant="outline" onClick={redirect}>Cancelar</Button>
                                <ButtonForm type="submit">Agregar</ButtonForm>
                            </div>
                        </form>
                    </Form>
                </div>
            </ModalContent>
        </Modal>

    )
}
