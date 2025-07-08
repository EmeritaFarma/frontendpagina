import { z } from "zod";

export const categoriesValidationSchema = z.object({
    name: z.string().min(1,{message: "El nombre es obligatorio"}),
})