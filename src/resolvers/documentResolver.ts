import { CreateDocumentInput, ListDocumentResponse } from "../entities/document";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Document } from "../entities";
import { createDocumentAction, listDocumentsAction, listApprovedDocumentsAction } from "../controllers/document";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";
import { PaginationInput } from "../typeDefs";
import UserMiddleware from "../middleware/UserMiddleware";

@Resolver()
export class DocumentResolver {

  @Mutation(() => Document)
  async createDocument(
    @Arg("document") document: CreateDocumentInput,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload | null
  ) {
    return await createDocumentAction(document, file);
  }

  @Query(() => ListDocumentResponse)
  @UseMiddleware(UserMiddleware)
  async listDocuments(
    @Arg("pager", () => PaginationInput, { nullable: true }) pager: PaginationInput,
  ) {
    return await listDocumentsAction(pager);
  }

  @Query(() => ListDocumentResponse)
  async listApprovedDocuments(
    @Arg("pager", () => PaginationInput, { nullable: true }) pager: PaginationInput,
  ) {
    return await listApprovedDocumentsAction(pager);
  }
}