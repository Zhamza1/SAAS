/*
  Warnings:

  - You are about to drop the column `stripeId` on the `Rdv` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Rdv_stripeId_key";

-- AlterTable
ALTER TABLE "Rdv" DROP COLUMN "stripeId";
