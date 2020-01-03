import { Resolver, Ctx, UseMiddleware, Arg, Mutation } from "type-graphql";
import { compare, hash } from "bcryptjs";

import { MyContext } from "../graphql-types/MyContext";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { handleValidation, passwordValidation } from "../yup/userSchema";
import { doesHandleExist } from "../utils/codeforces";
import { redis } from "../utils/redis";

@Resolver()
export class UserResolver {
  @Mutation(() => String)
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
      throw new Error("Invalid handle");
    }

    if (newPassword.length > 0) {
      const hashed = await hash(newPassword, 12);
      userInfo.password = hashed;
    }

    if (userInfo.handle !== handle) {
      userInfo.handle = handle;
      userInfo.lastCheckedSubmission = null!;
      userInfo.problems = [];
    }

    await userInfo.save();
    return "Updated!";
  }

  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string) {
    const userID = await redis.get(token);
    if (!userID) {
      return false;
    }

    const id = parseInt(userID, 10);

    try {
      await User.update({ id }, { confirmed: true });
      await redis.del(token);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
