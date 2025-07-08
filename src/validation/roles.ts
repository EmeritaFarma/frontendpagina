
import { z } from "zod";

export const rolesValidationSchema = z.object({
    type: z.string().min(1,{message: "El nombre es obligatorio"}),
})