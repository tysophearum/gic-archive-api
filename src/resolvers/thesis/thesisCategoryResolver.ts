import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateThesisCategoryInput, ThesisCategory, UpdateThesisCategoryInput } from '../../entities';
import {
  createThesisCategoryAction,
  updateThesisCategoryAction,
  deleteThesisCategoryAction,
  listThesisCategoryAction,
} from '../../controllers/thesis';
import AdminMiddleware from '../../middleware/AdminMiddleware';

@Resolver()
export class ThesisCategoryResolver {
  @Mutation(() => ThesisCategory)
  // @UseMiddleware(AdminMiddleware)
  async createThesisCategory(@Arg('thesis') thesisCategory: CreateThesisCategoryInput) {
    return await createThesisCategoryAction(thesisCategory);
  }

  @Mutation(() => ThesisCategory)
  @UseMiddleware(AdminMiddleware)
  async updateThesisCategory(@Arg('thesis') thesisCategory: UpdateThesisCategoryInput) {
    return await updateThesisCategoryAction(thesisCategory);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(AdminMiddleware)
  async deleteThesisCategory(@Arg('id') id: string) {
    return await deleteThesisCategoryAction(id);
  }

  @Query(() => [ThesisCategory])
  async listThesisCategory() {
    return await listThesisCategoryAction();
  }
}
