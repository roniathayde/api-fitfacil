import { CategoryRepositoryContract } from '@/repositories/contracts/category-repository-contract'
import { Prisma } from '@prisma/client'
import { GenericCategoryError } from '../errors/create-category-error'

export class CreateCategoryUseCase {
  constructor(private CategoryRepository: CategoryRepositoryContract) {}

  async execute(
    data: Omit<Prisma.CategoryCreateInput, 'trains'>,
    trainId: string,
  ) {
    if (!trainId) {
      throw new GenericCategoryError()
    }
    const category = await this.CategoryRepository.createCategory(data, trainId)

    if (!category) {
      throw new GenericCategoryError()
    }

    return { category }
  }
}
