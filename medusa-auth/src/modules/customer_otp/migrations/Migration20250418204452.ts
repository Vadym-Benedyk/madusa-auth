import {Migration} from '@mikro-orm/migrations';

export class Migration20250418204452 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "customer_otp" drop constraint if exists "customer_otp_customer_id_unique";`);
    this.addSql(`create table if not exists "customer_otp" ("id" text not null, "customer_id" text not null, "otp_phone_code" text not null, "otp_email_code" text not null, "otp_phone_expires_at" timestamptz not null, "otp_email_expires_at" timestamptz not null, "is_phone_verified" boolean not null default false, "is_email_verified" boolean not null default false, "password_hash" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "customer_otp_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_customer_otp_customer_id_unique" ON "customer_otp" (customer_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_customer_otp_deleted_at" ON "customer_otp" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "customer_otp" cascade;`);
  }

}
