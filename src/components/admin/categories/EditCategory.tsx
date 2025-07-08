import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useIdParams } from "@/hooks/use-idparams"
import { categoriesValidationSchema } from "@/validation/categories"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Modal, { ModalContent } from "../Modal"
import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCategory, updateCategory } from "@/services/category.services"
import { toast } from "sonner"


export default function EditCategory() {

    const { id, redirect } = useIdParams("editid")
    const client = useQueryClient()

    const { data } = useQuery({ queryKey: ['categories', id], queryFn: () => getCategory(id ? +id : 0) })


    const form = useForm<z.infer<typeof categoriesValidationSchema>>({
        resolver: zodResolver(categoriesValidationSchema),
        defaultValues: {
            name: "",
        },
    })

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof categoriesValidationSchema>) => updateCategory(id ? +id : 0, data),
    });


    const onSubmit = (data: z.infer<typeof categoriesValidationSchema>) => {
        mutation.mutate(data, {
            onSuccess: (message) => {
                toast.success(message);
                client.invalidateQueries({ queryKey: ['categories'] });
                redirect();
            },
            onError: (_error) => {
                toast.error("Error al actualizar la categoría");
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
            <ModalContent changeOpen={redirect} title="Editar categoría" description="Edita la información de la categoría">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <InputForm label="Nombre" name="name" control={form.control} placeholder="Nombre de la categoría" />
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
