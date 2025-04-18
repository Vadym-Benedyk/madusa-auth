import CustomerOtpService from "./service"
import { Module } from "@medusajs/framework/utils"

export const CUSTOMER_OTP_MODULE = "customer_otp"

export default Module(CUSTOMER_OTP_MODULE, {
    service: CustomerOtpService,
})