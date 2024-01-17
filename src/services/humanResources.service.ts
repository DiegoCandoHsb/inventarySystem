import { userSignUpData } from "../interfaces/userSignUpData.interface";
import { clearData } from "../pages/fixedAssets/common/utilities";
import { HsbBaseApiDb, getReqConfig } from "./api.db";

export async function createUser(
  userData: userSignUpData
): Promise<userSignUpData> {
  const userDataCleared = clearData(userData);

  console.log(userDataCleared, userData)
  const res = await HsbBaseApiDb.post<userSignUpData>(
    "/auth/register",
    userDataCleared,
    getReqConfig()
  );

  return res.data;
}
