import { Types } from 'mongoose';
import { ObjectType, Field as GqlField, InputType, ID, Float } from 'type-graphql';
import { Prop as DBField, Ref } from '@typegoose/typegoose';
import { ClassProject } from '../../entities';
import { IsString } from 'class-validator';

@ObjectType()
export class FeaturedClassProject {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => ClassProject)
  @DBField({ type: String, ref: () => ClassProject, required: true })
  classProject: string;

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
export class CreateFeaturedClassProjectInput {
  @GqlField(() => ID)
  @IsString()
  classProject: string;
}
