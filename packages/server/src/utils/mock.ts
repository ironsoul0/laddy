import { hash } from "bcryptjs";

import { User } from "../entity/User";
import { Ladder } from "../entity/Ladder";
import { Problem } from "../entity/Problem";

export const _fillWithMockData = async () => {
  const password = await hash("123", 12);

  const ironsoul = new User();
  ironsoul.email = "ironsoul@gmail.com";
  ironsoul.handle = "ironsoul";
  ironsoul.password = password;

  const cmaster = new User();
  cmaster.email = "cmaster@gmail.com";
  cmaster.handle = "cmaster";
  cmaster.password = password;

  const krauch = new User();
  krauch.email = "krauch@gmail.com";
  krauch.handle = "krauch";
  krauch.password = password;

  await ironsoul.save();
  await cmaster.save();
  await krauch.save();

  const ladder1 = new Ladder();
  ladder1.rating = "< 1300";

  const ladder2 = new Ladder();
  ladder2.rating = "[1300, 1399]";

  await ladder1.save();
  await ladder2.save();

  const problem1 = new Problem();
  problem1.difficulty = 1;
  problem1.name = "Problem 1";
  problem1.endpoints = ["1268/A", "1269/C"];

  const problem2 = new Problem();
  problem2.difficulty = 2;
  problem2.name = "Problem 2";
  problem2.endpoints = ["1268/B", "1269/D"];

  const problem3 = new Problem();
  problem3.difficulty = 3;
  problem3.name = "Problem 3";
  problem3.endpoints = ["1268/C", "1269/E"];

  await problem1.save();
  await problem2.save();
  await problem3.save();

  ironsoul.ladders = [ladder1, ladder2];
  cmaster.ladders = [ladder1];
  krauch.ladders = [ladder2];

  ironsoul.problems = [problem1];
  cmaster.problems = [problem2, problem3];
  krauch.problems = [problem3];

  await ironsoul.save();
  await cmaster.save();
  await krauch.save();

  ladder1.problems = [problem1, problem2];
  ladder2.problems = [problem2, problem3];

  await ladder1.save();
  await ladder2.save();
};
