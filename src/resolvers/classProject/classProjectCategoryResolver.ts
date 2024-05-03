import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateClassProjectCategoryInput, ClassProjectCategory, UpdateClassProjectCategoryInput, ClassProjectCategoryResponse } from '../../entities';
import {
  createClassProjectCategoryAction,
  updateClassProjectCategoryAction,
  deleteClassProjectCategoryAction,
  listClassProjectCategoryAction,
  getClassProjectCategoryByIdAction
} from '../../controllers/classProject';
import AdminMiddleware from '../../middleware/AdminMiddleware';
import TeacherMiddleware from '../../middleware/TeacherMiddleware';

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
  async deleteClassProjectCategory(@Arg('classProjectId') id: string) {
    return await deleteClassProjectCategoryAction(id);
  }

  @Query(() => [ClassProjectCategoryResponse])
  async listClassProjectCategory() {
    return await listClassProjectCategoryAction();
  }

  @Query(() => [ClassProjectCategoryResponse])
  @UseMiddleware(TeacherMiddleware)
  async listTeacherClassProjectCategory(
    @Ctx() {user}: any
  ) {
    return await listClassProjectCategoryAction({teachers: user._id});
  }

  @Query(() => ClassProjectCategoryResponse)
  async getClassProjectCategoryById(
    @Arg('categoryId') id: string
  ) {
    return await getClassProjectCategoryByIdAction(id);
  }
}
