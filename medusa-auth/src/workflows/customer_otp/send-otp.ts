import {createStep, createWorkflow, StepResponse, WorkflowResponse} from "@medusajs/framework/workflows-sdk"
import {Modules} from "@medusajs/framework/utils"
import {CUSTOMER_OTP_MODULE} from "../../modules/customer_otp"


// Step 1: Check if phone exists and get it
const checkPhoneStep = createStep(
    "check-phone-step",
    async (input: { customerId: string }, { container }) => {
        try {
            const customerModuleService = container.resolve(Modules.CUSTOMER)
            const customer = await customerModuleService.retrieveCustomer(input.customerId)
            console.log("Customer phone: ", customer.phone)

            return new StepResponse(customer.phone)
        } catch (error) {
            throw new Error(`Failed to read customer phone from DB. Error: ${error}`)
        }
    }
)

// Step 2: Send OTP
const sendOtpStep = createStep(
    "send-otp-step",
    async (input: { phone: string }, { container }) => {
        console.log("Send OTP step input: ", input)
        try {
            const customerOtpService = container.resolve(CUSTOMER_OTP_MODULE)
            const result = await customerOtpService.sendOtp(input.phone)

            return new StepResponse(result)
        } catch (error) {

            throw new Error(`Failed to send OTP. Error: ${error}`)
        }



    }
)

// Create the workflow
const sendOtpWorkflow = createWorkflow(
    "send-otp-workflow",
    function (input: { customerId: string }) {
        const customerPhone = checkPhoneStep({ customerId: input.customerId })
        const otpResult = sendOtpStep({ phone: customerPhone })

        return new WorkflowResponse(otpResult)
    }
)

export default sendOtpWorkflow