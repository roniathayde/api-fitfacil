import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { TrainsRepositoryContract } from './contracts/trains-repository-contract'
import dayjs from 'dayjs'

export class TrainsRepository implements TrainsRepositoryContract {
  async createTrain(
    {
      title,
      description,
      scheduled_to,
      duration_in_sec,
      difficulty,
    }: Prisma.TrainsCreateInput,
    userId: string,
  ) {
    console.log()
    const train = await prisma.trains.create({
      data: {
        title,
        description,
        scheduled_to: dayjs(scheduled_to).toDate(),
        duration_in_sec,
        difficulty,
      },
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
