import { Resolver, Ctx, UseMiddleware, Arg, Mutation } from "type-graphql";
import { compare, hash } from "bcryptjs";

import { MyContext } from "../graphql-types/MyContext";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { Ladder } from "../entity/Ladder";
import { handleValidation, passwordValidation } from "../yup/userSchema";
import { doesHandleExist } from "../utils/codeforces";

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateProfile(
    @Arg("handle") handle: string,
    @Arg("newPassword") newPassword: string,
    @Arg("password") password: string,
    @Ctx() { payload }: MyContext
  ) {
    try {
      await handleValidation.validate(handle);
      await passwordValidation.validate(password);
      if (newPassword.length > 0) {
        await passwordValidation.validate(newPassword);
      }
    } catch (err) {
      throw err;
    }

    const userID = payload?.userID;
    const userInfo = (await User.findOne(userID)) as User;

    const validPassword = await compare(password, userInfo.password);
    if (!validPassword) {
      throw new Error("Wrong password");
    }

    const validHandle = await doesHandleExist(handle);
    if (!validHandle) {
      throw new Error("Such handle does not exist");
    }

    if (newPassword.length > 0) {
      const hashed = await hash(newPassword, 12);
      userInfo.password = hashed;
    }

    userInfo.handle = handle;
    await userInfo.save();
    return true;
  }
}
