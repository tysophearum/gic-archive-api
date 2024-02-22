import { getAllUsersAction, registerUserAction } from "../controllers/user";
import { ListUsersResponse, User, UserRegisterInput } from "../entities/user";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {FileUpload, GraphQLUpload} from 'graphql-upload-minimal';
import { PaginationInput } from "../typeDefs";

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg("user") user: UserRegisterInput,
        @Arg("file", () => GraphQLUpload) file: FileUpload
    ): Promise<User> {
        return await registerUserAction(user, file);
    }

    @Query(() => ListUsersResponse)
    async listUser(
        @Arg("pager", () => PaginationInput, { nullable: true }) pager: PaginationInput,
    ) {
        return await getAllUsersAction(pager);
    }
}