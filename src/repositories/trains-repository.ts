import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { TrainsRepositoryContract } from './contracts/trains-repository-contract'

export class TrainsRepository implements TrainsRepositoryContract {
  async createTrain(data: Prisma.TrainsCreateInput, userId: string) {
    const train = await prisma.trains.create({
      data,
    })

    await prisma.userTrains.create({
      data: {
        trainsId: train.id,
        userId: userId,
      },
    })

    return train
  }
  async findTrainsByUserId(id: string) {
    const userTrains = await prisma.userTrains.findMany({
      where: {
        userId: id,
      },
      select: {
        trainsId: true, // Apenas selecionando o campo trainsId
      },
    })

    // Extraindo apenas os trainsId
    const trainIds = userTrains.map((ut) => ut.trainsId)

    const trains = await prisma.trains.findMany({
      where: {
        id: { in: trainIds }, // Busca os Trains que têm IDs correspondentes
      },
    })

    return trains
  }
}
