import { userSignUpData } from "../interfaces/userSignUpData.interface";
import { HsbBaseApiDb, getReqConfig } from "./api.db";

export async function createUser(
  userData: userSignUpData
): Promise<userSignUpData> {
  const res = await HsbBaseApiDb.post<userSignUpData>(
    "/auth/register",
    userData,
    getReqConfig()
  );

  return res.data;
}
