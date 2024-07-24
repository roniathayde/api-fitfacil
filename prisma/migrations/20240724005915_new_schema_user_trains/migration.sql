/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `trainsId` on the `User` table. All the data in the column will be lost.
  - Added the required column `trainsId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Trains` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_trainsId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "trainsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trains" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
DROP COLUMN "trainsId";

-- CreateTable
CREATE TABLE "User_Trains" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trainsId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TREINADOR',

    CONSTRAINT "User_Trains_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Trains" ADD CONSTRAINT "User_Trains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Trains" ADD CONSTRAINT "User_Trains_trainsId_fkey" FOREIGN KEY ("trainsId") REFERENCES "Trains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_trainsId_fkey" FOREIGN KEY ("trainsId") REFERENCES "Trains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
