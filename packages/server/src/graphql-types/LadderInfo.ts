import { ObjectType, Field, Int, ID } from "type-graphql";

@ObjectType()
export class LadderInfo {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  totalUsers: number;

  @Field()
  rating: string;

  @Field(() => Int)
  totalProblems: number;

  @Field(() => Boolean)
  joined: boolean;

  @Field(() => Int)
  completed: number;
}
