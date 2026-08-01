import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`CREATE TYPE "public"."enum_landing_pages_chrd_data_establishment_type" AS ENUM('hotel', 'restaurant', 'bar', 'camping');`).catch(() => {})
  await db.execute(sql`CREATE TYPE "public"."enum_landing_pages_field_service_data_status" AS ENUM('operational', 'maintenance_required', 'out_of_service');`).catch(() => {})
  await db.execute(sql`CREATE TYPE "public"."enum_landing_pages_smart_routing_mode" AS ENUM('none', 'time_slots', 'event_timeline', 'ab_test');`).catch(() => {})

  await db.execute(sql`ALTER TYPE "public"."enum_landing_pages_vertical" ADD VALUE 'chrd';`).catch(() => {})
  await db.execute(sql`ALTER TYPE "public"."enum_landing_pages_vertical" ADD VALUE 'corporate_event';`).catch(() => {})
  await db.execute(sql`ALTER TYPE "public"."enum_landing_pages_vertical" ADD VALUE 'ugc_retail';`).catch(() => {})
  await db.execute(sql`ALTER TYPE "public"."enum_landing_pages_vertical" ADD VALUE 'field_service';`).catch(() => {})

  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "landing_pages_generic_data_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );`).catch(() => {})
  
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "landing_pages_smart_routing_time_rules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"start_time" varchar,
  	"end_time" varchar,
  	"target_slug" varchar,
  	"custom_headline" varchar
  );`).catch(() => {})
  
  await db.execute(sql`
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_headline" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_subheadline" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_body" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_cta_label" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_cta_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_secondary_cta_label" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_secondary_cta_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_website_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_contact_email" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "generic_data_contact_phone" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_establishment_name" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_establishment_type" "enum_landing_pages_chrd_data_establishment_type";
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_welcome_message" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_menu_pdf_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_wifi_name" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_wifi_password" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_google_review_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_tripadvisor_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_enable_postcard_gift" boolean;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "chrd_data_postcard_code" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_event_name" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_company_name" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_event_date" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_location" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_welcome_message" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_wifi_code" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_schedule_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_slides_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_live_wall_enabled" boolean;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "corporate_event_data_gallery_code" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "ugc_retail_data_brand_name" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "ugc_retail_data_campaign_title" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "ugc_retail_data_product_name" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "ugc_retail_data_instructions" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "ugc_retail_data_reward_discount_code" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "ugc_retail_data_reward_description" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "ugc_retail_data_rules_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "ugc_retail_data_support_email" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_asset_name" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_asset_id" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_category" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_location" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_status" "enum_landing_pages_field_service_data_status";
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_last_inspection_date" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_next_inspection_date" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_documentation_url" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_contact_technician_phone" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_emergency_contact" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "field_service_data_maintenance_notes" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_mode" "enum_landing_pages_smart_routing_mode" DEFAULT 'none';
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_event_schedule_event_start_date" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_event_schedule_event_end_date" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_event_schedule_before_event_target_slug" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_event_schedule_during_event_target_slug" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_event_schedule_after_event_target_slug" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_ab_test_enabled" boolean;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_ab_test_variant_a_slug" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_ab_test_variant_b_slug" varchar;
  ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "smart_routing_ab_test_split_ratio" numeric;
  `).catch(() => {})

  await db.execute(sql`
  ALTER TABLE "landing_pages_generic_data_sections" ADD CONSTRAINT "landing_pages_generic_data_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_smart_routing_time_rules" ADD CONSTRAINT "landing_pages_smart_routing_time_rules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "landing_pages_generic_data_sections_order_idx" ON "landing_pages_generic_data_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_generic_data_sections_parent_id_idx" ON "landing_pages_generic_data_sections" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_smart_routing_time_rules_order_idx" ON "landing_pages_smart_routing_time_rules" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_smart_routing_time_rules_parent_id_idx" ON "landing_pages_smart_routing_time_rules" USING btree ("_parent_id");
  `).catch(() => {})
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "landing_pages_generic_data_sections" CASCADE;
  DROP TABLE "landing_pages_smart_routing_time_rules" CASCADE;
  ALTER TABLE "landing_pages" ALTER COLUMN "vertical" SET DATA TYPE text;
  DROP TYPE "public"."enum_landing_pages_vertical";
  CREATE TYPE "public"."enum_landing_pages_vertical" AS ENUM('art', 'immo', 'vcard', 'product', 'feedback', 'tourism');
  ALTER TABLE "landing_pages" ALTER COLUMN "vertical" SET DATA TYPE "public"."enum_landing_pages_vertical" USING "vertical"::"public"."enum_landing_pages_vertical";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_headline";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_subheadline";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_body";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_cta_label";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_cta_url";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_secondary_cta_label";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_secondary_cta_url";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_website_url";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_contact_email";
  ALTER TABLE "landing_pages" DROP COLUMN "generic_data_contact_phone";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_establishment_name";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_establishment_type";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_welcome_message";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_menu_pdf_url";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_wifi_name";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_wifi_password";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_google_review_url";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_tripadvisor_url";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_enable_postcard_gift";
  ALTER TABLE "landing_pages" DROP COLUMN "chrd_data_postcard_code";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_event_name";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_company_name";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_event_date";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_location";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_welcome_message";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_wifi_code";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_schedule_url";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_slides_url";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_live_wall_enabled";
  ALTER TABLE "landing_pages" DROP COLUMN "corporate_event_data_gallery_code";
  ALTER TABLE "landing_pages" DROP COLUMN "ugc_retail_data_brand_name";
  ALTER TABLE "landing_pages" DROP COLUMN "ugc_retail_data_campaign_title";
  ALTER TABLE "landing_pages" DROP COLUMN "ugc_retail_data_product_name";
  ALTER TABLE "landing_pages" DROP COLUMN "ugc_retail_data_instructions";
  ALTER TABLE "landing_pages" DROP COLUMN "ugc_retail_data_reward_discount_code";
  ALTER TABLE "landing_pages" DROP COLUMN "ugc_retail_data_reward_description";
  ALTER TABLE "landing_pages" DROP COLUMN "ugc_retail_data_rules_url";
  ALTER TABLE "landing_pages" DROP COLUMN "ugc_retail_data_support_email";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_asset_name";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_asset_id";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_category";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_location";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_status";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_last_inspection_date";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_next_inspection_date";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_documentation_url";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_contact_technician_phone";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_emergency_contact";
  ALTER TABLE "landing_pages" DROP COLUMN "field_service_data_maintenance_notes";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_mode";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_event_schedule_event_start_date";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_event_schedule_event_end_date";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_event_schedule_before_event_target_slug";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_event_schedule_during_event_target_slug";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_event_schedule_after_event_target_slug";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_ab_test_enabled";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_ab_test_variant_a_slug";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_ab_test_variant_b_slug";
  ALTER TABLE "landing_pages" DROP COLUMN "smart_routing_ab_test_split_ratio";
  DROP TYPE "public"."enum_landing_pages_chrd_data_establishment_type";
  DROP TYPE "public"."enum_landing_pages_field_service_data_status";
  DROP TYPE "public"."enum_landing_pages_smart_routing_mode";`)
}
