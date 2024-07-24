/*
  Warnings:

  - Added the required column `duration_in_sec` to the `Trains` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduled_to` to the `Trains` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('FACIL', 'MEDIO', 'DIFICIL');

-- AlterTable
ALTER TABLE "Trains" ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIO',
ADD COLUMN     "duration_in_sec" TEXT NOT NULL,
ADD COLUMN     "scheduled_to" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
