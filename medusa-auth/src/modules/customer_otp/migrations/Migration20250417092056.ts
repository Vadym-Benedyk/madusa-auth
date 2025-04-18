import { Migration } from '@mikro-orm/migrations';

export class Migration20250417092056 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "customer" ("id" text not null, "email" text not null, "first_name" text not null, "last_name" text not null, "password_hash" text not null, "phone_number" text not null, "has_account" boolean not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "customer_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_customer_deleted_at" ON "customer" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "customer" cascade;`);
  }

}
