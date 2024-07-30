import { Prisma, Trains } from '@prisma/client'

export interface TrainsRepositoryContract {
  createTrain(
    data: Prisma.TrainsCreateInput,
    userId: string,
  ): Promise<Trains | null>
  findTrainsByUserId(id: string): Promise<Trains[] | null>
  updateTrain(
    data: Prisma.TrainsUpdateInput,
    trainId: string,
  ): Promise<Trains | null>
  getTrainById(trainId: string): Promise<Trains | null>
  deleteTrain(trainId: string): Promise<Trains | null>
}
