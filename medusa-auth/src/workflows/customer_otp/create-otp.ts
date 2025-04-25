import {createStep, createWorkflow, StepResponse, WorkflowResponse} from "@medusajs/framework/workflows-sdk";
import {CUSTOMER_OTP_MODULE} from "../../modules/customer_otp";

const createCustomerOtpStep = createStep(
    "create-customer-otp",
    async (input: { customerId: string }, { container }) => {
        const customerOtpService = container.resolve(CUSTOMER_OTP_MODULE);
        const customerOtp = await customerOtpService.createCustomerOtpItem(input.customerId);

        return new StepResponse(customerOtp);
    },
);


export const createOtpWorkflow = createWorkflow(
    "create-customer-otp-workflow",
    (input: { customerId: string }) => {
        const otp = createCustomerOtpStep(input);

        return new WorkflowResponse(otp)
    }
)