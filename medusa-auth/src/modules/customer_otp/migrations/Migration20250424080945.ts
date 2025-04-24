import {Migration} from '@mikro-orm/migrations';

export class Migration20250424080945 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "customer_otp" drop column if exists "otp_phone_code", drop column if exists "otp_email_code", drop column if exists "otp_phone_expires_at", drop column if exists "otp_email_expires_at";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "customer_otp" add column if not exists "otp_phone_code" text not null, add column if not exists "otp_email_code" text not null, add column if not exists "otp_phone_expires_at" timestamptz not null, add column if not exists "otp_email_expires_at" timestamptz not null;`);
  }

}
