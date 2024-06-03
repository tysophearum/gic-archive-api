import { ObjectType, createUnionType, Field as GqlField } from "type-graphql";
import { MinClassProject } from "./classProject/classProject";
import { MinThesis } from "./thesis/thesis";
import { Pagination } from "../typeDefs";

export const MinDocument = createUnionType({
  name: 'MinDocument',
  types: () => [MinClassProject, MinThesis] as const,
  resolveType: value => {
    if ('teacher' in value) {
      return MinThesis;
    }
    else {
      return MinClassProject;
    }
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