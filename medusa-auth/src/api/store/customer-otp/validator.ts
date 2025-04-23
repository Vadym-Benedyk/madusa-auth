// src/api/store/customer-otp/validator.ts
import {z} from "zod"

export const createOtpRequestSchema = z.object({
    customerId: z.string(),
})
