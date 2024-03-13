import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateThesisCategoryInput, ThesisCategory } from "../entities";
import { createThesisCategoryAction, listThesisCategoryAction } from "../controllers/thesis";

@Resolver()
export class ThesisCategoryResolver {

  @Mutation(() => ThesisCategory)
  async createThesisCategory(
    @Arg("thesis") thesisCategory: CreateThesisCategoryInput,
  ) {
    return await createThesisCategoryAction(thesisCategory);
  }

  @Query(() => [ThesisCategory])
  async listThesisCategory() {
    return await listThesisCategoryAction();
  }
}