import "dotenv/config";
import "reflect-metadata";
import { hash } from "bcryptjs";
import { getConnectionOptions, createConnection } from "typeorm";

import { User } from "../entity/User";
import { Ladder } from "../entity/Ladder";
import { Problem } from "../entity/Problem";

import ladders from "./ladders.json";

export const _fillWithMockData = async () => {
  const password = await hash("123", 12);

  const ironsoul = new User();
  ironsoul.email = "ironsoul@gmail.com";
  ironsoul.handle = "ironsoul";
  ironsoul.password = password;
  ironsoul.confirmed = true;

  const cmaster = new User();
  cmaster.email = "cmaster@gmail.com";
  cmaster.handle = "cmaster";
  cmaster.password = password;
  cmaster.confirmed = true;

  const krauch = new User();
  krauch.email = "krauch@gmail.com";
  krauch.handle = "krauch";
  krauch.password = password;
  krauch.confirmed = true;

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

const fillWithData = async () => {
  const dbOptions = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  const connection = await createConnection({ ...dbOptions, name: "default" });

  await connection.dropDatabase();
  await connection.synchronize();

  const password = await hash("123", 12);

  const ironsoul = new User();
  ironsoul.email = "timka2609@gmail.com";
  ironsoul.handle = "ironsoul";
  ironsoul.password = password;
  ironsoul.confirmed = true;

  await ironsoul.save();

  const problemMap: any = {};

  for (const problems of Object.values(ladders)) {
    for (const problem of problems) {
      if (!problemMap[problem.url]) {
        const newProblem = new Problem();
        newProblem.difficulty = problem.difficulty;
        newProblem.endpoints = problem.endpoints;
        newProblem.name = problem.name;
        problemMap[problem.url] = newProblem;
        await newProblem.save();
      }
    }
  }

  for (const [ladderID, problems] of Object.entries(ladders)) {
    const ladder = new Ladder();
    ladder.rating = ladderID;
    await ladder.save();

    for (const problem of problems) {
      const needLadder = await Ladder.findOne({
        where: { rating: ladderID },
        relations: ["problems"]
      });
      needLadder?.problems.push(problemMap[problem.url]);
      await needLadder?.save();
    }
  }
};

fillWithData();
