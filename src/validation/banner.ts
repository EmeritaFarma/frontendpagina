
import { z } from "zod";

export const bannerValidationSchema = z.object({
    name: z.string().min(1, { message: "Añade una imagen" })
});