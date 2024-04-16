import { Types } from 'mongoose';
import { ObjectType, Field as GqlField, InputType, ID, Float } from 'type-graphql';
import { Prop as DBField, Ref } from '@typegoose/typegoose';
import { User, ClassProject, MinUser } from '../../entities';
import { IsString } from 'class-validator';
import { Pagination } from '../../typeDefs';

@ObjectType()
export class ClassProjectComment {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => User)
  @DBField({ type: String, ref: () => User, required: true })
  user: string;

  @GqlField(() => ClassProject)
  @DBField({ type: String, ref: () => ClassProject, required: true })
  classProject: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true })
  comment: string;

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
export class ClassProjectCommentResponse {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => MinUser)
  user: string;

  @GqlField(() => String, { nullable: false })
  comment: string;

  @GqlField(() => Float, { name: 'createdAt' })
  created_at?: number;

  @GqlField(() => Float, { name: 'updatedAt' })
  updated_at?: number;
}

@ObjectType()
export class ListClassProjectCommentResponse {
  @GqlField(() => [ClassProjectCommentResponse])
  comment: ClassProjectCommentResponse[];

  @GqlField(() => Pagination)
  pagination: Pagination;
}

@InputType()
export class CreateClassProjectCommentInput {
  @GqlField(() => ID)
  @IsString()
  classProject: string;

  @GqlField(() => String)
  @IsString()
  comment: string;
}

@InputType()
export class UpdateClassProjectCommentInput {
  @GqlField(() => ID)
  @IsString()
  id: string;

  @GqlField(() => String)
  @IsString()
  comment: string;
}
