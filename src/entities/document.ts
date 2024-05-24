import { ObjectType, createUnionType, Field as GqlField } from "type-graphql";
import { MinClassProject } from "./classProject/classProject";
import { MinThesis } from "./thesis/thesis";
import { Pagination } from "../typeDefs";

export const MinDocument = createUnionType({
  name: 'MinDocument',
  types: () => [MinClassProject, MinThesis] as const,
  resolveType: value => {
    if ('classProjectCategory' in value) {
      return MinClassProject;
    }
    if ('thesisCategory' in value) {
      return MinThesis;
    }
    return undefined;
  },
})

// export type MinDocument = MinClassProject | MinThesis;

@ObjectType()
export class ListDocumentResponse {
  @GqlField(() => [MinDocument])
  data: typeof MinDocument[];

  @GqlField(() => Pagination)
  pagination: Pagination;
}