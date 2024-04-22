/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Document";

-- CreateTable
CREATE TABLE "IdeaInteraction" (
    "userId" UUID NOT NULL,
    "ideaId" UUID NOT NULL,

    CONSTRAINT "IdeaInteraction_pkey" PRIMARY KEY ("userId","ideaId")
);

-- AddForeignKey
ALTER TABLE "IdeaInteraction" ADD CONSTRAINT "IdeaInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaInteraction" ADD CONSTRAINT "IdeaInteraction_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
