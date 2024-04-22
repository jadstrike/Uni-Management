/*
  Warnings:

  - Added the required column `type` to the `IdeaInteraction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Interaction" AS ENUM ('ThumbsUp', 'ThumbsDown');

-- AlterTable
ALTER TABLE "IdeaInteraction" ADD COLUMN     "type" "Interaction" NOT NULL;
