import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "public"."enum_landing_pages_vertical" ADD VALUE 'redirect';
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "scan_count" integer DEFAULT 0;

    ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "redirect_data_target_url" varchar;
    ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "redirect_data_label" varchar;

    ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_body_html" varchar;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "landing_pages" DROP COLUMN IF EXISTS "scan_count";
    ALTER TABLE "landing_pages" DROP COLUMN IF EXISTS "redirect_data_target_url";
    ALTER TABLE "landing_pages" DROP COLUMN IF EXISTS "redirect_data_label";
    ALTER TABLE "landing_pages" DROP COLUMN IF EXISTS "generic_data_body_html";
  `)
}
