/*
  Warnings:

  - You are about to drop the column `ideaID` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Idea` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_ideaID_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "ideaID";

-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "image";
