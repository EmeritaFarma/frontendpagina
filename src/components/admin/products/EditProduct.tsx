import ButtonForm from "@/components/components-general/ButtonForm"
import InputForm from "@/components/components-general/InputForm"
import SelectForm from "@/components/components-general/SelectForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn, createFileFromImageUrl } from "@/lib/utils"
import { productValidationSchema } from "@/validation/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Minus, Plus, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import DragImageInput from "../drag-and-drop/DragImageInput"
import { getProductById, updateProduct } from "@/services/product.services"
import { getTags } from "@/services/tags.services"
import Modal, { ModalContent } from "../Modal"
import { useIdParams } from "@/hooks/use-idparams"
import { Category } from "@/lib/types/category"


export default function EditProduct({categories}: {categories: Category[]}) {

    const client = useQueryClient()
    const { data: tagsData } = useQuery({ queryKey: ['tags'], queryFn: getTags })
    const { id, redirect } = useIdParams("editid")
    const {data: product } = useQuery({ queryKey: ['products', id], queryFn: () => getProductById(id ?? '') })
    const [modeAddTag, setmodeAddTag] = useState(false)

    const [tagId, setTagId] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [key, setkey] = useState(0)
    const { data: tagsOptions } = useQuery({ queryKey: ['tags'], queryFn: getTags })

    const form = useForm<z.infer<typeof productValidationSchema>>({
        resolver: zodResolver(productValidationSchema),
        defaultValues: {
            name: "",
            priceBase: "",
            priceDiscount: "",
            sku: "",
            category: "",
            image: "",
            tags: [],
        },
    })

    useEffect(() => {
        if(product){
            console.log(product);
            
            form.reset({
                name: product.name,
                priceBase: product.priceBase.toString(),
                priceDiscount: product.priceDiscount?.toString() ?? "0",
                sku: product.sku,
                category: product.category?.id?.toString() ?? "",
                image: product.image,
                tags: product?.tags ?? [],
            })

            createFileFromImageUrl(product.image).then((newFile) => {
                if(!newFile) return
                console.log(URL.createObjectURL(newFile));
                form.setValue("image", newFile.name)
                setFile(newFile)
            })
            .finally( () => setkey(key+1))

        }   

    },  [product])
    


    const { setValue, getValues, watch } = form

    const mutate = useMutation({
        mutationFn: (data: FormData) => updateProduct(id ?? '', data),
    })


    const onSubmit = (data: z.infer<typeof productValidationSchema>) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("priceBase", data.priceBase.toString());
        formData.append("priceDiscount", data?.priceDiscount?.toString() ?? "0");
        formData.append("sku", data.sku);
        formData.append("category", data.category);
        formData.append("tags", JSON.stringify(data.tags));
        formData.append("image", file as File);

        console.log(Object.fromEntries(formData.entries()));
        
        
        mutate.mutate(formData, {
            onSuccess: (message) => {
                toast.success(message)
                client.invalidateQueries({ queryKey: ['products'] })
                redirect()
            },
            onError: (error) => {
                console.log(error);
                
                // toast.error('Error al guardar')
            }
        })
    }

    const removeTag = (id: number) => {
        const tags = getValues('tags')
        const filter = tags.filter((tag) => tag.id != id)

        setValue('tags', filter)
    }

    const handleSaveTag = () => {
        const tags = getValues('tags')
        console.log(tagsData?.find((tag) => tag.id === Number(tagId)));
        console.log(tagId);
        
        
        const name = tagsData?.find((tag) => tag.id === Number(tagId))?.name || ""
        if (!name) return
        setValue('tags', [...tags, {
            id: Number(tagId),
            name
        }])
        setmodeAddTag(false)
        setTagId('')
    }

    watch('tags')

    const tags = getValues('tags')


    return (
        <Modal defaultState={true}>
            <ModalContent changeOpen={redirect} title="Editar Producto" description="Editar el producto">
               { key > 0 && <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <InputForm label="Nombre" name="name" control={form.control} placeholder="Nombre del producto" />
                            <div className="grid grid-cols-2 gap-4">
                                <InputForm label="Precio Base" name="priceBase" control={form.control} placeholder="240.50" />
                                <InputForm label="Precio Descuento" name="priceDiscount" control={form.control} placeholder="40" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <InputForm label="SKU" name="sku" control={form.control} placeholder="93JKDNJ2093" />
                                <SelectForm label="Categoría" name="category" control={form.control} placeholder="Selecciona la categoría">
                                    {
                                        categories.map((category, index) => (
                                            <SelectItem key={index} value={category.id.toString()}>{category.name}</SelectItem>
                                        ))
                                    }
                                </SelectForm>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <Label htmlFor="tags" className="inline-block">Etiquetas</Label>
                                    <Button type="button" onClick={() => setmodeAddTag(!modeAddTag)} variant={'notion'}>
                                        {modeAddTag ? <Minus width={14} height={14} /> : <Plus width={14} height={14} />}
                                    </Button>
                                </div>
                                <div className={cn("flex gap-2 flex-wrap", tags?.length ? 'mb-4' : '')}>
                                    {
                                        tags?.map((tag, index) => (
                                            <div className="flex items-center gap-2" >
                                                <Badge key={index} variant={'outline'}>
                                                    {tag.name}
                                                </Badge>
                                                <button type="button" onClick={() => removeTag(tag.id)} className="cursor-pointer opacity-20 transition-opacity hover:opacity-100">
                                                    <X width={12} height={12} />
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    modeAddTag && <div className="flex items-center justify-between gap-4">
                                        <Select onValueChange={(value) => setTagId(value)} defaultValue={tagId}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona la etiqueta" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    tagsOptions?.map((tag, index) => (
                                                        <SelectItem key={index} className="capitalize" value={tag.id.toString()}>{tag.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <Button type="button" variant={'notion'} onClick={handleSaveTag}>Agregar</Button>
                                    </div>
                                }
                            </div>
                            {file !== null ? <DragImageInput
                                message={form.formState.errors?.image?.message}
                                onChangeValue={(value) => form.setValue("image", value)}
                                file={file}
                                onChangeFile={setFile}
                                value={{
                                    url: URL.createObjectURL(file),
                                    name: file?.name,
                                    size: file?.size,
                                    type: file?.type
                                }}
                                
                            /> : (
                                <DragImageInput
                                message={form.formState.errors?.image?.message}
                                onChangeValue={(value) => form.setValue("image", value)}
                                file={file}
                                onChangeFile={setFile}
                                />
                            )
                        
                        }
                        </div>
                        <div className="flex justify-end items-center mt-6 gap-4">
                            <Button type="button" variant="outline" onClick={redirect}>Cancelar</Button>
                            <ButtonForm type="submit">Editar</ButtonForm>
                        </div>
                    </form>
                </Form>}
            </ModalContent>
        </Modal>
    )
}
