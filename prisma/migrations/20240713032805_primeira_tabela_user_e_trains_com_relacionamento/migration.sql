-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ALUNO', 'TREINADOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'TREINADOR',
ADD COLUMN     "trainsId" TEXT;

-- CreateTable
CREATE TABLE "Trains" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trains_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_trainsId_fkey" FOREIGN KEY ("trainsId") REFERENCES "Trains"("id") ON DELETE SET NULL ON UPDATE CASCADE;
