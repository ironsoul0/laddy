import { ObjectType, Field, Int, ID } from "type-graphql";

@ObjectType()
class ProblemInfo {
  @Field(() => ID)
  id: number;

  @Field()
  url: string;

  @Field(() => Boolean)
  solved: boolean;

  @Field(() => Int)
  difficulty: number;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class DetailedLadderInfo {
  @Field(() => String)
  rating: string;

  @Field(() => [ProblemInfo])
  problems: ProblemInfo[];

  @Field(() => Boolean)
  joined: boolean;
}
