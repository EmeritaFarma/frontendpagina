

import { z } from "zod";

export const userValidationSchema = z.object({
    name: z.string().min(1,{message: "El nombre es obligatorio"}),
    email: z.string().email({message: "El email es invalido"}),
    password: z.string().min(8,{message: "La contraseña debe tener al menos 8 caracteres"}),
    role: z.string().min(1,{message: "El rol es obligatorio"}),
})