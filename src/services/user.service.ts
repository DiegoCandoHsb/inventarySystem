import { userSignUpData } from "../interfaces/userSignUpData.interface";
import { HsbBaseApiDb, getReqConfig } from "./api.db";

export async function GetUsers(): Promise<userSignUpData[]> {
  const users = await HsbBaseApiDb.get<userSignUpData[]>("/user", getReqConfig());
  return users.data;
}
