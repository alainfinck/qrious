import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Incremental migration for auth roles.
 * Safe to run on an existing database (idempotent).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_users_role" AS ENUM('user', 'admin');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `)

  await db.execute(sql`
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" "enum_users_role";
  `)

  await db.execute(sql`
    UPDATE "users" SET "role" = 'user' WHERE "role" IS NULL;
  `)

  await db.execute(sql`
    ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
  `)

  await db.execute(sql`
    ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users" DROP COLUMN IF EXISTS "role";
  `)

  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_users_role";
  `)
}
