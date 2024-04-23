/*
  Warnings:

  - The primary key for the `IdeaInteraction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `IdeaInteraction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "IdeaInteraction" DROP CONSTRAINT "IdeaInteraction_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "IdeaInteraction_pkey" PRIMARY KEY ("id");
