import { z } from "zod";

export const rdvSchema = z.object({
    coachId: z
        .number({ required_error: "L'ID du coach est requis" })
        .positive("L'ID du coach doit être un nombre positif"),
    clientId: z
        .number({ required_error: "L'ID du client est requis" })
        .positive("L'ID du client doit être un nombre positif"),
    date: z
        .string()
        .nonempty({ message: "La date est requise" })
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "La date doit être valide",
        }),
});

export type RdvData = z.infer<typeof rdvSchema>;
