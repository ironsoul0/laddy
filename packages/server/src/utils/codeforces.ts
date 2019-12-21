import axios from "axios";

const API = "https://codeforces.com/api";

export const doesHandleExist = async (handle: string): Promise<boolean> => {
  try {
    const info = await axios.get(`${API}/user.info?handles=${handle}`);
    return info.data.status === "OK";
  } catch (err) {
    console.log(err);
    return false;
  }
};
