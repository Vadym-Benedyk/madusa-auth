import {z} from "zod"


export const createOtpRequestSchema = z.object({
    id: z.string()
})