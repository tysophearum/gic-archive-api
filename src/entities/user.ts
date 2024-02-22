import { ObjectType, Field as GqlField, InputType } from "type-graphql";
import { Prop as DBField } from "@typegoose/typegoose";
import { IsEmail, IsString } from "class-validator";


@ObjectType()
export class User {
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