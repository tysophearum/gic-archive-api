import { ObjectType, Field as GqlField, InputType, ID } from "type-graphql";
import { Prop as DBField, Ref } from "@typegoose/typegoose";
import { IsOptional, IsString } from "class-validator";
import { User } from "./user";
import { Pagination } from "../typeDefs";


@ObjectType()
export class Document {
    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    title: string;

    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    description: string;

    @GqlField(() => User) // Change field type to User
    @DBField({type: String, ref: User, required: true}) // Reference the User model
    user: string;

    @GqlField(() => [User], {nullable: true})
    @DBField({type: [String], ref: User, required: false, default: []})
    collaborators: string[];
    
    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    documentLink: string;

    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    repositoryLink: string;

    @GqlField(() => Boolean, { nullable: false })
    @DBField({type: Boolean, required: true, default: false})
    isApproved: boolean;

    // @GqlField(() => Number, { nullable: false })
    // @DBField({type: Number, required: true, default: 0})
    // likeAmount: number;
}

@ObjectType()
export class ListDocumentResponse {
    @GqlField(() => [Document])
    documents: Document[];

    @GqlField(() => Pagination)
    pagination: Pagination;
}

@InputType()
export class CreateDocumentInput {
    @GqlField(() => String)
    @IsString()
    title: string;

    @GqlField(() => String)
    @IsString()
    description: string;

    @GqlField(() => ID)
    @IsString()
    userId: string;

    @GqlField(() => String)
    @IsString()
    repositoryLink: string;

    @GqlField(() => [ID])
    @IsOptional()
    @IsString({each: true})
    collaborators: string[];
}