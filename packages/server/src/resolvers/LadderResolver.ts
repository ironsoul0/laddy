import { Resolver, Query, Arg, UseMiddleware, Ctx, ID } from "type-graphql";

import { Ladder } from "../entity/Ladder";
import { User } from "../entity/User";
import { LadderInfo } from "../graphql-types/LadderInfo";
import { DetailedLadderInfo } from "../graphql-types/DetailedLadderInfo";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../graphql-types/MyContext";
import { PROBLEM_URL, updateSubmissions } from "../utils/codeforces";

@Resolver()
export class LadderResolver {
  @Query(() => [LadderInfo])
  @UseMiddleware(isAuth)
  async laddersInfo(@Ctx() { payload }: MyContext) {
    const userID = payload?.userID;
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

  @Query(() => DetailedLadderInfo)
  @UseMiddleware(isAuth)
  async ladderProblems(
    @Arg("ladderID", () => ID) ladderID: number,
    @Ctx() { payload }: MyContext
  ) {
    const ladder = await Ladder.findOne(ladderID, { relations: ["problems"] });
    if (!ladder) {
      throw new Error("Ladder with such ID does not exist");
    }

    const userID = payload?.userID;
    const user = (await User.findOne(userID, {
      relations: ["problems", "ladders"]
    })) as User;

    const joined = user.ladders.some(ladder => ladder.id === ladderID);

    await updateSubmissions(user);

    const ladderProblems = ladder.problems.map(problem => {
      const solved = user.problems.some(
        solvedProblem => solvedProblem.id === problem.id
      );

      return {
        id: problem.id,
        difficulty: problem.difficulty,
        solved,
        url: `${PROBLEM_URL}/${problem.endpoints[0]}`,
        name: problem.name
      };
    });

    return { joined, rating: ladder.rating, problems: ladderProblems };
  }
}
