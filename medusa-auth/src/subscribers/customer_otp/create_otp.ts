import {SubscriberArgs, type SubscriberConfig} from "@medusajs/framework"
import {createOtpWorkflow} from "../../workflows/customer_otp/create-otp"

export default async function CreateCustomerHandler({ event: { data },  container }: SubscriberArgs<{ id: string }>) {
    const logger = container.resolve("logger")
    logger.info("Creating customer otp started")

    await createOtpWorkflow(container)
        .run({
            input: {
                customerId: data.id,
            },
        })
}

export const config: SubscriberConfig = {
    event: `customer.created`
}