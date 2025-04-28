
export interface CustomerOtpInterface {
    id: string;
    customer_id: string;
    is_phone_verified: boolean;
    is_email_verified: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

}