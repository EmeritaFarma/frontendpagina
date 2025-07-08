import { z } from "zod";

export const branchProductValidationSchema = z.object({
    product: z.string().min(1,{message: "Selecciona un producto"}),
    branch: z.number().min(1,{message: "branchId es obligatorio"}),
    amount: z.string().min(1,{message: "Ingrese una cantidad"}).regex(/^\d+$/,{message: "La cantidad debe ser un numero"}),  
})