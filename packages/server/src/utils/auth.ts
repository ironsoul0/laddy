import { sign } from "jsonwebtoken";

import { User } from "../entity/User";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "365d"
  });
};
