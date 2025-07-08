import { z } from "zod";

export const scheduleValidationSchema = z.object({
    name: z.string().min(1, { message: "Añada el nombre de la sucursal" }),
    schedules: z.array(z.object({
        dayFrom: z.string().min(1, { message: "El día de inicio es obligatorio" }),
        dayTo: z.string().min(1, { message: "El día de fin es obligatorio" }),
        timeIn: z.string().min(1, { message: "La hora de inicio es obligatoria" }),
        timeOut: z.string().min(1, { message: "La hora de fin es obligatoria" })
    })).min(1, { message: "Añade mínimo un horario" })
});