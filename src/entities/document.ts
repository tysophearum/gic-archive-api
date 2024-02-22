import { ObjectType, Field as GqlField, InputType } from "type-graphql";
import { Prop as DBField } from "@typegoose/typegoose";
import { IsEmail, IsOptional, IsString } from "class-validator";

@ObjectType()
export class Document {
    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    title: string;

    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    description: string;

    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    userId: string;

    @GqlField(() => [String], {nullable: true})
    @DBField({type: [String], required: false, default: []})
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
}

@InputType()
export class CreateDocumentInput {
    @GqlField(() => String)
    @IsString()
    title: string;

    @GqlField(() => String)
    @IsString()
    description: string;

    @GqlField(() => String)
    @IsString()
    userId: string;

    @GqlField(() => String)
    @IsString()
    repositoryLink: string;

    @GqlField(() => [String])
    @IsOptional()
    @IsString({each: true})
    collaborators: string[];
}