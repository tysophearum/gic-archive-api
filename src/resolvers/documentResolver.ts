import { CreateDocumentInput } from "../entities/document";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Document } from "../entities";
import { createDocumentAction } from "../controllers/document";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";

@Resolver()
export class DocumentResolver {

  @Mutation(() => Document)
  async createDocument(
    @Arg("document") document: CreateDocumentInput,
    @Arg("file", () => GraphQLUpload) file: FileUpload
) {
    return await createDocumentAction(document, file);
  }
}