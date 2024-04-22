-- CreateTable
CREATE TABLE "ClosureDate" (
    "id" UUID NOT NULL,
    "initialClosureDate" TIMESTAMP(3) NOT NULL,
    "finalClosureDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClosureDate_pkey" PRIMARY KEY ("id")
);
