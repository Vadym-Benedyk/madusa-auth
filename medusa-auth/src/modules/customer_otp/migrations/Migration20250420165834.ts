import {Migration} from '@mikro-orm/migrations';

export class Migration20250420165834 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "customer_otp" drop column if exists "password_hash";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "customer_otp" add column if not exists "password_hash" text not null;`);
  }

}
