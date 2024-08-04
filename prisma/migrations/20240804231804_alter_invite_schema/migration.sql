/*
  Warnings:

  - You are about to drop the column `expires_in` on the `Invite` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "expires_in",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
