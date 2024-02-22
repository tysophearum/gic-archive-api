import { ObjectType, Field as GqlField, ID, InputType } from "type-graphql";

@ObjectType()
export class Pagination {
    @GqlField(type => Number)
    totalItems: number;

    @GqlField(type => Number)
    currentPage: number;

    @GqlField(type => Number)
    pageSize: number;

    @GqlField(type => Number)
    totalPages: number;

    @GqlField(type => Boolean)
    hasNextPage: boolean;

    @GqlField(type => Boolean)
    hasPrevPage: boolean;
}

@InputType()
export class PaginationInput {
    @GqlField(type => Number)
    page: number;

    @GqlField(type => Number)
    limit: number;
}