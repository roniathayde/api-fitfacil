import { Prisma, Trains } from '@prisma/client'

export interface TrainsRepositoryContract {
  createTrain(data: Prisma.TrainsCreateInput, userId: string): Promise<Trains>
  findTrainsByUserId(id: string): Promise<Trains[] | null>
  updateTrain(data: Prisma.TrainsUpdateInput, trainId: string): Promise<Trains>
  getTrainById(trainId: string): Promise<Trains | null>
  deleteTrain(trainId: string): Promise<Trains | null>
}
