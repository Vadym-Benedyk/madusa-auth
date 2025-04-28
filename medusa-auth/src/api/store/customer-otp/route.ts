import type {MedusaRequest, MedusaResponse} from "@medusajs/framework/http"
import sendOtpWorkflow from "../../../workflows/customer_otp/send-otp";
import {z} from "zod"
import {createOtpRequestSchema, verifyOtpRequestSchema} from "./validator"
import {ContainerRegistrationKeys} from "@medusajs/framework/utils";
import verifyOtpWorkflow from "../../../workflows/customer_otp/verify-otp";


type CreateOtpRequestType = z.infer<typeof createOtpRequestSchema>;
type VerifyOtpRequestType = z.infer<typeof verifyOtpRequestSchema>;

// SEND  OTP BY CUSTOMER_ID
export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
    try {
        logger.info("GET REQUEST");

        const validatedQuery = req.validatedQuery as CreateOtpRequestType;
        const { result } = await sendOtpWorkflow(req.scope)
            .run({
                input: { customerId: validatedQuery.customerId }
            })

        res.status(200).json({ success: true, result });
    } catch (error) {
        logger.error(`Error in GET request: ${error.message}`)
        res.status(500).json({ success: false, error: error.message });
    }
}

// VERIFY OTP BY CUSTOMER_ID AND CODE
export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
    try {
        logger.info("REQUEST OTP VERIFY");
        const validatedBody = req.validatedBody as VerifyOtpRequestType

        const { result } = await verifyOtpWorkflow(req.scope)
            .run({
                input: { customerId: validatedBody.customerId, code: validatedBody.code }
            })

        res.status(200).json({ success: true, result });
    } catch (error) {
        logger.error(`Error in POST request: ${error.message}`)
        res.status(400).json({ success: false, error: error.message });
    }
}
