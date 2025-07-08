import { z } from "zod";

export const validationLogin = z.object({
    email: z.string().min(2, {
        message: "Ingrese su correo electronico",
    }),
    password: z.string().min(2, {
        message: "Ingrese su contraseña",
    }),
})

