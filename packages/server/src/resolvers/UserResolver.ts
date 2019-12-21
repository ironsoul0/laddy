import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";

import { MyContext } from "../graphql-types/MyContext";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";

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
}
