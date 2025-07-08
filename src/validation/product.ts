import { z } from "zod";

export const productValidationSchema = z.object({
    name: z.string().min(1,{message: "El nombre es obligatorio"}),
    priceBase: z.string().min(1,{message: "El precio base es obligatorio"}).regex(/^\d+(\.\d{1,2})?$/,{message: "El precio base debe ser un número"}),
    priceDiscount: z.string().min(1,{message: "El precio descuento es obligatorio"}).regex(/^\d+(\.\d{1,2})?$/,{message: "El precio descuento debe ser un número"}).optional().or(z.literal("")),
    sku: z.string().min(1,{message: "El SKU es obligatorio"}),
    category: z.string().min(1,{message: "La categoría es obligatorio"}),
    image: z.string().min(1,{message: "La imagen es obligatorio"}),
    tags: z.array(
        z.object({
            id: z.number(),
            name: z.string().min(1,{message: "El nombre es obligatorio"})
        })
    )
})