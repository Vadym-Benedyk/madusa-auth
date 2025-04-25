import {z} from "zod"

export const createOtpRequestSchema = z.object({
    customerId: z.string(),
})

export const verifyOtpRequestSchema = z.object({
    code: z.string().trim().max(7).min(5),
    customerId: z.string()
})

export const validateOtpSchema = z.object({
    id: z.string(),
    customer_id: z.string(),
    is_phone_verified: z.boolean().nullable(),
    is_email_verified: z.boolean().nullable()
})

export const phoneNumberSchema = z.string().regex(
    /^\+380\d{9}$/,
    "Phone number must be in the format +380XXXXXXXXX"
);