/*
  Warnings:

  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified",
DROP COLUMN "verifyToken",
DROP COLUMN "verifyTokenExpiry";

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL,
    "file" BYTEA NOT NULL,
    "ideaID" UUID NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_ideaID_fkey" FOREIGN KEY ("ideaID") REFERENCES "Idea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
