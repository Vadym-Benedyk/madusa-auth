import { getAuthHeaders, getCacheOptions } from "@lib/data/cookies"
import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { CustomerOtpInterface } from "../../types/customer-otp/customer-otp.interfaces"

export const retrieveCustomerWithOtp = async (): Promise<
  (HttpTypes.StoreCustomer & { customer_otp: CustomerOtpInterface }) | null
> => {
  const authHeaders = await getAuthHeaders()

  if (!authHeaders) return null

  const headers = {
    ...authHeaders,
  }

  const next = {
    ...(await getCacheOptions("customers")),
  }

  return await sdk.client
    .fetch<{
      customer: HttpTypes.StoreCustomer
      customer_otp: CustomerOtpInterface
    }>(`/store/customer-otp/me`, {
      method: "GET",
      query: {
        fields: "customer, customer_otp", // Тут ти додаєш поле для OTP
      },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ customer, customer_otp }) => {
      return { ...customer, customer_otp }
    })
    .catch(() => null)
}