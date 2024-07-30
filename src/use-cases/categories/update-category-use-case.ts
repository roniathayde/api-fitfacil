import { CategoryRepositoryContract } from '@/repositories/contracts/category-repository-contract'
import { GenericCategoryError } from '../errors/create-category-error'
import { Prisma } from '@prisma/client'

export class UpdateCategoryUseCase {
  constructor(private CategoryRepository: CategoryRepositoryContract) {}

  async execute(data: Prisma.CategoryUpdateInput, categoryId: string) {
    const category = await this.CategoryRepository.updateCategory(
      data,
      categoryId,
    )

    if (!category) {
      throw new GenericCategoryError()
    }

    return { category }
  }
}
