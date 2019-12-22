import { ObjectType, Field } from "type-graphql";

@ObjectType()
class DetailedProblemInfo {
  @Field()
  url: string;

  @Field(() => Boolean)
  solved: boolean;
}

@ObjectType()
export class DetailedLadderInfo {
  @Field(() => [DetailedProblemInfo])
  problems: DetailedProblemInfo[];
}
