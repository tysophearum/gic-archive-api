import { prop as DbField } from '@typegoose/typegoose';
import { Field as GqlField, ObjectType as GqlType, } from 'type-graphql';

@GqlType()
export class Hello {
    @DbField()
    @GqlField()
    message!: string;
}