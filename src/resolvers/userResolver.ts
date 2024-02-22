import { getAllUsersAction, registerUserAction } from "../controllers/user";
import { User, UserRegisterInput } from "../entities/user";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {FileUpload, GraphQLUpload} from 'graphql-upload-minimal';

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg("user") user: UserRegisterInput,
        @Arg("file", () => GraphQLUpload) file: FileUpload
    ): Promise<User> {
        return await registerUserAction(user, file);
    }

    @Query(() => [User])
    async getAllUsers() {
        return await getAllUsersAction();
    }
}