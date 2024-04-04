import { Types } from 'mongoose';
import { ObjectType, Field as GqlField, InputType, ID, Float } from 'type-graphql';
import { Prop as DBField, Ref } from '@typegoose/typegoose';
import { User, ClassProject } from '../../entities';
import { IsString } from 'class-validator';

@ObjectType()
export class ClassProjectLike {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => User)
  @DBField({ type: String, ref: User, required: true })
  user: string;

  @GqlField(() => ClassProject)
  @DBField({ type: String, ref: ClassProject, required: true })
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

export class CreateClassProjectLikeInput {
  @GqlField(() => ID)
  @IsString()
  classProject: string;
}
