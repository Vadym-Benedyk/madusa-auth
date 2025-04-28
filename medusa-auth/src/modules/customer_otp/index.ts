import {Module} from "@medusajs/framework/utils"
import CustomerOtpService from "./service"
import CustomerOtp from "./models/customer_otp.model"

export const CUSTOMER_OTP_MODULE = "customer_otp"

export const linkable = {
    customerOtp: {
        service: CustomerOtpService,
        schema: CustomerOtp,
    },
}


export default Module(CUSTOMER_OTP_MODULE, {
    service: CustomerOtpService,
});