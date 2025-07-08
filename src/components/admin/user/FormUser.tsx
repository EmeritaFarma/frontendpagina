import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import SelectForm from "@/components/components-general/SelectForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { useModal } from "@/hooks/use-modal"
import { getRol } from "@/services/rol.services"
import { createUser } from "@/services/user.services"
import { userValidationSchema } from "@/validation/user"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


export default function FormUser() {

    const {  closeModal } = useModal()
    
    const { data:roles } = useQuery({ queryKey: ['roles'], queryFn: getRol})

    const client = useQueryClient()
    const form = useForm<z.infer<typeof userValidationSchema>>({
        resolver: zodResolver(userValidationSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role:"",
        },
    })
    
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof userValidationSchema>) => createUser({ ...data, role: +data.role })
    })

    const onSubmit = (data: z.infer<typeof userValidationSchema>) => {
        mutation.mutate(data,{
            onSuccess: (message) => {
                toast.success(message)
                client.invalidateQueries({ queryKey: ['users'] })
                closeModal()
            },
            onError: (error) => {
                console.log(error);
                
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <InputForm label="Nombre" name="name" control={form.control} placeholder="Usuario" />
                    <InputForm label="Email" name="email" control={form.control} placeholder="exemplo@gmail.com" />
                    <InputForm label="Contraseña" name="password" control={form.control} placeholder="••••••••" />
                    <SelectForm label="Rol" name="role" control={form.control} placeholder="Seleccione un rol">
                        {
                            roles?.map((rol) => (
                                <SelectItem key={rol.id} value={rol.id.toString()}>{rol.type}</SelectItem>
                            ))
                        }
                    </SelectForm>
                </div>
                <div className="flex justify-end items-center mt-6 gap-4">
                    <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
                    <ButtonForm type="submit">Agregar</ButtonForm>
                </div>
            </form>
        </Form>
    )
}
