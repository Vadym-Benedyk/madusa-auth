import {defineLink} from "@medusajs/framework/utils"
import CustomerOtpModule from "../modules/customer_otp"
import CustomerModule from "@medusajs/medusa/customer"

export default defineLink(
    {
        linkable: CustomerOtpModule.linkable.customerOtp,
        field: "customer_id",
        isList: false,
    },
    CustomerModule.linkable.customer

)