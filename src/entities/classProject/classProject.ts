import { ObjectType, Field as GqlField, InputType, ID, Float } from 'type-graphql';
import { Prop as DBField, Ref } from '@typegoose/typegoose';
import { IsOptional, IsString } from 'class-validator';
import { User, ClassProjectCategory } from '../../entities';
import { Pagination } from '../../typeDefs';
import { Types } from 'mongoose';

@ObjectType()
export class ClassProject {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true })
  title: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true })
  description: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true })
  image: string;

  @GqlField(() => User)
  @DBField({ type: String, ref: User, required: true })
  user: string;

  @GqlField(() => User)
  @DBField({ type: String, ref: User, required: true })
  teacher: string;

  @GqlField(() => ClassProjectCategory)
  @DBField({ type: String, ref: ClassProjectCategory, required: true })
  classProjectCategory: string;

  @GqlField(() => [User], { nullable: true })
  @DBField({ type: [String], ref: User, required: false, default: [] })
  collaborators: string[];

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true })
  classProjectLink: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true })
  repositoryLink: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: false })
  videoLink: string;

  @GqlField(() => Boolean, { nullable: false })
  @DBField({ type: Boolean, required: true, default: false })
  isApproved: boolean;

  @GqlField(() => Number, { nullable: false })
  @DBField({ type: Number, required: true, default: 0 })
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
export class ListClassProjectResponse {
  @GqlField(() => [ClassProject])
  classProject: ClassProject[];

  @GqlField(() => Pagination)
  pagination: Pagination;
}

@InputType()
export class CreateClassProjectInput {
  @GqlField(() => String)
  @IsString()
  title: string;

  @GqlField(() => String)
  @IsString()
  description: string;

  @GqlField(() => ID)
  @IsString()
  teacher: string;

  @GqlField(() => ID)
  @IsString()
  classProjectCategory: string;

  @IsOptional()
  @GqlField(() => [ID], { nullable: true })
  @IsString({ each: true })
  collaborators: string[];

  @GqlField(() => String, { nullable: false })
  @IsString()
  classProjectLink: string;

  @GqlField(() => String, { nullable: false })
  @IsString()
  repositoryLink: string;

  @IsOptional()
  @GqlField(() => String, { nullable: false })
  @IsString()
  videoLink: string;
}