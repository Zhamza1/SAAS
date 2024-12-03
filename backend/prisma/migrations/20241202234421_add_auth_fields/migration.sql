/*
  Warnings:

  - Made the column `firstname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rememberMeToken" TEXT,
ALTER COLUMN "firstname" SET NOT NULL;
