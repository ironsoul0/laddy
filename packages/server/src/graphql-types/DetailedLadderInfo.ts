import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
class ProblemInfo {
  @Field()
  url: string;

  @Field(() => Boolean)
  solved: boolean;

  @Field(() => Int)
  difficulty: number;
}

@ObjectType()
export class DetailedLadderInfo {
  @Field(() => [ProblemInfo])
  problems: ProblemInfo[];

  @Field(() => Boolean)
  joined: boolean;
}
