import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
}
