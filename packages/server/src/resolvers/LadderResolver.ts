import { Resolver, Query, Arg } from "type-graphql";

import { Ladder } from "../entity/Ladder";
import { Problem } from "../entity/Problem";

@Resolver()
export class LadderResolver {
  @Query(() => [Ladder])
  async getLadders() {
    const ladders = await Ladder.find();
    return ladders;
  }

  @Query(() => [Problem])
  async getLadderProblems(@Arg("ladderID") ladderID: number) {
    const ladder = await Ladder.findOne(ladderID, { relations: ["problems"] });
    if (!ladder) {
      throw new Error("Ladder with such ID does not exist");
    }
    return ladder.problems;
  }
}
