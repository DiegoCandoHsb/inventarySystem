import { userSignUpData } from "../interfaces/userSignUpData.interface";
import { clearData } from "../pages/fixedAssets/common/utilities";
import { HsbBaseApiDb, getReqConfig } from "./api.db";

export async function GetUsers(): Promise<userSignUpData[]> {
  const users = await HsbBaseApiDb.get<userSignUpData[]>(
    "/user",
    getReqConfig()
  );
  return users.data;
}

export async function UpdateUser(
  userId: string,
  payload: userSignUpData
): Promise<userSignUpData> {
  const userDataFormated = clearData(payload);

  const updatedUser = await HsbBaseApiDb.patch<userSignUpData>(
    "/user".concat("/", userId),
    userDataFormated,
    getReqConfig()
  );

  return updatedUser.data;
}
