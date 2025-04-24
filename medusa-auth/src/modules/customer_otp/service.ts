import {
    ContainerRegistrationKeys,
    InjectManager,
    MedusaContext,
    MedusaError,
    MedusaService
} from "@medusajs/framework/utils";
import CustomerOtp from "./models/customer_otp.model";
import twilio from "twilio";
import {container} from "@medusajs/framework";
import {Context} from "node:vm";
import {CustomerOtpInterface} from "./interfaces/customer-otp.interface";


class CustomerOtpService extends MedusaService({
    CustomerOtp
}) {
    private readonly client: twilio.Twilio;
    private readonly verifyServiceSid: string;

    constructor(...args: any[]) {
        super(...args);

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

        if (!accountSid || !authToken || !serviceSid) {
            console.error("Missing Twilio environment variables.");
            throw new Error("Twilio is not configured properly. Please check your environment variables.");
        }

        this.client = twilio(accountSid, authToken);
        this.verifyServiceSid = serviceSid;
    }

    async sendOtp(phone: string): Promise<any> {
        try {
            console.log("Sending OTP to phone:", phone);

            const verification = await this.client.verify.v2
                .services(this.verifyServiceSid)
                .verifications.create({
                    channel: "sms",
                    to: phone,
                });

            console.log("OTP sent. Status:", verification.status);

            return {
                status: verification.status,
                message: "OTP sent successfully",
            };
        } catch (error: any) {
            console.error("Failed to send OTP:", error);
            throw new Error("Failed to send OTP: " + error.message || error.toString());
        }
    }


    async verifyOtp(code: string, phone: string): Promise<string> {
        const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
        try {
            const verificationCheck = await this.client.verify.v2
                .services(this.verifyServiceSid)
                .verificationChecks.create({
                    code: code,
                    to: phone
                });
            if (verificationCheck.status === 'approved') {
                logger.info("Verification approved successfully")
                return phone
            }

            logger.warn(`Verification not approved: ${verificationCheck.status}`)
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "OTP verification failed"
            )
        } catch (error: any) {
            logger.error("Failed to verify OTP:", error);
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                `Failed to verify OTP: ${error.message || error.toString()}`
            );
        }
    }


    //Get customerId and change phone verify status. Return the customer_otp object
    @InjectManager()
    async updateStatus(
        customerId: string,
        @MedusaContext() sharedContext?: Context
    ): Promise<CustomerOtpInterface> {
        const manager = sharedContext?.manager

        if (!manager) {
            throw new Error("No transaction manager available")
        }

        // Update the is_phone_verified field to true
        const result = await manager.nativeUpdate(
            "customer_otp",
            { customer_id: customerId },
            { is_phone_verified: true }
        )

        return await manager.findOne(
            "customer_otp",
            {customer_id: customerId}
        )
    }

    async deleteByCustomerId(customerId: string): Promise<void> {
        await this.deleteCustomerOtps({
            customer_id: customerId
        })
    }
}

export default CustomerOtpService;

