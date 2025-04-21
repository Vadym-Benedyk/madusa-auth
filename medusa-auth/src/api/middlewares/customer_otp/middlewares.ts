import {defineMiddlewares, validateAndTransformQuery} from "@medusajs/framework/http";
import {createOtpRequestSchema} from "../../store/customer/validator";


export default defineMiddlewares({
    routes: [
        {
            matcher: "/store/customer",
            method: "GET",
            middlewares: [
                validateAndTransformQuery(
                    createOtpRequestSchema,
                    {}
                ),
            ],
        },
    ],
})