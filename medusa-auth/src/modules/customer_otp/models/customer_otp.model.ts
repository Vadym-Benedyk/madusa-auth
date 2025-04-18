import { model } from "@medusajs/framework/utils"


function getExpire(arg: string | undefined): Date {
    const minutes = Number(arg || "20");
    if (isNaN(minutes)) {
        throw new Error("Invalid OTP_EXPIRATION_MINUTES environment variable");
    }
    const dayNow = new Date();
    dayNow.setTime(dayNow.getTime() + minutes * 60 * 1000);
    return dayNow;
}



const CustomerOtp = model.define("customer_otp", {
    id: model.id().primaryKey(),

    customer_id: model.text().unique(), // FK на customer_otp.id

    otp_phone_code: model.text(), // OTP для телефону
    otp_email_code: model.text(), // OTP для пошти

    otp_phone_expires_at: model.dateTime().default(getExpire(process.env.OTP_EXPIRATION_MINUTES)),
    otp_email_expires_at: model.dateTime(),

    is_phone_verified: model.boolean().default(false), // статус верифікації телефону
    is_email_verified: model.boolean().default(false), // статус верифікації пошти

    password_hash: model.text()

})

export default CustomerOtp