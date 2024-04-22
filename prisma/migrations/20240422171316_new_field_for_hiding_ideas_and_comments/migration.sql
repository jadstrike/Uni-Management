-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false;
