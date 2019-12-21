import { Resolver, Mutation, Arg } from "type-graphql";
import { hash, compare } from "bcryptjs";

import { LoginResponse } from "../graphql-types/LoginResponse";
import { User } from "../entity/User";
import { createAccessToken } from "../utils/auth";
import { doesHandleExist } from "../utils/codeforces";
import { registerSchema } from "../yup/userSchema";

@Resolver()
export class AuthResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Could not find user");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Wrong password");
    }

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("handle") handle: string
  ) {
    try {
      await registerSchema.validate({ email, password, handle });
    } catch (err) {
      throw new Error(err.message);
    }

    const userAlreadyExists = await User.findOne({ where: { email } });
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const validHandle = await doesHandleExist(handle);
    if (!validHandle) {
      throw new Error("Such handle does not exist");
    }

    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedPassword,
        handle
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
