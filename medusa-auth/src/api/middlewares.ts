import {defineMiddlewares} from "@medusajs/medusa";
import {ContainerRegistrationKeys} from "@medusajs/framework/utils";
import {validateAndTransformQuery} from "@medusajs/framework";
import {createOtpRequestSchema} from "./store/customer-otp/validator";

export default defineMiddlewares({
    routes: [
        {
            matcher: "/store/customer-otp",
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
                    const { customerId } = req.validatedQuery // <-- ось тут доступ до валідованого
                    const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
                    logger.info(`Validated customerId: ${customerId}`)
                    next()
                }
            ],
        }
    ],
})