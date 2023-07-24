import { userSignUpData } from "../interfaces/userSignUpData.interface";
import { HsbBaseApiDb } from "./api.db";

export async function GetUsers(): Promise<userSignUpData[]> {
  const users = await HsbBaseApiDb.get<userSignUpData[]>("/user");
  return users.data;
}
