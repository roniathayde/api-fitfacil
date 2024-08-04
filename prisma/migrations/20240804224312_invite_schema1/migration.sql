-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "trainsId" TEXT NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_trainsId_fkey" FOREIGN KEY ("trainsId") REFERENCES "Trains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
