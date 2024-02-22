import { CreateDocumentInput, ListDocumentResponse } from "../entities/document";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Document } from "../entities";
import { createDocumentAction, getAllDocumentsAction } from "../controllers/document";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";
import { PaginationInput } from "../typeDefs";

@Resolver()
export class DocumentResolver {

  @Mutation(() => Document)
  async createDocument(
    @Arg("document") document: CreateDocumentInput,
    @Arg("file", () => GraphQLUpload) file: FileUpload
  ) {
    return await createDocumentAction(document, file);
  }

  @Query(() => ListDocumentResponse)
  async listDocument(
    @Arg("pager", () => PaginationInput) pager: PaginationInput,
  ) {
    return await getAllDocumentsAction(pager);
  }
}