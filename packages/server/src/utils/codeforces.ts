import axios from "axios";

import { User } from "../entity/User";
import { Problem } from "../entity/Problem";

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

const hasMatch = (
  contestId: number,
  problemIndex: string,
  problemEndpoints: string[]
) => {
  return problemEndpoints.some(
    endpoint => endpoint === `${contestId}/${problemIndex}`
  );
};

export const checkSolved = async (
  handle: string,
  problemEndpoints: string[]
): Promise<boolean> => {
  try {
    const status = await axios.get(`${API}/user.status?handle=${handle}`);
    const submissions = status.data.result;
    return submissions.some((submission: any) => {
      const { problem, verdict } = submission;
      return (
        hasMatch(problem.contestId, problem.index, problemEndpoints) &&
        verdict === "OK"
      );
    });
  } catch {
    return false;
  }
};

export const updateSubmissions = async (user: User) => {
  const problems = await Problem.find();
  const { lastCheckedSubmission, handle } = user;

  const problemsExist = true;
  const limit = 5;
  const offset = 1;

  while (problemsExist) {
    const status = await axios.get(`${API}/user.status?handle=${handle}`);
    const submissions;
  }

  return true;
};
