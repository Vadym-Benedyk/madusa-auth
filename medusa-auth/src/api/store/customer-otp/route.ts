import type {MedusaRequest, MedusaResponse} from "@medusajs/framework/http"
import sendOtpWorkflow from "../../../workflows/customer_otp/send-otp";
import {z} from "zod"
import {createOtpRequestSchema} from "./validator"
import {ContainerRegistrationKeys} from "@medusajs/framework/utils";

type CreateOtpRequestType = z.infer<typeof createOtpRequestSchema>;

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