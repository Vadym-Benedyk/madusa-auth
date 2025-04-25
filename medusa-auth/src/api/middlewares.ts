import {defineMiddlewares} from "@medusajs/medusa";
import {ContainerRegistrationKeys} from "@medusajs/framework/utils";
import {validateAndTransformBody, validateAndTransformQuery} from "@medusajs/framework";
import {createOtpRequestSchema, phoneNumberSchema, verifyOtpRequestSchema} from "./store/customer-otp/validator";


export default defineMiddlewares({
    routes: [
        {
            matcher: "/store/customer-otp",
            method: "GET",
            middlewares: [
                (req, res, next) => {
                    const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
                    logger.info("Middleware executed")
                    logger.info(`Query params: ${JSON.stringify(req.query)}`)
                    next()
                },
                validateAndTransformQuery(
                    createOtpRequestSchema,
                    {
                        defaults: ["id", "customerId"],
                        isList: false,
                    }
                ),
                (req, res, next) => {
                    const { customerId } = req.validatedQuery
                    const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
                    logger.info(`Validated customerId: ${customerId}`)
                    next()
                }
            ],
        },
        {
            matcher: "/store/customer-otp",
            method: "POST",
            middlewares: [ validateAndTransformBody(verifyOtpRequestSchema)],
        },
        {
            matcher: "/store/customers",
            method: "POST",
            middlewares: [
                (req, res, next) => {
                    const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER);
                    try {
                        // @ts-ignore
                        const { phone } = req.body;
                        phoneNumberSchema.parse(phone);
                        logger.info(`Validated phone number: ${phone}`);
                        next();
                    } catch (error) {
                        logger.error(`Validation error: ${error.message}`);
                        res.status(400).json({ message: "Invalid phone number format" });
                    }
                }
            ],
        }
    ],
})