import axios from "axios";

import { User } from "../entity/User";
import { Problem } from "../entity/Problem";

interface Submission {
  creationTimeSeconds: number;
  problem: {
    contestId: number;
    index: string;
  };
  verdict: string;
}

const API = "https://codeforces.com/api";

export const PROBLEM_URL = "https://codeforces.com/problemset/problem";

export const doesHandleExist = async (handle: string): Promise<boolean> => {
  try {
    const info = await axios.get(`${API}/user.info?handles=${handle}`);
    return info.data.status === "OK";
  } catch {
    return false;
  }
};

const hasMatch = (problem: Problem, submission: Submission) => {
  const { contestId, index } = submission.problem;
  return problem.endpoints.some(
    endpoint => endpoint === `${contestId}/${index}`
  );
};

export const updateSubmissions = async (user: User) => {
  const problems = await Problem.find();
  const { lastCheckedSubmission, handle } = user;

  const limit = 25;

  let newProblemsExist = true;
  let offset = 1,
    newCheckedSubmission = null;

  const newSolved: Submission[] = [];

  while (newProblemsExist) {
    const QUERY_URL =
      `${API}/user.status?handle=${handle}&from=${offset}` +
      (lastCheckedSubmission ? `&count=${limit}` : "");

    const status = await axios.get(QUERY_URL);
    const submissions = status.data.result;

    if (submissions.length === 0) {
      newProblemsExist = false;
    }

    if (newCheckedSubmission === null && submissions.length > 0) {
      newCheckedSubmission = submissions[0].creationTimeSeconds;
    }

    submissions.forEach((submission: Submission) => {
      if (submission.creationTimeSeconds == lastCheckedSubmission) {
        newProblemsExist = false;
      }
      if (!newProblemsExist || submission.verdict !== "OK") return;
      newSolved.push(submission);
    });

    offset += submissions.length;
  }

  const promises = newSolved.map(async submission => {
    const ladderProblem = problems.filter(problem =>
      hasMatch(problem, submission)
    );
    if (ladderProblem.length > 0) {
      const alreadySolved = user.problems.some(
        problem => problem.id === ladderProblem[0].id
      );
      if (!alreadySolved) user.problems.push(ladderProblem[0]);
    }
  });

  user.lastCheckedSubmission = newCheckedSubmission;

  await Promise.all(promises);
  await user.save();
};
