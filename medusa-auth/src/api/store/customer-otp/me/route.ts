// import type {MedusaRequest, MedusaResponse} from "@medusajs/framework/http"
// import CustomerOtpService from "../../../../modules/customer_otp/service";
// import {ContainerRegistrationKeys} from "@medusajs/framework/utils";


//Route store/customer-otp/me
// GET OTP STATUS BY CUSTOMER_ID IN HEADER
// export const GET = async (
//     req: MedusaRequest,
//     res: MedusaResponse
// ) => {
//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     logger.info(`REQUEST OTP status in me-route`);
//     const customer_id = req.user?.customer_id
//     logger.info(`INCOMING customer_id: ${customer_id}`);
//     if (!customer_id) {
//         res.status(401).json({ message: "Unauthorized" })
//         return
//     }
//
//     const customerOtpService = req.scope.resolve("customerOtpService") as CustomerOtpService;
//     const customerOtp = await customerOtpService.otpByCustomerId(customer_id)
//
//     if (!customerOtp.length) {
//         res.status(404).json({ message: "OTP info not found" })
//         return
//     }
//
//     res.json(customerOtp[0])
//
// }


import {MedusaRequest, MedusaResponse,} from "@medusajs/framework/http"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const query = req.scope.resolve("query")

    // Використовуємо граф для отримання клієнта з OTP
    const { data: customerOtpData } = await query.graph({
        entity: "customer", // Основна сутність
        fields: ["*", "customer_otp.*"], // Вказуємо зв'язок з customer_otp
    })

    if (!customerOtpData) {
        return res.status(404).json({ message: "Customer not found" })
    }

    res.json({ customer: customerOtpData })
}