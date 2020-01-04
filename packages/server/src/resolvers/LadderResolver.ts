import {
  Resolver,
  Query,
  Arg,
  UseMiddleware,
  Ctx,
  ID,
  Mutation
} from "type-graphql";

import { Ladder } from "../entity/Ladder";
import { User } from "../entity/User";
import { LadderInfo } from "../graphql-types/LadderInfo";
import { DetailedLadderInfo } from "../graphql-types/DetailedLadderInfo";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../graphql-types/MyContext";
import { PROBLEM_URL, updateSubmissions } from "../utils/codeforces";

@Resolver()
export class LadderResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleLadder(
    @Arg("ladderID", () => ID) ladderID: string,
    @Arg("join") join: boolean,
    @Ctx() { payload }: MyContext
  ) {
    const userID = payload!.userID;
    const user = await User.findOne(userID, { relations: ["ladders"] });
    const ladder = await Ladder.findOne(ladderID);

    if (!user || !ladder) {
      throw new Error("Invalid User ID or Ladder ID");
    }

    if (join) {
      user.ladders.push(ladder);
    } else {
      user.ladders = user.ladders.filter(
        ladder => ladder.id !== parseInt(ladderID, 10)
      );
    }

    await user.save();
    return join;
  }

  @Query(() => [LadderInfo])
  @UseMiddleware(isAuth)
  async laddersInfo(@Ctx() { payload }: MyContext) {
    const userID = payload?.userID;
    const user = await User.findOne(userID, { relations: ["problems"] });

    const ladders = await Ladder.find({ relations: ["problems", "users"] });

    const laddersInfo = ladders.map(ladder => {
      const joined = ladder.users.some(user => user.id === userID);

      const countSolved = ladder.problems.reduce((result, problem) => {
        const isSolved = user?.problems.some(
          solvedProblem => solvedProblem.id === problem.id
        )
          ? 1
          : 0;
        return result + isSolved;
      }, 0);

      const completed = Math.floor(
        (countSolved / ladder.problems.length) * 100
      );

      return {
        rating: ladder.rating,
        totalUsers: ladder.users.length,
        totalProblems: ladder.problems.length,
        id: ladder.id,
        completed,
        joined
      };
    });

    return laddersInfo;
  }

  @Query(() => DetailedLadderInfo)
  @UseMiddleware(isAuth)
  async ladderProblems(
    @Arg("ladderID", () => ID) ladderID: string,
    @Ctx() { payload }: MyContext
  ) {
    const ladder = await Ladder.findOne(ladderID, { relations: ["problems"] });
    if (!ladder) {
      throw new Error("Ladder with such ID does not exist");
    }

    const userID = payload?.userID;
    const user = (await User.findOne(userID, {
      relations: ["ladders", "problems"]
    })) as User;

    const joined = user.ladders.some(
      ladder => ladder.id === parseInt(ladderID, 10)
    );

    try {
      await updateSubmissions(user);
    } catch (err) {
      console.log(err);
    }

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

    return {
      joined,
      rating: ladder.rating,
      problems: ladderProblems.reverse()
    };
  }
}
