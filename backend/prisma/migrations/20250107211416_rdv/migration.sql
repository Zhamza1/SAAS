/*
  Warnings:

  - You are about to drop the column `rememberMeToken` on the `User` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "rememberMeToken",
ADD COLUMN     "role" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Rdv" (
    "id" SERIAL NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rdv_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rdv" ADD CONSTRAINT "Rdv_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rdv" ADD CONSTRAINT "Rdv_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
