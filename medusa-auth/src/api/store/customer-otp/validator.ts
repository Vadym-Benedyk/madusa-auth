import {z} from "zod"

export const createOtpRequestSchema = z.object({
    customerId: z.string(),
})

export const verifyOtpRequestSchema = z.object({
    code: z.string().trim().max(7).min(5),
    customerId: z.string()
})