import { Prisma, Trains } from '@prisma/client'

export interface TrainsRepositoryContract {
  createTrain(data: Prisma.TrainsCreateInput, userId: string): Promise<Trains>
  findTrainsByUserId(id: string): Promise<Trains[] | null>
}
