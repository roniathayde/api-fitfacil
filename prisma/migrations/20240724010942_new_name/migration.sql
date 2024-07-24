/*
  Warnings:

  - You are about to drop the `User_Trains` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User_Trains" DROP CONSTRAINT "User_Trains_trainsId_fkey";

-- DropForeignKey
ALTER TABLE "User_Trains" DROP CONSTRAINT "User_Trains_userId_fkey";

-- DropTable
DROP TABLE "User_Trains";

-- CreateTable
CREATE TABLE "UserTrains" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trainsId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TREINADOR',

    CONSTRAINT "UserTrains_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTrains" ADD CONSTRAINT "UserTrains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTrains" ADD CONSTRAINT "UserTrains_trainsId_fkey" FOREIGN KEY ("trainsId") REFERENCES "Trains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
