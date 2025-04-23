import {createStep, createWorkflow, StepResponse, WorkflowResponse,} from "@medusajs/framework/workflows-sdk"
import CustomerOtpService from "../../modules/customer_otp/service";

//Steep for deleting customer_otp
export const deleteCustomerOtpDeleteStep = createStep("delete-customer-otp-otp",
    async (input: { customer_id: string }, { container }) => {
    //getting methods from container service
        const customerOtpService = container.resolve<CustomerOtpService>('customerOtpService');

        //remove selected fields from customer_otp table
        await customerOtpService.deleteByCustomerId(input.customer_id);

        return new StepResponse(null, input.customer_id)
    },

    //Rollback step
    async (customer_id: string, { container }) => {
        console.error(`Failed to delete OTP for customer ${customer_id}.`)
    }
)



//Workflow for deleting customer_otp
export const deleteCustomerOtpWorkflow = createWorkflow(
    "delete-customer-otp-otp",
    (input: { customer_id: string }) => {
        const deleteOtpStep = deleteCustomerOtpDeleteStep(input);
        return new WorkflowResponse([deleteOtpStep])
    })



// Here we realize delete customer-otp-otp if customer-otp is deleted