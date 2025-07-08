import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import SelectForm from "@/components/components-general/SelectForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { useBranch } from "@/hooks/use-branch"
import { getProducts } from "@/services/product.services"
import { updateProductBranch, getProductBranchById } from "@/services/productBranch"
import { branchProductValidationSchema } from "@/validation/branchProduct"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import Modal, { ModalContent } from "../Modal"
import { useIdParams } from "@/hooks/use-idparams"
import { useEffect, useState } from "react"
import { ProductBranch } from "@/lib/types/productBranch"


export default function EditBranchProduct() {

    const { id, redirect } = useIdParams("editproductid")
    const [product, setproduct] = useState<null | {
        amount: string
        branch: number
        product: string
    }>(null)

    useEffect(() => {
        if (id) {
            getProductBranchById(+id)
                .then((data) => {
                    setproduct({
                        amount: data.amount.toString(),
                        branch: data.branch,
                        product: data.product.toString(),
                    })

                })
        }
    }, [id])


   

    return (
        <Modal defaultState={true}>
            <ModalContent changeOpen={redirect} title="Editar Etiqueta" description="Editar la etiqueta">
               {product && <EditBranchProductBody product={product} />}
            </ModalContent>
        </Modal>
    )
}

interface PropsEditBranchProductBody {
    product: {
        amount: string
        branch: number
        product: string
    }
}

export function EditBranchProductBody({ product }: PropsEditBranchProductBody) {

    const { data: products } = useQuery({ queryKey: ['products'], queryFn: () => getProducts() })
    const { id, redirect } = useIdParams("editproductid")
    const idCurrent = id ? id : ''
    const { branchId } = useBranch()

    const client = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: Omit<ProductBranch, "id">) => updateProductBranch(idCurrent, data),
    })


    const form = useForm<z.infer<typeof branchProductValidationSchema>>({
        resolver: zodResolver(branchProductValidationSchema),
        defaultValues: {
            amount: product.amount,
            branch: branchId,
            product: product.product,
        },
    })


    const onSubmit = (data: z.infer<typeof branchProductValidationSchema>) => {
        const dataForm = {
            ...data,
            amount: Number(data.amount),
            product: Number(data.product),
        }

        mutation.mutate(dataForm, {
            onSuccess: (message) => {
                toast.success(message)
                client.invalidateQueries({ queryKey: ['productsBranch', branchId] })
                redirect()
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
                    <InputForm label="Cantidad" name="amount" control={form.control} placeholder="Cantidad de productos" />
                </div>
                <div className="flex justify-end items-center mt-6 gap-4">
                    <Button type="button" variant="outline" onClick={() => redirect()}>Cancelar</Button>
                    <ButtonForm type="submit">Editar</ButtonForm>
                </div>
            </form>
        </Form>
    )
}


