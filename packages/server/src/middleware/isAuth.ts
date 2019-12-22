import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

import { MyContext } from "../graphql-types/MyContext";
import { User } from "../entity/User";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  const invalidAuth = new Error("Not authenticated");
  const invalidPayload = new Error("Invalid payload provided");

  if (!authorization) {
    throw invalidAuth;
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw invalidAuth;
  }

  if (typeof context.payload !== "object" || !context.payload.userID) {
    throw invalidPayload;
  }

  const user = await User.findOne(context.payload.userID);

  if (!user) {
    throw invalidAuth;
  }

  return next();
};
