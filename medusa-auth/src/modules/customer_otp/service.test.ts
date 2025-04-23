import CustomerOtpService from "./service"
import * as twilio from "twilio"

jest.mock("twilio")

describe("CustomerOtpService", () => {
    const mockCreate = jest.fn().mockResolvedValue({ status: "pending" })

    beforeEach(() => {
        (twilio as any).mockReturnValue({
            verify: {
                v2: {
                    services: () => ({
                        verifications: {
                            create: mockCreate
                        }
                    })
                }
            }
        })

        process.env.TWILIO_ACCOUNT_SID = "test_sid"
        process.env.TWILIO_AUTH_TOKEN = "test_token"
        process.env.TWILIO_VERIFY_SERVICE_SID = "service_sid"
    })

    it("sends OTP successfully", async () => {
        const service = new CustomerOtpService()
        const result = await service.sendOtp("+1234567890")

        expect(mockCreate).toHaveBeenCalledWith({
            channel: "sms",
            to: "+1234567890"
        })
        expect(result.status).toBe("pending")
    })
})