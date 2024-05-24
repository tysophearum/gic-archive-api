import { ListDocumentResponse } from "../entities";
import { MinDocument } from "../entities/document";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { listDocumentAction, listFeatredDocumentAction } from "../controllers/document";
import { PaginationInput } from "../typeDefs";
import OptionalMiddleware from "../middleware/OptionalMiddleware";

@Resolver()
export class DocumentResolver {
  @Query(() => ListDocumentResponse)
  @UseMiddleware(OptionalMiddleware)
  async listDocuments(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listDocumentAction(user, {}, "likeAmount", false, pager);
  }

  @Query(() => ListDocumentResponse)
  @UseMiddleware(OptionalMiddleware)
  async listMostLikedDocuments(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listDocumentAction(user, 
      {
        isApproved: true
      }, 
      "likeAmount", 
      false, 
      pager,
    {
      created_at: -1,
      likeAmount: -1
    });
  }

  @Query(() => [MinDocument])
  @UseMiddleware(OptionalMiddleware)
  async listFeaturedDocuments(
    @Ctx() { user }: any,
  ): Promise<typeof MinDocument[]>  {
    return await listFeatredDocumentAction(
      user,
      {},
      {
        created_at: -1
      }
    );
  }
}
