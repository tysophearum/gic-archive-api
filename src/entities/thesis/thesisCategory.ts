import { ObjectType, Field as GqlField, Float, InputType } from "type-graphql";
import { Prop as DBField, Ref } from "@typegoose/typegoose";
import { IsString } from "class-validator";

@ObjectType()
export class ThesisCategory {
    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    name: string;

    @GqlField(() => String, { nullable: false })
    @DBField({type: String, required: true})
    description: string;

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

@InputType()
export class CreateThesisCategoryInput {
    @GqlField(() => String)
    @IsString()
    name: string;

    @GqlField(() => String)
    @IsString()
    description: string;
}