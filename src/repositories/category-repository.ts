import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { CategoryRepositoryContract } from './contracts/category-repository-contract'

export class CategoryRepository implements CategoryRepositoryContract {
  async createCategory(
    { name }: Omit<Prisma.CategoryCreateInput, 'trains'>,
    trainId: string,
  ) {
    const category = await prisma.category.create({
      data: {
        name,
        trainsId: trainId,
      },
    })

    return category
  }

  async getCategoryById(categoryId: string) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    })

    return category
  }

  async updateCategory(data: Prisma.CategoryUpdateInput, categoryId: string) {
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    })

    return category
  }

  async deleteCategory(categoryId: string) {
    const category = await prisma.category.delete({
      where: { id: categoryId },
    })

    return category
  }
}
//
// async findTrainsByUserId(id: string) {
//   const userTrains = await prisma.userTrains.findMany({
//     where: {
//       userId: id,
//     },
//     select: {
//       trainsId: true, // Apenas selecionando o campo trainsId
//     },
//   })

//   const trains = await prisma.trains.findMany({
//     where: {
//       id: {
//         in: userTrains.map((ut) => ut.trainsId),
//       }, // Busca os Trains que têm IDs correspondentes
//     },
//   })
//   // console.log('trains', trains)
//   return trains
// }

// async getTrainById(trainId: string) {
//   const train = await prisma.trains.findFirst({
//     where: {
//       id: trainId,
//     },
//   })

//   return train
// }

// async deleteTrain(trainId: string) {
//   const train = await prisma.trains.delete({
//     where: {
//       id: trainId,
//     },
//   })

//   return train
// }
