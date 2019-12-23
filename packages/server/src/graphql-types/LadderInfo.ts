import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class LadderInfo {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  totalUsers: number;

  @Field()
  rating: string;

  @Field(() => Int)
  totalProblems: number;

  @Field(() => Boolean)
  joined: boolean;
}
