import { MedusaService } from "@medusajs/framework/utils";
import CustomerOtp from "./models/customer_otp.model";


class CustomerOtpService extends MedusaService({
    CustomerOtp,
}) {
    async deleteByCustomerId(customerId: string): Promise<void> {
        await this.deleteCustomerOtps({
            customer_id: customerId
        });
    }
}

export default CustomerOtpService;