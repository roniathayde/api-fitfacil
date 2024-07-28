import { UserTrains } from '@prisma/client'

export interface UserTrainsRepositoryContract {
  findRoleInTrain(userId: string, trainId: string): Promise<UserTrains | null>
}
