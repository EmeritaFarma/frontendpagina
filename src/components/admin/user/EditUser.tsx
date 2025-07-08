import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { userValidationSchema } from "@/validation/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Modal, { ModalContent } from "../Modal"
import { useIdParams } from "@/hooks/use-idparams"
import { getRol } from "@/services/rol.services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUser, updateUser } from "@/services/user.services"
import SelectForm from "@/components/components-general/SelectForm"
import { SelectItem } from "@/components/ui/select"
import { toast } from "sonner"


export default function EditUser() {

    const { id, redirect } = useIdParams("editid")
    const idCurrent = id ? +id : 0
    
    const { data:roles } = useQuery({ queryKey: ['roles'], queryFn: getRol})
    const { data } = useQuery({ queryKey: ['users',id], queryFn: () => getUser(idCurrent)})

    const client = useQueryClient()

    const form = useForm<z.infer<typeof userValidationSchema>>({
        resolver: zodResolver(userValidationSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role:""
        },
    })

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof userValidationSchema>) => updateUser(idCurrent, { ...data, role: +data.role })
    })

    useEffect(() => {
        
        if(data){
            form.setValue("name", data.name)
            form.setValue("email", data.email)
            form.setValue("role", data.role.id.toString())
        }
      
    }, [data,roles])
    
    
    
    const onSubmit = (data: z.infer<typeof userValidationSchema>) => {
        mutation.mutate(data,{
            onSuccess: (message) => {
                toast.success(message)
                client.invalidateQueries({ queryKey: ['users'] })
                redirect()
            }
        })
    }


    return (
        <Modal defaultState={true}>
            <ModalContent changeOpen={redirect} title="Editar Usuario" description="Edita la información del usuario">
          <div>
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
