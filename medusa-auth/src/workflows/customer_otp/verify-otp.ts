import {createStep, createWorkflow, StepResponse, WorkflowResponse} from "@medusajs/framework/workflows-sdk";
import {Modules} from "@medusajs/framework/utils";
import {CUSTOMER_OTP_MODULE} from "../../modules/customer_otp";


//step 1: check if phone exists and get it
const checkPhoneStep = createStep(
    "get-phone-step",
    async (input: { customerId: string }, { container }) => {
        try {
            const customerModuleService = container.resolve(Modules.CUSTOMER)
            const { phone } = await customerModuleService.retrieveCustomer(input.customerId)

            return new StepResponse(phone)
        } catch (error) {
            throw new Error(`Failed to read user phone from DB. Error: ${error}`)
        }
    }
)


//step 2. verify otp
const verifyOtpStep = createStep(
    "verify-otp-step",
    async (input: { code: string, phone: string }, { container }) => {
        try {
            const customerOtpService = container.resolve(CUSTOMER_OTP_MODULE)
            const phone = await customerOtpService.verifyOtp(input.code, input.phone)

            return new StepResponse(phone)
        } catch (error) {
            throw new Error(`Failed to verify OTP. Error: ${error}`)
        }
    }
)


//step 3: update verification status in database
const updateStatusStep = createStep(
    "update-status-step",
    async (input: { phone: string }, { container }) => {
        const customerOtpService = container.resolve(CUSTOMER_OTP_MODULE);
        const result = await customerOtpService.updateStatus(input.phone);
        return new StepResponse(result);
    }
)


// Create the workflow
const verifyOtpWorkflow = createWorkflow(
    "verify-otp-workflow",
    function (input: { customerId: string, code: string }) {
        const phone = checkPhoneStep({ customerId: input.customerId })
        const otpResult = verifyOtpStep({ code: input.code, phone })
        const updateStatusResult = updateStatusStep({ phone: otpResult })

        return new WorkflowResponse(updateStatusResult)
    }
)

export default verifyOtpWorkflow
