-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "isByAnonymous" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "isByAnonymous" BOOLEAN NOT NULL DEFAULT false;
