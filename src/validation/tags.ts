

import { z } from "zod";

export const tagsValidationSchema = z.object({
    name: z.string().min(1,{message: "El nombre es obligatorio"}),
})