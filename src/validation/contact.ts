import { z } from "zod";


export const validationContact = z.object({
    name: z.string().min(2, {
        message: "Ingrese su nombre",
    }),
    email: z.string().email({
        message: "Ingrese un correo electronico valido",
    }),
    phone: z.string().min(10, {
        message: "Ingrese un numero de 10 digitos",
    }),
    commentGeneral: z.string().min(2, {
        message: "Ingrese un comentario",
    }),
    commentAdditional: z.string().min(2, {
        message: "Ingrese un comentario adicional",
    }),
})

export type validationContactType = typeof validationContact