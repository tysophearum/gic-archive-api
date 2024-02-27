import { ObjectType, Field as GqlField, InputType, ID } from "type-graphql";
import { Prop as DBField } from "@typegoose/typegoose";
import { IsEmail, IsString } from "class-validator";
import { Pagination } from "../typeDefs";
import { Types } from "mongoose";


@ObjectType()
export class User {
    @GqlField(() => ID, { name: 'id' })
    readonly _id?: Types.ObjectId;
    
    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    username: string;

    @DBField({type: String, required: true})
    password: string;

    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    email: string;

    @DBField({type: String, required: false})
    picture: string
}

@ObjectType()
export class UserResponse {
    @GqlField(() => User)
    user: User;

    @GqlField(() => String)
    token: string;
}

@ObjectType()
export class ListUsersResponse{
    @GqlField(() => [User])
    users: User[];

    @GqlField(() => Pagination)
    pagination: Pagination
}

@InputType()
export class UserRegisterInput {
    @GqlField(() => String)
    @IsString()
    username: string;

    @GqlField(() => String)
    @IsString()
    password: string;

    @GqlField(() => String)
    @IsString()
    confirm_password: string;

    @GqlField(() => String)
    @IsEmail()
    email: string;
}