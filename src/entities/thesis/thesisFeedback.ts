import { Types } from 'mongoose';
import { ObjectType, Field as GqlField, InputType, ID, Float } from 'type-graphql';
import { Prop as DBField } from '@typegoose/typegoose';
import { User, Thesis, MinUser } from '../../entities';
import { IsString } from 'class-validator';
import { Pagination } from '../../typeDefs';

@ObjectType()
export class ThesisFeedback {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => User)
  @DBField({ type: String, ref: () => User, required: true })
  user: string;

  @GqlField(() => Thesis)
  @DBField({ type: String, ref: () => Thesis, required: true })
  thesis: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true })
  feedback: string;

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
export class ThesisFeedbackResponse {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => MinUser)
  user: string;

  @GqlField(() => String, { nullable: false })
  feedback: string;

  @GqlField(() => Float, { name: 'createdAt' })
  created_at?: number;

  @GqlField(() => Float, { name: 'updatedAt' })
  updated_at?: number;
}

@ObjectType()
export class ListThesisFeedbackResponse {
  @GqlField(() => [ThesisFeedbackResponse])
  thesis: ThesisFeedbackResponse[];

  @GqlField(() => Pagination)
  pagination: Pagination;
}

@InputType()
export class CreateThesisFeedbackInput {
  @GqlField(() => ID)
  @IsString()
  thesis: string;

  @GqlField(() => String)
  @IsString()
  feedback: string;
}

@InputType()
export class UpdateThesisFeedbackInput {
  @GqlField(() => ID)
  @IsString()
  id: string;

  @GqlField(() => String)
  @IsString()
  feedback: string;
}
