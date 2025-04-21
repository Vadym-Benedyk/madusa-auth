import {MedusaService} from "@medusajs/framework/utils";
import CustomerOtp from "./models/customer_otp.model";
import {Customer} from "@medusajs/customer/dist/models";
import * as twilio from 'twilio';


class CustomerOtpService extends MedusaService({
    CustomerOtp,
    Customer
}) {
    private readonly client: twilio.Twilio
    private readonly verifyServiceSid: string

    async checkPhone(customerId: string): Promise<any> {
        try {
            return await this.retrieveCustomer( customerId );
        } catch (error) {
            throw new Error("Failed to read customer phone from DB. Error: " + error);
        }
    }


    async sendOtp(phone: string): Promise<any> {
        try {
            const verification = await this.client.verify.v2
                .services(this.verifyServiceSid)
                .verifications.create({
                    channel: "sms",
                    to: phone,
                })

            return {
                status: verification.status,
                message: 'OTP sent successfully',
            }
        } catch (error) {
            throw new Error('Failed to send OTP: ' + error)
        }
    }


    async deleteByCustomerId(customerId: string): Promise<void> {
        await this.deleteCustomerOtps({
            customer_id: customerId
        })
    }
}

export default CustomerOtpService;