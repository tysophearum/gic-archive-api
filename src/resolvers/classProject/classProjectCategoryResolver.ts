import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateClassProjectCategoryInput, ClassProjectCategory, UpdateClassProjectCategoryInput } from '../../entities';
import {
  createClassProjectCategoryAction,
  updateClassProjectCategoryAction,
  deleteClassProjectCategoryAction,
  listClassProjectCategoryAction,
} from '../../controllers/classProject';
import AdminMiddleware from '../../middleware/AdminMiddleware';

@Resolver()
export class ClassProjectCategoryResolver {
  @Mutation(() => ClassProjectCategory)
  @UseMiddleware(AdminMiddleware)
  async createClassProjectCategory(@Arg('classProject') classProjectCategory: CreateClassProjectCategoryInput) {
    return await createClassProjectCategoryAction(classProjectCategory);
  }

  @Mutation(() => ClassProjectCategory)
  @UseMiddleware(AdminMiddleware)
  async updateClassProjectCategory(@Arg('classProject') classProjectCategory: UpdateClassProjectCategoryInput) {
    return await updateClassProjectCategoryAction(classProjectCategory);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(AdminMiddleware)
  async deleteClassProjectCategory(@Arg('id') id: string) {
    return await deleteClassProjectCategoryAction(id);
  }

  @Query(() => [ClassProjectCategory])
  async listClassProjectCategory() {
    return await listClassProjectCategoryAction();
  }
}
