import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class BasicLadderInfo {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  totalUsers: number;

  @Field()
  name: string;

  @Field(() => Int)
  totalProblems: number;
}