import { Types } from 'mongoose';
import { ObjectType, Field as GqlField, InputType, ID, Float } from 'type-graphql';
import { Prop as DBField, Ref } from '@typegoose/typegoose';
import { Thesis } from '../../entities';
import { IsString } from 'class-validator';

@ObjectType()
export class FeaturedThesis {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => Thesis)
  @DBField({ type: String, ref: Thesis, required: true })
  thesis: string;

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
export class CreateFeaturedThesisInput {
  @GqlField(() => ID)
  @IsString()
  thesis: string;
}
