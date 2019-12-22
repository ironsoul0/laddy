import { Resolver, Query, Arg, UseMiddleware, Ctx } from "type-graphql";

import { Ladder } from "../entity/Ladder";
import { BasicLadderInfo } from "../graphql-types/BasicLadderInfo";
import { DetailedLadderInfo } from "../graphql-types/DetailedLadderInfo";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/graphql-types/MyContext";

@Resolver()
export class LadderResolver {
  @Query(() => [BasicLadderInfo])
  async getLaddersInfo() {
    const ladders = await Ladder.find({ relations: ["problems", "users"] });
    const laddersInfo = ladders.map(ladder => ({
      name: ladder.name,
      totalUsers: ladder.users.length,
      totalProblems: ladder.problems.length,
      id: ladder.id
    }));
    return laddersInfo;
  }

  @Query(() => [DetailedLadderInfo])
  @UseMiddleware(isAuth)
  async getLadderProblems(
    @Arg("ladderID") ladderID: number,
    @Ctx() { payload }: MyContext
  ) {
    console.log(ladderID, payload);
    // const ladder = await Ladder.findOne(ladderID, { relations: ["problems"] });
    // if (!ladder) {
    //   throw new Error("Ladder with such ID does not exist");
    // }
    // return ladder.problems;
  }
}
