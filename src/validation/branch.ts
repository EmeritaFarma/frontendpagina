import { z } from "zod";



const scheduleValidationSchema = z.object({
    timeIn: z.string().optional(),
    timeOut: z.string().optional(),
    dayTo: z.string().optional(),
    dayFrom: z.string().optional(),
})


const contactValidationSchema = z.object({
    type: z.string().min(3),
    number: z.string().min(5,{message: "El numero es requerido"}),
})

export const branchValidationSchema = z.object({
    name: z.string().min(1,{message: "El nombre es requerido"}),
    location: z.object({
        street: z.string().min(1,{message: "La calle es requerida"}),
        number: z.string().min(1,{message: "El numero es requerido"}),
        betweenStreet: z.string().min(1,{message: "El campo es requerido"}),
        andBetweenStreet: z.string().min(1,{message: "El campo es requerido"}),
        zipCode: z.string().min(3,{message: "El codigo es requerido"}),
        city: z.string().min(3,{message: "La ciudad es requerida"}),
        state: z.string().min(3,{message: "El estado es requerido"}),
        colony: z.string().min(3,{message: "La colonia es requerido"}),
        latitude: z.number(),
        longitude: z.number(),
    }),
    schedule: z.array(scheduleValidationSchema),
    contact: z.array(contactValidationSchema),
})

