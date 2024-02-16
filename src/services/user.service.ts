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

export async function getUser(id: string): Promise<userSignUpData> {
  const user = await HsbBaseApiDb.get<userSignUpData>(
    "/user".concat("/", id),
    getReqConfig()
  );
  return user.data;
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

export async function downloadUsersFile(
  users: userSignUpData[],
  filename: string
) {
  const res = await HsbBaseApiDb.post<string>(
    "/user/download",
    {
      users,
      filename,
    },
    getReqConfig()
  );

  return res.data;
}

export async function uploadUsersFile(file: object) {
  const res = await HsbBaseApiDb.post<string>(
    "/user/upload",
    file,
    getReqConfig()
  );
  return res.data;
}
