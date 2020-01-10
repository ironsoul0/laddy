import { Resolver, Mutation, Arg } from "type-graphql";
import { hash, compare } from "bcryptjs";

import { LoginResponse } from "../graphql-types/LoginResponse";
import { User } from "../entity/User";
import { createAccessToken } from "../utils/auth";
import { doesHandleExist } from "../utils/codeforces";
import { registerSchema, loginSchema } from "../yup/userSchema";
import { sendConfirmationEmail } from "../utils/sendConfirmationEmail";

@Resolver()
export class AuthResolver {
  @Mutation(() => LoginResponse)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      await loginSchema.validate({ email, password });
    } catch (err) {
      throw err;
    }

    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      throw new Error("Could not find user");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Wrong password");
    }

    if (!user.confirmed) {
      await sendConfirmationEmail(user.email, user.id);
      throw new Error("Not confirmed");
    }

    return {
      accessToken: createAccessToken(user)
    };
  }

  @Mutation(() => String)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("handle") handle: string
  ) {
    try {
      await registerSchema.validate({ email, password, handle });
    } catch (err) {
      throw err;
    }

    const validHandle = await doesHandleExist(handle);
    if (!validHandle) {
      throw new Error("Invalid handle");
    }

    const hashedPassword = await hash(password, 12);
    const loweredEmail = email.toLowerCase();

    const userAlreadyExists = await User.findOne({
      where: { email: loweredEmail }
    });
    if (userAlreadyExists) {
      const { id, confirmed } = userAlreadyExists;

      if (!confirmed) {
        userAlreadyExists.password = hashedPassword;
        userAlreadyExists.handle = handle;
        await userAlreadyExists.save();
        await sendConfirmationEmail(loweredEmail, id);
        return "Check your email";
      }

      throw new Error("User already exists");
    }

    try {
      const user = await User.create({
        email: loweredEmail,
        password: hashedPassword,
        handle
      }).save();
      await sendConfirmationEmail(loweredEmail, user.id);
    } catch (err) {
      console.log(err);
      throw new Error("Error occured");
    }

    return "Check your email";
  }
}
