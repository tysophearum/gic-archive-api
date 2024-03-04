import { getAllUsersAction, registerUserAction, getUserByIdAction } from "../controllers/user";
import { ListUsersResponse, User, UserRegisterInput, UserResponse } from "../entities/user";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import {FileUpload, GraphQLUpload} from 'graphql-upload-minimal';
import { PaginationInput } from "../typeDefs";
import UserMiddleware from "../middleware/UserMiddleware";
import logInUserAction from "../controllers/user/logInUserActon";

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg("user") user: UserRegisterInput,
        @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload | null
    ): Promise<UserResponse> {
        return await registerUserAction(user, file);
    }

    @Mutation(() => UserResponse)
    async logIn(
        @Arg("username") username: string,
        @Arg("password") password: string,
    ): Promise<UserResponse> {
        return await logInUserAction(username, password);
    }

    @Query(() => ListUsersResponse)
    async listUser(
        @Arg("pager", () => PaginationInput, { nullable: true }) pager: PaginationInput,
    ) {
        return await getAllUsersAction(pager);
    }

    @Query(() => User)
    async getUserById(
        @Arg("id") id: string
    ) {
        return await getUserByIdAction(id)
    }
}