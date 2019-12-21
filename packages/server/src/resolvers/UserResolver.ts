import { Resolver, Query, Ctx, UseMiddleware, Arg } from "type-graphql";

import { MyContext } from "../graphql-types/MyContext";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { Ladder } from "src/entity/Ladder";

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return `Your user ID is: ${payload!.userID}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  me(@Ctx() { payload }: MyContext) {
    return User.findOne(payload!.userID);
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleLadder(
    @Arg("ladderID") ladderID: number,
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
      user.ladders = user.ladders.filter(ladder => ladder.id !== ladderID);
    }

    await user.save();
    return true;
  }
}
