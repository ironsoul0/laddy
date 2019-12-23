import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class ProblemInfo {
  @Field()
  url: string;

  @Field(() => Boolean)
  solved: boolean;

  @Field(() => Int)
  difficulty: number;
}
