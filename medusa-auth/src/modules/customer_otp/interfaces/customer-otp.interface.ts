export interface CustomerOtpInterface {
    id: string;
    customer_id: string;
    is_phone_verified: boolean;
    is_email_verified: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}