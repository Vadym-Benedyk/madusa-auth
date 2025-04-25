import {createStep, createWorkflow, StepResponse, WorkflowResponse} from "@medusajs/framework/workflows-sdk";
import {Modules} from "@medusajs/framework/utils";
import {CUSTOMER_OTP_MODULE} from "../../modules/customer_otp";


//step 1: check if phone exists and get it
const checkPhoneStep = createStep(
    "get-phone-step",
    async (input: { customerId: string }, { container }) => {
        const logger = container.resolve("logger");

        try {
            const customerModuleService = container.resolve(Modules.CUSTOMER)
            const { phone } = await customerModuleService.retrieveCustomer(input.customerId)
            logger.info(`Extracted phone: ${phone}  from customer data`)
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
        const logger = container.resolve("logger");
        try {
            logger.info(`Step 2: Verifying OTP for phone: ${input.phone} with code: ${input.code}`)
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
    async (input: { customerId: string }, { container }) => {
        const logger = container.resolve("logger");
        const customerOtpService = container.resolve(CUSTOMER_OTP_MODULE);
        logger.info(`Step 3: Updating status customer_id: ${input.customerId}`)
        const result = await customerOtpService.updatePhoneVerificationStatus(input.customerId);
        logger.info(`Updated verification status in customer_otp table: ${input.customerId}`)
        return new StepResponse(result);
    }
)


// Create the workflow
const verifyOtpWorkflow = createWorkflow(
    "verify-otp-workflow",
    function (input: { customerId: string, code: string }) {
        const phone = checkPhoneStep({ customerId: input.customerId })
        const otpResult = verifyOtpStep({ code: input.code, phone })
        const updateStatusResult = updateStatusStep({ customerId: input.customerId })

        return new WorkflowResponse(updateStatusResult)
    }
)

export default verifyOtpWorkflow
