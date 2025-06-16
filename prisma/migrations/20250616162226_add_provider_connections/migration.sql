/*
  Warnings:

  - Added the required column `token_expires_at` to the `provider_connections` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `provider_connections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `provider_connections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expires_at` on table `provider_connections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_active` on table `provider_connections` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "provider_connections" ADD COLUMN     "token_expires_at" TIMESTAMPTZ(6) NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "expires_at" SET NOT NULL,
ALTER COLUMN "is_active" SET NOT NULL;
