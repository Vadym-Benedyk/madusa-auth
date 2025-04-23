import {MedusaService} from "@medusajs/framework/utils";
import CustomerOtp from "./models/customer_otp.model";
import twilio from "twilio";


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



    async deleteByCustomerId(customerId: string): Promise<void> {
        await this.deleteCustomerOtps({
            customer_id: customerId
        })
    }
}

export default CustomerOtpService;

