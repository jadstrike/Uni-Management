/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordTokenExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isStaff` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "forgotPasswordToken",
DROP COLUMN "forgotPasswordTokenExpiry",
DROP COLUMN "isStaff",
ALTER COLUMN "role" DROP DEFAULT;
