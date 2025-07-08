import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import SelectForm from "@/components/components-general/SelectForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { useBranch } from "@/hooks/use-branch"
import { useModal } from "@/hooks/use-modal"
import { getProducts } from "@/services/product.services"
import { createProductBranch } from "@/services/productBranch"
import { branchProductValidationSchema } from "@/validation/branchProduct"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


export default function AddBranchProduct() {

    const {  closeModal } = useModal()
    const { data: products } = useQuery({ queryKey: ['products'], queryFn: () => getProducts()})
    const { branchId } = useBranch()

    const client = useQueryClient()

    const mutation = useMutation({
        mutationFn:createProductBranch
    })

    const form = useForm<z.infer<typeof branchProductValidationSchema>>({
        resolver: zodResolver(branchProductValidationSchema),
        defaultValues: {
            amount: "",
            branch: branchId,
            product: "",
        },
    })
    
    const onSubmit = (data: z.infer<typeof branchProductValidationSchema>) => {
        const dataForm = {
            ...data,
            amount: Number(data.amount),
            product: Number(data.product),
        }
   
        mutation.mutate(dataForm,{
            onSuccess: (message) => {
                toast.success(message)
                client.invalidateQueries({queryKey: ['productsBranch',branchId]})
                closeModal()
            },
            onError: (error) => {
                toast.error(error.message)
            },
            
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                     <SelectForm label="Producto" name="product" control={form.control} placeholder="Selecciona el producto">
                        {
                            products?.map((product, index) => (
                                <SelectItem key={index} value={product.id.toString()}>{product.name}</SelectItem>
                            ))
                        }
                     </SelectForm>
                     <InputForm label="Cantidad"  name="amount" control={form.control} placeholder="Cantidad de productos" />
                </div>
                <div className="flex justify-end items-center mt-6 gap-4">
                    <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
                    <ButtonForm type="submit">Agregar</ButtonForm>
                </div>
            </form>
        </Form>
    )
}
