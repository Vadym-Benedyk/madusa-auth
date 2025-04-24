import {model} from "@medusajs/framework/utils"

// function getExpire(arg: string | undefined): Date {
//     const minutes = Number(arg || "20");
//     if (isNaN(minutes)) {
//         throw new Error("Invalid OTP_EXPIRATION_MINUTES environment variable");
//     }
//     const dayNow = new Date();
//     dayNow.setTime(dayNow.getTime() + minutes * 60 * 1000);
//     return dayNow;
// }
//
// const defaultOtpExpire = () => getExpire(process.env.OTP_EXPIRATION_MINUTES);


const CustomerOtp = model.define("customer_otp", {
    id: model.id().primaryKey(),
    customer_id: model.text().unique(),
    is_phone_verified: model.boolean().default(false),
    is_email_verified: model.boolean().default(false),
})

export default CustomerOtp