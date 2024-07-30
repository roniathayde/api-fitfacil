import { Category, Prisma } from '@prisma/client'

export interface CategoryRepositoryContract {
  createCategory(
    data: Omit<Prisma.CategoryCreateInput, 'trains'>,
    trainId: string,
  ): Promise<Category | null>

  getCategoryById(categoryId: string): Promise<Category | null>

  updateCategory(
    data: Prisma.CategoryUpdateInput,
    categoryId: string,
  ): Promise<Category | null>

  deleteCategory(categoryId: string): Promise<Category | null>
}
