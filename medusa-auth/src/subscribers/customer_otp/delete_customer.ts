import { deleteCustomerOtpWorkflow } from "../../workflows/customer_otp/cascade-delete"
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"

export default async function handleCustomerOtpDelete({ event: { data }, container }: SubscriberArgs<{ customer_id: string }>) {
    await deleteCustomerOtpWorkflow(container)
        .run({
            input: {
                customer_id: data.customer_id,
            },
        })
}

export const config: SubscriberConfig = {
    event: "customer.deleted", // or any other event that should trigger OTP deletion
}