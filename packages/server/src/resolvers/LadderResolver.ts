import { Resolver, Query, Arg, UseMiddleware, Ctx } from "type-graphql";

import { User } from "../entity/User";
import { Ladder } from "../entity/Ladder";
import { BasicLadderInfo } from "../graphql-types/BasicLadderInfo";
import { DetailedLadderInfo } from "../graphql-types/DetailedLadderInfo";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/graphql-types/MyContext";

@Resolver()
export class LadderResolver {
  @Query(() => [BasicLadderInfo])
  @UseMiddleware(isAuth)
  async getLaddersInfo(@Ctx() { payload }: MyContext) {
    const userID = payload?.userID;
    const userInfo = await User.findOne(userID);
    if (!userInfo) {
      throw new Error("User with such ID does not exist");
    }

    const ladders = await Ladder.find({ relations: ["problems", "users"] });
    const laddersInfo = ladders.map(ladder => {
      const joined = ladder.users.some(user => user.id === userID);

      return {
        rating: ladder.rating,
        totalUsers: ladder.users.length,
        totalProblems: ladder.problems.length,
        id: ladder.id,
        joined
      };
    });

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
