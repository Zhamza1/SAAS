/*
  Warnings:

  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stripeId]` on the table `Rdv` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- AlterTable
ALTER TABLE "Rdv" ADD COLUMN     "stripeId" TEXT;

-- DropTable
DROP TABLE "Payment";

-- CreateIndex
CREATE UNIQUE INDEX "Rdv_stripeId_key" ON "Rdv"("stripeId");
