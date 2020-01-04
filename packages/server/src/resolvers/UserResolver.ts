import {
  Resolver,
  Ctx,
  UseMiddleware,
  Arg,
  Mutation,
  Query
} from "type-graphql";
import { compare, hash } from "bcryptjs";

import { MyContext } from "../graphql-types/MyContext";
import { ProfileResponse } from "../graphql-types/ProfileResponse";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { handleValidation, passwordValidation } from "../yup/userSchema";
import { doesHandleExist } from "../utils/codeforces";
import { redis } from "../utils/redis";
import { createAccessToken } from "../utils/auth";

@Resolver()
export class UserResolver {
  @Query(() => ProfileResponse)
  @UseMiddleware(isAuth)
  async profile(@Ctx() { payload }: MyContext) {
    const userID = payload?.userID;
    const user = (await User.findOne(userID)) as User;
    return {
      email: user.email,
      handle: user.handle
    };
  }

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
    return "Updated";
  }

  @Mutation(() => String)
  async confirmUser(@Arg("token") token: string) {
    const userID = await redis.get(token);
    if (!userID) {
      throw new Error("Expired token");
    }

    const id = parseInt(userID, 10);

    const user = (await User.findOne(id)) as User;
    user.confirmed = true;
    await user.save();
    await redis.del(token);

    return createAccessToken(user);
  }
}
