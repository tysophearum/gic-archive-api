import { ObjectType, Field as GqlField, InputType, ID, Float } from "type-graphql";
import { Prop as DBField, Ref } from "@typegoose/typegoose";
import { IsOptional, IsString } from "class-validator";
import { User } from "../user";
import { Pagination } from "../../typeDefs";
import { ThesisCategory } from "../thesis/thesisCategory";


@ObjectType()
export class Thesis {
    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    title: string;

    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    description: string;

    @GqlField(() => User)
    @DBField({type: String, ref: User, required: true})
    user: string;

    @GqlField(() => ThesisCategory)
    @DBField({type: String, ref: ThesisCategory, required: true})
    category: string;

    @GqlField(() => [User], {nullable: true})
    @DBField({type: [String], ref: User, required: false, default: []})
    collaborators: string[];
    
    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    thesisLink: string;

    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    repositoryLink: string;

    @GqlField(() => Boolean, { nullable: false })
    @DBField({type: Boolean, required: true, default: false})
    isApproved: boolean;
    
    @GqlField(() => Number, { nullable: false })
    @DBField({type: Number, required: true, default: 0})
    likeAmount: number;

    @GqlField(() => Float, { name: 'createdAt' })
    @DBField({
      type: Number,
      default: Date.now,
      alias: 'createdAt',
    })
    created_at?: number;
  
    @GqlField(() => Float, { name: 'updatedAt' })
    @DBField({
      type: Number,
      default: 0,
      alias: 'updatedAt',
    })
    updated_at?: number;
}

@ObjectType()
export class ListThesisResponse {
    @GqlField(() => [Thesis])
    thesis: Thesis[];

    @GqlField(() => Pagination)
    pagination: Pagination;
}

@InputType()
export class CreateThesisInput {
    @GqlField(() => String)
    @IsString()
    title: string;

    @GqlField(() => String)
    @IsString()
    description: string;

    @GqlField(() => String)
    @IsString()
    repositoryLink: string;

    @GqlField(() => [ID])
    @IsOptional()
    @IsString({each: true})
    collaborators: string[];

    @GqlField(() => ID)
    @IsOptional()
    @IsString()
    category: string;
}