import { CategoryRepositoryContract } from '@/repositories/contracts/category-repository-contract'
import { GenericCategoryError } from '../errors/create-category-error'

export class DeleteCategoryUseCase {
  constructor(private CategoryRepository: CategoryRepositoryContract) {}

  async execute(categoryId: string) {
    const category = await this.CategoryRepository.deleteCategory(categoryId)

    if (!category) {
      throw new GenericCategoryError()
    }

    return { category }
  }
}
