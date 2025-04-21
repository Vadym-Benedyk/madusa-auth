import {createStep, createWorkflow, StepResponse, WorkflowResponse} from "@medusajs/framework/workflows-sdk"
import CustomerOtpService from "../../modules/customer_otp/service";
import {CUSTOMER_OTP_MODULE} from "../../modules/customer_otp";


// type CustomerType = {
//     id: string,
//     phone: string,
//     company_name: string,
//     first_name: string,
//     last_name: string,
//     email: string,
//     has_access: boolean,
//     metadata: object,
//     created_at: Date,
//     updated_at: Date,
//     deleted_at: Date,
//     created_by: string,
// }

// Step 1: Check if phone exists
const checkPhoneStep = createStep(
    "check-phone-step",
    async (input: {id: string }, { container }) => {
        const customerOtpService = container.resolve(CUSTOMER_OTP_MODULE);
        const customer = await customerOtpService.checkPhone(input.id);

        return new StepResponse(customer.phone)
    }
)

// Step 2: Send OTP
const sendOtpStep = createStep(
    "send-otp-step",
    async (input: {phone: string }, { container }) => {
        const customerOtpService: CustomerOtpService = container.resolve( CUSTOMER_OTP_MODULE )
        const result = await customerOtpService.sendOtp(input.phone)

        return new StepResponse(result)
    }
)

// Create the workflow
const sendOtpWorkflow = createWorkflow(
    "send-otp-workflow",
    function (input: { customerId: string }) {
        const customerPhone = checkPhoneStep({
            id: input.customerId
        })

        const otpResult = sendOtpStep({
            phone: customerPhone
        })

        return new WorkflowResponse(otpResult)
    }
)

export default sendOtpWorkflow