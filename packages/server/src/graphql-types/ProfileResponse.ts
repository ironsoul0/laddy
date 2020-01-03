import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ProfileResponse {
  @Field(() => String)
  email: string;

  @Field(() => String)
  handle: string;
}
