-- DropForeignKey
ALTER TABLE "UserTrains" DROP CONSTRAINT "UserTrains_trainsId_fkey";

-- AddForeignKey
ALTER TABLE "UserTrains" ADD CONSTRAINT "UserTrains_trainsId_fkey" FOREIGN KEY ("trainsId") REFERENCES "Trains"("id") ON DELETE CASCADE ON UPDATE CASCADE;
