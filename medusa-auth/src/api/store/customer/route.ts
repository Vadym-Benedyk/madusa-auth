import type {MedusaRequest, MedusaResponse} from "@medusajs/framework/http"
import sendOtpWorkflow from "../../../workflows/customer_otp/send-otp";
import {z} from "zod"
import {createOtpRequestSchema} from "./validator"

type CreateOtpRequestType = z.infer<typeof createOtpRequestSchema>;

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const { result } = await sendOtpWorkflow(req.scope)
        .run({
            input: req.validatedQuery.id as string,
        })

    res.json({ message: "Hello world!", result })
}